import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { ReviewDetail } from '@/api';

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
      console.warn('⚠️ useReviewDetail: No reviewId provided');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching review detail for reviewId:', reviewId);
      setLoading(true);
      setError(null);

      const response = await apiService.reviews.getReviewDetail(reviewId);

      console.log('✅ Review detail response:', response);
      console.log('📦 Response data:', response.data);

      if (response.data.success && response.data.data) {
        console.log('✅ Review detail fetched successfully:', response.data.data);
        setData(response.data.data);
      } else {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Failed to fetch review detail: Invalid response');
      }
    } catch (err: any) {
      console.error('❌ Error fetching review detail:', err);
      console.error('📍 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          method: err.config?.method,
        }
      });

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || 'Unknown error occurred';

      setError(new Error(errorMessage));
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
