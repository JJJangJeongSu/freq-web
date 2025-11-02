/**
 * API Type Overrides
 *
 * APIdog에서 생성된 타입 중 오류가 있는 것들을 override합니다.
 * ⚠️ APIdog spec이 수정되면 이 파일도 함께 업데이트해야 합니다.
 */

import type { ReviewDetail as GeneratedReviewDetail } from '@/api/models';

/**
 * ReviewDetail Type Override
 *
 * 이슈: username이 number로 정의되어 있음 (실제로는 string이어야 함)
 * 원본: src/api/models/review-detail.ts
 */
export interface ReviewDetail extends Omit<GeneratedReviewDetail, 'username'> {
  username: string; // Override: number → string
}

/**
 * Response Wrapper Types
 *
 * APIdog responses are wrapped in: { success: boolean, data: T, message?: string }
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/**
 * Helper type to unwrap Axios response
 */
export type UnwrapAxiosResponse<T> = T extends { data: infer D } ? D : T;

/**
 * Helper type to extract data from API response
 */
export type ExtractData<T> = T extends ApiResponse<infer D> ? D : T;

/**
 * Combined unwrap type
 */
export type UnwrapApiData<T> = ExtractData<UnwrapAxiosResponse<T>>;
