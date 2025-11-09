import { useState, useEffect } from 'react';
import { ReviewsApi } from '../api';
import type { ReviewDetail } from '../api';

interface UseReviewDetailReturn {
  data: ReviewDetail | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 리뷰 상세 정보를 가져오는 훅
 * @param reviewId 리뷰 ID
 */
export function useReviewDetail(reviewId: string): UseReviewDetailReturn {
  const [data, setData] = useState<ReviewDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviewDetail = async () => {
    if (!reviewId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const reviewsApi = new ReviewsApi();
      const response = await reviewsApi.getReviewDetail(reviewId);

      if (response.data.success && response.data.data) {
        setData(response.data.data);
      } else {
        throw new Error('Failed to fetch review detail');
      }
    } catch (err) {
      console.error('Error fetching review detail:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewDetail();
  }, [reviewId]);

  return {
    data,
    loading,
    error,
    refetch: fetchReviewDetail
  };
}
