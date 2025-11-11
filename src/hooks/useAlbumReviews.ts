import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';

interface UseAlbumReviewsParams {
  targetId: string;
  sortBy: 'popularity' | 'recent' | 'old';
  page?: number;
  limit?: number;
}

interface UseAlbumReviewsReturn {
  data: any;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 앨범 리뷰 목록을 가져오는 훅
 */
export function useAlbumReviews({
  targetId,
  sortBy,
  page = 1,
  limit = 20
}: UseAlbumReviewsParams): UseAlbumReviewsReturn {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = async () => {
    try {
      console.log('🔍 Fetching reviews for targetId:', targetId, 'sortBy:', sortBy, 'page:', page);
      setLoading(true);
      setError(null);

      const response = await apiService.reviews.getReviews(
        targetId,
        sortBy,
        page,
        limit
      );

      console.log('✅ Reviews response:', response);

      // API 응답 구조: { success: true, data: { reviews: [...], pagination: {...} } }
      if (response.data.success && response.data.data) {
        setData(response.data.data);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error('❌ Error fetching reviews:', err);
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || 'Unknown error occurred';
      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (targetId) {
      fetchReviews();
    }
  }, [targetId, sortBy, page, limit]);

  return {
    data,
    loading,
    error,
    refetch: fetchReviews
  };
}
