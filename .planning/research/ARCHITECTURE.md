# E-Learning Platform Architecture Research

**Domain:** E-Learning / Learning Management System (LMS)
**Researched:** 2026-03-17
**Mode:** Architecture Patterns
**Confidence:** HIGH

## Executive Summary

Modern e-learning platforms follow a three-tier architecture: Presentation (frontend), Application (business logic), Data (storage). The frontend typically uses Next.js App Router with Server Components for initial loads and Client Components for interactivity. For a paid course platform with subscription and per-course purchases, the critical architectural decisions center on:

1. **Component boundaries** that separate course content, payment, and access control
2. **Data flow** from user authentication through course access
3. **State management** distinction between server state (API data) and client state (UI state)
4. **Error boundary architecture** for graceful degradation

The existing codebase already uses Next.js 15 with React Query (TanStack Query), which is the recommended pattern for server state management. This research confirms the current architecture is well-aligned with industry best practices and provides specific recommendations for the course platform implementation.

---

## 1. Component Boundaries for Course Platform

### 1.1 Recommended Domain Separation

Based on LMS architecture best practices, the course platform should be organized around these bounded contexts:

| Domain | Responsibility | Key Components |
|--------|---------------|----------------|
| **Auth** | User identity, roles, session | Login, Register, PasswordReset, RoleGuard |
| **Course** | Course CRUD, content delivery | CourseList, CourseDetail, CoursePlayer, LessonView |
| **Enrollment** | Access control, progress tracking | EnrollmentCheck, ProgressTracker, AccessBarrier |
| **Payment** | Subscriptions, purchases, transactions | PricingPage, CheckoutFlow, SubscriptionManager, PurchaseHistory |
| **Dashboard** | Role-specific views | StudentDashboard, InstructorDashboard, AdminDashboard |
| **Video** | Video playback, progress saving | VideoPlayer, PlaybackControls, ProgressMarker |

### 1.2 Route Group Structure

The existing architecture uses route groups effectively. For the course platform, extend this pattern:

```
src/app/
├── (marketing)/          # Public pages (landing, pricing)
│   ├── page.tsx
│   ├── pricing/
│   └── courses/
├── (auth)/               # Authentication routes
│   ├── login/
│   └── register/
├── (dashboard)/          # Protected dashboards
│   ├── student/
│   │   └── dashboard/
│   ├── instructor/
│   │   └── dashboard/
│   └── admin/
│       └── dashboard/
├── courses/
│   ├── [courseId]/
│   │   ├── page.tsx           # Course overview
│   │   ├── learn/
│   │   │   └── page.tsx       # Course player
│   │   └── chapters/
│   │       └── [chapterId]/
│   └── manage/                # Instructor course management
│       └── [courseId]/
│           └── edit/
└── api/                      # API routes
    ├── webhooks/
    │   └── stripe/
    └── upload/
```

### 1.3 Service Layer Boundaries

Organize services by domain to keep related operations cohesive:

```
src/services/
├── auth/                    # Authentication actions & queries
├── courses/                 # Course CRUD, listing
├── chapters/                # Chapter/lesson management
├── enrollments/             # Access control, progress
├── payments/                # Stripe integration
├── subscriptions/           # Subscription management
├── progress/                # Learning progress tracking
└── analytics/               # Instructor analytics
```

**Rationale:** Each service handles one domain, reducing coupling. Payment logic stays separate from course content, making it easier to modify pricing models without affecting content delivery.

---

## 2. Data Flow: User → Course → Payment → Access

### 2.1 Core Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY FLOW                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│   │  User   │────▶│  Course  │────▶│ Payment  │────▶│  Access  │       │
│   │Auth/Role│     │ Discovery│     │  Gate    │     │  Grant   │       │
│   └──────────┘     └──────────┘     └──────────┘     └──────────┘       │
│        │                │                │                │              │
│        ▼                ▼                ▼                ▼              │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│   │Middleware│     │Course API│     │  Stripe  │     │Enrollment│       │
│   │  Check   │     │  Fetch   │     │ Checkout │     │  Record  │       │
│   └──────────┘     └──────────┘     └──────────┘     └──────────┘       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Detailed Flow: Course Access Decision

**Step 1: Authentication Check (Middleware)**
```
Request → middleware.ts → Validate JWT token → 
  → Invalid → Redirect /login
  → Valid → Attach user to request → Continue
```

**Step 2: Course Access Request**
```
User visits /courses/[courseId]/learn →
  Server Component fetches course metadata →
  Client Component checks enrollment status
```

