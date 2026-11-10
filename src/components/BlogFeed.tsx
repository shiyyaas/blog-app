'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { BlogPost, ColorBlockVariant } from '@/types/blog';
import { Search, ArrowRight, Tag, Calendar, Clock, X } from 'lucide-react';

interface BlogFeedProps {
  initialPosts: BlogPost[];
}

/**
 * Color map connecting ColorBlockVariant tokens from DESIGN.md to Tailwind classes
 */
const COLOR_BLOCK_BG: Record<ColorBlockVariant, string> = {
  'block-lime': 'bg-[var(--color-block-lime)] text-[var(--color-ink)]',
  'block-lilac': 'bg-[var(--color-block-lilac)] text-[var(--color-ink)]',
  'block-cream': 'bg-[var(--color-block-cream)] text-[var(--color-ink)]',
  'block-pink': 'bg-[var(--color-block-pink)] text-[var(--color-ink)]',
  'block-mint': 'bg-[var(--color-block-mint)] text-[var(--color-ink)]',
  'block-coral': 'bg-[var(--color-block-coral)] text-[var(--color-ink)]',
  'block-navy': 'bg-[var(--color-block-navy)] text-[var(--color-inverse-ink)]',
};

const CATEGORIES = [
  'All',
  'Design Systems',
  'Product Updates',
  'Engineering',
  'Culture & Community',
  'Tutorials',
];

/**
 * BlogFeed: Interactive client workspace hub receiving pre-rendered SSR articles.
 * Injects initial SSR state into TanStack React Query for instantaneous live filtering and dynamic caching.
 */
export default function BlogFeed({ initialPosts }: BlogFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // TanStack React Query hydrating the SSR payload
  const { data: posts = initialPosts } = useQuery<BlogPost[]>({
    queryKey: ['posts'],
    queryFn: async () => initialPosts,
    initialData: initialPosts,
    staleTime: Infinity,
  });

  // Real-time live filtering by title, excerpt, body, and category
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;
      if (!query) return true;

      const titleMatch = post.title.toLowerCase().includes(query);
      const bodyMatch = post.body.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const authorMatch = post.author.name.toLowerCase().includes(query);

      return titleMatch || bodyMatch || excerptMatch || authorMatch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Accessible Search Input conforming to DESIGN.md text-input specs */}
          <div className="relative w-full md:w-[380px]">
            <label htmlFor="blog-search" className="sr-only">
              Search articles by title, content, or author
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-ink)] opacity-50 z-10">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <input
              id="blog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, topics, or authors..."
              className="w-full pl-10 pr-10 py-2.5 text-[16px] bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all placeholder:text-[var(--color-ink)]/40 shadow-sm"
              aria-label="Search stories, topics, or authors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-ink)] opacity-50 hover:opacity-100 transition-opacity z-10"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Results Counter */}
          <div className="type-caption opacity-60 self-start md:self-auto flex items-center gap-1">
            <span>SHOWING</span>
            <span className="font-bold text-[var(--color-ink)]">{filteredPosts.length}</span>
            <span>OF {posts.length} STORIES</span>
          </div>
        </div>

        {/* Category Pill Filters strictly matching pricing-tab-default and pricing-tab-selected */}
        <div
          role="tablist"
          aria-label="Filter stories by category"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`type-button text-[14px] px-4 py-2 rounded-[var(--radius-pill)] border transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] shadow-sm'
                    : 'bg-[var(--color-canvas)] text-[var(--color-ink)] border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 px-6 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
          <p className="type-headline mb-2">No matching stories found</p>
          <p className="type-body text-[var(--color-ink)] opacity-70 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any stories matching &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="btn-primary text-sm py-2 px-5"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Grid of Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => {
          const colorClass = COLOR_BLOCK_BG[post.colorTheme];
          const isFeatured = index === 0 && !searchQuery && selectedCategory === 'All';

          return (
            <article
              key={post.id}
              className={`group relative flex flex-col justify-between bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[var(--color-primary)]/40 focus-within:ring-2 focus-within:ring-[var(--color-primary)] ${
                isFeatured ? 'md:col-span-2 lg:col-span-3 lg:p-8' : ''
              }`}
            >
              <div>
                {/* Micro Color Accent Header Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-sm)] type-caption font-semibold ${colorClass}`}
                  >
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 type-caption opacity-80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {post.formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h3
                  className={`${
                    isFeatured ? 'type-display-lg text-2xl sm:text-3xl md:text-4xl' : 'type-card-title text-xl sm:text-2xl'
                  } text-[var(--color-ink)] mb-3 group-hover:underline underline-offset-4 line-clamp-2`}
                >
                  <Link
                    href={`/posts/${post.id}`}
                    className="focus:outline-none rounded-[var(--radius-xs)] after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt Body */}
                <p className="type-body text-[var(--color-ink)] opacity-80 line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Footer Meta info */}
              <div className="pt-6 border-t border-[var(--color-hairline-soft)] flex items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] flex items-center justify-center font-bold text-xs"
                  >
                    {post.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="type-body-sm font-semibold leading-tight text-[var(--color-ink)]">
                      {post.author.name}
                    </p>
                    <p className="type-caption opacity-80">{post.author.role}</p>
                  </div>
                </div>

                <div
                  className="w-8 h-8 rounded-full bg-[var(--color-surface-soft)] flex items-center justify-center text-[var(--color-ink)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
