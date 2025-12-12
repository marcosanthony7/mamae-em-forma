# Mamãe Forte - Postpartum Recovery App

## Overview

Mamãe Forte is a gamified mobile-first web application designed to help new mothers through their postpartum recovery journey. The app delivers a 30-day recovery and wellness plan including exercises, nutrition guidance, diastasis testing, and educational content. The design follows a warm, maternal aesthetic with soft pink, purple, and blue tones inspired by apps like Duolingo (gamification), Calm/Headspace (wellness), and feminine health apps (Flo, Ovia).

**Core Features:**
- Daily exercise routines with video demonstrations and adaptations for normal birth vs. cesarean
- Weekly meal plans with recipes and shopping lists
- Interactive diastasis recti self-assessment tool
- Extra educational videos and FAQ content
- Gamification elements: streak tracking, achievement badges, progress rings
- Full Portuguese (Brazilian) localization

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React 18 with TypeScript
- **Bundler:** Vite with React plugin
- **State Management:** TanStack React Query for server state, local component state for UI
- **Styling:** Tailwind CSS with shadcn/ui component library (New York style)
- **Animations:** Framer Motion for smooth transitions and micro-interactions
- **Icons:** Lucide React icon library
- **Fonts:** Poppins (primary), Playfair Display (accent quotes), Fira Code (mono)

**Component Structure:**
- Pages in `client/src/pages/` (Dashboard, Treinos, Alimentacao, Diastase, Extras)
- Reusable components in `client/src/components/`
- UI primitives from shadcn/ui in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Tab-based navigation managed via state in App.tsx (no router)

### Backend Architecture
- **Runtime:** Node.js with Express
- **Language:** TypeScript (ESM modules)
- **API Pattern:** RESTful JSON API under `/api/*` prefix
- **Authentication:** Firebase Admin SDK for token verification
- **Development:** Vite dev server middleware integration
- **Production:** Static file serving from built assets

**Key API Endpoints:**
- `GET /api/auth/user` - Get authenticated user info
- `GET/PATCH /api/progress` - User progress state
- `POST /api/progress/exercise/:id/toggle` - Toggle exercise completion
- `POST /api/progress/recipe/:id/toggle` - Toggle recipe favorites
- `GET /api/exercises`, `/api/meals`, `/api/shopping`, `/api/videos`, `/api/faqs` - Content endpoints

### Data Storage
- **Primary:** PostgreSQL (configured via Drizzle ORM)
- **Schema Location:** `shared/schema.ts`
- **Current State:** File-based JSON persistence (`.progress.json`) for development
- **ORM:** Drizzle with drizzle-zod for validation schema generation
- **Migrations:** Drizzle Kit with push-based migrations (`db:push` script)

**Data Model:**
- User progress tracking (current day, streak, completed exercises, favorites, achievements)
- Static content arrays (exercises, meals, shopping categories, videos, FAQs, motivational quotes) defined in schema

### Build System
- **Client Build:** Vite produces static assets to `dist/public/`
- **Server Build:** esbuild bundles server code to `dist/index.cjs`
- **Script:** `script/build.ts` orchestrates both builds
- **Path Aliases:** `@/` → client/src, `@shared/` → shared/, `@assets/` → attached_assets/

## External Dependencies

### UI Component Libraries
- **shadcn/ui:** Full component library installed (accordion, dialog, tabs, toast, etc.)
- **Radix UI:** Underlying primitives for accessible components
- **Embla Carousel:** Carousel functionality
- **React Day Picker:** Calendar component
- **cmdk:** Command palette component
- **Vaul:** Drawer component

### Database & ORM
- **PostgreSQL:** Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM:** Type-safe SQL query builder
- **connect-pg-simple:** Session storage for PostgreSQL

### Form & Validation
- **React Hook Form:** Form state management
- **Zod:** Schema validation
- **@hookform/resolvers:** Zod integration with React Hook Form

### Authentication
- **Firebase Authentication:** Google Sign-In provider
- **Firebase Admin SDK:** Server-side token verification
- **Token Management:** Auto-refresh every 10 minutes, stored in localStorage
- **Auth Context:** React Context API in `client/src/contexts/AuthContext.tsx`
- **Firebase Config:** `client/src/lib/firebase.ts` (frontend), `server/firebaseAuth.ts` (backend)

**Required Environment Variables:**
- `VITE_FIREBASE_API_KEY` - Firebase API Key (frontend)
- `VITE_FIREBASE_APP_ID` - Firebase App ID (frontend)
- `VITE_FIREBASE_PROJECT_ID` - Firebase Project ID (frontend)
- `FIREBASE_SERVICE_ACCOUNT_KEY` - Firebase Service Account JSON (backend)

### Development Tools
- **Replit Plugins:** Runtime error overlay, cartographer, dev banner
- **TypeScript:** Strict mode enabled with bundler module resolution

## Recent Changes

### December 2024
- **Authentication Migration:** Replaced Replit Auth with Firebase Authentication
  - Added Google Sign-In via Firebase
  - Implemented Firebase Admin SDK for backend token verification
  - Added automatic token refresh (every 10 minutes)
  - Removed Replit OIDC dependencies