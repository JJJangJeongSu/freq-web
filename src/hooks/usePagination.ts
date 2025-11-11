/**
 * Pagination Hook
 *
 * 재사용 가능한 pagination 상태 관리 hook
 * 모든 목록 페이지에서 공통으로 사용
 */

import { useState, useCallback } from 'react';
import type { PaginationState } from '@/types/pagination';

interface UsePaginationOptions<SortType = string> {
  initialPage?: number;
  initialLimit?: number;
  initialSortBy?: SortType;
}

interface UsePaginationReturn<SortType = string> {
  // 상태
  page: number;
  limit: number;
  sortBy: SortType;

  // 액션
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: SortType) => void;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;

  // 헬퍼
  getParams: () => PaginationState<SortType>;
}

/**
 * Pagination 상태 관리 hook
 *
 * @param options - 초기 설정
 * @returns pagination 상태 및 액션
 *
 * @example
 * ```typescript
 * const {
 *   page,
 *   sortBy,
 *   setSortBy,
 *   nextPage,
 *   getParams
 * } = usePagination<CollectionSortBy>({
 *   initialSortBy: 'recent',
 *   initialLimit: 20
 * });
 * ```
 */
export function usePagination<SortType = string>(
  options: UsePaginationOptions<SortType> = {}
): UsePaginationReturn<SortType> {
  const {
    initialPage = 1,
    initialLimit = 20,
    initialSortBy
  } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState<SortType>(initialSortBy as SortType);

  /**
   * 다음 페이지로 이동
   */
  const nextPage = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  /**
   * 이전 페이지로 이동 (최소 1페이지)
   */
  const previousPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

  /**
   * 초기 상태로 리셋
   */
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSortBy(initialSortBy as SortType);
  }, [initialPage, initialLimit, initialSortBy]);

  /**
   * API 요청에 사용할 파라미터 객체 반환
   */
  const getParams = useCallback((): PaginationState<SortType> => ({
    page,
    limit,
    sortBy
  }), [page, limit, sortBy]);

  return {
    // 상태
    page,
    limit,
    sortBy,

    // 액션
    setPage,
    setLimit,
    setSortBy,
    nextPage,
    previousPage,
    reset,

    // 헬퍼
    getParams
  };
}
