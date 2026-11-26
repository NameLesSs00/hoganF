# Frontend Project Context – Motorcycle & Spare Parts Website

## 1. Project Overview

We are building a motorcycle and spare-parts website using **Next.js**.

The website will have two main parts:

1. **Public website:** Visitors can browse motorcycles, spare parts, read blogs, and submit reviews.
2. **Admin dashboard:** Administrators can manage motorcycles, spare parts, brands, categories, blogs, reviews, and other content.

The backend is already implemented. Your job is to build the frontend and integrate it with the existing backend API.

Do not reinvent backend functionality or introduce unnecessary features.

## 2. Technology Stack

The frontend dependencies are already installed and configured.

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query – API data fetching and caching
- next-intl – internationalization
- Sonner – toast notifications
- Framer Motion – animations
- React Hook Form – forms
- Zod – validation
- shadcn/ui – reusable UI components
- Lucide React – icons
- Zustand – optional client-side state management

Use the existing project setup. Do not reinstall dependencies or replace libraries without a good reason.

## 3. Brand Identity & Visual Direction

The visual identity is inspired by the Haojin Egypt brand presence.

Reference:
- Facebook page screenshot supplied in the conversation.
- https://www.aboalmagdgroup.com/

Important context: Abo Almagd is a reference for the local Haojin distributor/agent, not necessarily the exact business we are building the website for.

We want a professional motorcycle dealership identity.

### Design direction

- Clean
- Modern
- Professional
- Product-focused
- Slightly sporty
- Not overly decorative
- Not excessively animated

The main colors should be **red, white, and black**.

### Color palette

Use these initial design tokens:

| Token | Color | Usage |
|---|---|---|
| Primary | #E52421 | Primary buttons, active states, accents |
| Primary Hover | #C91D1A | Button hover |
| Background | #F5F5F5 | Main dashboard background |
| Surface | #FFFFFF | Cards, sidebar, forms |
| Foreground | #171717 | Headings and primary text |
| Muted | #737373 | Secondary text |
| Border | #E5E5E5 | Borders and dividers |

Do not use red excessively. It should highlight important actions and active states rather than dominate every section.

### Typography

Use:

- **Inter** for English.
- **Cairo** for Arabic.

Both fonts should be configured globally and work correctly with the internationalization setup.

### Typography scale

| Element | Font size |
|---|---|
| Page title | 24px |
| Section heading | 18px |
| Card heading | 16px |
| Body text | 14px |
| Secondary text | 13px |
| Table text | 14px |
| Button text | 14px |

Keep the admin interface compact and readable.

## 4. Admin Dashboard

We want to start with the admin dashboard rather than the public website.

The dashboard should have:

### Sidebar navigation

- Dashboard
- Motorcycles
- Brands
- Motorcycle Types
- Spare Parts
- Spare Part Categories
- Blogs
- Reviews
- Administrators (SuperAdmin only)
- Settings

### Topbar

Include:

- Current page title or breadcrumb
- Language switcher
- Administrator profile menu
- Logout action

### Main content area

Use:

- Light grey background
- White cards
- Subtle borders
- Black headings
- Red primary buttons
- Consistent spacing
- Responsive layout

The sidebar should have a white background, dark text, and a red active navigation indicator.

## 5. Backend Features to Support

The backend contains the following application modules:

- Brands
- Motorcycle Types
- Motorcycles
- Motorcycle Images
- Motorcycle Colors
- Motorcycle Specifications
- Blogs
- Blog Sections
- Motorcycle Reviews
- Blog Reviews
- Spare Part Categories
- Spare Parts
- Spare Part Images
- Spare Part Compatibility

Authentication uses two roles:

- SuperAdmin
- Admin

SuperAdmin can manage administrator accounts. Admin can manage website content but cannot manage other administrators.

Implement role-based UI visibility, but remember that backend authorization remains authoritative.

There are no customer accounts, shopping carts, checkout, orders, or inventory-management features.

Spare-part inquiries should eventually use WhatsApp.

## 6. Internationalization

The application must support multiple languages.

At minimum, prepare for:

- English
- Arabic

Requirements:

- Correct RTL layout for Arabic.
- Correct LTR layout for English.
- Language-aware navigation and components.
- Appropriate font switching.
- No hardcoded interface text where translation messages should be used.

Use the existing next-intl configuration.

## 7. API Integration

The backend is already available.

Before implementing API functionality:

1. Inspect the existing API documentation and project configuration.
2. Identify the backend base URL and authentication mechanism.
3. Understand the existing request and response DTOs.
4. Build a centralized API client.
5. Create reusable TanStack Query hooks for each module.
6. Handle loading, error, and empty states consistently.

Do not invent API endpoints or DTO structures. Verify them against the actual backend.

Authentication must use a secure token-handling strategy. Do not store authentication tokens in localStorage.

## 8. First Implementation Milestone

Do not attempt to build the entire application immediately.

Start by creating the shared admin dashboard foundation:

1. Inspect the existing repository and its structure.
2. Understand the installed dependencies and current configuration.
3. Establish global design tokens and typography.
4. Configure the English and Arabic font setup.
5. Implement the admin layout.
6. Implement the responsive sidebar.
7. Implement the topbar.
8. Create reusable buttons, cards, inputs, tables, and page containers.
9. Create a basic dashboard overview using mock data initially.

The dashboard should be functional in terms of navigation and layout, even before the real API data is connected.

## 9. Development Rules

- Follow the existing project architecture.
- Use TypeScript properly.
- Prefer reusable components over duplicated code.
- Keep components small and maintainable.
- Avoid unnecessary abstractions.
- Avoid installing additional dependencies unless necessary.
- Use Lucide icons consistently.
- Use Framer Motion only where it adds value.
- Ensure responsive behavior.
- Support both RTL and LTR.
- Do not introduce unrelated features.
- Do not modify backend code.

## 10. How to Start

First, inspect the repository.

Before making major changes, report:

- Current project structure.
- Existing configurations.
- Existing dependencies.
- Recommended frontend folder structure.
- Any configuration problems or missing pieces.
- Your proposed implementation plan.

Wait for approval before making major architectural changes.

Once approved, implement the admin dashboard foundation first.

**Our priority is to establish a consistent, reusable frontend foundation before building individual management pages.**