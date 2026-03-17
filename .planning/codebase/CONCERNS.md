# Codebase Concerns

**Analysis Date:** 2026-03-17

## Tech Debt

**API Route Security:**
- Issue: Upload endpoints (`/api/upload-image`, `/api/upload-video`) have no authentication validation. Any user can upload files without being authenticated.
- Files: `src/app/api/upload-image/route.ts`, `src/app/api/upload-video/route.ts`
- Impact: Uncontrolled file uploads, potential storage costs, security vulnerability
- Fix approach: Add authentication check using `headerAccessTokenCookie()` or verify session before processing uploads

**Checkout Endpoint Authorization:**
- Issue: The checkout API route does not validate user authentication or authorization. Any caller can create checkout sessions.
- Files: `src/app/api/checkout/route.ts`
- Impact: Unauthorized payment processing, potential revenue loss
- Fix approach: Add authentication middleware to verify user session before creating Stripe sessions

**Silent Error Swallowing:**
- Issue: Query hooks catch errors and return empty arrays/objects, hiding failures from users
- Files: `src/services/courses/use-courses-query.ts`
- Impact: Users see no courses without understanding why - could be network error, auth issue, or server down
- Fix approach: Return error state from hooks, display user-friendly error messages in UI

**Token Existence Check Only:**
- Issue: Middleware only checks if `access_token` cookie exists, does not validate token integrity or expiry
- Files: `middleware.ts`
- Impact: Stolen or expired tokens grant access until cookie expires
- Fix approach: Implement token validation or refresh token check in middleware

## Known Bugs

**Lesson Playback Crash:**
- Issue: `play-lesson.tsx` accesses `lessons[0]` without checking if array is empty
- Files: `src/app/(core)/dashboard/_components/courses/play-lesson.tsx`
- Trigger: Opening lesson player when course has no lessons
- Workaround: Ensure all courses have at least one lesson before allowing access

**Cookie Parsing Edge Case:**
- Issue: Cookie parsing in `userLogin` could fail with malformed cookies but error is caught and ignored
- Files: `src/services/users/actions.ts` (lines 32-46)
- Trigger: Backend returns cookies in unexpected format
- Workaround: None - login silently fails

## Security Considerations

**No File Type Validation:**
- Risk: Upload endpoints accept any file type without validation
- Files: `src/app/api/upload-image/route.ts`, `src/app/api/upload-video/route.ts`
- Current mitigation: None
- Recommendations: Add MIME type validation, restrict to allowed types (images: jpeg, png, webp; videos: mp4, webm)

**No File Size Limits:**
- Risk: Users can upload arbitrarily large files, causing DoS or storage costs
- Files: `src/app/api/upload-image/route.ts`, `src/app/api/upload-video/route.ts`
- Current mitigation: None
- Recommendations: Add file size validation (e.g., 5MB for images, 500MB for videos)

**Hardcoded Stripe Image:**
- Risk: Checkout uses hardcoded image URL from imgur, potential availability issue
- Files: `src/app/api/checkout/route.ts`
- Current mitigation: None
- Recommendations: Use env-configured URL or remove image entirely

**Environment Variables:**
- Risk: `.env` and `.env.development` files present - verify these are in `.gitignore`
- Files: `.env`, `.env.development`
- Current mitigation: `.gitignore` should exclude these
- Recommendations: Verify `.gitignore` contains `.env*` patterns

## Performance Bottlenecks

**No Pagination:**
- Problem: All courses and lessons are fetched in single requests without pagination
- Files: `src/services/courses/actions.ts`, `src/services/courses/use-courses-query.ts`
- Cause: Backend may not support pagination, frontend not implemented
- Improvement path: Implement pagination UI and API integration for course/lesson lists

**No Image Optimization:**
- Problem: Uploaded images served directly from Cloudinary without transformation
- Files: `src/app/api/upload-image/route.ts`
- Cause: Not using Next.js Image component with Cloudinary loader
- Improvement path: Configure next-cloudinary for automatic optimization

**React Query Caching:**
- Problem: Query keys are minimal (e.g., `["courses"]`), causing over-fetching
- Files: `src/services/courses/use-courses-query.ts`
- Cause: Missing filter params in query key
- Improvement path: Include filter/sort params in query key

## Fragile Areas

**Course Context:**
- Files: `src/app/(core)/dashboard/course/course-context.tsx`
- Why fragile: Multiple components depend on context without error boundaries
- Safe modification: Add null checks before using context values
- Test coverage: No tests

**Request Handler Utility:**
- Files: `utils/request-handler.ts`
- Why fragile: Central error handling - any failure propagates broadly
- Safe modification: Add proper error typing and recovery options
- Test coverage: No tests

**Video Player:**
- Files: `src/app/(core)/dashboard/_components/courses/play-lesson.tsx`
- Why fragile: No loading states, no error boundaries, assumes video URL is valid
- Safe modification: Add loading spinner, error handling for failed video loads
- Test coverage: No tests

## Scaling Limits

**User Base:**
- Current capacity: Unknown - no user count visible
- Limit: Single frontend instance may struggle with many concurrent users
- Scaling path: Implement SSR with proper caching headers, consider CDN

**Video Storage:**
- Current capacity: Cloudinary limits based on plan
- Limit: Upload bandwidth and storage caps
- Scaling path: Implement video transcoding, use HLS streaming

## Dependencies at Risk

**TanStack Query v5:**
- Risk: Using early version (5.74.4), may have breaking changes in future updates
- Impact: Migration effort when upgrading
- Migration plan: Pin to specific version, review changelog before upgrades

**Next.js 15:**
- Risk: Using very new version (15.2.1) with Turbopack - potential instability
- Impact: Bugs in production due to early adoption
- Migration plan: Monitor Next.js release notes, test thoroughly before updates

**Stripe SDK v18:**
- Risk: Major version could have breaking API changes
- Impact: Checkout failures if not tested
- Migration plan: Pin version, test checkout thoroughly after updates

## Missing Critical Features

**Test Suite:**
- Problem: No tests exist in the codebase (no `.test.ts`, `.spec.ts`, or `.test.tsx` files)
- Blocks: Safe refactoring, regression detection, confidence in changes

**Input Validation:**
- Problem: Client-side validation exists (Zod schemas) but server actions lack robust validation
- Blocks: Security, data integrity

**Error Boundaries:**
- Problem: No React error boundaries implemented
- Blocks: Graceful error recovery, user experience during failures

**Loading States:**
- Problem: Limited loading states in components
- Blocks: Perceived performance, user feedback during async operations

## Test Coverage Gaps

**All Components:**
- What's not tested: All React components, all server actions, all utilities
- Files: Entire codebase
- Risk: Bugs can be introduced unnoticed, refactoring is risky
- Priority: High

**API Routes:**
- What's not tested: All route handlers (`/api/*`)
- Files: `src/app/api/*`
- Risk: API failures in production not caught
- Priority: High

**Services:**
- What's not tested: All service functions
- Files: `src/services/**`
- Risk: Data layer failures, incorrect data transformation
- Priority: High

---

*Concerns audit: 2026-03-17*
