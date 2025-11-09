# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a music rating and review web application called "뮤직레이트" (MusicRate), built with React, TypeScript, and Vite. The application allows users to rate albums and tracks, create collections, write reviews, and interact with other users' content. The project was originally designed in Figma and exported as a code bundle.

## Development Commands

### Installation
```bash
npm i
```

### Development
```bash
npm run dev
```
Starts the Vite development server on port 3000 and automatically opens the browser.

### Build
```bash
npm run build
```
Builds the application using Vite. Output directory is `build/`.

## Architecture

### Navigation System

The app uses **React Router v6** for client-side routing. Navigation architecture:

- **BrowserRouter**: Wraps the entire application in `App.tsx`
- **Routes & Route**: Declarative route configuration
- **useNavigate() hook**: For programmatic navigation (replaces old `onNavigate` prop)
- **useParams() hook**: Extract URL parameters (e.g., `albumId`, `trackId`)
- **NavLink component**: For navigation links with active state styling
- **ProtectedRoute**: HOC pattern using `<Outlet />` for authentication-required routes
- **Layout component**: Nested route wrapper with conditional `BottomNavigation` visibility

**Route Structure:**
- Public routes: `/auth` (AuthPage)
- Protected routes: All other routes require authentication
- Nested routes: Main routes wrapped in `<Layout>` component
- 404 handling: Catch-all `*` route shows `NotFoundPage`

See `ROUTE_STRUCTURE.md` for complete URL schema (28 total routes).

### Authentication Flow

- Users start on `/auth` when no token is present
- After login, `navigate('/home')` redirects to HomePage
- Logout clears token and calls `navigate('/auth')`
- ProtectedRoute checks `localStorage.getItem('authToken')`
- Unauthorized access redirects to `/auth` via `<Navigate to="/auth" replace />`

### Page Structure

**Modern Pattern (React Router v6):**
- No props required for navigation (use `useNavigate()` hook)
- No ID props required (use `useParams()` hook)
- Clean component interfaces without prop drilling
- Direct access to routing context via hooks

**Example:**
```typescript
// Detail page
export function AlbumDetailPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate(`/albums/${albumId}/review`)}>
        Write Review
      </button>
    </div>
  );
}
```

**Main page categories:**
- **Core navigation** (Bottom nav): `/home`, `/search`, `/rate-record`, `/notifications`, `/user`
- **Detail pages**: `/albums/:albumId`, `/tracks/:trackId`, `/artists/:artistId`, `/comments/:commentId`, `/curations/:curationId`, `/users/:userId`
- **Collection pages**: `/collections/new`, `/collections/my`, `/collections/liked`, `/collections/all`, `/collections/:collectionId`, `/kma-collection`
- **Rating pages**: `/rated/albums`, `/rated/tracks`, `/albums/:albumId/review`, `/reviews/my`, `/reviews/:reviewId`
- **Artists**: `/artists/liked`
- **404**: Any invalid route shows `/` NotFoundPage

**Navigation Patterns:**
```typescript
// Navigate to route
navigate('/home')

// Navigate with params
navigate(`/albums/${albumId}`)

// Browser back
navigate(-1)

// Replace history (no back button)
navigate('/auth', { replace: true })
```

### Component Organization

```
src/
├── components/
│   ├── ui/                   # shadcn/ui components (50+ Radix UI-based components)
│   ├── figma/                # Figma-exported components (e.g., ImageWithFallback)
│   ├── BottomNavigation.tsx  # Bottom nav using NavLink (React Router)
│   ├── ProtectedRoute.tsx    # Authentication wrapper using Outlet
│   ├── Layout.tsx            # Layout wrapper with conditional BottomNavigation
│   ├── MusicCard.tsx
│   ├── HorizontalMusicSection.tsx
│   ├── StarRating.tsx
│   ├── EnhancedButton.tsx
│   └── EnhancedCard.tsx
├── pages/
│   ├── NotFoundPage.tsx      # 404 error page
│   └── ...                   # 21 other page components
├── types/
│   └── api.ts                # TypeScript type definitions for API responses
└── api-examples/             # Mock data and API specs
```

### UI Framework

The project uses **shadcn/ui** with Radix UI primitives:
- 50+ pre-built UI components in `src/components/ui/`
- Tailwind CSS for styling (via `tailwind-merge` and `clsx`)
- Utility function `cn()` in `src/components/ui/utils.ts` for conditional class merging
- Component variant system via `class-variance-authority`

### API Integration

**Current Status:** API integration is configured and ready for APIdog-generated code.