**Step 3: Access Decision Logic**
```
IF user.role === 'admin':
  GRANT access
ELSE IF course.isFree === true:
  GRANT access  
ELSE IF user.hasSubscription:
  GRANT access (subscription covers course)
ELSE IF user.hasCoursePurchase(courseId):
  GRANT access
ELSE:
  DENY access → Redirect /courses/[courseId] (show purchase option)
```

**Step 4: Preview Access (First 2 Lessons)**
```
IF user does NOT have full access:
  Check lesson index
  IF lesson.index < 2:
    GRANT preview access
  ELSE IF course.chapter.isFree === true:
    GRANT preview access  
  ELSE:
    DENY access → Show "Continue watching" teaser
```

### 2.3 Payment Flow Integration

```
┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│   User selects     │────▶│   Checkout init   │────▶│   Stripe Session   │
│   purchase option  │     │   (create-checkout│     │   created          │
└────────────────────┘     │   -session action)│     └─────────┬──────────┘
                          └────────────────────┘               │
                                                               ▼
┌────────────────────┐     ┌────────────────────┐     ┌────────────────────┐
│   Webhook receives │◀────│   Redirect after   │◀────│   User completes   │
│   purchase event   │     │   payment success  │     │   payment          │
└─────────┬──────────┘     └────────────────────┘     └────────────────────┘
          │
          ▼
┌────────────────────┐
│   Enrollment       │
│   created in DB    │
└────────────────────┘
```

### 2.4 Data Flow Implementation Pattern

Use Server Actions for the initial access check (server-side is more secure):

```typescript
// src/services/enrollments/actions.ts
'use server'

export async function checkCourseAccess(courseId: string) {
  const user = await getCurrentUser();
  const course = await getCourse(courseId);
  
  // Admin always has access
  if (user.role === 'admin') return { access: true, type: 'admin' };
  
  // Check subscription
  if (user.subscription?.status === 'active') {
    return { access: true, type: 'subscription' };
  }
  
  // Check course purchase
  const purchase = await getCoursePurchase(user.id, courseId);
  if (purchase) return { access: true, type: 'purchase' };
  
  // Check free preview
  return { access: false, type: 'none', course };
}
```

For client-side progress tracking and real-time updates:

```typescript
// src/services/enrollments/use-enrollment-query.ts
'use client'

import { useQuery } from '@tanstack/react-query';

export function useEnrollment(courseId: string) {
  return useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => fetchEnrollment(courseId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

---

## 3. State Management Patterns

### 3.1 Server State vs Client State

**Critical distinction for e-learning platforms:**

| State Type | Examples | Management |
|------------|----------|------------|
| **Server State** | Courses, lessons, user profile, enrollments, progress | TanStack Query |
| **Client State** | Video playback position, sidebar open/closed, form inputs | useState/useReducer |
| **Global Client State** | Theme, auth user (for UI), sidebar collapsed | React Context |

### 3.2 Current Architecture Assessment

The existing codebase correctly implements:
- **TanStack Query** for server state (courses, user data)
- **React Context** for auth user state
- **Server Actions** for mutations with automatic invalidation

This is the recommended pattern for Next.js 15 applications.

### 3.3 State Management by Feature

| Feature | Server State | Client State | Global/Context |
|---------|--------------|--------------|----------------|
| Course listing | TanStack Query (cached) | Filter/sort state | — |
| Course player | Progress from server | Current time, volume, playback rate | — |
| User session | — | — | Auth Context |
| Payment flow | Payment status | Checkout step | — |
| Dashboard | Analytics data, recent courses | Date range filter | — |

### 3.4 Recommended Caching Strategy

For e-learning platforms, different data has different freshness requirements:

```typescript
// src/providers/query-provider.tsx
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Courses change infrequently - cache longer
      staleTime: 1000 * 60 * 10, // 10 minutes
      
      // But refetch on window focus for real-time feel
      refetchOnWindowFocus: true,
      
      // Retry failed requests
      retry: 2,
    },
  },
});

// Feature-specific overrides
const courseQueries = {
  staleTime: 1000 * 60 * 5,  // Course data: 5 min
  gcTime: 1000 * 60 * 60,    // Keep in cache: 1 hour
};

const progressQueries = {
  staleTime: 1000 * 30,      // Progress: 30 seconds (important to stay fresh)
  refetchOnWindowFocus: true,
  refetchInterval: 1000 * 60, // Refetch every minute while watching
};

