import { getBlogPosts } from '@/lib/api';
import BlogFeed from '@/components/BlogFeed';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

/**
 * Explicit caching engine configuration:
 * cache: 'no-store' ensures runtime Server-Side Rendering (SSR) occurs upon initial request.
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // SSR Asynchronous network call to pull initial blog objects
  const initialPosts = await getBlogPosts();

  return (
    <div className="w-full">
      {/* Hero Section: Monochrome canvas with oversized headline */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-12 border-b border-[var(--color-hairline-soft)]">
        <div className="max-w-[1280px] mx-auto">
          {/* Eyebrow marker */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <span className="type-eyebrow text-[var(--color-ink)] opacity-70">
              SHIYASEEE EDITORIAL · SYSTEM JOURNAL
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="type-display-xl text-[var(--color-ink)] font-normal">
                Stories for people who like color.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-2">
              <p className="type-subhead text-[var(--color-ink)] opacity-80 leading-relaxed mb-6">
                A rigorous monochrome architecture punctuated by bold pastel blocks. Deep dives on design systems, craft, and web engineering.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#feed" className="btn-primary text-sm py-2 px-5">
                  Browse Feed
                </a>
                <a href="#newsletter" className="btn-secondary text-sm py-2 px-5">
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Color Block Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[var(--color-canvas)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-[var(--color-block-lime)] text-[var(--color-ink)] rounded-[var(--radius-lg)] p-6 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-ink)] text-[var(--color-on-primary)] rounded-[var(--radius-pill)] type-caption mb-4 sm:mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-block-lime)]" aria-hidden="true" />
                <span>FEATURED DISPATCH</span>
              </div>
              <h2 className="type-headline text-2xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-[var(--color-ink)] leading-tight">
                Design systems that feel both technical and joyful.
              </h2>
              <p className="type-subhead text-base sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                The marketing canvas is rigorously monochrome, while each story section drops the page into a saturated lime, lavender, cream, mint, or pink panel that reads like a sticky note on a clean desk.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/posts/1"
                  className="btn-primary text-sm py-2.5 px-5 sm:px-6 gap-2"
                >
                  Read Featured Story
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Decorative background visual graphic */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-[20px] border-[var(--color-ink)]/10 pointer-events-none select-none hidden md:block"
            />
          </div>
        </div>
      </section>

      {/* Main Blog Feed Section */}
      <section id="feed" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[var(--color-hairline-soft)]">
            <div>
              <p className="type-eyebrow text-[var(--color-ink)] opacity-60 mb-1">ARCHIVE</p>
              <h2 className="type-display-lg text-[var(--color-ink)] font-normal">
                Latest Publications
              </h2>
            </div>
            <p className="type-body-sm opacity-70 max-w-sm">
              Instantaneous client-side filtering powered by TanStack Query, hydrated from server-rendered snapshots.
            </p>
          </div>

          {/* Client-Side Interactive Feed hydrated with SSR initial data */}
          <BlogFeed initialPosts={initialPosts} />
        </div>
      </section>

      {/* Promo Banner Lilac */}
      <section id="newsletter" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-[var(--color-canvas)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-[var(--color-block-lilac)] text-[var(--color-ink)] rounded-[var(--radius-md)] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[var(--color-ink)]/10">
            <div className="space-y-1">
              <span className="type-caption opacity-70 font-semibold">RELEASE NOTES & DISPATCHES</span>
              <h3 className="type-headline text-xl sm:text-2xl font-bold">Stay ahead of modern design engineering</h3>
              <p className="type-body-sm opacity-80">
                Receive our monthly compilation of architectural breakdowns, code samples, and typography experiments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="developer@company.com"
                aria-label="Email address for subscription"
                className="bg-[var(--color-canvas)] text-[var(--color-ink)] px-4 py-2.5 rounded-[var(--radius-pill)] border border-[var(--color-hairline)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-full sm:w-64"
              />
              <button
                type="button"
                className="btn-magenta-promo text-sm py-2.5 px-6 whitespace-nowrap w-full sm:w-auto"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
