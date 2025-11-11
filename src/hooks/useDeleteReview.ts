/**
 * useDeleteReview Hook
 *
 * 리뷰 삭제 API 호출을 위한 custom hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseDeleteReviewReturn {
  deleteReview: (reviewId: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const useDeleteReview = (): UseDeleteReviewReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 - DELETE /reviews/{reviewId}
      await apiService.reviews.deleteReview(reviewId);

      console.log('✅ 리뷰 삭제 성공:', reviewId);
    } catch (err: any) {
      console.error('❌ Failed to delete review:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '리뷰 삭제 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      throw err; // Re-throw to allow caller to handle
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteReview,
    loading,
    error,
  };
};
