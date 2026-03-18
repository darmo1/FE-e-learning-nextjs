# E-Learning Platform Research Summary

**Project:** fe-next-e-learning  
**Generated:** 2026-03-17  
**Confidence:** HIGH

---

## Executive Summary

This e-learning platform is a paid course marketplace supporting both subscription and one-time purchase models. The technology stack (Next.js 15, React 19, TypeScript, TanStack Query, Stripe, Cloudinary) is well-aligned with industry best practices. The critical success factors are:

1. **Payment webhook reliability** — Users must receive access after payment; webhook failures cause revenue loss and support burden
2. **Access control security** — IDOR vulnerabilities and unauthenticated endpoints are the top e-learning attack vectors
3. **Video delivery quality** — Buffering impacts learning retention; Cloudinary + HLS streaming is sufficient for MVP

The recommended approach is to prioritize revenue-blocking features first (purchase flow, enrollment, access control), then instructor enablement, then differentiation features. Many pitfalls identified in research are already documented in CONCERNS.md and should be addressed in Phase 1.

---

## Key Findings

### Stack Recommendations (from STACK.md)

| Technology | Usage | Rationale |
|------------|-------|-----------|
| **Next.js 15** | App Router | Server Components, streaming, Suspense boundaries |
| **React 19** | Framework | Current stable; use Server Components by default |
| **TanStack Query** | Server state | Already integrated; correct pattern for data fetching |
| **Stripe Checkout** | Payments | Hosted page handles PCI, 3D Secure, tax; use webhooks as source of truth |
| **Cloudinary** | Video | Already integrated; generous free tier; sufficient for MVP |
| **Plyr** | Video player | Accessible, lightweight, HLS support |

**Critical Implementation Notes:**
- Store only Stripe IDs in database (customerId, subscriptionId, priceId) — never card data
- Webhook handler must verify signature and implement idempotency
- Use Server Components for data fetching; add `'use client'` only for interactivity
- Implement `generateStaticParams` for course pages with ISR for performance

### Feature Priorities (from FEATURES.md)

**Table Stakes (Must Have):**
- User authentication and role-based access (already implemented)
- Course browsing, search, and filtering
- Video player with progress tracking (auto-resume)
- Purchase flow: subscription + one-time via Stripe
- Free preview: first 2 lessons free, instructors can mark 3 free
- Student, Instructor, and Admin dashboards

**Differentiators (v1 if possible, v2 if not):**
- Drag-drop lesson ordering (high instructor value)
- Course analytics for instructors (engagement metrics)
- Progress tracking with bookmarks

**Anti-Features (Defer to v2+):**
- Certificates, quizzes, discussion forums
- Course reviews/ratings (requires content critical mass)
- Live classes, gamification, mobile app

### Architecture Patterns (from ARCHITECTURE.md)

**Component Boundaries:**
- Auth, Course, Enrollment, Payment, Dashboard, Video domains
- Route groups: `(marketing)`, `(auth)`, `(dashboard)`, `courses/`, `api/`
- Services organized by domain, not by type

**Data Flow:**
```
User → Auth/Role → Course Discovery → Payment Gate → Access Grant
Middleware → Course API → Stripe Checkout → Webhook → Enrollment Record
```

**State Management:**
- Server state: TanStack Query (courses, user data, progress)
- Client state: useState/useReducer (playback position, form inputs)
- Global client: React Context (theme, auth user)

**Error Boundary Strategy:**
- Global `error.tsx` for app-wide crashes
- Route-specific error boundaries per section
- Component-level boundaries for video player and checkout

### Pitfalls to Avoid (from PITFALLS.md)

**Critical (Revenue/Security):**
1. **Payment webhook failures** — No access granted after payment; must verify signatures and implement idempotency
2. **Unauthenticated upload endpoints** — Any user can upload; add role validation
3. **IDOR vulnerabilities** — Users access courses they didn't purchase; validate ownership on every request
4. **Token existence check only** — Expired tokens still grant access; validate expiry

**High (UX/Functionality):**
5. **Video playback crashes** — Empty lessons array access; add defensive null checks
6. **Silent error swallowing** — Users see empty states without explanation; return error states

**Medium (Polish):**
7. Video buffering (use HLS adaptive streaming)
8. Missing loading states (add skeletons)
9. Context API performance issues (split contexts)
10. Hardcoded configuration (use env vars)

---

## Implications for Roadmap

### Phase 1: Foundation & Security Hardening (Week 1-2)

**Rationale:** Critical security gaps and UX bugs block all subsequent work. Addresses pitfalls already identified in CONCERNS.md.

