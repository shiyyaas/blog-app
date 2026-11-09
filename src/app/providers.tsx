'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper setting up the QueryClientProvider.
 * Hardcodes an optimized dynamic query caching baseline:
 * - staleTime: 5 mins (5 * 60 * 1000)
 * - refetchOnWindowFocus: false
 * Uses React state initialization to prevent cross-request cache pollution in SSR.
 */
export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes cache lifetime
            refetchOnWindowFocus: false, // Prevent distracting refetches on window focus
            retry: 1, // Single retry on transient network errors
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
