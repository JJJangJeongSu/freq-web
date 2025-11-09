import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface ToggleLikeResult {
  optimisticIsLiked: boolean;
  optimisticLikeCount: number;
  error?: Error;
}

/**
 * 리뷰 좋아요 토글 훅 (낙관적 업데이트)
 */
export function useToggleReviewLike() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleLike = async (
    reviewId: string,
    currentIsLiked: boolean,
    currentLikeCount: number
  ): Promise<ToggleLikeResult> => {
    // 1. 낙관적 업데이트: 즉시 UI 반영
    const optimisticIsLiked = !currentIsLiked;
    const optimisticLikeCount = currentIsLiked
      ? currentLikeCount - 1
      : currentLikeCount + 1;

    console.log('👍 Optimistic review like update:', {
      reviewId,
      before: { isLiked: currentIsLiked, count: currentLikeCount },
      after: { isLiked: optimisticIsLiked, count: optimisticLikeCount }
    });

    try {
      setLoading(true);
      setError(null);

      // 2. API 호출
      const response = await apiService.reviews.toggleReviewLike(reviewId);

      console.log('✅ Review like toggle response:', response.data);

      // 3. API 응답 성공 - 낙관적 업데이트 유지
      return {
        optimisticIsLiked,
        optimisticLikeCount
      };
    } catch (err: any) {
      console.error('❌ Error toggling review like:', err);
      console.error('📍 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || 'Failed to toggle review like';

      const errorObj = new Error(errorMessage);
      setError(errorObj);

      // 4. 에러 발생 - 롤백용 원래 상태 반환
      return {
        optimisticIsLiked: currentIsLiked,
        optimisticLikeCount: currentLikeCount,
        error: errorObj
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleLike,
    loading,
    error
  };
}
