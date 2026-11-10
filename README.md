# Shiyaseee Editorial — Blog App

A responsive editorial blog built with **Next.js App Router**, **React 19**, **TypeScript**, **TanStack Query**, and **Tailwind CSS v4**. The project was created for the **Next.js Blog App Development** challenge, with a focus on server-rendered content, dynamic article routes, interactive discovery, accessibility, and a distinctive editorial design system.

## Live Demo

[Open the deployed blog app](https://blog-app-one-pied.vercel.app)

## Project Challenge

This project addresses the challenge requirements by implementing:

- Server-rendered blog listings and article pages.
- Dynamic routes for individual posts.
- Search and category filtering in the blog feed.
- Responsive styling with Tailwind CSS and a documented design system.
- Page and article metadata for SEO and social sharing.
- Accessible navigation, labels, and keyboard focus treatments.

## Features

- **Editorial home page:** A monochrome canvas, oversized typography, pastel color-block panels, featured story, article feed, and newsletter-style promotion.
- **SSR blog feed:** The home page requests its initial post data on the server at runtime. The rendered posts are passed to the interactive client feed.
- **Search and category filters:** Search post titles, excerpts, article text, and author names, or filter by category. The feed includes a result count and an empty state with a clear-filters action.
- **Dynamic article pages:** Visit `/posts/[id]` to read an article, view its category, author, date, and estimated reading time, and find related stories.
- **SEO metadata:** Article pages generate titles, descriptions, Open Graph metadata, and Twitter card metadata from the post.
- **Resilient mock data:** Posts come from JSONPlaceholder and are enriched with editorial authors, categories, dates, reading times, and color themes. A local fallback dataset is used if the API request fails.
- **Responsive and accessible UI:** Semantic page structure, a skip-to-content link, labeled search input, accessible controls, and visible keyboard focus styles.
- **Design system:** Shared CSS tokens and component utilities are documented in [`DESIGN.md`](DESIGN.md).

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide](https://lucide.dev/) icons
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock posts API

## Getting Started

### Prerequisites

- Node.js (20.9 or newer recommended)
- npm

### Install and run

```bash
git clone https://github.com/shiyyaas/blog-app.git
cd blog-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server (run after building). |
| `npm run lint` | Run the configured lint command. |

## How It Works

### Data and rendering

`src/lib/api.ts` fetches up to 12 posts from JSONPlaceholder with `cache: 'no-store'`, so post data is requested at runtime. API data is transformed into the app's `BlogPost` model with editorial metadata. If the request fails, the app returns its local fallback posts instead.

The home route (`src/app/page.tsx`) is configured for dynamic rendering and fetches posts on the server. It passes those posts to `src/components/BlogFeed.tsx`, where TanStack Query receives the server-provided posts as initial data and the user can filter them interactively. The QueryClient is created in `src/app/providers.tsx` and configured with a five-minute stale time.

### Article routes

The route `src/app/posts/[id]/page.tsx` loads an individual post by ID, renders a not-found page for unknown IDs, generates post-specific metadata, and displays related posts. Article color-block styling is selected using the post's assigned theme.

### Design and accessibility

The visual system uses a black-and-white editorial frame with lime, lilac, cream, mint, pink, coral, and navy color blocks. Inter and JetBrains Mono provide the sans-serif and monospace typography. Design tokens and styling guidance are in `DESIGN.md`, with application styles in `src/app/globals.css`.

The shared layout includes semantic header, navigation, main, and footer regions, a keyboard-accessible skip link, and clear focus treatments. Search controls have accessible labels, and decorative icons are hidden from assistive technology where appropriate.

## Project Structure

```text
src/
├── app/
│   ├── posts/[id]/page.tsx  # Dynamic article route and metadata
│   ├── globals.css          # Theme tokens and shared Tailwind utilities
│   ├── layout.tsx           # Root layout, metadata, navigation, and footer
│   ├── page.tsx             # Dynamic SSR home page
│   └── providers.tsx        # TanStack Query provider
├── components/
│   └── BlogFeed.tsx         # Interactive search, filters, and post cards
├── lib/
│   └── api.ts               # API fetching, transformation, and fallbacks
└── types/
    └── blog.ts              # Blog post and theme types
```

## Screenshots

Add screenshots of the home page and an article page here when preparing a project submission. For example, place image files in a `screenshots/` directory and reference them with Markdown image links.

## Notes

- The app uses JSONPlaceholder as a mock content API; it is not backed by a production CMS or database.
- The newsletter area is a visual UI and does not currently submit email addresses to a service.
- Share and bookmark controls are presented in the article UI; no persistence or share workflow is currently configured.

## License

This project is available under the [MIT License](LICENSE).