**Structure:**
```
src/
├── api/                      # API layer
│   ├── client.ts             # Axios instance with interceptors
│   ├── config.ts             # API configuration and endpoints
│   ├── types.ts              # ⚠️ To be generated by APIdog
│   ├── homeApi.ts            # ⚠️ To be generated by APIdog
│   ├── searchApi.ts          # ⚠️ To be generated by APIdog
│   ├── albumApi.ts           # ⚠️ To be generated by APIdog
│   └── ... (10 total API files)
├── hooks/                    # Custom React hooks for data fetching
│   ├── useHomeData.ts        # Hook for home page data
│   └── ... (hooks for each page)
└── types/
    └── api.ts                # Legacy types (to be replaced by src/api/types.ts)
```

**HTTP Client:** Axios
- Configured in `src/api/client.ts`
- Automatic token injection via request interceptor
- Global error handling via response interceptor
- Base URL: `https://port-0-musicapp-md8e80po64ad31eb.sel5.cloudtype.app` (from `.env`)

**Authentication:**
- Token stored in `localStorage.getItem('authToken')`
- Automatically added to all requests as `Authorization: Bearer <token>`
- 401 errors trigger automatic logout

**API Documentation:**
- Full spec: `src/api-examples/API-SPEC.md`
- Integration guide: `API_INTEGRATION_GUIDE.md`
- Mock data: `src/api-examples/home-page-example.json`

**⚠️ Important - Field Name Priority:**
When APIdog generates `src/api/types.ts`, those field names take **absolute priority** over existing code. Component code must be updated to match APIdog types, not vice versa.

**Main endpoints** (from API-SPEC.md):
- `GET /api/home` - Returns collections, popular comments, and recent comments
- `GET /api/collections/recommended` - Returns recommended collections
- `GET /api/comments/popular` - Returns popular comments (sorted by likes)
- `GET /api/comments/recent` - Returns recent comments (sorted by time)
- See `src/api/config.ts` for full endpoint list

### Styling Approach

- Tailwind CSS with utility-first approach
- `cn()` utility function combines `clsx` and `tailwind-merge` for conditional classes
- Responsive design using Tailwind breakpoints
- Size classes use Tailwind's arbitrary values (e.g., `size-full` for width/height)

### Path Aliases

Vite is configured with path alias `@` pointing to `./src/`:
```typescript
import { Button } from "@/components/ui/button"
```

## Key Patterns

### Collection Types
- `mixed` - Contains both albums and tracks
- `tracks` - Contains only tracks
- `albums` - Contains only albums

### User Verification Badges
- `isVerified: true` - Shows blue verification badge
- `isOfficial: true` - Shows gold verification badge (e.g., for 한국대중음악상)

### Rating System
- Star ratings from 1-5
- Used in comments and reviews
- Implemented with `StarRating` component

### Time Display
- Recent comments show relative time: "방금 전", "5분 전", "2시간 전"
- Format specified in API-SPEC.md with Korean language strings

## Important Notes

- **✅ React Router v6 migration complete:** Application now uses declarative routing with hooks
- **Backend API is available** at `https://port-0-musicapp-md8e80po64ad31eb.sel5.cloudtype.app`
- **API integration is partially configured:** Axios client is ready, but API service files need to be generated by APIdog
- **Current data source:** Pages use hardcoded mock data (will be replaced with API calls)
- **Build status:** ✅ Successful (731.64 kB bundle, 76.82 kB CSS)
- The project uses SWC for faster React compilation via `@vitejs/plugin-react-swc`
- All dependencies use specific versions with extensive Radix UI components
- The application is Korean-language focused (UI text in Korean)
- **Production deployment requires SPA fallback configuration** - see `SERVER_CONFIG.md`

## Deployment

For production deployment, the server must be configured with **SPA fallback** to serve `index.html` for all routes. This allows React Router to handle client-side routing.

**See `SERVER_CONFIG.md` for:**
- Development server configuration (Vite)
- Production server options (Express, Nginx, Apache)
- Cloud platform configurations (Netlify, Vercel, AWS, Firebase)
- Environment variables
- Common issues and solutions
- Deployment checklist

**See `TESTING.md` for:**
- Build validation checklist
- Navigation flow testing
- Key user journey scenarios
- Browser behavior testing

## Next Steps for API Integration

1. Generate API code in APIdog with these settings:
   - HTTP Client: **Axios**
   - Language: **TypeScript**
   - File structure: **Multiple files**
2. Place generated files in `src/api/` directory
3. Create custom hooks in `src/hooks/` using the API functions
4. Update page components to use hooks instead of mock data
5. Delete or deprecate `src/types/api.ts` in favor of `src/api/types.ts`

See `API_INTEGRATION_GUIDE.md` for detailed instructions.
