/**
 * React Query Configuration
 *
 * QueryClient 설정 및 기본 옵션
 */

import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Query Client with default options
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus
      refetchOnWindowFocus: false,

      // Retry failed requests
      retry: (failureCount, error) => {
        // Don't retry on 404 or 401
        if (error instanceof AxiosError) {
          if (error.response?.status === 404 || error.response?.status === 401) {
            return false;
          }
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },

      // Stale time: 5 minutes
      staleTime: 5 * 60 * 1000,

      // Cache time: 10 minutes
      gcTime: 10 * 60 * 1000, // formerly cacheTime

      // Error handling
      onError: (error) => {
        console.error('Query Error:', error);

        // Handle 401 Unauthorized
        if (error instanceof AxiosError && error.response?.status === 401) {
          // Trigger global auth error event
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
      },
    },

    mutations: {
      // Retry failed mutations
      retry: false,

      // Error handling
      onError: (error) => {
        console.error('Mutation Error:', error);

        // Handle 401 Unauthorized
        if (error instanceof AxiosError && error.response?.status === 401) {
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }
      },
    },
  },
});

/**
 * Query Keys Factory
 *
 * 일관된 query key 생성을 위한 팩토리
 */
export const queryKeys = {
  // Authentication
  auth: {
    me: ['auth', 'me'] as const,
  },

  // Home
  home: {
    all: ['home'] as const,
    recommendations: ['home', 'recommendations'] as const,
    popularComments: ['home', 'popular-comments'] as const,
    recentComments: ['home', 'recent-comments'] as const,
  },

  // Albums
  albums: {
    all: ['albums'] as const,
    detail: (id: string) => ['albums', 'detail', id] as const,
    rated: ['albums', 'rated'] as const,
  },

  // Tracks
  tracks: {
    all: ['tracks'] as const,
    detail: (id: string) => ['tracks', 'detail', id] as const,
    rated: ['tracks', 'rated'] as const,
  },

  // Artists
  artists: {
    all: ['artists'] as const,
    detail: (id: string) => ['artists', 'detail', id] as const,
    liked: ['artists', 'liked'] as const,
  },

  // Collections
  collections: {
    all: ['collections'] as const,
    detail: (id: number) => ['collections', 'detail', id] as const,
    my: ['collections', 'my'] as const,
    liked: ['collections', 'liked'] as const,
  },

  // Reviews
  reviews: {
    all: ['reviews'] as const,
    detail: (id: number) => ['reviews', 'detail', id] as const,
    my: ['reviews', 'my'] as const,
    forTarget: (targetType: string, targetId: number) =>
      ['reviews', 'target', targetType, targetId] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    detail: (id: number) => ['comments', 'detail', id] as const,
    forCollection: (collectionId: number) =>
      ['comments', 'collection', collectionId] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', 'detail', id] as const,
    myActivity: ['users', 'my-activity'] as const,
    rateRecords: (id: number) => ['users', 'rate-records', id] as const,
  },

  // Search
  search: {
    all: (query: string, type?: string) => ['search', query, type] as const,
  },
} as const;
