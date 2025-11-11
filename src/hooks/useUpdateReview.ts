/**
 * Update Review Hook
 *
 * 기존 리뷰 수정을 위한 mutation hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';
import { UpdateReviewRequest } from '@/api/models';

interface UseUpdateReviewReturn {
  updateReview: (itemId: string | number, data: UpdateReviewRequest) => Promise<{ message: string }>;
  loading: boolean;
  error: Error | null;
}

/**
 * 리뷰 수정 hook
 *
 * @example
 * const { updateReview, loading, error } = useUpdateReview();
 * await updateReview('albumId123', {
 *   rating: 4.5,
 *   type: 'album',
 *   title: '수정된 제목',
 *   content: '수정된 내용'
 * });
 */
export const useUpdateReview = (): UseUpdateReviewReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateReview = async (itemId: string | number, data: UpdateReviewRequest): Promise<{ message: string }> => {
    try {
      setLoading(true);
      setError(null);

      // itemId를 number로 변환
      const numericItemId = typeof itemId === 'string' ? Number(itemId) : itemId;

      if (isNaN(numericItemId)) {
        throw new Error('Invalid itemId format');
      }

      console.log('🔄 Updating review:', { itemId: numericItemId, data });

      // API 호출 - PATCH /reviews/{itemId}
      const response = await apiService.reviews.updateReview(numericItemId, data);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success) {
        const result = {
          message: responseData.message || '리뷰가 수정되었습니다.'
        };

        console.log('✅ Review updated successfully:', result);
        return result;
      } else {
        throw new Error('Failed to update review');
      }
    } catch (err: any) {
      console.error('❌ Failed to update review:', err);

      // 에러 메시지 추출
      let errorMessage = '리뷰 수정 중 오류가 발생했습니다.';

      if (err.response?.status === 403) {
        errorMessage = '이 리뷰를 수정할 권한이 없습니다.';
      } else if (err.response?.status === 404) {
        errorMessage = '리뷰를 찾을 수 없습니다.';
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
    updateReview,
    loading,
    error
  };
};
