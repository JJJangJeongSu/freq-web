/**
 * Pagination Types
 *
 * 전체 프로젝트에서 사용하는 pagination 관련 공통 타입 정의
 */

/**
 * 표준 Pagination 정보
 * API 응답에 포함되는 pagination 메타데이터
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Pagination 파라미터
 * API 요청 시 사용하는 쿼리 파라미터
 */
export interface PaginationParams<SortType = string> {
  page?: number;
  limit?: number;
  sortBy?: SortType;
}

/**
 * Paginated 응답
 * API 응답의 표준 구조
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: PaginationInfo;
  };
  message: string;
}

/**
 * 컬렉션 정렬 옵션
 */
export type CollectionSortBy = 'popularity' | 'recent' | 'old';

/**
 * 리뷰 정렬 옵션
 */
export type ReviewSortBy = 'recent' | 'old' | 'popularity';

/**
 * 댓글 정렬 옵션
 */
export type CommentSortBy = 'recent' | 'old' | 'popularity';

/**
 * 일반적인 정렬 옵션 (대부분의 목록에 사용)
 */
export type GenericSortBy = 'popularity' | 'recent' | 'old';

/**
 * Pagination 상태
 * Hook에서 관리하는 내부 상태
 */
export interface PaginationState<SortType = string> {
  page: number;
  limit: number;
  sortBy: SortType;
}

/**
 * Infinite Scroll 모드
 */
export type ScrollMode = 'infinite' | 'paginated';
