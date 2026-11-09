import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-lg w-full text-center p-10 bg-[var(--color-surface-soft)] rounded-[var(--radius-lg)] border border-[var(--color-hairline)] shadow-sm">
        <span className="type-caption text-[var(--color-ink)] opacity-60 mb-2 block font-semibold">
          ERROR 404
        </span>
        <h1 className="type-display-lg text-4xl font-bold mb-4 text-[var(--color-ink)]">
          Publication Not Found
        </h1>
        <p className="type-body text-[var(--color-ink)] opacity-75 mb-8">
          The requested article does not exist or may have been relocated.
        </p>
        <Link
          href="/"
          className="btn-primary text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Stories</span>
        </Link>
      </div>
    </div>
  );
}
