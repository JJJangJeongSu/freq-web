/**
 * Create Review Hook
 *
 * 리뷰 작성을 위한 mutation hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';
import { CreateReviewRequest } from '@/api/models';

interface UseCreateReviewReturn {
  createReview: (data: CreateReviewRequest) => Promise<{ reviewId: string; message: string }>;
  loading: boolean;
  error: Error | null;
}

/**
 * 리뷰 작성 hook
 *
 * @example
 * const { createReview, loading, error } = useCreateReview();
 * await createReview({
 *   rating: 4.5,
 *   type: 'album',
 *   targetId: 'albumId',
 *   artistIds: ['artistId1']
 * });
 */
export const useCreateReview = (): UseCreateReviewReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createReview = async (data: CreateReviewRequest): Promise<{ reviewId: string; message: string }> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Creating review:', data);

      // API 호출
      const response = await apiService.reviews.createReview(data);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        const result = {
          reviewId: responseData.data.reviewId,
          message: responseData.data.message || '리뷰가 등록되었습니다.'
        };

        console.log('✅ Review created successfully:', result);
        return result;
      } else {
        throw new Error('Failed to create review');
      }
    } catch (err: any) {
      console.error('❌ Failed to create review:', err);

      // 에러 메시지 추출
      let errorMessage = '리뷰 등록 중 오류가 발생했습니다.';

      if (err.response?.status === 409) {
        errorMessage = '이미 리뷰를 작성하셨습니다.';
      } else if (err.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
      } else if (err.response?.data?.error?.message) {
        errorMessage = err.response.data.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      const finalError = new Error(errorMessage);
      setError(finalError);
      throw finalError;
    } finally {
      setLoading(false);
    }
  };

  return {
    createReview,
    loading,
    error
  };
};
