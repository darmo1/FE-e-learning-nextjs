# E-Learning Platform Pitfalls Research

**Domain:** E-Learning Video Course Platform  
**Researched:** 2026-03-17  
**Overall Confidence:** HIGH

## Executive Summary

This research identifies the most critical pitfalls that e-learning platform projects encounter, based on industry patterns, security vulnerabilities, and common architectural mistakes. The project context is a Next.js + FastAPI platform with Stripe payments and Cloudinary video storage. Key risk areas include payment webhook reliability, video delivery quality, authentication gaps, and state management performance issues. Many of these pitfalls have already manifested in the current codebase as documented in CONCERNS.md.

## Key Findings

- **Payment Systems:** Webhook signature verification failures and missing retry logic cause revenue-critical failures
- **Video Delivery:** Buffering and bandwidth issues directly impact learning experience and retention
- **Security:** Unauthenticated endpoints and IDOR vulnerabilities are the most common e-learning platform attacks
- **UX:** Silent error swallowing and missing loading states cause user abandonment
- **State Management:** Context API misuse leads to performance degradation at scale

## Critical Pitfalls

### 1. Payment Webhook Failures

**Severity:** CRITICAL

#### Warning Signs

- Users pay but do not receive access to purchased courses
- Subscription cancellations do not reflect in access rights
- Duplicate provisioning or double-charging occurs
- Webhook endpoint returns 401 or 500 errors in Stripe dashboard
- Signature verification fails silently without logging

#### Prevention Strategy

1. **Always verify webhook signatures before processing** — Parse raw request body, not pre-parsed JSON
2. **Implement idempotency** — Track processed event IDs to prevent duplicate execution
3. **Add retry logic with exponential backoff** — Stripe retries webhooks on 500 errors; handle this gracefully
4. **Log all webhook events** — Both successful and failed attempts for debugging
5. **Return 200 quickly** — Acknowledge receipt within 30 seconds; process asynchronously

```typescript
// Recommended webhook handler pattern
export async function POST(request: Request) {
  const body = await request.text(); // Get raw body first
  const signature = request.headers.get('stripe-signature');
  
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  // Check for duplicate processing
  const processed = await checkEventProcessed(event.id);
  if (processed) {
    return Response.json({ received: true, duplicate: true });
  }
  
  // Process asynchronously
  await processEvent(event);
  await markEventProcessed(event.id);
  
  return Response.json({ received: true });
}
```

#### Which Phase to Address

**Phase 2: Payment System** — This is a revenue-critical component. Must be implemented correctly from the start; fixing webhook issues after launch means users have already been charged without receiving access.

---

### 2. Unauthenticated Upload Endpoints

**Severity:** CRITICAL

#### Warning Signs

- Any user can access `/api/upload-image` or `/api/upload-video` without login
- Storage costs spike unexpectedly from unauthorized uploads
- Malicious files appear in cloud storage
- Anonymous users can overwrite legitimate content

#### Prevention Strategy

1. **Add authentication middleware to all upload endpoints** — Use existing session validation
2. **Validate user role** — Only instructors should access video uploads
3. **Add file type validation** — Whitelist allowed MIME types (images: jpeg, png, webp; videos: mp4, webm)
4. **Implement file size limits** — 5MB for images, 500MB for videos
5. **Scan uploads for malware** — Use virus scanning service for user-generated content

```typescript
// Add to upload endpoints
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  if (session.user.role !== 'instructor' && session.user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Continue with upload logic...
}
```

#### Which Phase to Address

**Phase 1: Security Hardening** — This is already identified in CONCERNS.md as a critical gap. Must be fixed before any payment system goes live.

---

### 3. Video Playback Crashes on Empty Data

**Severity:** HIGH

#### Warning Signs

- Application crashes when accessing course with no lessons
- `lessons[0]` or similar array access throws TypeError
- No error boundary catches the crash
- User sees white screen or 500 error

#### Prevention Strategy

1. **Always check array length before accessing elements** — Use optional chaining and nullish coalescing
2. **Add defensive null checks** — Validate data at component boundaries
3. **Implement React error boundaries** — Catch render errors gracefully
4. **Add early return for empty states** — Show "No lessons available" message

```typescript
// Before (unsafe)
const firstLesson = lessons[0];
const videoUrl = firstLesson.videoUrl;

// After (safe)
if (!lessons || lessons.length === 0) {
  return <EmptyState message="No lessons available yet" />;
}

const firstLesson = lessons[0];
const videoUrl = firstLesson?.videoUrl;
```

#### Which Phase to Address

**Phase 1: UX Polish** — Already identified in CONCERNS.md as a known bug in `play-lesson.tsx`. Fix during initial cleanup.

---

