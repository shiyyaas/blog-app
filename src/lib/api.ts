import { BlogPost, ColorBlockVariant } from '@/types/blog';

/**
 * Editorial color rotation mapping from DESIGN.md palette tokens.
 */
const COLOR_THEMES: ColorBlockVariant[] = [
  'block-lime',
  'block-lilac',
  'block-cream',
  'block-mint',
  'block-pink',
  'block-coral',
  'block-navy',
];

const AUTHORS = [
  { name: 'Dylan Field', role: 'Co-founder & CEO' },
  { name: 'Sho Kuwamoto', role: 'VP of Product' },
  { name: 'Rasmus Andersson', role: 'Principal Designer' },
  { name: 'Marcin Wichary', role: 'Design Director' },
  { name: 'Jenny Arden', role: 'Chief Design Officer' },
];

const CATEGORIES = [
  'Design Systems',
  'Product Updates',
  'Engineering',
  'Culture & Community',
  'Tutorials',
];

/**
 * Robust mock posts fallback matching DESIGN.md editorial style
 * in case external network requests fail or return unexpected status.
 */
export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Building a Confident Editorial Frame with Color Blocks',
    body: 'The marketing canvas is rigorously monochrome — figmaSans variable type, pure white surfaces, pure black ink, pill-shaped CTAs — while each story section drops the page into a saturated lime, lavender, cream, mint, or pink panel that reads like a sticky note placed on a clean desk. The result is a design system that feels both technical and joyful — a tool for serious work, made by people who like color.\n\nWhite space is used to make the color blocks feel deliberate. Between every colored panel and the next, the page returns to white canvas with 96px of breathing room. Inside a color block, the type itself is given generous side margins so the panel reads as a poster, not a wall of copy.',
    excerpt: 'How monochrome frames combined with oversized pastel color blocks create an intentional editorial rhythm.',
    author: AUTHORS[0],
    date: '2025-05-12',
    formattedDate: 'MAY 12, 2025',
    readTime: '4 MIN READ',
    category: 'Design Systems',
    colorTheme: 'block-lime',
  },
  {
    id: 2,
    title: 'Precision in Typography: Exercising Variable Weights',
    body: 'Our proprietary typeface figmaSans operates across fine increments (320, 330, 340, 480, 540, 700) to express hierarchy without jumping through drastically different font families. On marketing surfaces, we do not rely on washed-out gray text; weight carries hierarchy rather than opacity.\n\nTight negative letter-spacing on display sizes (-1.72px at 86px, -0.96px at 64px) creates a confident editorial cadence, while figmaMono is reserved strictly for section markers, eyebrows, and captions.',
    excerpt: 'Weight, not size or color dilution, carries reading hierarchy in modern high-density typography.',
    author: AUTHORS[1],
    date: '2025-05-08',
    formattedDate: 'MAY 8, 2025',
    readTime: '6 MIN READ',
    category: 'Engineering',
    colorTheme: 'block-lilac',
  },
  {
    id: 3,
    title: 'Pill CTAs and Circular Actions: The Shape of Modern Interfaces',
    body: 'Pill is the only text button shape across our entire design system — 50px border radius for primary and secondary actions, and 9999px circular boundaries for icon triggers. No square buttons appear anywhere on the marketing surface.\n\nWhen we pair button-primary and button-secondary together, the black-and-white counterpart creates a recognizable brand signature that feels tactile, confident, and distinctly intentional.',
    excerpt: 'Examining why strict geometric constraints around button shapes reinforce brand cohesion.',
    author: AUTHORS[2],
    date: '2025-04-29',
    formattedDate: 'APR 29, 2025',
    readTime: '3 MIN READ',
    category: 'Product Updates',
    colorTheme: 'block-cream',
  },
  {
    id: 4,
    title: 'The Sticky Note Philosophy: Bringing Playfulness to Canvas',
    body: 'Pastel sections mimic large hand-cut sticky notes laid across a crisp desktop. In FigJam and long-form editorial stories, this creates an approachable atmosphere without compromising operational rigour.\n\nBy ensuring that no more than one color block is visible simultaneously, each colored narrative section achieves maximum visual punch while maintaining calm structural balance.',
    excerpt: 'Translating physical brainstorming artifacts into digital layout primitives and full-bleed modules.',
    author: AUTHORS[3],
    date: '2025-04-18',
    formattedDate: 'APR 18, 2025',
    readTime: '5 MIN READ',
    category: 'Culture & Community',
    colorTheme: 'block-mint',
  },
  {
    id: 5,
    title: 'Architecting Hybrid Data Flows with Next.js and TanStack Query',
    body: 'Modern web applications require the instantaneous indexing benefits of Server-Side Rendering (SSR) along with the fluid, zero-latency feedback of client-side cache layers.\n\nBy generating initial HTML payloads directly during runtime server passes and seeding the TanStack React Query cache on hydration, users enjoy immediate SEO compliance and blazing-fast search queries across our complete post archive.',
    excerpt: 'A comprehensive architecture guide for unifying SSR SEO indexing with client-side reactive queries.',
    author: AUTHORS[4],
    date: '2025-04-02',
    formattedDate: 'APR 2, 2025',
    readTime: '7 MIN READ',
    category: 'Engineering',
    colorTheme: 'block-navy',
  },
  {
    id: 6,
    title: 'Accessible by Default: Focus States and High Contrast Semantics',
    body: 'Design systems must never sacrifice accessibility for aesthetic minimalism. By enforcing explicit 2px focus outlines, high-contrast black/white foreground ratios, and semantic header/main/footer landmarks, our digital publications remain accessible to every creator.\n\nEvery interactive element provides appropriate ARIA labels and follows keyboard interaction specs.',
    excerpt: 'Ensuring rigorous accessibility compliance and clear keyboard focus states in high-contrast design systems.',
    author: AUTHORS[0],
    date: '2025-03-24',
    formattedDate: 'MAR 24, 2025',
    readTime: '4 MIN READ',
    category: 'Tutorials',
    colorTheme: 'block-coral',
  },
];

