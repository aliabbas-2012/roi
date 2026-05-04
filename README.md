# ROI System Frontend

A modern frontend monorepo for **ROI System (Return on Investment System)** with separate dashboards for:

- **Merchant/Admin**
- **Client/Customer**

and a shared package for reusable UI and logic.

This project is structured for scalability, reuse, and clean feature growth.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Applications](#applications)
  - [Admin App](#admin-app-roi-admin-app)
  - [Client App](#client-app-roi-client-app)
  - [Shared Package](#shared-package-roi-shared)
- [Routing Design](#routing-design)
- [Layout and UI System](#layout-and-ui-system)
- [Styling and CSS Imports](#styling-and-css-imports)
- [Responsive Design Notes](#responsive-design-notes)
- [Component Organization](#component-organization)
- [Shared Components in `roi-shared`](#shared-components-in-roi-shared)
- [Next.js App Router Notes](#nextjs-app-router-notes)
- [Alias and Imports](#alias-and-imports)
- [Store Architecture](#store-architecture)
- [State and Data Layer](#state-and-data-layer)
- [Authentication Status](#authentication-status)
- [Setup and Installation](#setup-and-installation)
- [Run the Apps](#run-the-apps)
- [Build Commands](#build-commands)
- [Lint Commands](#lint-commands)
- [TypeScript Migration](#typescript-migration)
- [Environment and Version Requirements](#environment-and-version-requirements)
- [Git Ignore Rules](#git-ignore-rules)
- [Current Phase Scope](#current-phase-scope)
- [Future Roadmap](#future-roadmap)
- [Developer Guidelines](#developer-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

The ROI frontend is built as a **Yarn Workspace monorepo** with three packages:

Brand/site display name used in UI and metadata:
- **Return on Investment System**

1. `roi-admin-app`  
   Merchant/Admin dashboard UI

2. `roi-client-app`  
   Customer/Client dashboard UI

3. `roi-shared`  
   Shared components, hooks, utilities, and styles consumed by both apps

The goal is to maintain one source of truth for reusable frontend building blocks while allowing each app to evolve independently.

---

## Architecture Overview

- Monorepo managed via **Yarn Workspaces**
- Each app uses **Next.js + React**
- Shared package provides reusable UI and logic
- Dashboard pages use a feature-oriented structure:
  - Route entry at `pages/<Feature>/index.tsx` (or legacy `.jsx`)
  - UI pieces in `components/<Feature>/...`
- Clean import style using `@components` alias from a central `components/index.ts` barrel file

---

## Tech Stack

- **Next.js** (App Router usage in `src/app`)
- **React** (functional components + hooks)
- **TypeScript** (`.tsx`/`.ts`)
- **React Bootstrap**
- **Sass / SCSS**
- **FontAwesome**
- **@tanstack/react-query**
- **HTTP Auth API** (REST; base URL from env)
- **Yarn Workspaces**

---

## Repository Structure

```txt
roi/
├── roi-admin-app/
├── roi-client-app/
├── roi-shared/
├── package.json
├── yarn.lock
├── .gitignore
└── README.md
```

---

## Applications

## Admin App (`roi-admin-app`)

Contains merchant/admin dashboard routes, layout, sidebar, navbar, and placeholder page modules for phase 1.

Main folders:

```txt
roi-admin-app/src/
├── app/                # Next app router entry files
├── components/         # Feature and shared app-specific components
├── layouts/            # AdminLayout, AuthLayout
├── pages/              # Route entry modules (index files)
└── styles/             # App-level styles
```

## Client App (`roi-client-app`)

Contains customer/client dashboard routes, layout, sidebar, navbar, and placeholder page modules for phase 1.

Main folders:

```txt
roi-client-app/src/
├── app/
├── components/
├── layouts/
├── pages/
└── styles/
```

## Shared Package (`roi-shared`)

Reusable modules shared by both apps:

```txt
roi-shared/src/
├── components/   # Button, Input, Modal, Loader, Card, Table, PlaceholderPage, ProtectedRoute, ProfileContent
├── hooks/        # useAuth, store selector hooks
├── layouts/      # AuthLayout, BaseDashboardLayout
├── store/        # actions, reducers, selectors, types, StoreProvider
├── styles/       # variables.scss, mixins.scss, global.scss
└── utils/        # api abstraction, constants, formatters
```

---

## Routing Design

## Admin Routes

Public:
- `/login`
- `/forgot-password`
- `/update-user` (password/email update from recovery link in the URL hash)

Other:
- `/unauthorized` (role mismatch or access denied)

Dashboard:
- `/dashboard`
- `/users`
- `/packages`
- `/customers`
- `/purchases`
- `/profile`
- `/change-password`

## Client Routes

Public:
- `/` (public landing page, no login required)
- `/register`
- `/login`
- `/forgot-password`
- `/update-user` (password update from recovery link in the URL hash)

Other:
- `/unauthorized`

Dashboard:
- `/dashboard`
- `/plans`
- `/investments`
- `/withdraw`
- `/referrals`
- `/profile`

---

## Layout and UI System

Both apps include:

- Responsive dashboard shell
- Collapsible mobile sidebar using offcanvas pattern
- Mobile sidebar close button via offcanvas header
- Desktop sidebar + top navbar
- Desktop sidebar toggle button in navbar (full sidebar <-> icon sidebar)
- Main content area with card-based page containers
- Improved spacing and color contrast for usability

UI baseline:
- `roi-shared/src/styles/global.scss`
- App-specific style tuning in each app’s `src/styles/main.scss`

Color tokens (single source of truth in `roi-shared/src/styles/variables.scss`):
- Primary: `#1f6feb` (`$primary`)
- Sidebar background: `#0d1b2a` (`$sidebar-bg`)
- Sidebar active item: `#1b263b` (`$sidebar-active`)
- Neon/theme tokens for text, borders, overlays, shadows, and gradients are also centralized in the same file.

Navbar profile dropdown uses the shared primary color for:
- Avatar background
- Dropdown top user header

---

## Styling and CSS Imports

Global styles are now loaded through each app `main.scss` file (single stylesheet entry per app):

- `roi-admin-app/src/styles/main.scss`
- `roi-client-app/src/styles/main.scss`
- Both app `main.scss` files now consume shared color variables from:
  - `@use "roi-shared/src/styles/variables.scss" as *;`

Import order in `main.scss` is important for Sass:

1. `@use "roi-shared/src/styles/global.scss";`
2. `@import "bootstrap/dist/css/bootstrap.min.css";`
3. App overrides (sidebar gradients, media queries, etc.)

Both app `layout.tsx` files now import only:

```ts
import "../styles/main.scss";
```

Neon dashboard style updates in `roi-shared/src/styles/global.scss` now include:
- Dark gradient app background
- Glow sidebar cards/links
- Icon-only collapsed desktop sidebar styles
- Bottom mobile navigation bar
- Shared neon card/widget styles for dashboard blocks

---

## Responsive Design Notes

The dashboard UI now follows a Bootstrap-first responsive strategy, with Sass used for targeted breakpoint polish.

Implemented patterns:

- Dashboard content uses Bootstrap grid classes (`row`, `col-12`, `col-sm-6`, `col-lg-4`) for responsive card/action layouts.
- Desktop sidebar supports full and icon-only collapsed modes via navbar toggle.
- Mobile sidebar uses offcanvas with explicit close button and auto-close on menu item click.
- Bottom mobile navigation stays fixed and compact on small screens.
- Shared breakpoints in `roi-shared/src/styles/global.scss` tune spacing/sizing for:
  - `<1200px` (sidebar width reduction)
  - `<992px` (mobile shell layout + navbar/grid adjustments)
  - `<576px` (extra-small phones: tighter controls, fonts, paddings, bottom nav)

Files updated for the responsive pass:

- `roi-shared/src/styles/global.scss`
- `roi-client-app/src/components/Dashboard/DashboardContent.tsx`
- `roi-admin-app/src/components/Dashboard/DashboardContent.tsx`

Guideline:
- Prefer Bootstrap utility/grid classes first.
- Add Sass only when Bootstrap utilities are not enough for pixel-level mobile polish.
- Do not hardcode colors in style files; add/update tokens in `roi-shared/src/styles/variables.scss` and consume those tokens in app/shared Sass.

Client landing page mobile responsiveness:

- Landing page styles are in `roi-client-app/src/styles/main.scss`.
- Mobile UX improvements include:
  - better navbar wrapping/alignment for small screens
  - touch-friendly sign-in/get-started controls
  - stacked full-width hero CTA buttons on mobile
  - adaptive stats grid (tablet and single-column small-phone layout)
  - tighter section/card/footer spacing and typography on smaller viewports
- Landing breakpoints are tuned for:
  - `<992px` (tablet)
  - `<768px` (small tablets / large phones)
  - `<576px` (phones)

---

## Component Organization

Current project follows:

- `pages/<Feature>/index.tsx` (or `.jsx`)  
  route entry and screen-level wiring

- `components/<Feature>/...`  
  presentation components and page-specific modules

Example:

```txt
src/
├── pages/
│   └── Users/
│       └── index.tsx
└── components/
    └── Users/
        ├── UsersContent.jsx
        ├── UserForm.jsx
        └── UserTable.jsx
```

This keeps route files minimal and feature UI modular.

---

## Shared Components in `roi-shared`

To reduce duplication between admin and client apps, these components are centralized in `roi-shared`:

- `roi-shared/src/components/AuthLoginForm.tsx`
- `roi-shared/src/components/AuthForgotPasswordForm.tsx`
- `roi-shared/src/components/AuthUpdateUserForm.tsx`
- `roi-shared/src/components/ClientRegisterForm.tsx`
- `roi-shared/src/components/ProtectedRoute.tsx`
- `roi-shared/src/components/PlaceholderPage.tsx`
- `roi-shared/src/components/ProfileContent.tsx`
- `roi-shared/src/components/Button.tsx` (project-wide shared button)
- `roi-shared/src/components/RoleTopNavbar.tsx`
- `roi-shared/src/components/RoleSidebar.tsx`
- `roi-shared/src/components/RoleBottomNav.tsx`
- `roi-shared/src/layouts/RoleDashboardLayout.tsx`

They are exported from `roi-shared/src/index.ts` and consumed by both apps.

Shared Button usage standard:

- Use `Button` from `roi-shared` across app and shared features instead of importing `Button` from `react-bootstrap` directly.
- Available visual variants:
  - default / `primary` -> neon gradient button (`btn-neon`)
  - `outline` -> neon outline button (`btn-neon-outline`)
  - `ghost` -> soft glass button (`btn-neon-ghost`)
- Button visual classes are defined in `roi-shared/src/styles/global.scss`.

Shared password input standard:

- Use `PasswordInput` from `roi-shared` for all password fields site-wide.
- `PasswordInput` includes built-in eye icon toggle to show/hide password text.
- Keep regular `Input` for non-password fields.

Shared phone input standard:

- Use `PhoneNumberInput` from `roi-shared` for phone fields that require flag + country code UX.
- `PhoneNumberInput` is built on `react-phone-input-2` and returns normalized values:
  - `countryCode` (e.g. `+92`)
  - `phoneNumber` (national digits)
- Client register form uses this shared component.
- Auth form visual consistency: email and password inputs are styled to match the same dark/neon input design used by the shared phone input (border, background, radius, focus glow).
- Browser autofill styling is overridden for auth inputs so saved email/password values keep the same dark/neon theme instead of default bright browser autofill colors.

Shared form error text standard:

- Use `FormErrorText` from `roi-shared` to render field-level validation messages across forms.
- `FormErrorText` centralizes error color/display spacing so login/register/phone-field errors stay consistent.
- Auth login and client register forms now use this shared error component instead of repeated inline `Form.Text` blocks.

Shared auth validation standard:

- Auth field validation logic is centralized in `roi-shared/src/utils/validation.ts`.
- Reusable validators:
  - `validateLoginFields`
  - `validateRegisterFields`
  - `validateRecoverPasswordFields`
  - `validateUpdateUserFields`
- These validators are used by shared auth forms (`AuthLoginForm`, `ClientRegisterForm`, `AuthForgotPasswordForm`, `AuthUpdateUserForm`) to avoid duplicate regex/rule logic.
- Validation regex/rules/messages now have a single source of truth for easier maintenance.

Shared dashboard shell extraction notes:

- Admin/client layout wrappers now delegate core shell behavior to shared `RoleDashboardLayout`.
- Admin/client navbar/sidebar/bottom-nav files now act as thin config wrappers (routes/icons/ids) on top of:
  - `RoleTopNavbar`
  - `RoleSidebar`
  - `RoleBottomNav`
- This reduces duplication while preserving app-specific navigation structure.

---

## Next.js App Router Notes

This project uses **Next.js App Router** (`src/app`) in both apps.

- `src/app/layout.tsx` is the correct and required root layout filename.
- Do not rename reserved App Router files such as:
  - `layout.tsx`
  - `page.tsx`
  - `loading.tsx`
  - `error.tsx`
  - `not-found.tsx`
  - `route.ts`

Important clarification:
- `export const metadata = { ... }` belongs in `layout.tsx`/route files (for HTML metadata), not in `package.json`.

Route group cleanup:
- Old empty route-group folders like `src/app/(dashboard)` were removed from both apps to keep structure clean.

Navbar behavior notes:
- Night/moon icon was removed from top navbar.
- Left navbar action button is now reused as sidebar toggle:
  - Desktop: toggles full sidebar <-> icon sidebar.
  - Mobile: opens sidebar offcanvas.
- FontAwesome SSR stabilization added in both app root layouts:
  - `import "@fortawesome/fontawesome-svg-core/styles.css"`
  - `config.autoAddCss = false`
  - This prevents oversized icon flash for a moment on hard refresh.

---

## Alias and Imports

Both apps support importing via:

```js
import { UsersContent } from "@components";
```

Configured through:

- `roi-admin-app/tsconfig.json`
- `roi-client-app/tsconfig.json`

and component barrel exports:

- `roi-admin-app/src/components/index.ts`
- `roi-client-app/src/components/index.ts`

---

## Store Architecture

A shared store/reducer/action pattern (inspired by dotone-view-admin structure) is now implemented for ROI core features.

Core structure in `roi-shared/src/store`:

- `types.ts` -> async action type builders and feature type constants
- `api/` -> store-level API wrappers (`authApi`, `dashboardApi`)
- `actions/` -> async thunk-like actions (`auth`, `dashboard`)
- `reducers/` -> feature reducers + root reducer
- `selectors/` -> reusable selector helpers
- `index.tsx` -> `StoreProvider`, `useStoreState`, `useStoreDispatch`

Shared hooks for store usage:

- `useAppDispatch`
- `useAppSelector`
- `useShallowEqualSelector`
- `useFilterSelector`

Current features migrated to store flow:

- Auth:
  - login
  - client register
  - logout
  - init session from storage
- Dashboard:
  - fetch summary from shared API layer (`GET /dashboard/summary`)

Provider wiring:

- Both app providers wrap UI with shared `StoreProvider` + `QueryClientProvider`.

---

## State and Data Layer

- Global data-fetching setup via **React Query** (`QueryClientProvider`)
- Base query defaults configured in each app provider
- Auth uses a **hosted HTTP auth API** configured with `NEXT_PUBLIC_AUTH_*` env vars (`roi-shared/src/store/api/authApi.ts`). There is **no** bundled auth SDK; requests use `fetch` to standard paths such as `/auth/v1/token`, `/auth/v1/signup`, `/auth/v1/recover`, `/auth/v1/user`.
- Non-auth “app API” calls go through `roi-shared/src/utils/api.ts` (`apiClient`). Today `GET /dashboard/summary` is a **local mock** (role-based placeholder numbers); replace `apiClient` when wiring a real backend.
- Client landing page (`roi-client-app/src/app/page.tsx`) is fully static UI and does not call any API endpoint

Auth/profile client implementation lives in:

- `roi-shared/src/store/api/authApi.ts`
- `roi-shared/src/store/actions/authActions.ts`
- `roi-shared/src/components/AuthLoginForm.tsx`
- `roi-shared/src/components/ClientRegisterForm.tsx`
- `roi-shared/src/components/ProtectedRoute.tsx`
- `roi-shared/src/utils/authSession.ts`

Auth API environment variables:

- `NEXT_PUBLIC_AUTH_API_URL` — base URL of the auth HTTP API (no trailing slash)
- `NEXT_PUBLIC_AUTH_ANON_KEY` — public anon key the auth service expects in `apikey` / `Authorization` headers
- `NEXT_PUBLIC_AUTH_RECOVER_REDIRECT_TO` (optional, for password reset link `redirect_to`)

Configured in:

- root `.env`
- `roi-admin-app/.env`
- `roi-client-app/.env`

Typical database layout when using a hosted auth provider:

- `auth.users` (managed by the auth service; signup sends `data.*` in user metadata)
- `public.profiles` (optional; this frontend does not call a separate profiles REST API on signup—sync may be done by triggers or a future backend):
  - `id`
  - `email`
  - `role`
  - `first_name`
  - `last_name`
  - `phone_number`
  - `country_code`
  - `created_at`
  - `updated_at`

Important:

- Do not store passwords in `public.profiles`.
- Passwords are handled by the auth service, not stored in app tables.
- Signup uses the auth REST API, for example:
  - `POST {NEXT_PUBLIC_AUTH_API_URL}/auth/v1/signup`
  - payload shape:
    - `email`
    - `password`
    - `data.firstName`
    - `data.lastName`
    - `data.phone`
    - `data.countryCode`
    - `data.role` (`client`)

Auth UX notes:

- Login form is vertically centered via shared `AuthLayout`.
- Client login includes a signup/register link at form bottom.
- Forgot-password form calls the auth service recovery endpoint in both admin and client apps.
- Shared forgot-password UI uses `AuthForgotPasswordForm` from `roi-shared`.
- Recovery links redirect users to `/update-user` page.
- Shared update-user/reset UI uses `AuthUpdateUserForm` from `roi-shared` for both admin and client apps.
- Client register form is fully functional via the shared auth API and profile flow.
- Client register fields:
  - `firstName`
  - `lastName`
  - `email`
  - `countryCode` + `phoneNumber` (flag + country code dropdown shown in phone field)
  - `password` (uses shared `PasswordInput`)
- Register phone field uses `react-phone-input-2` for automatic flag/country-code selection UX.
- Register validation covers all fields:
  - first/last name format
  - email format
  - phone digits length and country-code format
  - password complexity (upper/lower/number/special, min 8 chars)
- On client signup, the app sends the signup payload to the auth API and redirects to login with a success alert.
- Login checks user metadata role to enforce app access:
  - admin app requires role `admin`
  - client app requires role `client`
- Shared `PasswordInput` provides password visibility toggle (eye icon button inside password field).
- Protected dashboard routes redirect to `/login` if there is no active session.
- Logout now clears session from both top-navbar and sidebar logout actions in admin and client apps.
- Top-navbar dropdown logout clears the session before redirecting to `/login`.
- After logout, protected routes cannot be reopened by direct URL without logging in again.
- Recovery email endpoint used:
  - `POST /auth/v1/recover`
- Update user endpoint used from recovery link session:
  - `PUT /auth/v1/user`
- On successful update user, app redirects to `/login?passwordUpdated=1` and shows:
  - "Password updated successfully, please login."
- Failed login and other auth API errors are surfaced in form alerts. Error messages are normalized in `authApi.ts` from common response shapes (`msg`, `message`, `error_description`, `error`, HTTP status).
- `AuthLoginForm` wraps `useSearchParams` (success banners for `?registered=1` and `?passwordUpdated=1`) in a **React `Suspense`** boundary so `/login` prerenders cleanly under Next.js 15.

---

## Authentication Status

At this stage:

- HTTP auth API is integrated for admin/client login and client signup
- `auth.users` stores authentication credentials (managed by the auth service)
- `public.profiles` stores app profile data (`role`, `first_name`, `last_name`, `phone_number`, `country_code`)
- Protected dashboard routes are blocked without session and redirect to `/login`
- Admin/client dashboards enforce role-based route protection

---

## Setup and Installation

From repository root:

```bash
yarn install
```

---

## Run the Apps

Run admin app:

```bash
yarn dev:admin
```

Run client app (second terminal):

```bash
yarn dev:client
```

Default ports:

- Admin: `http://localhost:3000`
- Client: `http://localhost:3001`

---

## Build Commands

Build both apps:

```bash
yarn build
```

Build per app:

```bash
yarn build:admin
yarn build:client
```

---

## Lint Commands

You can now lint the monorepo from root with:

```bash
yarn lint
```

Run lint per app:

```bash
yarn lint:admin
yarn lint:client
```

These map to workspace scripts:

- `roi-admin-app/package.json` -> `lint: next lint`
- `roi-client-app/package.json` -> `lint: next lint`

Root scripts in `package.json`:

- `lint:admin` -> `yarn workspace roi-admin-app lint`
- `lint:client` -> `yarn workspace roi-client-app lint`
- `lint` -> runs both admin and client lint sequentially

Lint setup dependencies (root devDependencies):

- `eslint`
- `eslint-config-next`

---

## TypeScript Migration

The codebase has been migrated from JavaScript to TypeScript file extensions:

- App and UI files: `.jsx` -> `.tsx`
- Hook/utility/barrel files: `.js` -> `.ts`

TypeScript setup includes:

- Root dev dependencies:
  - `typescript`
  - `@types/react`
  - `@types/react-dom`
  - `@types/node`
- App configs:
  - `roi-admin-app/tsconfig.json`
  - `roi-client-app/tsconfig.json`
- Shared config:
  - `roi-shared/tsconfig.json`

To keep migration stable without blocking development, source files currently include `// @ts-nocheck`.  
This allows gradual typing improvements while keeping builds green.

---

## Environment and Version Requirements

Recommended:

- Node.js: **20.x**
- Minimum supported: **18+**
- Yarn: workspace-capable Yarn (current setup tested with Yarn 1.x)

If you hit engine mismatch errors, upgrade Node first.

---

## Git Ignore Rules

Recommended `.gitignore` includes:

- `node_modules/`
- `**/node_modules/`
- `.next/`
- `**/.next/`
- `dist/`
- `build/`
- logs (`*.log`, `yarn-error.log*`, etc.)
- env files (`.env`, `.env.*` except samples)

If `.next` was tracked before, remove from cache once:

```bash
git rm -r --cached .next roi-admin-app/.next roi-client-app/.next
```

---

## Current Phase Scope

Implemented:

- Monorepo setup (Yarn workspaces)
- Shared package integration (`roi-shared`)
- Admin + client layouts, sidebar, navbar, bottom nav
- Route scaffolding and placeholder dashboard modules
- Responsive shell behavior and neon dashboard styling
- Component architecture cleanup and `@components` alias imports
- **HTTP auth integration**: login, logout, client signup, forgot password, recovery link handling on `/update-user`, session persistence (`roi-shared/src/utils/authSession.ts`), role checks (admin vs client)
- **Mock dashboard summary** via `apiClient` (`GET /dashboard/summary`)

Not implemented yet:

- Real HTTP backend for dashboard, users, packages, and other CRUD (beyond the auth API configured in env)
- Full production CRUD flows and analytics

---

## Future Roadmap

Planned next features:

- Replace mock `apiClient` with a real app API (e.g. Python service) while keeping the same store hooks where practical
- Extend role-based access control as backend rules grow
- Data tables with pagination/filtering/sorting
- Notification system
- Analytics widgets/charts
- Settings module
- Form validation extensions for new entities
- Realtime updates (if needed)

---

## Developer Guidelines

1. Keep route entry logic in `pages/<Feature>/index.tsx` (or `.jsx` during migration)
2. Keep UI modules inside `components/<Feature>/`
3. Reuse from `roi-shared` first before adding local duplicates
4. Export feature UI through `components/index.ts`
5. Prefer consistent design tokens and shared styles
6. Keep client/admin patterns aligned unless business logic differs

---

## Troubleshooting

## `.next` still appears in git status
- Ensure `.gitignore` includes `.next/` and `**/.next/`
- Remove cached tracked files once with `git rm --cached`

## Node version error during install
- Use Node 20:
  ```bash
  nvm install 20
  nvm use 20
  ```

## Import alias not resolving
- Verify `tsconfig.json` exists per app
- Restart dev server after alias changes

## Auth errors or "Missing auth API environment variables"
- Ensure each app has `NEXT_PUBLIC_AUTH_API_URL` and `NEXT_PUBLIC_AUTH_ANON_KEY` in its `.env` (see [State and Data Layer](#state-and-data-layer)).
- Optional: `NEXT_PUBLIC_AUTH_RECOVER_REDIRECT_TO` for password-reset redirect URLs.

## UI layout broken after changes
- Check dashboard shell composition in layout files
- Confirm sidebar and main content are rendered within the same shell container
