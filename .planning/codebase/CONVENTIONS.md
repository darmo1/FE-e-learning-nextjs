# Coding Conventions

**Analysis Date:** 2026-03-17

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `InputField.tsx`, `AuthForm.tsx`)
- Utility/helper files: camelCase (e.g., `utils.ts`, `actions.ts`)
- Type definition files: camelCase with `.types.ts` suffix (e.g., `users/types.ts`)
- Schema files: camelCase with `.schemas.ts` suffix (e.g., `users/schemas.ts`)
- Barrel exports: `index.ts`
- API routes: `route.ts`

**Functions:**
- camelCase (e.g., `refreshTokenAction`, `useCoursesQuery`)
- Custom hooks: Prefix with `use` (e.g., `useCoursesQuery`)

**Variables:**
- camelCase (e.g., `accessToken`, `rawSetCookie`)

**Types/Interfaces:**
- PascalCase (e.g., `InputFieldProps`, `AuthRegisterProps`)

## Code Style

**Formatting:**
- No explicit Prettier configuration (relies on editor defaults)
- Tailwind CSS 4 with `@tailwindcss/postcss`

**Linting:**
- Tool: ESLint 9 with Flat Config
- Config: `eslint.config.mjs` extends `"next/core-web-vitals"` and `"next/typescript"`
- Run command: `npm run lint`

**TypeScript:**
- Strict mode: enabled (`"strict": true`)
- No implicit any: disabled (`"noImplicitAny": false`)
- Module resolution: bundler
- JSX: preserve

**Component Patterns:**
- Props destructuring in function parameters
- Default values for optional props
- Variant patterns using `class-variance-authority` (CVA)
- Data attributes for styling hooks (e.g., `data-slot="button"`)

## Import Organization

**Order:**
1. React core imports (`import React from "react"`)
2. External library imports (`@radix-ui/*`, `@tanstack/*`)
3. Internal path alias imports (`@/lib/utils`, `@/constants/*`)
4. Relative imports (`./component`)

**Path Aliases:**
- `@/*` maps to `./src/*`
- Example: `import { ENDPOINT } from "@/constants/endpoints"`

**Barrel Exports:**
- Index files (`index.ts`) used for grouping exports
- Example: `src/app/(core)/auth/_components/auth-form/index.ts`

## Error Handling

**Patterns:**
- Server Actions: try/catch blocks with `console.error` for errors
- API Routes: try/catch returning `NextResponse.json({ error })` with appropriate status codes
- React Query: try/catch returning empty arrays/nulls on failure

**Logging:**
- Framework: `console` (no structured logger)
- Patterns:
  - `console.warn` with emoji prefix for failures (e.g., `console.warn("❌ Refresh token request failed...")`)
  - `console.error` with emoji prefix for errors (e.g., `console.error("🔥 Error in refreshTokenAction:", error)`)

**Error Responses:**
- API routes: `NextResponse.json({ error: "message" }, { status: code })`
- Common status codes: 401 (unauthorized), 500 (server error)

## Comments

**When to Comment:**
- Server actions include file path comment at top: `// app/actions/auth.ts`
- API routes include descriptive comments: `// Llama al backend FastAPI`
- Configuration code often has minimal comments

**JSDoc/TSDoc:**
- Not detected in codebase

## Function Design

**Size:**
- Components typically handle rendering only
- Data fetching abstracted to custom hooks (`useXxxQuery`)
- Server actions handle API interactions

**Parameters:**
- Props destructured in component parameters
- Explicit typing for props interfaces

**Return Values:**
- React components return JSX
- Hooks return query objects or data
- Server actions return data or null on failure

## Module Design

**Exports:**
- Named exports preferred (e.g., `export const InputField`)
- Dual exports for components with variants (e.g., `export { Button, buttonVariants }`)

**Barrel Files:**
- Used for component groups (e.g., `_components/auth-form/index.ts`)
- Used for feature modules

---

*Convention analysis: 2026-03-17*
