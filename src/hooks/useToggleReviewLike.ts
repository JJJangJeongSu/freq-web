import { useState, useRef, useCallback } from 'react';
import { ReviewsApi } from '@/api/apis/reviews-api';
import { apiClient } from '@/api/client';

const reviewsApi = new ReviewsApi(undefined, '', apiClient);

interface ToggleLikeResult {
  optimisticIsLiked: boolean;
  optimisticLikeCount: number;
  error?: Error;
}

/**
 * 리뷰 좋아요 토글 훅 (낙관적 업데이트 + 디바운싱)
 */
export function useToggleReviewLike() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const processingRef = useRef(false);

  const toggleLike = useCallback(async (
    reviewId: number,
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

    // 디바운싱: 이미 처리 중이면 즉시 낙관적 업데이트만 반환
    if (processingRef.current) {
      return {
        optimisticIsLiked,
        optimisticLikeCount
      };
    }

    // 기존 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    return new Promise((resolve) => {
      // 300ms 디바운스
      debounceTimerRef.current = setTimeout(async () => {
        processingRef.current = true;
        setLoading(true);
        setError(null);

        try {
          // 2. API 호출
          const response = await reviewsApi.toggleReviewLike(reviewId.toString());

          console.log('✅ Review like toggle response:', response.data);

          // 3. API 응답 성공 - 낙관적 업데이트 유지
          resolve({
            optimisticIsLiked,
            optimisticLikeCount
          });
        } catch (err: any) {
          console.error('❌ Error toggling review like:', err);

          const errorMessage = err.response?.data?.error?.message
            || err.message
            || 'Failed to toggle review like';

          const errorObj = new Error(errorMessage);
          setError(errorObj);

          // 4. 에러 발생 - 롤백용 원래 상태 반환
          resolve({
            optimisticIsLiked: currentIsLiked,
            optimisticLikeCount: currentLikeCount,
            error: errorObj
          });
        } finally {
          setLoading(false);
          processingRef.current = false;
        }
      }, 300);
    });
  }, []);

  return {
    toggleLike,
    loading,
    error
  };
}
