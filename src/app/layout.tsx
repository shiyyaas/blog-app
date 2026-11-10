import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import Providers from './providers';
import './globals.css';

/**
 * Configure font rendering optimization utilizing custom typography text variables.
 * DESIGN.md specifies figmaSans (sans-serif) and figmaMono (monospace) with fallbacks:
 * - Sans: Inter (matches the fine-grained variable weight axis: 320, 330, 340, 480, 540, 700)
 * - Mono: JetBrains Mono (uppercase, positive tracking for eyebrows and captions)
 */
const shiyaseeeSans = Inter({
  variable: '--font-shiyaseee-sans',
  subsets: ['latin'],
  display: 'swap',
});

const shiyaseeeMono = JetBrains_Mono({
  variable: '--font-shiyaseee-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shiyaseee Editorial — Design Systems & Engineering',
  description:
    'A confident black-and-white editorial frame interrupted by oversized, hand-cut pastel color blocks. Serious engineering work made with color.',
  authors: [{ name: 'Shiyaseee Editorial Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${shiyaseeeSans.variable} ${shiyaseeeMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-ink)] antialiased">
        <Providers>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--color-primary)] focus:text-[var(--color-on-primary)] focus:px-4 focus:py-2 focus:rounded-[var(--radius-pill)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm font-medium"
          >
            Skip to main content
          </a>

          {/* Top Marquee Ribbon */}
          <div
            role="region"
            aria-label="Announcement"
            className="bg-[var(--color-inverse-canvas)] text-[var(--color-inverse-ink)] h-[36px] flex items-center justify-center px-4 overflow-hidden border-b border-[var(--color-hairline-soft)] select-none"
          >
            <p className="type-caption tracking-widest text-center truncate">
              SHIYASEEE SYSTEM RELEASE · HYBRID SSR + CLIENT QUERY CACHE ENGINE · SPRING 2025
            </p>
          </div>

          {/* Top Navigation */}
          <header className="sticky top-0 z-40 bg-[var(--color-canvas)]/95 backdrop-blur-md border-b border-[var(--color-hairline)] h-[56px] transition-colors">
            <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
              {/* Brand Logo & Editorial Title */}
              <div className="flex items-center gap-3 sm:gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-sm)]"
                  aria-label="Shiyaseee Editorial Blog Home"
                >
                  {/* Geometric logo mark */}
                  <span
                    aria-hidden="true"
                    className="inline-block w-4 h-4 rounded-full bg-[var(--color-primary)] group-hover:scale-110 transition-transform"
                  />
                  <span className="font-bold tracking-tight text-lg sm:text-xl text-[var(--color-ink)]">
                    Shiyaseee
                  </span>
                  <span className="type-caption text-[var(--color-ink)] opacity-70 ml-1 hidden sm:inline-block">
                    / EDITORIAL
                  </span>
                </Link>
              </div>

              {/* Navigation Links and Action Pills */}
              <nav aria-label="Global Navigation" className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/"
                  className="hidden md:inline-block type-body-sm hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-sm)] px-2 py-1"
                >
                  All Stories
                </Link>
                <a
                  href="#feed"
                  className="btn-secondary text-xs sm:text-sm py-1.5 px-3 sm:px-4"
                  aria-label="Browse all stories"
                >
                  Explore
                </a>
                <a
                  href="#newsletter"
                  className="btn-primary text-xs sm:text-sm py-1.5 px-3 sm:px-4"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </a>
              </nav>
            </div>
          </header>

          {/* Main Content Area */}
          <main id="main-content" className="flex-1 focus:outline-none">
            {children}
          </main>

          {/* Global Semantic Footer */}
          <footer className="bg-[var(--color-canvas)] text-[var(--color-ink)] border-t border-[var(--color-hairline)] py-12 sm:py-16 px-4 sm:px-6 lg:px-12 mt-16 sm:mt-24">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
                <div className="sm:col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block w-4 h-4 rounded-full bg-[var(--color-primary)]" />
                    <span className="font-bold text-2xl tracking-tight">Shiyaseee</span>
                  </div>
                  <p className="type-body-sm text-[var(--color-ink)] opacity-80 leading-relaxed">
                    An independent editorial journal exploring the intersection of design systems, typography, and web engineering.
                  </p>
                </div>

                <div>
                  <h3 className="type-caption tracking-wider mb-4 opacity-60">TOPICS</h3>
                  <ul className="space-y-2 type-body-sm">
                    <li><a href="#feed" className="hover:underline">Design Systems</a></li>
                    <li><a href="#feed" className="hover:underline">Web Engineering</a></li>
                    <li><a href="#feed" className="hover:underline">UI Architecture</a></li>
                    <li><a href="#feed" className="hover:underline">Tutorials</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="type-caption tracking-wider mb-4 opacity-60">RESOURCES</h3>
                  <ul className="space-y-2 type-body-sm">
                    <li><Link href="/" className="hover:underline">Editorial Blog</Link></li>
                    <li><a href="#newsletter" className="hover:underline">Newsletter</a></li>
                    <li><a href="#feed" className="hover:underline">Archive</a></li>
                    <li><a href="#" className="hover:underline">Documentation</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="type-caption tracking-wider mb-4 opacity-60">CONNECT</h3>
                  <p className="type-body-sm mb-4 opacity-80">
                    Stay up-to-date with product breakthroughs and editorial deep-dives.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center hover:bg-[var(--color-hairline)] transition-colors"
                      aria-label="X / Twitter"
                    >
                      <span className="type-caption font-bold">X</span>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center hover:bg-[var(--color-hairline)] transition-colors"
                      aria-label="GitHub"
                    >
                      <span className="type-caption font-bold">GH</span>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center hover:bg-[var(--color-hairline)] transition-colors"
                      aria-label="YouTube"
                    >
                      <span className="type-caption font-bold">YT</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--color-hairline-soft)] flex flex-col sm:flex-row items-center justify-between gap-4 type-caption opacity-60">
                <p>© {new Date().getFullYear()} Shiyaseee, Inc. All rights reserved.</p>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:underline">Terms of Service</a>
                  <a href="#" className="hover:underline">Cookie Settings</a>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
