# Frontend Architecture Framework

This document defines the architecture and coding practices for new frontend projects in this organization. It is written with **Next.js App Router**, **TypeScript**, **React 19**, **React Query**, **Tailwind**, and **server actions** in mind, and is intended to be followed by all teams as if it were a Vercel-quality reference.

---

## 1. High-Level Principles

- **Server-first mindset**
  - Prefer **server components** by default for pages and layouts.
  - Only opt into **client components** where interactivity or browser APIs are strictly required.
- **Clear separation of concerns**
  - UI components render data and handle user interaction.
  - Domain services and actions are responsible for data fetching, mutations, and side effects.
- **Predictable data flow**
  - Server components and server actions are the primary boundary to the backend.
  - Client components use **React Query** or action responses to render and mutate data.
- **Strict TypeScript**
  - Type all public interfaces and avoid `any`.
  - Keep runtime behavior aligned with static types through shared schemas (e.g. Zod).

---

## 2. Project Structure

Use a **feature- and domain-oriented** structure built on the App Router:

- `app/`
  - `layout.tsx` – root server layout, global providers.
  - `(core)/` – core authenticated experience:
    - `(core)/dashboard/`
    - `(core)/course/`
    - `(core)/auth/`
  - `(public)/` – marketing/landing routes if needed.
  - `(password)/` – password reset flows.
  - `api/` – Next.js route handlers for edge-specific or infra concerns (uploads, webhooks).
- `src/services/`
  - Domain-oriented modules: `courses`, `lessons`, `auth`, `analytics`, etc.
  - Each module exposes **server actions** and **typed helpers** for its domain.
- `src/components/`
  - `ui/` – design system primitives (buttons, inputs, etc.).
  - `common/` – cross-feature presentational components.
- `src/app/(core)/…/_components/`
  - Feature-specific components for a given route tree.
- `src/providers/` – app-wide providers (React Query, theming, etc.).
- `src/constants/` – configuration, endpoints.
- `src/utils/` – reusable utilities (HTTP, cookies, paths, formatting).

This structure scales with features and keeps responsibilities discoverable.

---

## 3. Server vs Client Components

### 3.1 Default rule

> **Default to server components. Opt into client components only when necessary.**

Ask yourself:

- Does this component need **browser-only APIs** (`window`, `document`, `localStorage`, `IntersectionObserver`, media playback, drag-and-drop, etc.)?
- Does it need **interactive state** that must respond immediately to user input (clicks, hover, local form state, drag/drop, modals, toasts)?
- Does it need **React hooks** that only work on the client (`useState`, `useEffect`, `useReducer`, `useRef` for DOM nodes, `useQuery` from React Query)?

If **yes** to any, it should be a **client component** (`"use client"`). Otherwise, keep it as a **server component**.

### 3.2 What should be server components

Use **server components** for:

- **Pages and layouts** that:
  - Fetch data from backend or database.
  - Enforce access control and redirect logic.
  - Compose mostly static/serialized props into the UI.
- **Data-heavy lists and detail views**:
  - Course catalogs, dashboards, and analytics views that are primarily read-only.
  - Components that can receive data as props and do not need client-only APIs.
- **Wrappers for providers that don’t require browser APIs**:
  - E.g. server-side wrappers that pass initial data to a client provider via props.

Benefits:

- Smaller client-side bundles.
- Faster Time-to-First-Byte (TTFB) and better SEO.
- Built-in data-fetching capabilities without extra client roundtrips.

### 3.3 What should be client components

Use **client components** for:

- **Interactive controls and UI state**:
  - Buttons, dropdowns, dialogs, carousels, accordions, tabs.
  - Components that need animation or fine-grained user interaction.
- **Forms with rich interactions**:
  - Multi-step forms, real-time validation, conditional fields.
  - Drag-and-drop, file upload previews, text editors.
- **Context providers that rely on client-only features**:
  - Toast providers, theme toggles, on-scroll effects, analytics events in the browser.
- **React Query hooks**:
  - Hooks like `useQuery`, `useMutation` are client-only and must run in client components.

Implementation rule:

