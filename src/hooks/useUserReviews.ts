import { useState, useEffect } from 'react';
import { apiClient } from '@/api/client';
import type { UserReviewData } from '@/components/UserReviewCard';

interface UseUserReviewsParams {
  userId: string;
  sortBy?: 'popularity' | 'recent' | 'old';
  page?: number;
  limit?: number;
}

interface UseUserReviewsReturn {
  reviews: UserReviewData[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  totalCount: number;
  refetch: () => void;
}

/**
 * 특정 사용자의 리뷰 목록을 가져오는 훅
 *
 * API 엔드포인트: GET /users/{userId}/review-list
 */
export function useUserReviews({
  userId,
  sortBy = 'recent',
  page = 1,
  limit = 20
}: UseUserReviewsParams): UseUserReviewsReturn {
  const [reviews, setReviews] = useState<UserReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReviews = async () => {
    if (!userId) {
      console.warn('⚠️ useUserReviews: No userId provided');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching user reviews for userId:', userId, 'sortBy:', sortBy, 'page:', page);
      setLoading(true);
      setError(null);

      // API 호출
      const response = await apiClient.get(`/users/${userId}/review-list`, {
        params: {
          sortBy,
          page,
          limit
        }
      });

      console.log('✅ User reviews response:', response.data);

      // API 응답 구조: { success: true, data: { reviews: [...], pagination: {...} }, count: number }
      if (response.data.success && response.data.data) {
        const { reviews: reviewsData, pagination } = response.data.data;

        setReviews(reviewsData);
        setTotalCount(response.data.count || pagination.totalItems);
        setHasMore(pagination.hasNext);

        console.log('✅ User reviews fetched:', reviewsData.length, 'total:', response.data.count);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error('❌ Error fetching user reviews:', err);
      console.error('📍 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
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
    if (userId) {
      fetchReviews();
    }
  }, [userId, sortBy, page, limit]);

  return {
    reviews,
    loading,
    error,
    hasMore,
    totalCount,
    refetch: fetchReviews
  };
}