**Must Deliver:**
- Fix unauthenticated upload endpoints (CRITICAL pitfall #2)
- Fix token validation to check expiry, not just existence (pitfall #6)
- Add IDOR protection to all course access endpoints (pitfall #5)
- Fix hardcoded Stripe image in checkout (from CONCERNS.md)
- Add defensive null checks to video player (pitfall #3)

**Features from FEATURES.md:**
- User authentication (verify working)
- Role-based access control

**Pitfalls Avoided:** #2, #5, #6, #10

---

### Phase 2: Payment System & Revenue Flow (Week 3-5)

**Rationale:** Revenue-blocking. Users must be able to pay and receive access immediately.

**Must Deliver:**
- Stripe Products: subscription plan + individual courses
- Checkout session creation (subscription + one-time modes)
- Webhook handler with signature verification and idempotency (CRITICAL pitfall #1)
- Access check logic: `hasActiveSubscription || hasPurchasedCourse(courseId)`
- Customer Portal integration
- Free preview logic: first 2 lessons, instructor can mark 3

**Features from FEATURES.md:**
- Purchase flow (subscription + one-time)
- Free preview
- Enrollment system

**Pitfalls Avoided:** #1, #11

---

### Phase 3: Course Delivery & Video (Week 6-8)

**Rationale:** Core content experience. Video quality directly impacts learning retention.

**Must Deliver:**
- Course listing and detail pages
- Video player with Cloudinary integration
- HLS streaming via Plyr
- Progress tracking: auto-resume, completion percentage
- Lesson navigation (chapters, next/previous)
- Signed URLs for premium content

**Features from FEATURES.md:**
- Course browsing & search
- Video player
- Lesson playback with progress

**Pitfalls Avoided:** #3, #7

---

### Phase 4: Dashboards & Polish (Week 9-11)

**Rationale:** Instructor and student enablement. Differentiates from basic course players.

**Must Deliver:**
- Student dashboard: enrolled courses, continue watching
- Instructor dashboard: earnings, course list, basic analytics
- Admin dashboard: platform management
- Drag-drop lesson ordering
- Loading skeletons (pitfall #8)
- Error boundaries expansion

**Features from FEATURES.md:**
- Student dashboard
- Instructor dashboard
- Admin dashboard
- Drag-drop ordering (differentiator)
- Course analytics (differentiator)

**Pitfalls Avoided:** #4, #8

---

### Phase 5: v1 Polish & Launch Prep (Week 12+)

**Rationale:** Stability before launch. Address performance and edge cases.

**Must Deliver:**
- Error boundary refinement
- Performance optimization (pagination, memoization)
- Input validation with Zod on server actions
- TanStack Query optimization (stale times, refetch intervals)
- Final security audit

**Pitfalls Avoided:** #9, #11, #12

---

### Phase 2+ (Deferred to v2)

- Certificates
- Quizzes & assessments
- Discussion forums
- Course reviews/ratings
- Drip content scheduling
- Gamification
- Mobile app
- AI-powered personalization

---

## Research Flags

**Needs Deeper Research During Planning:**
- Phase 2: Stripe webhook retry logic and dunning configuration
- Phase 3: Cloudinary signed URL expiration policies
- Phase 4: Instructor analytics metrics definition

**Standard Patterns (Skip Research):**
- Phase 1: Next.js error.tsx/loading.tsx patterns (well-documented)
- Phase 2: Stripe Checkout integration (standard patterns)
- Phase 3: Video player with HLS (Plyr handles)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | Current stack aligns with 2026 best practices; sources include official docs |
| **Features** | HIGH | Table stakes from LMS industry standards; differentiation based on competitor analysis |
| **Architecture** | HIGH | Established three-tier patterns; current architecture confirmed well-aligned |
| **Pitfalls** | HIGH | Based on industry CVE analysis, Stripe documentation, and existing codebase issues |

**Overall Confidence:** HIGH

**Gaps to Address:**
- Need to validate webhook idempotency implementation with actual Stripe test events
- Instructor analytics metrics need specification during Phase 4 planning
- Pagination strategy should be validated against expected content volume

---

## Sources

- STACK.md: Stripe Billing/Checkout Documentation, Next.js 15 App Router Docs, Cloudinary Video Guides
- FEATURES.md: iSpring LMS Requirements, LearnDash/LifterLMS/Teachable feature comparisons
- ARCHITECTURE.md: LMSPedia best practices, TanStack Query documentation, Next.js error handling
- PITFALLS.md: Stripe webhook documentation, Akamai Security Report, CVE-2026-3110 analysis, React Context patterns

---

*Research synthesized from 4 parallel agents. Ready for requirements definition and roadmap creation.*