- Mark the top-most component that needs these features with `"use client"`.
- Keep client components **as small and leaf-like as possible**, and render server components above them.

---

## 4. Server Actions & Forms

### 4.1 Philosophy

Server actions are the **primary way to mutate backend state** from the UI. They should:

- Encapsulate authorization, validation, and domain logic.
- Be reusable across forms and components.
- Return predictable, typed results (success or error).

### 4.2 When to use server actions

Use **server actions** when:

- You are handling **form submissions** (create/update/delete).
- You need to **touch secure resources** (databases, private APIs) and enforce auth.
- The operation can be naturally expressed as a request/response with UI feedback:
  - Creating a course, lesson, enrollment.
  - Updating profile or settings.
  - Performing a subscription checkout.

Prefer server actions instead of:

- Exposing ad-hoc REST calls directly from client components.
- Duplicating validation on client and server without a shared contract.

### 4.3 Shape of a server action

- **Location**: `src/services/<domain>/actions.ts`.
- **Signature**:
  - Typed input: usually a DTO validated by Zod.
  - Typed output: success payload or structured error object.
- **Responsibilities**:
  - Verify auth and permissions.
  - Call backend APIs or database.
  - Translate backend errors into a normalized error shape the UI can understand.

Example shape (pseudocode):

```ts
"use server";

export async function createCourseAction(input: CreateCourseInput): Promise<CreateCourseResult> {
  const parsed = createCourseSchema.parse(input);

  // Auth, domain logic, and backend call here…

  if (!ok) {
    return { ok: false, error: { code, message } };
  }

  return { ok: true, data: createdCourse };
}
```

### 4.4 Using actions from client forms

In **client components**:

- Use `react-hook-form` or a similar library for local form state and validation.
- On `handleSubmit`, call the server action and:
  - Show loading state.
  - Show success toast or redirect.
  - Map returned errors to field or global errors.
- When using React Query:
  - Wrap the action call in a `useMutation` hook to benefit from caching and automatic invalidation.

Pattern:

```ts
const { handleSubmit, setError } = useForm<FormValues>();

const onSubmit = handleSubmit(async (values) => {
  const result = await createCourseAction(values);

  if (!result.ok) {
    // Map domain errors to form errors
    setError("title", { message: result.error.message });
    return;
  }

  // Success: show toast, navigate, or invalidate queries
});
```

### 4.5 Using actions directly from server components

In **server components** (e.g. pages):

- You can pass server actions into form `action` attributes for progressive enhancement.
- You can call server actions in response to user navigation patterns (e.g. `redirect` on success) where appropriate.

Guideline:

- For simple, non-interactive forms, use **server actions bound to `<form action={myAction}>`**.
- For complex, highly interactive forms, use **client form logic** with actions or React Query for mutations.

---

## 5. Data Fetching Strategy

### 5.1 Server data fetching

Use **server components** and server actions for primary data loading:

- Fetch necessary data in **page and layout server components**.
- Pass data down as serializable props to client leaves.
- Use caching options (`fetch` caching, revalidation) thoughtfully.

Benefits:

- Reduces waterfalls (no extra roundtrip from client to server for initial data).
- Simplifies SEO and sharing.

### 5.2 Client data fetching with React Query

Use **React Query** for:

- Subsequent client-side data updates after initial load.
- Auto-refetching stale data and background refresh.
- Handling online/offline, error states, and retries.

Guidelines:

- Create domain-specific hooks:

  - `useCoursesQuery`, `useCourseDetailQuery(id)`, `useLessonsQuery(courseId)`, etc.

- Each hook should:

  - Define a stable `queryKey`.
  - Strongly type `data` and `error`.
  - Avoid swallowing errors with naive fallbacks.

---

## 6. State Management & Context

### 6.1 Global state

Use **React Context** for:

- Authenticated user state:
  - `{ role, isLogged, fullName, avatarUrl, ... }`.
- Long-lived domain selections:
  - Current course, organization, or workspace.
- Global UI concerns:
  - Theme, layout compactness, language.

Guidelines:

- Provide the context in server or client layouts as appropriate.
- Use a dedicated hook for consumption:
  - `useUser()`, `useCourse()`, etc.
