/**
 * Rated Tracks Paginated Hook
 *
 * 평가한 트랙 목록 조회를 위한 paginated hook
 * Infinite scroll을 지원합니다.
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import { usePagination } from './usePagination';
import type { PaginationInfo, ScrollMode } from '@/types/pagination';

// Sort type for rated tracks
export type RatedTrackSortBy = 'recent' | 'old';

interface RatedTrack {
  trackId: number;
  title: string;
  artist: string;
  albumTitle?: string;
  coverUrl?: string;
  rating: number;
  ratedDate: string;
  reviewId?: number;
}

interface UseRatedTracksPaginatedReturn {
  // 데이터
  tracks: RatedTrack[];
  pagination: PaginationInfo | null;

  // 상태
  loading: boolean;
  error: Error | null;

  // Pagination 컨트롤
  page: number;
  sortBy: RatedTrackSortBy;
  setSortBy: (sortBy: RatedTrackSortBy) => void;

  // 액션
  loadMore: () => void;
  refresh: () => void;
  hasMore: boolean;
}

/**
 * 평가한 트랙 목록 paginated hook
 */
export function useRatedTracksPaginated(
  mode: ScrollMode = 'infinite'
): UseRatedTracksPaginatedReturn {
  const {
    page,
    limit,
    sortBy,
    setSortBy,
    nextPage,
    setPage
  } = usePagination<RatedTrackSortBy>({
    initialSortBy: 'recent',
    initialLimit: 20
  });

  const [tracks, setTracks] = useState<RatedTrack[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTracks = useCallback(async (append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem('userId');

      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      console.log('🔍 Fetching rated tracks:', { userId, page, limit, sortBy, append });

      const response = await apiService.users.getUserRatedTracks(
        parseInt(userId),
        sortBy,
        page,
        limit
      );

      const responseData = response.data;

      if (!responseData.success || !responseData.data) {
        throw new Error('Failed to fetch rated tracks');
      }

      const data = responseData.data as any;
      const fetchedTracks = data.tracks || [];
      const paginationData = data.pagination;

      if (append && mode === 'infinite') {
        setTracks(prev => [...prev, ...fetchedTracks]);
      } else {
        setTracks(fetchedTracks);
      }

      setPagination(paginationData);

      console.log('✅ Rated tracks fetched:', {
        count: fetchedTracks.length,
        total: paginationData?.totalItems,
        hasNext: paginationData?.hasNext
      });
    } catch (err: any) {
      console.error('❌ Failed to fetch rated tracks:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '평가한 트랙을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, mode]);

  useEffect(() => {
    const append = page > 1;
    fetchTracks(append);
  }, [page, sortBy, fetchTracks]);

  const handleSetSortBy = useCallback((newSortBy: RatedTrackSortBy) => {
    console.log('🔄 Sort changed:', newSortBy);
    setTracks([]);
    setPage(1);
    setSortBy(newSortBy);
  }, [setSortBy, setPage]);

  const loadMore = useCallback(() => {
    if (pagination?.hasNext && !loading) {
      console.log('📄 Loading next page:', page + 1);
      nextPage();
    }
  }, [pagination?.hasNext, loading, nextPage, page]);

  const refresh = useCallback(() => {
    console.log('🔄 Refreshing rated tracks');
    setTracks([]);
    setPage(1);
  }, [setPage]);

  return {
    tracks,
    pagination,
    loading,
    error,
    page,
    sortBy,
    setSortBy: handleSetSortBy,
    loadMore,
    refresh,
    hasMore: pagination?.hasNext ?? false
  };
}
