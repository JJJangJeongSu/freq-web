/**
 * My Collections Paginated Hook
 *
 * 내가 만든 컬렉션 목록 조회를 위한 paginated hook
 * Infinite scroll을 지원합니다.
 */

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import { usePagination } from './usePagination';
import type { CollectionPreview } from '@/api/models';
import type { PaginationInfo, CollectionSortBy, ScrollMode } from '@/types/pagination';

interface UseMyCollectionsPaginatedReturn {
  // 데이터
  collections: CollectionPreview[];
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
 * 내 컬렉션 목록 paginated hook
 *
 * @param mode - 'infinite' (기본값) 또는 'paginated'
 * @returns collections, pagination 정보 및 액션
 *
 * @example
 * ```typescript
 * const {
 *   collections,
 *   loading,
 *   sortBy,
 *   setSortBy,
 *   loadMore,
 *   hasMore
 * } = useMyCollectionsPaginated('infinite');
 * ```
 */
export function useMyCollectionsPaginated(
  mode: ScrollMode = 'infinite'
): UseMyCollectionsPaginatedReturn {
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

  const [collections, setCollections] = useState<CollectionPreview[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 컬렉션 데이터 fetch
   * @param append - true면 기존 데이터에 추가, false면 교체
   */
  const fetchCollections = useCallback(async (append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching my collections:', { page, limit, sortBy, append });

      // API 호출: GET /users/me/collections
      const response = await apiService.collections.getMyCollections_5(
        sortBy,
        page,
        limit
      );

      // 응답 unwrap
      const responseData = response.data;

      if (!responseData.success || !responseData.data) {
        throw new Error('Failed to fetch collections');
      }

      const data = responseData.data as any;
      const fetchedCollections = data.collections || [];
      const paginationData = data.pagination;

      if (append && mode === 'infinite') {
        // Infinite scroll: 기존 데이터에 추가
        setCollections(prev => [...prev, ...fetchedCollections]);
      } else {
        // Paginated: 새로운 데이터로 교체
        setCollections(fetchedCollections);
      }

      setPagination(paginationData);

      console.log('✅ My collections fetched:', {
        count: fetchedCollections.length,
        total: paginationData?.totalItems,
        hasNext: paginationData?.hasNext
      });
    } catch (err: any) {
      console.error('❌ Failed to fetch my collections:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '내 컬렉션을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, mode]);

  // 초기 로드 및 page/sortBy 변경 시 자동 fetch
  useEffect(() => {
    // page가 1이면 새로운 데이터로 교체, 아니면 추가
    const append = page > 1;
    fetchCollections(append);
  }, [page, sortBy, fetchCollections]);

  /**
   * Sort 변경 핸들러
   * Sort 변경 시 데이터 클리어 및 페이지 리셋
   */
  const handleSetSortBy = useCallback((newSortBy: CollectionSortBy) => {
    console.log('🔄 Sort changed:', newSortBy);
    setCollections([]);  // 기존 데이터 클리어
    setPage(1);          // 첫 페이지로 리셋
    setSortBy(newSortBy);
  }, [setSortBy, setPage]);

  /**
   * 다음 페이지 로드 (Infinite scroll)
   */
  const loadMore = useCallback(() => {
    if (pagination?.hasNext && !loading) {
      console.log('📄 Loading next page:', page + 1);
      nextPage();
    }
  }, [pagination?.hasNext, loading, nextPage, page]);

  /**
   * 새로고침 (첫 페이지부터 다시 로드)
   */
  const refresh = useCallback(() => {
    console.log('🔄 Refreshing my collections');
    setCollections([]);
    setPage(1);
    // setPage(1)이 useEffect를 트리거하여 자동으로 fetch됨
  }, [setPage]);

  return {
    // 데이터
    collections,
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