const userQueries = {
  staleTime: 1000 * 60 * 15, // User data: 15 min
};
```

### 3.5 Optimistic Updates for Progress

When a user completes a lesson, update UI immediately:

```typescript
// src/services/progress/use-complete-lesson-mutation.ts
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: completeLesson,
    // Optimistic update: immediately mark as complete
    onMutate: async ({ lessonId, courseId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['progress', courseId] });
      
      // Snapshot previous value
      const previous = queryClient.getQueryData(['progress', courseId]);
      
      // Optimistically update
      queryClient.setQueryData(['progress', courseId], (old) => ({
        ...old,
        completedLessons: [...old.completedLessons, lessonId],
      }));
      
      return { previous };
    },
    // Rollback on error
    onError: (err, vars, context) => {
      queryClient.setQueryData(
        ['progress', vars.courseId], 
        context?.previous
      );
    },
    // Refetch after success
    onSettled: (data, error, vars) => {
      queryClient.invalidateQueries({ queryKey: ['progress', vars.courseId] });
    },
  });
}
```

---

## 4. Error Boundary Architecture

### 4.1 Layered Error Boundaries

Based on Next.js best practices, implement error boundaries at multiple levels:

```
src/app/
├── error.tsx                    # Global fallback (all routes)
├── global-error.tsx             # Root error (HTML fallback)
├── not-found.tsx                # 404 handling
│
├── (marketing)/                 # Marketing error boundaries
│   ├── error.tsx
│   └── courses/
│       ├── error.tsx
│       └── [courseId]/
│           └── error.tsx
│
├── (dashboard)/                 # Dashboard error boundaries  
│   ├── error.tsx
│   ├── student/
│   │   └── error.tsx
│   └── instructor/
│       └── error.tsx
│
└── courses/
    ├── learn/
    │   ├── error.tsx            # Video player errors
    │   └── [chapterId]/
    │       └── error.tsx
    └── manage/
        └── error.tsx
```

### 4.2 Error Boundary Pattern

Each error boundary should:

1. Display a user-friendly message
2. Provide a "Try Again" button
3. Log the error for debugging

```typescript
// src/app/(marketing)/courses/error.tsx
'use client'

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Courses error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">
        We couldn't load the courses. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### 4.3 Component-Level Error Boundaries

For critical components like video players, wrap with custom error boundaries:

```typescript
// src/components/video/video-player.tsx
'use client'

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class VideoPlayerErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Video player error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="aspect-video flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <p className="mb-2">Video failed to load</p>
              <Button 
                variant="outline" 
                onClick={() => this.setState({ hasError: false })}
              >
                Retry
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### 4.4 Error Types and Handling Strategy

| Error Type | Where Caught | User Feedback | Recovery |
|------------|--------------|---------------|----------|
| Auth expired | Middleware | Redirect to login | Re-authenticate |
| API failure (4xx) | Server Action | Toast notification | Retry action |
| API failure (5xx) | Server Action | Error page | Retry with backoff |
| Network error | React Query | Inline retry | Auto-retry |
| Video load fail | Error Boundary | Fallback UI | Retry button |
| Payment fail | Checkout flow | Specific message | Retry payment |

### 4.5 Global Error Handling

For errors that should not show the Next.js error UI:

```typescript
// src/app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2>Critical Error</h2>
            <p>Please refresh the page or contact support.</p>
            <button onClick={reset}>Refresh</button>
          </div>
        </div>
      </body>
    </html>
  );
}
```

---

## 5. Suggested Build Order (Dependencies)

### 5.1 Phase 1: Foundation (Prerequisites)

**Before building course features, establish these:**

1. **Authentication System** (if not complete)
   - Login/register flows
   - Role-based middleware
   - Session management

2. **API Client Layer**
   - Request handler with auth headers
   - Error transformation
   - Type-safe API responses

3. **Error Boundary Infrastructure**
   - Global error.tsx
   - Route-specific error boundaries
   - Error logging setup

**Estimated: Existing in this codebase**

### 5.2 Phase 2: Course Content (Core)

**Build in this order (respecting dependencies):**

```
1. Course Data Models & API
   ↓ (depends on Foundation)
2. Course Listing Page
   ↓ (depends on 1)
3. Course Detail Page  
   ↓ (depends on 1)
4. Lesson/Chapter Data
   ↓ (depends on 1)
5. Video Player Component
   ↓ (depends on 4)
6. Course Learning Page
   ↓ (depends on 2,3,5)
7. Progress Tracking
   ↓ (depends on 6)
```

**Key milestone:** Users can browse courses and watch lessons (without payment)

### 5.3 Phase 3: Payments & Access

```
1. Stripe Integration Setup
   ↓
2. Course Pricing Model
   ↓ (depends on Course Data)
3. Checkout Flow
   ↓ (depends on 1)
4. Enrollment/Access Control
   ↓ (depends on 2,3)
5. Free Preview Logic
   ↓ (depends on 4)
