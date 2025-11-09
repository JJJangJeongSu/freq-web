/**
 * useHomeData Hook
 *
 * 홈페이지 데이터를 가져오는 custom hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { ReviewSummary, AlbumPreview, TrackPreview, CollectionPreview } from '@/api/models';

interface HomePageData {
  recommandedCollections: CollectionPreview[];
  popularReviews: ReviewSummary[];
  recentReviews: ReviewSummary[];
  popularAlbums: AlbumPreview[];
  popularTracks: TrackPreview[];
}

interface UseHomeDataReturn {
  data: HomePageData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useHomeData = (): UseHomeDataReturn => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 (/home)
      const response = await apiService.home.getUserCollections();

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        const homeData = responseData.data as any;

        setData({
          recommandedCollections: homeData.recommandedCollections || [],
          popularReviews: homeData.popularReviews || [],
          recentReviews: homeData.recentReviews || [],
          popularAlbums: homeData.popularAlbums || [],
          popularTracks: homeData.popularTracks || []
        });
      } else {
        throw new Error('Failed to fetch home data');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch home data:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '홈 데이터를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
