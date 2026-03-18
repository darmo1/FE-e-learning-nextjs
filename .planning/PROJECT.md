# E-Learning Platform

## What This Is

A paid course platform for technical education where instructors can upload and sell video courses. Students can access content via subscription (monthly/yearly) or individual course purchases. First 2 lessons of each course are free for preview. Built on Next.js with Python/FastAPI backend.

## Core Value

Enable technical professionals to learn through high-quality video courses from expert instructors, with flexible payment options (subscription or one-time purchase) and free previews to validate course quality.

## Requirements

### Validated

- ✓ User authentication (login, register, password reset) — existing
- ✓ Role-based access (@instructor, @student, @admin) — existing
- ✓ Course CRUD (create, edit, list) — existing
- ✓ Lesson management with video playback — existing
- ✓ Cloudinary media storage — existing
- ✓ Stripe checkout integration (partial) — existing

### Active

- [ ] Subscription payment system (monthly/yearly plans)
- [ ] Per-course purchase option
- [ ] Free preview: first 2 lessons free by default
- [ ] Instructor can mark up to 3 lessons as free
- [ ] Student dashboard with enrolled courses
- [ ] Instructor dashboard with course analytics
- [ ] Admin dashboard for platform management
- [ ] DX improvements: error handling, loading states, polished UX

### Out of Scope

- [Live classes] — Async video-only for v1
- [Certificates] — Defer to v2
- [Discussion forums] — Defer to v2
- [Mobile app] — Web-first, mobile later
- [Course reviews/ratings] — Defer to v2

## Context

- **Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Python/FastAPI (separate project)
- **Storage**: Cloudinary (free tier for validation)
- **Payments**: Stripe (existing SDK integrated)
- **Roles**: Instructor (create/sell courses), Student (buy/learn), Admin (manage platform)
- **Focus**: DX improvements — error handling, loading states, polished UX, Vercel-quality patterns

## Constraints

- **Budget**: Low-cost MVP validation — use Cloudinary free tier, minimize paid services until traction
- **Timeline**: Ship in weeks — prioritize core revenue flow first
- **Backend**: Frontend-focused — FastAPI backend built separately

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cloudinary for video storage | Generous free tier, already integrated | — Pending |
| Stripe for payments | Existing SDK, supports both subscription and one-time | — Pending |
| First 2 lessons free by default | Industry standard preview model | — Pending |
| Subscription + per-course hybrid | Flexibility for different buyer types | — Pending |
| DX-first approach | Vercel-quality polish, error handling, loading states | — Pending |

---
*Last updated: 2026-03-17 after project initialization*