6. Subscription Plans
   ↓ (depends on 1)
```

**Key milestone:** Revenue flow - users can purchase courses

### 5.4 Phase 4: Dashboards & Polish

```
1. Student Dashboard
   ↓ (depends on Phase 2,3)
2. Enrollment History
   ↓ (depends on Phase 3)
3. Instructor Dashboard
   ↓ (depends on Phase 2)
4. Course Analytics
   ↓ (depends on 2)
5. Admin Dashboard
   ↓ (depends on Phase 2,3)
6. UX Polish (loading states, etc.)
   ↓ (throughout)
```

### 5.5 Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BUILD DEPENDENCY GRAPH                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────┐                                                       │
│   │  Foundation │ (Auth, API Client, Error Boundaries)                  │
│   └──────┬──────┘                                                       │
│          │                                                              │
│          ▼                                                              │
│   ┌─────────────┐     ┌─────────────┐                                  │
│   │ Course Data │────▶│Course Listing│                                 │
│   └─────────────┘     └──────┬──────┘                                 │
│                              │                                          │
│                              ▼                                          │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │
│   │Lesson Data  │────▶│Course Detail│────▶│Video Player │             │
│   └─────────────┘     └─────────────┘     └──────┬──────┘             │
│                                                  │                      │
│                                                  ▼                      │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │
│   │   Stripe    │────▶│   Checkout  │────▶│ Enrollment  │             │
│   └─────────────┘     └─────────────┘     └──────┬──────┘             │
│                                                  │                      │
│                                                  ▼                      │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │
│   │   Pricing   │────▶│Free Preview │────▶│   Learning  │             │
│   └─────────────┘     └─────────────┘     │    Page     │             │
│                                          └──────┬──────┘             │
│                                                 │                      │
│                                                 ▼                      │
│                                          ┌─────────────┐             │
│                                          │  Progress   │             │
│                                          │  Tracking   │             │
│                                          └──────┬──────┘             │
│                                                 │                      │
│                                                 ▼                      │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │
│   │  Instructor │     │   Student   │     │    Admin    │             │
│   │  Dashboard  │     │  Dashboard  │     │  Dashboard  │             │
│   └─────────────┘     └─────────────┘     └─────────────┘             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Parallel Opportunities

Some features can be built in parallel after dependencies are met:

| Parallel Track | Dependencies | Can Start After |
|----------------|--------------|-----------------|
| Student Dashboard | Phase 2, 3 | Course Learning Page |
| Instructor Dashboard | Phase 2 | Video Player |
| Admin Dashboard | Phase 2, 3 | Enrollment |
| UX Polish | Foundation | Any phase |

---

## 6. Architecture Recommendations Summary

### 6.1 Confirm Current Architecture

The existing codebase architecture is well-aligned with best practices:

| Aspect | Current | Recommendation |
|--------|---------|----------------|
| Server Components | Next.js App Router | Keep - ideal for initial loads |
| Data Fetching | React Query | Keep - correct for server state |
| Mutations | Server Actions | Keep - proper separation |
| Auth | HTTP-only cookies | Keep - secure |
| Error Handling | error.tsx boundaries | Expand with more granular boundaries |

### 6.2 Recommended Additions

1. **Domain-based service organization** - Group by feature, not by type
2. **Component-level error boundaries** - For video player, checkout flow
3. **Optimistic updates** - For lesson completion
4. **Route group separation** - Marketing vs dashboard vs course areas
5. **Caching strategy** - Feature-specific stale times

### 6.3 Architecture Quality Indicators

When implementing, verify:

- [ ] Course access logic runs server-side (secure)
- [ ] Video player wrapped in error boundary
- [ ] Payment flow has proper error handling
- [ ] Progress updates are optimistic
- [ ] Different error pages for different areas
- [ ] Loading states for all async operations
- [ ] Type-safe API responses

---

## Sources

- **LMS Architecture Best Practices**: LMSPedia (2026), eLeaP (2026)
- **Next.js Error Handling**: Next.js 15 Documentation, EastonDev (2026), Dev.to (2025)
- **State Management**: TanStack Query Documentation, CodeFlex (2026)
- **Course Platform Patterns**: CodeWithAntonio YouTube Tutorial, Eduverse GitHub

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Component boundaries | HIGH | Based on established LMS patterns |
| Data flow | HIGH | Standard e-commerce → access pattern |
| State management | HIGH | Confirmed by TanStack Query best practices |
| Error boundaries | HIGH | Next.js native patterns well-documented |
| Build order | MEDIUM | Recommended sequence, actual may vary |

---

*Research completed: 2026-03-17*
