# Architecture

**Analysis Date:** 2026-03-17

## Pattern Overview

**Overall:** Next.js 15 App Router with Server Components and Client Islands

**Key Characteristics:**
- Server-first architecture with selective client-side interactivity using `"use client"` directive
- Route groups using Next.js conventions `(core)`, `(password)`, `@instructor`, `@student`, `@admin` for layout partitioning
- Server Actions for form submissions and data mutations
- React Query (TanStack Query) for client-side data fetching and caching
- Token-based authentication with HTTP-only cookies

## Layers

**Pages/Routes Layer:**
- Purpose: Route handlers and page components
- Location: `src/app/`
- Contains: Next.js pages, layouts, API routes
- Depends on: Services layer, Components layer
- Used by: Next.js router

**Services Layer:**
- Purpose: Server Actions and API communication
- Location: `src/services/`
- Contains: `actions.ts` files with `"use server"`, queries, mutations
- Depends on: Utils, constants/endpoints
- Used by: Page components, client components

**Components Layer:**
- Purpose: Reusable UI components
- Location: `src/components/`
- Contains: UI primitives (`ui/`), feature components (`common/`, `dashboard/`, `video/`)
- Depends on: Lib utils
- Used by: Pages, other components

**Providers Layer:**
- Purpose: React context providers for state management
- Location: `src/providers/`
- Contains: `query-provider.tsx` (React Query), context providers
- Used by: Root layout

**Utils Layer:**
- Purpose: Helper functions and utilities
- Location: `utils/`, `src/lib/`
- Contains: Request handlers, cookie management, string helpers
- Used by: Services, components

**Constants Layer:**
- Purpose: Configuration and endpoint definitions
- Location: `src/constants/`
- Contains: API endpoints, links

## Data Flow

**Initial Page Load (Server-Side):**
1. User requests a page
2. `middleware.ts` checks for authentication token in cookies
3. Protected routes redirect to `/login` if no token
4. Server component in layout fetches user data via service actions
5. UserProvider wraps children with auth state
6. Page renders with data

**Form Submission (Server Actions):**
1. User submits form (client component)
2. Server Action called from `src/services/*/actions.ts`
3. Action validates data using Zod schemas
4. Action makes API call via `requestHandler` utility
5. Service returns success/error response
6. Client component shows toast notification via `sonner`

**Client-Side Data Fetching:**
1. Component uses React Query hooks from `src/services/*/use-*-query.ts`
2. Query caches data with configured stale time
3. Mutations invalidate related queries on success

## Key Abstractions

**Server Actions:**
- Purpose: Handle form submissions and server-side operations
- Examples: `src/services/users/actions.ts`, `src/services/courses/actions.ts`
- Pattern: `"use server"` directive, return typed response objects with success/message/data fields

**React Query Hooks:**
- Purpose: Client-side data fetching with caching
- Examples: `src/services/courses/use-courses-query.ts`
- Pattern: Custom hooks wrapping TanStack Query

**User Context:**
- Purpose: Global auth state management
- Implementation: React Context in `src/app/user-context.tsx`
- Pattern: Provider wraps app, `useUser()` hook for consumption

**Request Handler:**
- Purpose: Centralized API communication
- Location: `utils/request-handler.ts`
- Pattern: Auto-attaches auth headers, handles 401 redirects, parses JSON responses

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page request
- Responsibilities: HTML structure, providers setup, font loading, global auth check, Header/Footer rendering

**Middleware:**
- Location: `middleware.ts`
- Triggers: Every request
- Responsibilities: Route protection, auth token validation

**API Routes:**
- Location: `src/app/api/*/route.ts`
- Triggers: Client-side fetch calls
- Responsibilities: Cookie refresh, logout, checkout, file uploads

**Dashboard Layout:**
- Location: `src/app/(core)/dashboard/layout.tsx`
- Triggers: Any `/dashboard/*` route
- Responsibilities: Role-based rendering, DashboardNav, user data fetching

## Error Handling

**Strategy:** Centralized error boundaries with fallback UI

**Patterns:**
- API errors: Caught in Server Actions, returned as `{ success: false, message: string, data: null }`
- Network errors: `requestHandler` catches and redirects on 401
- Form validation: Zod schemas with `safeParse()` in actions
- UI errors: Global `_error.tsx` and route-specific `error.tsx`

## Cross-Cutting Concerns

**Authentication:** HTTP-only cookies (`access_token`, `refresh_token`), middleware protection, `AuthorizationHeaders` utility

**Validation:** Zod schemas in `src/services/*/schemas.ts`

**Logging:** Console logs in development, toast notifications via `sonner` for user feedback

**Styling:** Tailwind CSS with `cn()` utility from `src/lib/utils.ts`

---

*Architecture analysis: 2026-03-17*
