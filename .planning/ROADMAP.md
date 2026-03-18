# Roadmap: E-Learning Platform

**Project:** fe-next-e-learning  
**Granularity:** Coarse (3-5 phases)  
**Last Updated:** 2026-03-17

---

## Overview

This roadmap delivers a paid course platform with subscription and one-time purchase options, featuring free previews and role-based access control.

---

## Phases

- [ ] **Phase 1: Foundation** - Security hardening, free previews, video progress, UX skeleton
- [ ] **Phase 2: Payments & Access** - Subscription system, per-course purchases, access control
- [ ] **Phase 3: Dashboards** - Student, instructor, and admin dashboards

---

## Phase Details

### Phase 1: Foundation

**Goal:** Secure the platform and establish core UX patterns

**Depends on:** Nothing (first phase)

**Requirements:** ROLE-03, COURSE-06, COURSE-07, COURSE-08, LESSON-04, SEC-01, SEC-02, SEC-03, SEC-04, UX-01, UX-02, UX-03, UX-04, UX-05

**Success Criteria** (what must be TRUE):

1. Admin can assign instructor role to users from admin panel
2. Student can view first 2 lessons of any course for free without payment
3. Instructor can mark up to 3 lessons as free preview from lesson editor
4. First 2 lessons of new courses are automatically marked as free preview
5. Video player shows playback progress indicator and resumes from last position
6. All data-fetching pages display loading skeletons while loading
7. All routes show friendly error messages with retry option when errors occur
8. Form submissions display success toast notifications on completion
9. Video playback errors show fallback UI instead of crashing
10. Empty states show helpful messages with actionable buttons
11. Upload endpoints reject requests from unauthenticated users
12. Checkout endpoints reject requests from unauthenticated users
13. Course access is validated server-side on every request
14. Users cannot access courses they haven't purchased (no IDOR vulnerabilities)

**Plans:** TBD

---

### Phase 2: Payments & Access

**Goal:** Enable revenue flow with subscription and per-course purchases

**Depends on:** Phase 1

**Requirements:** SUB-01, SUB-02, SUB-03, SUB-04, SUB-05, SUB-06, PUR-01, PUR-02, PUR-03, ACCESS-01, ACCESS-02, ACCESS-03, ACCESS-04

**Success Criteria** (what must be TRUE):

1. Student can purchase monthly subscription plan via Stripe checkout
2. Student can purchase yearly subscription plan via Stripe checkout
3. Student with active subscription can access all platform courses immediately
4. Subscription auto-renews each billing cycle until cancelled
5. Student can cancel subscription from account settings
6. Student can access Stripe customer portal to manage billing
7. Student can purchase individual course via one-time payment
8. Student who purchased a course has lifetime access to that course
9. Student can view list of all purchased courses in their account
10. Non-paying student sees purchase prompt when accessing paid content
11. Subscription status accurately reflects in student dashboard

**Plans:** TBD

---

### Phase 3: Dashboards

**Goal:** Enable students, instructors, and admins to manage their respective domains

**Depends on:** Phase 2

**Requirements:** DASH-STU-01, DASH-STU-02, DASH-STU-03, DASH-INST-02, DASH-INST-03, DASH-ADMIN-02, DASH-ADMIN-03

**Success Criteria** (what must be TRUE):

1. Student dashboard displays all enrolled courses with thumbnails
2. Student dashboard shows subscription status (active/expired) with renewal option
3. Student can click to continue watching from last watched position
4. Instructor dashboard displays all created courses with enrollment counts
5. Instructor dashboard shows total revenue summary from course sales
6. Admin dashboard displays platform-wide statistics (total users, courses, revenue)
7. Admin can view and disable user accounts
8. Admin can view and hide courses from platform

**Plans:** TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. Payments & Access | 0/1 | Not started | - |
| 3. Dashboards | 0/1 | Not started | - |

---

## Dependencies

```
Phase 1 ─────┬──────> Phase 2 ────────> Phase 3
             │
             └──────> (UX cross-cutting)
```

---

*Roadmap created: 2026-03-17*