- Keep context values **strongly typed** and avoid `any`.

### 6.2 Local state

Use local component state (`useState`, `useReducer`) for:

- Ephemeral UI-only state:
  - Modal open/closed, hovered, expanded items.
  - Current step of a wizard.

---

## 7. UI Design System

### 7.1 Design system primitives

Maintain a `components/ui` library of primitives:

- `Button`, `Input`, `Textarea`, `Select`, `Badge`, `Breadcrumb`, etc.
- Implement variants and sizes via `class-variance-authority`.
- Use `asChild` and Radix `Slot` for composition.

Guidelines:

- Always use DS components instead of raw HTML elements for interactive UI.
- Document available variants and sizes.
- Keep styling consistent with Tailwind and shared tokens.

### 7.2 Feature components

Feature components (`components/common` and route `_components`) should:

- Be built on top of DS primitives.
- Accept typed props.
- Encapsulate role-based behavior or state where appropriate, but delegate styling to primitives.

---

## 8. Auth, Middleware, and Access Control

### 8.1 Middleware

Use Next.js `middleware` for coarse-grained protection:

- Define a list of **protected route prefixes** (e.g. `/dashboard`, `/course`).
- If the user lacks a valid auth token, redirect to the **canonical login route** (e.g. `/auth`).

Guidelines:

- Keep protected routes defined in a **single config** reused by UI (e.g. sidebars, navigation).
- Avoid hardcoding different login paths in multiple places.

### 8.2 Authorization and roles

- Represent roles as a **TypeScript union**:

  - `type UserRole = "student" | "instructor" | "admin";`

- Gate access in:

  - Server components and server actions (first line of defense).
  - Client components for UX hints (e.g. hiding buttons).

Role checks should live in small, well-named helpers (e.g. `canEditCourse(user, course)`).

---

## 9. TypeScript & Validation

### 9.1 TypeScript configuration

- Enable strictness:
  - `"strict": true`
  - `"noImplicitAny": true`
- Avoid `any`; if needed, isolate and document it.

### 9.2 Domain types and schemas

- Define domain types in dedicated modules:
  - `Course`, `Lesson`, `User`, `Enrollment`, etc.
- Use **Zod** or a similar library for runtime validation:
  - Shared schemas between client and server.
  - Derive TS types from schemas where possible.

Guidelines:

- Type all public function boundaries (service functions, context values, component props).
- Keep types close to where they are used, grouped by domain.

---

## 10. Error Handling & Observability

### 10.1 User-facing errors

- Surface validation and domain errors clearly:
  - Field-level errors for forms.
  - Global alerts or toasts for non-field issues.
- Avoid silent failures; every failed mutation should:
  - Provide feedback to the user.
  - Optionally log additional details for developers.

### 10.2 Technical logging

- Normalize error objects in server actions.
- Log critical failures on the server side, with correlation identifiers where necessary.
- Use browser logging sparingly to avoid clutter but provide context during debugging.

---

## 11. Checklist for New Features

Before merging a new feature, confirm:

1. **Routing**
   - Route lives in the correct route group.
   - Access control is enforced via middleware and/or server component guards.
2. **Server vs client**
   - Default is server component.
   - Client components are limited to places that truly need them.
3. **Actions & services**
   - Domain logic is in `src/services/<domain>/actions.ts`.
   - Server actions have typed input/output and centralized error handling.
4. **Data fetching**
   - Initial data fetched on the server where it makes sense.
   - Client-side queries use React Query with well-defined keys and error handling.
5. **Forms**
   - `react-hook-form` or similar is used for non-trivial forms.
   - Validation schema exists and maps to user-facing errors.
6. **UI**
   - Design system primitives are used consistently.
   - Role-specific behavior is explicit and encapsulated.
7. **Types & validation**
   - No unintentional `any`.
   - Important boundaries typed and, where necessary, validated with Zod.
8. **Errors**
   - Failure states are handled and visible.
   - No silent catches that hide real issues.

Following this framework ensures our Next.js frontends remain fast, secure, maintainable, and aligned with modern Vercel-grade best practices.

