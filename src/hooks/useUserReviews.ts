import { useState, useEffect } from 'react';
// import { apiService } from '@/services/api.service';
import type { UserReviewData } from '@/components/UserReviewCard';

interface UseUserReviewsParams {
  userId: string;
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
 * TODO: API 엔드포인트가 준비되면 실제 API 호출로 교체
 * 예상 엔드포인트: GET /users/{userId}/reviews?page={page}&limit={limit}
 */
export function useUserReviews({
  userId,
  page = 1,
  limit = 10
}: UseUserReviewsParams): UseUserReviewsReturn {
  const [reviews, setReviews] = useState<UserReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReviews = async () => {
    try {
      console.log('🔍 Fetching user reviews for userId:', userId, 'page:', page);
      setLoading(true);
      setError(null);

      // TODO: API 호출 구현
      // const response = await apiService.users.getUserReviews(userId, page, limit);

      // 임시 더미 데이터 (API 준비 전까지 사용)
      // API가 준비되면 아래 더미 데이터를 제거하고 실제 API 응답으로 교체
      const dummyReviews: UserReviewData[] = [];

      setReviews(dummyReviews);
      setTotalCount(0);
      setHasMore(false);

      console.log('✅ User reviews fetched:', dummyReviews.length);
    } catch (err: any) {
      console.error('❌ Error fetching user reviews:', err);
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
  }, [userId, page, limit]);

  return {
    reviews,
    loading,
    error,
    hasMore,
    totalCount,
    refetch: fetchReviews
  };
}
