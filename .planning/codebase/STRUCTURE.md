# Codebase Structure

**Analysis Date:** 2026-03-17

## Directory Layout

```
fe-next-e-learning/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (core)/             # Core authenticated routes
│   │   ├── (password)/         # Password-related routes
│   │   ├── api/                # API routes
│   │   ├── actions/            # Server actions
│   │   └── layout.tsx          # Root layout
│   ├── components/            # React components
│   │   ├── ui/                 # UI primitives (shadcn)
│   │   ├── common/             # Shared components
│   │   ├── dashboard/          # Dashboard-specific
│   │   └── video/              # Video-related
│   ├── services/              # Server actions & queries
│   ├── providers/             # React context providers
│   ├── constants/             # Configuration
│   └── lib/                   # Library utilities
├── utils/                     # Helper functions
├── .planning/                  # Planning documents
├── middleware.ts              # Route protection
├── next.config.ts             # Next.js config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and layouts
- Contains: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` files
- Key files: `layout.tsx`, `page.tsx`, `user-context.tsx`

**`src/app/(core)/`:**
- Purpose: Route group for authenticated/core pages
- Contains: Dashboard, course, checkout, auth pages
- Key files: `dashboard/layout.tsx`, `home/page.tsx`, `auth/page.tsx`

**`src/app/api/`:**
- Purpose: API route handlers
- Contains: `route.ts` files for `/cookie`, `/logout`, `/checkout`, `/upload-*`
- Key files: `cookie/route.ts`, `upload-image/route.ts`

**`src/components/`:**
- Purpose: Reusable React components
- Contains: UI primitives, common components, feature-specific
- Key files: `ui/button.tsx`, `ui/card.tsx`, `common/card-course.tsx`

**`src/services/`:**
- Purpose: Server Actions and React Query hooks
- Contains: Domain-specific services (users, courses, lessons, etc.)
- Key files: `users/actions.ts`, `courses/use-courses-query.ts`

**`src/providers/`:**
- Purpose: React context providers
- Contains: QueryProvider for React Query
- Key files: `query-provider.tsx`

**`src/constants/`:**
- Purpose: Configuration constants
- Contains: API endpoints, links
- Key files: `endpoints.ts`, `endpoints.api.ts`, `links.ts`

**`utils/`:**
- Purpose: Utility functions
- Contains: Request handler, cookies, headers, string helpers
- Key files: `request-handler.ts`, `cookies.ts`, `headers.ts`

**`src/lib/`:**
- Purpose: Library utilities
- Contains: `cn()` utility for Tailwind class merging
- Key files: `utils.ts`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout, providers, auth check
- `src/app/page.tsx`: Landing page (redirects if logged in)
- `middleware.ts`: Route protection

**Configuration:**
- `src/constants/endpoints.ts`: API endpoint URLs
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript paths (`@/*` alias)

**Core Logic:**
- `utils/request-handler.ts`: Centralized API calls with auth
- `src/services/users/actions.ts`: Auth actions (login, register, fetchUser)
- `src/services/courses/actions.ts`: Course CRUD operations

**Providers:**
- `src/providers/query-provider.tsx`: React Query setup
- `src/app/user-context.tsx`: Auth state context

## Naming Conventions

**Files:**
- Page components: `page.tsx`
- Layout components: `layout.tsx`
- Server Actions: `actions.ts` (in services) or `action.ts`
- Queries: `use-*-query.ts`
- Schemas: `schemas.ts`
- Types: `types.ts`
- Components: `kebab-case.tsx`
- Utils: `kebab-case.ts`

**Directories:**
- Route groups: `(kebab-case)/`
- Parallel routes: `@route-name/`
- Interceptors: `(.)route/ or (^)route/`

**Functions:**
- Server Actions: `userLogin`, `userRegisterAction`, `createCourseAction`
- Hooks: `useUser`, `useCourses`
- Utilities: `requestHandler`, `setCookies`, `cn`

## Where to Add New Code

**New Feature Page:**
- Primary code: `src/app/(core)/feature-name/page.tsx`
- Components: `src/app/(core)/feature-name/_components/`
- Layout: `src/app/(core)/feature-name/layout.tsx` (if needed)

**New Server Action:**
- Implementation: `src/services/domain/actions.ts`
- Types: `src/services/domain/types.ts`
- Schema: `src/services/domain/schemas.ts`

**New Component (UI Primitive):**
- Implementation: `src/components/ui/component-name.tsx`

**New Component (Feature):**
- Implementation: `src/components/common/component-name.tsx` or feature folder

**New Utility:**
- Shared helpers: `utils/` or `src/lib/`

## Special Directories

**Route Groups `(core)`, `(password)`:**
- Purpose: Organize routes without affecting URL
- Generated: No
- Committed: Yes

**Parallel Routes `@instructor`, `@student`, `@admin`:**
- Purpose: Role-based page rendering in dashboard
- Generated: No
- Committed: Yes

**API Routes `/api/*`:**
- Purpose: Server-side endpoints
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-17*
