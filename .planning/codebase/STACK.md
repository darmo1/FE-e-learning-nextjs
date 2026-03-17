# Technology Stack

**Analysis Date:** 2026-03-17

## Languages

**Primary:**
- TypeScript 5.x - Full-stack type safety, Next.js App Router
- JavaScript (React components) - UI rendering

**Styling:**
- CSS/Tailwind CSS 4.x - Utility-first CSS framework

## Runtime

**Environment:**
- Node.js 20.x (Next.js 15.2.1 runtime)
- React 19.0.0

**Package Manager:**
- npm (based on package.json/package-lock.json)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.2.1 - Full-stack React framework with App Router
- React 19.0.0 - UI library
- React DOM 19.0.0 - React rendering for DOM

**State Management:**
- @tanstack/react-query 5.74.4 - Server state management, caching
- React Hook Form 7.54.2 - Form state management

**UI Components:**
- Radix UI primitives (@radix-ui/react-*) - Accessible UI components
- @dnd-kit/core & @dnd-kit/sortable - Drag and drop functionality
- embla-carousel-react - Carousel component
- lucide-react - Icon library

**Data Validation:**
- Zod 3.24.2 - Schema validation
- @hookform/resolvers 4.1.3 - Form validation integration

## Key Dependencies

**Payment Processing:**
- stripe 18.0.0 - Payment gateway integration

**Media & Storage:**
- cloudinary 2.5.1 - Cloud image/video hosting
- next-cloudinary 6.16.0 - Next.js Cloudinary integration

**Video Player:**
- plyr-react 5.3.0 - Video player component

**Styling:**
- tailwind-merge 3.0.2 - Tailwind CSS utility merging
- class-variance-authority 0.7.1 - Component variant management
- tailwindcss-animate 1.0.7 - Tailwind animation utilities
- clsx 2.1.1 - Conditional classNames

**Utilities:**
- uuid 11.1.0 - UUID generation
- query-string 9.1.1 - URL query string parsing
- cookie 1.0.2 - Cookie parsing
- sonner 2.0.2 - Toast notifications

## Testing & Dev Tools

**Linting:**
- ESLint 9.x - Code linting
- eslint-config-next 15.2.1 - Next.js ESLint configuration

**Styling (Dev):**
- Tailwind CSS 4.x - CSS framework
- @tailwindcss/postcss 4.x - PostCSS integration for Tailwind

**Type Support:**
- @types/node 20.x
- @types/react 19.x
- @types/react-dom 19.x

## Configuration

**Environment:**
- `.env` and `.env.development` files present
- Uses environment variables for:
  - `STRIPE_KEY` - Payment processing
  - `NEXT_PUBLIC_CLOUDINARY_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Media storage
  - `HOST_BACKEND` / `NEXT_PUBLIC_HOST_BACKEND` - Backend API URL
  - `PREFIX` - API version prefix
  - `NEXT_PUBLIC_HOST_FRONTEND` - Frontend URL

**Build:**
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint flat config
- `postcss.config.mjs` - PostCSS configuration

**TypeScript Config:**
- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`

## Platform Requirements

**Development:**
- Node.js 20.x
- npm for package management

**Production:**
- Deployment to Vercel (based on `apiEndpoints` in `src/constants/endpoints.api.ts` pointing to `goproclass.vercel.app`)
- Server-side rendering with Next.js App Router

---

*Stack analysis: 2026-03-17*
