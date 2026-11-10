# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Start production server**: `npm run start`
- **Lint**: `npm run lint`

## Architecture & Code Structure

This repository is an editorial blog application built with Next.js (App Router), React 19, TypeScript, TanStack React Query, and Tailwind CSS v4.

### Design System & Styling
- The design system implements an editorial canvas specified in `DESIGN.md`: a monochrome frame (using Inter as `figmaSans` and JetBrains Mono as `figmaMono`) with pastel color block panels (`block-lime`, `block-lilac`, `block-cream`, `block-mint`, `block-pink`, `block-coral`, `block-navy`).
- Theme tokens and custom component utilities (`type-display-xl`, `type-headline`, `type-eyebrow`, `btn-primary`, `btn-secondary`, `btn-magenta-promo`, etc.) are declared in `src/app/globals.css`.

### Hybrid SSR + Reactive Query Architecture
- **Data Layer (`src/lib/api.ts`)**: `getBlogPosts()` and `getBlogPostById(id)` fetch runtime data from JSONPlaceholder with `cache: 'no-store'` for SSR. Data is transformed with editorial metadata (authors, categories, read times, color block themes) and falls back gracefully to `FALLBACK_POSTS` on network failure.
- **Client Query Provider (`src/app/providers.tsx`)**: Sets up TanStack `@tanstack/react-query` `QueryClient` inside React state to prevent cross-request cache pollution during SSR.
- **Home Feed (`src/app/page.tsx` & `src/components/BlogFeed.tsx`)**: Home page forces dynamic SSR (`force-dynamic`), fetches initial posts on the server, and hydrates `BlogFeed.tsx` for client-side search, category filtering, and interactive state.
- **Post Detail (`src/app/posts/[id]/page.tsx`)**: Dynamic SSR page generating article metadata via `generateMetadata`, displaying a dynamic color block hero matching the post's assigned `colorTheme`, rendering article body, and suggesting related posts.