### 4. Silent Error Swallowing in Data Fetching

**Severity:** HIGH

#### Warning Signs

- Users see empty course lists without explanation
- Network failures are invisible to users
- Support tickets increase for "courses not loading"
- Query hooks return empty arrays on any error

#### Prevention Strategy

1. **Return error state from hooks** — Do not silently catch and discard errors
2. **Display user-friendly error messages** — Not technical error codes
3. **Add retry functionality** — Allow users to retry failed requests
4. **Implement TanStack Query error boundaries** — Handle query errors gracefully

```typescript
// Before (bad)
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    // Error is caught internally, user sees empty array
  });
}

// After (good)
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    throwOnError: true, // Let component handle errors
  });
}

// In component
function CourseList() {
  const { data, isPending, isError, error, refetch } = useCourses();
  
  if (isPending) return <Skeleton />;
  
  if (isError) (
    <ErrorMessage 
      message="Failed to load courses"
      details={error.message}
      onRetry={() => refetch()}
    />
  );
  
  return <CourseGrid courses={data} />;
}
```

#### Which Phase to Address

**Phase 1: UX Polish** — Already documented in CONCERNS.md. Critical for user trust and support reduction.

---

### 5. IDOR Vulnerabilities in Course Access

**Severity:** CRITICAL

#### Warning Signs

- Users can access courses they did not purchase by manipulating IDs
- Student A can view Student B's enrolled courses
- Instructors can modify courses they do not own
- API returns different data based on ID enumeration

#### Prevention Strategy

1. **Validate ownership on every request** — Check user owns or has access to resource
2. **Use opaque IDs** — Do not expose sequential database IDs in URLs
3. **Add authorization checks at API layer** — Not just UI hiding
4. **Implement proper error messages** — "Not found" not "Access denied" to prevent enumeration

```typescript
// In course access API
export async function GET(request: Request, { params }: RouteParams) {
  const { courseId } = params;
  const session = await getSession();
  
  const course = await getCourse(courseId);
  
  // Check enrollment or ownership
  const hasAccess = await checkUserAccess(session.user.id, courseId);
  
  if (!hasAccess && course.instructorId !== session.user.id) {
    // Return "Not Found" not "Forbidden" to prevent enumeration
    return Response.json({ error: 'Course not found' }, { status: 404 });
  }
  
  return Response.json(course);
}
```

#### Which Phase to Address

**Phase 1: Security Hardening** — IDOR is the most common vulnerability in e-learning platforms according to recent security research.

---

### 6. Token Existence Check Only

**Severity:** HIGH

#### Warning Signs

- Expired tokens still grant access until cookie expires
- Stolen tokens work indefinitely
- No automatic token refresh
- Users see unexpected 401 errors after token expiry

#### Prevention Strategy

1. **Implement token validation** — Check token expiry, not just existence
2. **Add refresh token logic** — Automatically refresh before expiry
3. **Use short-lived access tokens** — 15-30 minutes, refresh with longer-lived refresh token
4. **Validate token integrity** — Check signature and claims

#### Which Phase to Address

**Phase 1: Security Hardening** — Already identified in CONCERNS.md. Critical for protecting paid content.

---

## Moderate Pitfalls

### 7. Video Buffering and Bandwidth Issues

**Severity:** MEDIUM

#### Warning Signs

- Videos buffer frequently, especially on slower connections
- No adaptive bitrate streaming implemented
- Students abandon lessons due to poor playback
- No quality selection options for users
- High latency for international users

#### Prevention Strategy

1. **Use adaptive bitrate streaming** — Implement HLS or DASH for automatic quality adjustment
2. **Add video preloading** — Preload next lesson while current plays
3. **Implement quality selector** — Allow users to choose lower quality
4. **Use CDN for global delivery** — Reduce latency for international users
5. **Add buffering indicator** — Show buffering state clearly

```typescript
// Video player with adaptive quality
<video
  ref={videoRef}
  onWaiting={() => setIsBuffering(true)}
  onPlaying={() => setIsBuffering(false)}
  src={videoUrl}
/>
```

#### Which Phase to Address

**Phase 3: Video Delivery Optimization** — Address after core functionality works. Cloudinary provides some optimization; deeper work deferred.

---

### 8. Missing Loading States

**Severity:** MEDIUM

#### Warning Signs

- Components appear broken during data fetching
- No skeleton screens or spinners
- Users click multiple times, causing duplicate requests
- Page jumps when content loads

#### Prevention Strategy

1. **Add loading skeletons** — Show wireframe while loading
2. **Use TanStack Query loading states** — isPending, isFetching
3. **Disable buttons during submission** — Prevent double-clicks
4. **Add transition animations** — Smooth content appearance

