<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hogan Frontend — Project Reference (`AGENTS.md`)

## 1. Project Overview & Scope

- **Domain**: Motorcycles & Spare Parts catalog platform (inspired by a clean, modern motorcycle dealership identity — Red, White, Black).
- **Two Main Surfaces**:
  1. **Admin Dashboard (`src/app/admin/`)** — **Phase 1 priority**. Manages motorcycles, spare parts, brands, types, categories, blogs, reviews, and administrators (`SuperAdmin` & `Admin` roles).
  2. **Public Client Website (`src/app/[locale]/`)** — **Phase 2**. Multilingual (`en` / `ar`) public catalog, blogs, reviews, and WhatsApp spare-parts inquiries.
- **No e-commerce scope**: No customer accounts, cart, checkout, orders, or inventory management.
- **Backend**: Live API at `https://hogan.runasp.net/` (OpenAPI spec at `https://hogan.runasp.net/swagger/v1/swagger.json`). Do not invent endpoints or DTOs — verify against Swagger.

---

## 2. Design System

### Color Palette

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| Primary Red | `--primary` | `#E52421` | Primary buttons, active states, accents (use sparingly) |
| Primary Hover | `--primary-hover` | `#C91D1A` | Primary button hover state |
| Black / Foreground | `--foreground` | `#171717` | Headings, sidebar text, primary text |
| White / Surface | `--surface` | `#FFFFFF` | Cards, sidebar, forms, content surfaces |
| Background Grey | `--background` | `#F5F5F5` | Main dashboard background |
| Secondary Text | `--muted` | `#737373` | Descriptions, metadata |
| Borders | `--border` | `#E5E5E5` | Dividers, card borders |

### Typography

- **English (`en`, LTR)**: `Inter` (Google Fonts, `--font-inter`)
- **Arabic (`ar`, RTL)**: `Cairo` (Google Fonts, `--font-cairo`)
- Both fonts are loaded globally in `src/app/layout.tsx` and switched automatically via `html[lang="en"]` / `html[lang="ar"]`.

### Typography Scale

| Element | Size |
|---|---|
| Page title | `24px` |
| Section heading | `18px` |
| Card heading | `16px` |
| Body text | `14px` |
| Secondary text | `13px` |
| Table text | `14px` |
| Button text | `14px` |

---

## 3. Folder Architecture

Keep the folder structure clean, modular, and scalable:

```text
src/
├── proxy.ts                 # Next.js 16 Proxy (replaces middleware.ts): /[locale] routing & /admin passthrough
├── i18n/                    # next-intl routing.ts, request.ts, navigation.ts
├── clientapi/
│   ├── apiConfig.ts         # Single source of truth for API_BASE_URL & Axios instances (adminApi, publicApi)
│   ├── admin/               # Admin API modules (one file per backend module)
│   ├── public/              # Public catalog API modules
│   └── types/               # Shared TypeScript DTOs matching Swagger
├── hooks/
│   ├── admin/               # TanStack Query hooks for admin modules
│   └── client/              # TanStack Query hooks for public website
├── lib/
│   └── auth-cookie.ts       # Server-only HttpOnly cookie helpers
├── components/              # Single root components folder
│   ├── providers.tsx        # QueryClientProvider, MotionConfig, Sonner Toaster
│   ├── admincomp/           # All Admin Dashboard components
│   └── clientcomp/          # All Public Website components
└── app/
    ├── globals.css          # Design tokens & font rules
    ├── layout.tsx           # Root layout (Inter + Cairo, dynamic lang & dir, NextIntlClientProvider, Providers)
    ├── api/admin/           # Next.js BFF auth & proxy Route Handlers (HttpOnly cookie JWT handling)
    ├── admin/               # Admin Dashboard routes
    └── [locale]/            # Public Website routes (/en, /ar)
messages/
├── en.json                  # English translations
└── ar.json                  # Arabic translations
```

### Folder Rules
- **Single `src/components/` folder** containing `admincomp/` (Admin Dashboard) and `clientcomp/` (Public Website).
- **Single `src/clientapi/` folder** containing `apiConfig.ts` (centralized `API_BASE_URL` so the backend URL can be changed in one place) and modular API files.
- Keep unused folders empty until their module is implemented — avoid placeholder boilerplate.

---

## 4. API, Authentication & i18n Rules

- **API Base URL**: Configured exclusively in `src/clientapi/apiConfig.ts` (`NEXT_PUBLIC_API_BASE_URL` fallback `https://hogan.runasp.net`).
- **Authentication Security**:
  - **NEVER store JWT tokens in `localStorage` or `sessionStorage`.**
  - Admin auth uses Next.js BFF Route Handlers (`src/app/api/admin/auth/login`, `logout`, `me`, and `[...path]`) storing the JWT in an `HttpOnly`, `SameSite=Lax` cookie (`hogan_admin_token`).
  - Role-based UI (`SuperAdmin` vs `Admin`) is enforced in the UI, while backend authorization remains authoritative.
- **Internationalization (`next-intl`) — Public Client Side ONLY**:
  - **Admin Dashboard (`/admin`) is English-only (LTR, `Inter`)** and must **NOT** use `next-intl` translations or have a UI language switcher. (Admin forms still edit bilingual `{ en, ar }` content fields for the catalog.)
  - **Public Client Website (`/[locale]/...`)** supports `en` (LTR, `Inter`) and `ar` (RTL, `Cairo`) via `next-intl` and `messages/en.json` + `messages/ar.json`, with no hardcoded UI copy.
  - Public backend requests send `Accept-Language: en | ar`.

---

## 5. Git & Development Rules

- **Git Push Policy (STRICT)**: **NEVER push to GitHub unless the user explicitly tells you to.** Always ask before pushing; by default, do not push.
- **File Size Limit (STRICT)**: **Keep every source file under 300 lines.** Split larger components, hooks, or modules into clean, focused files.
- **Code Quality**:
  - Use TypeScript strictly; keep components small, clean, and reusable.
  - Use Lucide React for icons, Sonner for toasts, TanStack Query for server state, and Framer Motion only where it adds subtle value.
  - Do not install extra dependencies unless necessary or approved.
  - Do not modify backend code.
