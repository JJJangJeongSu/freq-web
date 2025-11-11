/**
 * User Rated Tracks Paginated Hook
 *
 * 특정 사용자의 평가한 트랙 목록 조회를 위한 paginated hook
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

interface UseUserRatedTracksPaginatedReturn {
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
 * 특정 사용자의 평가한 트랙 목록 paginated hook
 *
 * @param userId - 사용자 ID
 * @param mode - 'infinite' (기본값) 또는 'paginated'
 * @returns tracks, pagination 정보 및 액션
 *
 * @example
 * ```typescript
 * const { userId } = useParams();
 * const {
 *   tracks,
 *   loading,
 *   sortBy,
 *   setSortBy,
 *   loadMore,
 *   hasMore
 * } = useUserRatedTracksPaginated(Number(userId), 'infinite');
 * ```
 */
export function useUserRatedTracksPaginated(
  userId: number,
  mode: ScrollMode = 'infinite'
): UseUserRatedTracksPaginatedReturn {
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

  /**
   * 트랙 데이터 fetch
   * @param append - true면 기존 데이터에 추가, false면 교체
   */
  const fetchTracks = useCallback(async (append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching user rated tracks:', { userId, page, limit, sortBy, append });

      // API 호출: GET /users/{userId}/rated-tracks
      const response = await apiService.users.getUserRatedTracks(
        userId,
        sortBy,
        page,
        limit
      );

      // 응답 unwrap
      const responseData = response.data;

      if (!responseData.success || !responseData.data) {
        throw new Error('Failed to fetch rated tracks');
      }

      const data = responseData.data as any;
      const fetchedTracks = data.tracks || [];
      const paginationData = data.pagination;

      if (append && mode === 'infinite') {
        // Infinite scroll: 기존 데이터에 추가
        setTracks(prev => [...prev, ...fetchedTracks]);
      } else {
        // Paginated: 새로운 데이터로 교체
        setTracks(fetchedTracks);
      }

      setPagination(paginationData);

      console.log('✅ User rated tracks fetched:', {
        count: fetchedTracks.length,
        total: paginationData?.totalItems,
        hasNext: paginationData?.hasNext
      });
    } catch (err: any) {
      console.error('❌ Failed to fetch user rated tracks:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '평가한 트랙을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [userId, page, limit, sortBy, mode]);

  // 초기 로드 및 page/sortBy 변경 시 자동 fetch
  useEffect(() => {
    // page가 1이면 새로운 데이터로 교체, 아니면 추가
    const append = page > 1;
    fetchTracks(append);
  }, [page, sortBy, fetchTracks]);

  /**
   * Sort 변경 핸들러
   * Sort 변경 시 데이터 클리어 및 페이지 리셋
   */
  const handleSetSortBy = useCallback((newSortBy: RatedTrackSortBy) => {
    console.log('🔄 Sort changed:', newSortBy);
    setTracks([]);  // 기존 데이터 클리어
    setPage(1);          // 첫 페이지로 리셋
    setSortBy(newSortBy);
  }, [setSortBy, setPage]);

  /**
   * 다음 페이지 로드 (Infinite scroll)
   */
  const loadMore = useCallback(() => {
    if (pagination?.hasNext && !loading) {
      nextPage();
    }
  }, [pagination?.hasNext, loading, nextPage]);

  /**
   * 새로고침 (첫 페이지부터 다시 로드)
   */
  const refresh = useCallback(() => {
    console.log('🔄 Refreshing user rated tracks');
    setTracks([]);
    setPage(1);
    // setPage(1)이 useEffect를 트리거하여 자동으로 fetch됨
  }, [setPage]);

  return {
    // 데이터
    tracks,
    pagination,

    // 상태
    loading,
    error,

    // Pagination 컨트롤
    page,
    sortBy,
    setSortBy: handleSetSortBy,

    // 액션
    loadMore,
    refresh,
    hasMore: pagination?.hasNext ?? false
  };
}