```typescript
// With proper loading states
const { data, isPending, isFetching } = useCourses();

if (isPending) return <CourseListSkeleton />;

return (
  <div>
    {isFetching && <LoadingIndicator />}
    <CourseList courses={data} />
  </div>
);
```

#### Which Phase to Address

**Phase 1: UX Polish** — Part of DX improvements mentioned in PROJECT.md.

---

### 9. Context API Performance Issues

**Severity:** MEDIUM

#### Warning Signs

- Slow renders when updating course context
- Every keystroke triggers unnecessary re-renders
- Components re-render even when unrelated data changes
- Performance degrades as app grows

#### Prevention Strategy

1. **Split contexts by update frequency** — Auth (rare) separate from CoursePlayer (frequent)
2. **Do not store high-frequency state in Context** — Form inputs, scroll position use local state
3. **Memoize context values** — Use useMemo to prevent unnecessary re-creation
4. **Use TanStack Query for server state** — Not Context for data fetching

```typescript
// Split contexts instead of God Context
const AuthContext = createContext<AuthState | null>(null);
const ThemeContext = createContext<ThemeState | null>(null);
const CourseContext = createContext<CourseState | null>(null);

// For frequently updating data, use TanStack Query
const { data: lessons } = useQuery({
  queryKey: ['lessons', courseId],
  queryFn: () => fetchLessons(courseId),
});
```

#### Which Phase to Address

**Phase 4: Performance Optimization** — Address when scaling; not critical for MVP.

---

### 10. Hardcoded Configuration in Production

**Severity:** MEDIUM

#### Warning Signs

- Hardcoded Stripe image URLs in checkout
- API keys in source code
- Environment-specific URLs not configurable
- No way to change production values without deploy

#### Prevention Strategy

1. **Use environment variables for all secrets** — Never hardcode
2. **Externalize URLs** — Use config files or env vars
3. **Add config validation at startup** — Fail fast on missing required config

#### Which Phase to Address

**Phase 1: Security Hardening** — Already identified hardcoded Stripe image in CONCERNS.md.

---

## Minor Pitfalls

### 11. Missing Input Validation

**Severity:** LOW

#### Warning Signs

- Server actions accept any input without validation
- Database receives unexpected data types
- SQL injection possible (though ORM helps)
- XSS vulnerabilities from unescaped output

#### Prevention Strategy

1. **Use Zod for validation** — Already in use for client-side
2. **Validate on server actions** — Do not trust client validation
3. **Add type guards** — Validate API responses

#### Which Phase to Address

**Phase 2: Payment System** — Add validation as features are built.

---

### 12. No Pagination

**Severity:** LOW

#### Warning Signs

- All courses/lessons fetched in single request
- Performance degrades with content growth
- UI overwhelms users with too many items
- Backend timeout on large datasets

#### Prevention Strategy

1. **Implement cursor-based pagination** — Better than offset for large datasets
2. **Add infinite scroll or numbered pages** — Based on use case
3. **Add query key filters** — For TanStack Query cache invalidation

#### Which Phase to Address

**Phase 4: Performance Optimization** — Documented in CONCERNS.md.

---

## Phase-Specific Warnings

| Phase | Primary Pitfalls | Mitigation |
|-------|------------------|------------|
| **Phase 1: Security Hardening** | Unauthenticated endpoints, token validation, hardcoded config, IDOR | Add auth middleware, validate ownership, use env vars |
| **Phase 2: Payment System** | Webhook failures, silent error swallowing | Proper signature verification, idempotency, error states |
| **Phase 3: Video Delivery** | Buffering, bandwidth, playback crashes | Adaptive streaming, error boundaries, empty state handling |
| **Phase 4: UX Polish** | Missing loading states, performance | Skeletons, memoization, context splitting |

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Payment Pitfalls | HIGH | Webhook issues well-documented in Stripe docs and multiple sources |
| Security Pitfalls | HIGH | IDOR and auth gaps are top e-learning vulnerabilities per recent CVEs |
| Video Delivery | MEDIUM | Best practices well-known, but Cloudinary handles much automatically |
| UX Antipatterns | HIGH | Industry-proven patterns, already present in codebase |
| State Management | HIGH | React Context pitfalls well-documented |

## Sources

- Stripe Webhook Documentation (2026)
- WebhookDebugger Common Errors Guide (2025)
- Akamai State of Apps and API Security Report (2025)
- CVE-2026-3110: IDOR in Educativa Campus (2026)
- Checkmarx Coursera BOLA Vulnerability Analysis (2026)
- React Context API Patterns and Pitfalls (2026)
- BlazingCDN E-Learning Video Delivery Best Practices (2026)
- UX Design Error Handling Patterns (2025)
