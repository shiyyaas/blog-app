import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostById, getBlogPosts } from '@/lib/api';
import { ColorBlockVariant } from '@/types/blog';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Check } from 'lucide-react';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Maps each color token to background and text utilities according to DESIGN.md
 */
const COLOR_SECTION_MAP: Record<ColorBlockVariant, { bg: string; text: string; subtext: string; pill: string }> = {
  'block-lime': {
    bg: 'bg-[var(--color-block-lime)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-lilac': {
    bg: 'bg-[var(--color-block-lilac)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-cream': {
    bg: 'bg-[var(--color-block-cream)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-mint': {
    bg: 'bg-[var(--color-block-mint)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-pink': {
    bg: 'bg-[var(--color-block-pink)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-coral': {
    bg: 'bg-[var(--color-block-coral)]',
    text: 'text-[var(--color-ink)]',
    subtext: 'text-[var(--color-ink)]/80',
    pill: 'bg-[var(--color-ink)] text-[var(--color-on-primary)]',
  },
  'block-navy': {
    bg: 'bg-[var(--color-block-navy)]',
    text: 'text-[var(--color-inverse-ink)]',
    subtext: 'text-[var(--color-inverse-ink)]/80',
    pill: 'bg-[var(--color-canvas)] text-[var(--color-ink)]',
  },
};

/**
 * Dynamic metadata generation loop using descriptive titles and excerpts.
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostById(resolvedParams.id);

  if (!post) {
    return {
      title: 'Story Not Found — Figma Editorial',
      description: 'The requested editorial publication could not be found.',
    };
  }

  return {
    title: `${post.title} — Figma Editorial`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Server component handling server runtime lookups for individual posts.
 * Programmatic fallback routine (notFound()) triggered if article is invalid.
 */
export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostById(resolvedParams.id);

  // Trigger Next.js 404 page if post lookup returns null
  if (!post) {
    notFound();
  }

  // Related posts for footer navigation
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const colorTheme = COLOR_SECTION_MAP[post.colorTheme] || COLOR_SECTION_MAP['block-lime'];

  return (
    <article className="w-full">
      {/* Top back navigation breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 type-button text-sm text-[var(--color-ink)] hover:opacity-75 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-pill)] px-3 py-1.5 transition-opacity"
          aria-label="Back to all editorial stories"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all stories</span>
        </Link>
      </div>

      {/* Signature Color Block Hero Section from DESIGN.md */}
      <section className="px-6 lg:px-12 py-6">
        <div className="max-w-[1280px] mx-auto">
          <div
            className={`${colorTheme.bg} ${colorTheme.text} rounded-[var(--radius-lg)] p-8 sm:p-12 lg:p-16 transition-colors shadow-sm`}
          >
            {/* Meta Category & Read Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <span
                className={`type-caption px-3.5 py-1.5 rounded-[var(--radius-pill)] font-semibold uppercase tracking-wider ${colorTheme.pill}`}
              >
                {post.category}
              </span>
              <div className="flex items-center gap-4 type-caption opacity-80">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Editorial Title */}
            <h1 className="type-display-xl text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-tight leading-[1.05] mb-6">
              {post.title}
            </h1>

            {/* Excerpt Lead Paragraph */}
            <p className={`type-subhead text-xl sm:text-2xl ${colorTheme.subtext} max-w-3xl leading-relaxed`}>
              {post.excerpt}
            </p>

            {/* Author Info within Hero */}
            <div className="pt-10 mt-10 border-t border-current/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full bg-current/10 flex items-center justify-center font-bold text-base"
                >
                  {post.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="type-body font-bold leading-tight">{post.author.name}</p>
                  <p className="type-caption opacity-75">{post.author.role}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-current/10 flex items-center justify-center hover:bg-current/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-current/10 flex items-center justify-center hover:bg-current/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                  aria-label="Bookmark article"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Article Body on White Canvas */}
      <section className="py-16 px-6 lg:px-12 bg-[var(--color-canvas)]">
        <div className="max-w-[800px] mx-auto">
          {/* Main Content Paragraphs */}
          <div className="space-y-8 type-body-lg text-[var(--color-ink)] leading-relaxed font-normal">
            {post.body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="opacity-90">
                {paragraph}
              </p>
            ))}

            {/* Editorial Blockquote */}
            <blockquote className="my-10 pl-6 border-l-4 border-[var(--color-primary)] py-2 italic font-serif text-2xl text-[var(--color-ink)]">
              &ldquo;The interface never reaches for shadows or gradients to do the work that color blocks and confident typography already do.&rdquo;
            </blockquote>

            <p className="opacity-90">
              In practicing high-precision frontend architecture, we establish clear operational bounds. The server acts as an authoritative, SEO-first rendering baseline while client query layers handle reactive client state.
            </p>

            <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] space-y-4 my-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-semantic-success)]">
                <Check className="w-4 h-4" />
                <span>DESIGN SYSTEM PRINCIPLE</span>
              </div>
              <h3 className="type-headline text-xl font-bold">Key Architectural Takeaway</h3>
              <p className="type-body text-[var(--color-ink)] opacity-80">
                Notice how white space is used deliberately: between every colored panel and the next, the canvas returns to pure white with 96px of breathing room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-12 border-t border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="type-eyebrow opacity-60">NEXT STORIES</p>
                <h2 className="type-headline text-2xl font-bold">Continue Reading</h2>
              </div>
              <Link href="/" className="btn-secondary text-xs sm:text-sm py-1.5 px-4">
                View all stories
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <div
                  key={related.id}
                  className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="type-caption opacity-60 mb-2 block">{related.category}</span>
                    <h3 className="type-card-title text-xl mb-2">
                      <Link
                        href={`/posts/${related.id}`}
                        className="hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-xs)]"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="type-body-sm opacity-70 line-clamp-2">{related.excerpt}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[var(--color-hairline-soft)] flex items-center justify-between type-caption opacity-60">
                    <span>{related.author.name}</span>
                    <span>{related.formattedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
