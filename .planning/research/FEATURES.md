# Feature Landscape

**Domain:** Paid Course Platform (E-Learning)
**Researched:** 2026-03-17

## Executive Summary

This document maps the feature landscape for a paid course platform serving technical education. Table stakes (non-negotiable features) and differentiators (competitive advantages) are identified to guide prioritization decisions. Research draws from analysis of leading platforms (Udemy, Teachable, LearnDash, LifterLMS) and current LMS industry standards.

## Table Stakes

Features users expect. Missing these = product feels incomplete or broken.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **User Authentication** | Core to any paid platform — login, registration, password reset | Low | Already implemented |
| **Role-Based Access** | Platform serves 3 distinct user types: student, instructor, admin | Low | Already implemented |
| **Course Browsing & Search** | Users must discover courses to make purchases | Medium | Need catalog, filtering, search |
| **Video Player** | Video is the primary content format | Medium | Cloudinary integration exists; need playback controls |
| **Lesson Playback with Progress** | Users expect to resume where they left off | Medium | Video progress tracking, auto-resume |
| **Purchase Flow (Subscription + One-Time)** | Core revenue model — flexible payment options | High | Stripe integration exists; need subscription + per-course checkout |
| **Free Preview** | Industry standard — 2 lessons free, instructors can mark 3 free | Low | Specified in requirements |
| **Student Dashboard** | Users need to see enrolled courses, continue learning | Medium | "My Learning" view |
| **Instructor Dashboard** | Instructors need to manage courses and see earnings | Medium | Course management, basic stats |
| **Admin Dashboard** | Platform management — users, courses, payouts | Medium | Platform oversight |

### Table Stakes Notes

- **Video progression** (must watch X% before completion) is standard in modern LMS platforms — consider implementing
- **Auto-resume** from last position is expected behavior
- **Mobile-responsive** video player is non-negotiable in 2026
- **Checkout flow** should handle both subscription and one-time without friction

## Differentiators

Features that set the product apart. Not expected by default, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Drag-Drop Lesson Ordering** | Instructor UX — reorder lessons without re-entering data | Low | High value for instructors managing large courses |
| **Course Analytics for Instructors** | Data-driven teaching — know where students drop off | Medium | Engagement metrics, completion rates, revenue per course |
| **Progress Tracking & Bookmarks** | Learner retention — resume easily, mark important moments | Low | Bookmark specific timestamps in videos |
| **Certificates** | Achievement recognition — motivates completion | Medium | Deferred to v2 per roadmap |
| **Interactive Video** | Engagement — quizzes, clickable hotspots within videos | High | Significant dev effort; differentiator |
| **Quizzes & Assessments** | Knowledge validation — test understanding | Medium | Also deferred to v2 |
| **Drip Content** | Paced learning — release lessons over time | Medium | Reduces binge-and-dropout pattern |
| **Gamification (Badges, Points)** | Motivation — rewards for engagement | Medium | Lower priority for technical education audience |
| **Course Reviews/Ratings** | Social proof — purchase decisions depend on reviews | Medium | Deferred to v2 |

### Differentiators Notes

- **Instructor analytics** is the highest-value differentiator for a platform targeting professional/technical education — instructors want to know what's working
- **Drag-drop ordering** is a quality-of-life feature that signals platform maturity
- **Bookmarks** are simple to implement but high perceived value for learners

## Anti-Features

Features to explicitly NOT build in v1.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|---------------------|
| **Live Classes** | Async video-only is scope — requires real-time infrastructure | Defer to v2 |
| **Certificates** | Nice-to-have but not core to MVP revenue flow | Defer to v2 |
| **Discussion Forums** | Requires moderation, community management | Defer to v2 |
| **Course Reviews/Ratings** | Requires critical mass of users/content first | Defer to v2 |
| **Mobile App** | Web-first is appropriate for MVP | Later phase |
| **AI-Powered Personalization** | Not required for basic course delivery | Future enhancement |

## Feature Dependencies

```
User Authentication
    ↓
Role Assignment → Instructor Dashboard
    ↓            → Student Dashboard
    ↓                ↓
Course CRUD ← Instructor creates courses
    ↓
Video Upload/Playback ← Student watches
    ↓
Enrollment System ← Student purchases
    ↓              ← Subscription OR one-time
    ↓
Progress Tracking ← Auto-track video position
    ↓
Instructor Analytics ← Aggregate progress data
```

## MVP Recommendation

Prioritize in this order:

### Phase 1: Revenue-Blocking (Must Ship First)

1. **Purchase Flow** — Subscription + per-course checkout via Stripe
2. **Free Preview** — First 2 lessons free by default, instructor can mark 3
3. **Enrollment** — Unlock content after purchase
4. **Student Dashboard** — View enrolled courses, resume watching

### Phase 2: Instructor Enablement

5. **Course Management** — CRUD for courses and lessons (partially exists)
6. **Instructor Dashboard** — Basic earnings view, course list
7. **Drag-Drop Lesson Ordering** — Reorder lessons easily
8. **Admin Dashboard** — Platform management

### Phase 3: Differentiation

9. **Course Analytics** — Engagement metrics for instructors
10. **Progress Tracking** — Detailed progress, bookmarks

### Defer to v2

- Certificates
- Quizzes/Assessments
- Discussion Forums
- Course Reviews/Ratings
- Drip Content
- Gamification

## Sources

- iSpring LMS Requirements Checklist (2026): https://www.ispring.com/knowledge-hub/lms-requirements
- eLeaP Must-Have LMS Features (2026): https://www.eleapsoftware.com/top-15-must-have-lms-features-for-2026/
- LearnDash Video Progression Documentation: https://www.learndash.com/support/docs/guides/video-progression/
- LifterLMS Features Overview: https://lifterlms.com/features
- Teachable vs Udemy Comparison (2026): https://www.coursebox.ai/blog/teachable-vs-udemy
- LearnWorlds Adaptive Learning Platform: https://www.learnworlds.com/features/
