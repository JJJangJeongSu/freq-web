import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetMyActivity200ResponseAllOfData } from '@/api';
import {
  transformRatingDistribution,
  transformCollection,
  transformGenreKeywords,
  transformRatedAlbum,
  transformRatedTrack
} from '../utils/apiDataTransformers';

interface UseUserActivityReturn {
  data: GetMyActivity200ResponseAllOfData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 사용자 활동 정보를 가져오는 훅
 * @param userId 사용자 ID
 */
export function useUserActivity(userId: string | undefined): UseUserActivityReturn {
  const [data, setData] = useState<GetMyActivity200ResponseAllOfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserActivity = async () => {
    if (!userId) {
      console.warn('⚠️ useUserActivity: No userId provided');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching user activity for userId:', userId);
      setLoading(true);
      setError(null);

      const response = await apiService.usersSocial.getMyActivity(userId);

      console.log('✅ User activity response:', response);
      console.log('📦 Response data:', response.data);

      // API 응답 구조 확인 (이중 래핑 체크)
      if (response.data.success && response.data.data) {
        let apiData = response.data.data;

        console.log('📦 Activity data:', apiData);

        // 이중 래핑 체크
        if ((apiData as any).success && (apiData as any).data) {
          console.log('✅ User activity fetched (double wrapped):', (apiData as any).data);
          apiData = (apiData as any).data;
        }

        // API 응답 구조 확인 (복수형일 수도 있음)
        const ratingDist = (apiData as any).rateDistributions || (apiData as any).rateDistribution;

        // 데이터 변환 (useMyActivity와 동일한 로직)
        const transformedData: any = {
          userProfile: {
            userId: apiData.userId || 0,
            username: apiData.username || '사용자',
            bio: apiData.bio || '',
            profileImageUrl: apiData.profileImageUrl || ''
          },
          statistics: {
            albumReviews: apiData.albumReviewCount || 0,
            trackReviews: apiData.trackReviewCount || 0,
            writtenReviews: apiData.contentReviewCount || 0,
            receivedLikes: apiData.likeCount || 0,
            likedArtists: apiData.likedArtistCount || 0
          },
          ratingDistribution: {
            album: transformRatingDistribution(
              ratingDist?.album || (apiData as any).rateDistribution
            ),
            track: transformRatingDistribution(
              ratingDist?.track || (apiData as any).rateDistribution
            )
          },
          myCollections: ((apiData as any).myCollections || []).map(transformCollection),
          likedCollections: ((apiData as any).likedCollections || []).map(transformCollection),
          genreKeywords: transformGenreKeywords((apiData as any).userPreferences || []),
          recentAlbums: ((apiData as any).ratedAlbums || []).map(transformRatedAlbum),
          recentTracks: ((apiData as any).ratedTracks || []).map(transformRatedTrack)
        };

        console.log('✅ Transformed user activity:', transformedData);
        setData(transformedData);
      } else {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Failed to fetch user activity: Invalid response');
      }
    } catch (err: any) {
      console.error('❌ Error fetching user activity:', err);
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
    fetchUserActivity();
  }, [userId]);

  return {
    data,
    loading,
    error,
    refetch: fetchUserActivity
  };
}
