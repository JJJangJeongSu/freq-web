/**
 * Liked Artists Paginated Hook
 *
 * 좋아요한 아티스트 목록 조회를 위한 paginated hook
 * Infinite scroll을 지원합니다.
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import { usePagination } from './usePagination';
import type { PaginationInfo, CollectionSortBy, ScrollMode } from '@/types/pagination';

interface LikedArtist {
  artistId: number;
  name: string;
  imageUrl?: string;
  followerCount?: number;
  likedDate: string;
}

interface UseLikedArtistsPaginatedReturn {
  // 데이터
  artists: LikedArtist[];
  pagination: PaginationInfo | null;

  // 상태
  loading: boolean;
  error: Error | null;

  // Pagination 컨트롤
  page: number;
  sortBy: CollectionSortBy;
  setSortBy: (sortBy: CollectionSortBy) => void;

  // 액션
  loadMore: () => void;
  refresh: () => void;
  hasMore: boolean;
}

/**
 * 좋아요한 아티스트 목록 paginated hook
 */
export function useLikedArtistsPaginated(
  mode: ScrollMode = 'infinite'
): UseLikedArtistsPaginatedReturn {
  const {
    page,
    limit,
    sortBy,
    setSortBy,
    nextPage,
    setPage
  } = usePagination<CollectionSortBy>({
    initialSortBy: 'recent',
    initialLimit: 20
  });

  const [artists, setArtists] = useState<LikedArtist[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchArtists = useCallback(async (append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching liked artists:', { page, limit, sortBy, append });

      // API 호출: GET /users/me/liked-artist
      const response = await apiService.users.getLikedArtists_1(
        sortBy,
        page,
        limit
      );

      const responseData = response.data;

      if (!responseData.success || !responseData.data) {
        throw new Error('Failed to fetch liked artists');
      }

      const data = responseData.data as any;
      const fetchedArtists = data.artists || [];
      const paginationData = data.pagination;

      if (append && mode === 'infinite') {
        setArtists(prev => [...prev, ...fetchedArtists]);
      } else {
        setArtists(fetchedArtists);
      }

      setPagination(paginationData);

      console.log('✅ Liked artists fetched:', {
        count: fetchedArtists.length,
        total: paginationData?.totalItems,
        hasNext: paginationData?.hasNext
      });
    } catch (err: any) {
      console.error('❌ Failed to fetch liked artists:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '좋아요한 아티스트를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, mode]);

  useEffect(() => {
    const append = page > 1;
    fetchArtists(append);
  }, [page, sortBy, fetchArtists]);

  const handleSetSortBy = useCallback((newSortBy: CollectionSortBy) => {
    console.log('🔄 Sort changed:', newSortBy);
    setArtists([]);
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
    console.log('🔄 Refreshing liked artists');
    setArtists([]);
    setPage(1);
  }, [setPage]);

  return {
    artists,
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
