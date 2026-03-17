# External Integrations

**Analysis Date:** 2026-03-17

## APIs & External Services

**Backend API:**
- GoProClass API (FastAPI backend)
  - Base URL: `http://localhost:3005` (development) or `https://goproclass.vercel.app` (production)
  - API Prefix: `/api/v1` (configurable via `PREFIX` env var)
  - Endpoints in `src/constants/endpoints.ts`:
    - `/auth/login` - User authentication
    - `/auth/register` - User registration
    - `/auth/refresh` - Token refresh
    - `/course` - Course management
    - `/lessons` - Lesson management
    - `/enrollments` - Course enrollments
    - `/users/info` - User information
    - `/analytics/instructor/*` - Instructor analytics

**Frontend API Routes (in Next.js):**
- `/api/checkout` - Stripe payment session creation
- `/api/upload-image` - Cloudinary image upload
- `/api/upload-video` - Cloudinary video upload
- `/api/cookie` - Token refresh proxy
- `/api/logout` - Session termination

## Data Storage

**Media Storage:**
- Cloudinary - Image and video hosting
  - SDK: `cloudinary` npm package v2.5.1
  - Configuration via env vars:
    - `NEXT_PUBLIC_CLOUDINARY_NAME`
    - `NEXT_PUBLIC_CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
  - Resource types: `image` and `video`
  - Folder: `e-learning`
  - Configured in `src/app/api/upload-image/route.ts` and `src/app/api/upload-video/route.ts`

**Database:**
- Not directly managed in frontend
- Backend API (FastAPI) handles database operations

**Caching:**
- React Query (`@tanstack/react-query`) - Client-side caching
- Next.js built-in data caching

## Authentication & Identity

**Auth Provider:**
- Custom cookie-based authentication
- Token-based with refresh mechanism
- Implementation: `src/services/users/actions.ts`
- Cookies:
  - `access_token` - JWT access token (httpOnly, secure in production)
  - `refresh_token` - JWT refresh token for token renewal

**Token Refresh:**
- Endpoint: `/api/cookie` - Proxies to backend refresh
- Automatic refresh on 401 responses via `requestHandler` in `utils/request-handler.ts`
- Cookie parsing via `cookie` npm package

## Payment Processing

**Stripe:**
- Payment gateway integration
  - SDK: `stripe` npm package v18.0.0
  - Used in: `src/app/api/checkout/route.ts`
  - Environment: `STRIPE_KEY` env var required
  - Mode: Payment checkout sessions
  - Creates checkout sessions with:
    - Product name
    - Unit amount (converted to cents)
    - USD currency

## Monitoring & Observability

**Error Tracking:**
- Console logging throughout application
- Error boundaries in React (`src/app/_error.tsx`)

**Logs:**
- Server-side: `console.log` / `console.error` in API routes and server actions
- Client-side: Console warnings for auth issues

## CI/CD & Deployment

**Hosting:**
- Vercel (production URLs reference `goproclass.vercel.app`)
- Next.js automatic optimization and deployment

**Environment:**
- Development: Localhost (port 3000 for frontend, 3005 for backend)
- Production: Vercel

## Environment Configuration

**Required env vars:**
- `STRIPE_KEY` - Stripe API secret key
- `NEXT_PUBLIC_CLOUDINARY_NAME` - Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_API_KEY` - Cloudinary API key (public)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (private)
- `HOST_BACKEND` - Backend API URL (server-side)
- `NEXT_PUBLIC_HOST_BACKEND` - Backend API URL (client-side)
- `NEXT_PUBLIC_HOST_FRONTEND` - Frontend URL
- `PREFIX` - API version prefix (default: `/api/v1`)

**Secrets location:**
- `.env` and `.env.development` files (not committed to git)

## Webhooks & Callbacks

**Outgoing:**
- Stripe checkout success URL: `ENDPOINT.CHECKOUT_SUCCESS` → Backend handles webhook
- Cloudinary upload callbacks handled internally

**Incoming:**
- No explicit webhook endpoints defined in frontend
- Stripe webhooks handled by backend API

---

*Integration audit: 2026-03-17*
