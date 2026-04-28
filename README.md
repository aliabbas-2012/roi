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
- [Component Organization](#component-organization)
- [Alias and Imports](#alias-and-imports)
- [State and Data Layer](#state-and-data-layer)
- [Authentication Status](#authentication-status)
- [Setup and Installation](#setup-and-installation)
- [Run the Apps](#run-the-apps)
- [Build Commands](#build-commands)
- [Environment and Version Requirements](#environment-and-version-requirements)
- [Git Ignore Rules](#git-ignore-rules)
- [Current Phase Scope](#current-phase-scope)
- [Future Roadmap](#future-roadmap)
- [Developer Guidelines](#developer-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

The ROI frontend is built as a **Yarn Workspace monorepo** with three packages:

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
  - Route entry at `pages/<Feature>/index.jsx`
  - UI pieces in `components/<Feature>/...`
- Clean import style using `@components` alias from a central `components/index.js` barrel file

---

## Tech Stack

- **Next.js** (App Router usage in `src/app`)
- **React** (functional components + hooks)
- **React Bootstrap**
- **Sass / SCSS**
- **FontAwesome**
- **@tanstack/react-query**
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
├── routes/             # legacy route scaffold from initial setup
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
├── routes/             # legacy route scaffold from initial setup
└── styles/
```

## Shared Package (`roi-shared`)

Reusable modules shared by both apps:

```txt
roi-shared/src/
├── components/   # Button, Input, Modal, Loader, Card, Table
├── hooks/        # useAuth, useDebounce, useToggle
├── layouts/      # AuthLayout, BaseDashboardLayout
├── styles/       # variables.scss, mixins.scss, global.scss
└── utils/        # api abstraction, constants, formatters
```

---

## Routing Design

## Admin Routes

Public:
- `/login`
- `/forgot-password`

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
- `/register`
- `/login`
- `/forgot-password`

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
- Desktop sidebar + top navbar
- Main content area with card-based page containers
- Improved spacing and color contrast for usability

UI baseline:
- `roi-shared/src/styles/global.scss`
- App-specific style tuning in each app’s `src/styles/main.scss`

---

## Component Organization

Current project follows:

- `pages/<Feature>/index.jsx`  
  route entry and screen-level wiring

- `components/<Feature>/...`  
  presentation components and page-specific modules

Example:

```txt
src/
├── pages/
│   └── Users/
│       └── index.jsx
└── components/
    └── Users/
        ├── UsersContent.jsx
        ├── UserForm.jsx
        └── UserTable.jsx
```

This keeps route files minimal and feature UI modular.

---

## Alias and Imports

Both apps support importing via:

```js
import { UsersContent } from "@components";
```

Configured through:

- `roi-admin-app/jsconfig.json`
- `roi-client-app/jsconfig.json`

and component barrel exports:

- `roi-admin-app/src/components/index.js`
- `roi-client-app/src/components/index.js`

---

## State and Data Layer

- Global data-fetching setup via **React Query** (`QueryClientProvider`)
- Base query defaults configured in each app provider
- API layer currently mocked/abstracted in `roi-shared` utils
- No real backend data connection in phase 1

---

## Authentication Status

At this stage:

- Backend auth flow is **not integrated**
- Protected wrappers are currently relaxed for development so pages are accessible
- Login pages are UI placeholders only

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

Implemented in phase 1:

- Monorepo setup
- Shared package integration
- Admin + client layouts
- Sidebar + navbar UI
- Route scaffolding
- Placeholder pages
- Responsive shell behavior
- Component architecture cleanup
- Alias-based imports from `@components`

Not implemented in phase 1:

- Real backend auth
- Real API integration
- Full CRUD flows
- Advanced dashboard analytics

---

## Future Roadmap

Planned next features:

- Authentication with backend
- Role-based access control
- Data tables with pagination/filtering/sorting
- Notification system
- Analytics widgets/charts
- Settings module
- Form validation strategy
- Realtime updates (if needed)

---

## Developer Guidelines

1. Keep route entry logic in `pages/<Feature>/index.jsx`
2. Keep UI modules inside `components/<Feature>/`
3. Reuse from `roi-shared` first before adding local duplicates
4. Export feature UI through `components/index.js`
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
- Verify `jsconfig.json` exists per app
- Restart dev server after alias changes

## UI layout broken after changes
- Check dashboard shell composition in layout files
- Confirm sidebar and main content are rendered within the same shell container