/**
 * Format raw data from JSONPlaceholder or fallback into a strongly-typed BlogPost.
 */
function transformRawPost(raw: { id: number; title: string; body: string }, index: number): BlogPost {
  const fallback = FALLBACK_POSTS.find((p) => p.id === raw.id);
  if (fallback) {
    return fallback;
  }

  // Capitalize title
  const formattedTitle = raw.title.charAt(0).toUpperCase() + raw.title.slice(1);
  const colorIndex = (raw.id - 1) % COLOR_THEMES.length;
  const authorIndex = (raw.id - 1) % AUTHORS.length;
  const categoryIndex = (raw.id - 1) % CATEGORIES.length;

  const dateObj = new Date(Date.now() - raw.id * 86400000 * 3);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  const excerpt = raw.body.slice(0, 110).replace(/\n/g, ' ') + '...';

  return {
    id: raw.id,
    title: formattedTitle,
    body: raw.body,
    excerpt,
    author: AUTHORS[authorIndex],
    date: dateObj.toISOString().split('T')[0],
    formattedDate,
    readTime: `${Math.max(3, (raw.id % 5) + 3)} MIN READ`,
    category: CATEGORIES[categoryIndex],
    colorTheme: COLOR_THEMES[colorIndex],
  };
}

/**
 * Fetches all blog posts at runtime with `cache: 'no-store'` for SSR.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[getBlogPosts] API responded with ${res.status}. Using fallback posts.`);
      return FALLBACK_POSTS;
    }

    const data: Array<{ id: number; title: string; body: string }> = await res.json();
    return data.map((post, idx) => transformRawPost(post, idx));
  } catch (error) {
    console.error('[getBlogPosts] Network failure, utilizing reliable fallback dataset:', error);
    return FALLBACK_POSTS;
  }
}

/**
 * Fetches an individual blog post by ID with `cache: 'no-store'` for runtime SSR.
 * Returns null if post is not found.
 */
export async function getBlogPostById(id: string | number): Promise<BlogPost | null> {
  const numericId = Number(id);
  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  // Check fallback posts first if within known IDs
  const localFallback = FALLBACK_POSTS.find((p) => p.id === numericId);

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${numericId}`, {
      cache: 'no-store',
    });

    if (res.status === 404) {
      return localFallback || null;
    }

    if (!res.ok) {
      return localFallback || null;
    }

    const data: { id: number; title: string; body: string } = await res.json();
    if (!data || !data.id) {
      return localFallback || null;
    }

    return transformRawPost(data, numericId);
  } catch (error) {
    console.error(`[getBlogPostById] Error fetching post ${numericId}:`, error);
    return localFallback || null;
  }
}
