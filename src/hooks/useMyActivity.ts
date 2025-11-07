import { useState, useEffect } from 'react';
import { UsersApi, Configuration } from '../api';
import { apiClient } from '../api/client';
import type { GetMyActivity200Response } from '../api/models';
import {
  transformRatingDistribution,
  transformCollection,
  transformGenreKeywords,
  transformRatedAlbum,
  transformRatedTrack
} from '../utils/apiDataTransformers';

// UsersApi 인스턴스 생성
const usersApi = new UsersApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL
  }),
  undefined,
  apiClient
);

export interface MyActivityData {
  userProfile: {
    userId: number;
    username: string;
    bio: string;
    profileImageUrl: string;
  };
  statistics: {
    albumReviews: number;
    trackReviews: number;
    writtenReviews: number;
    receivedLikes: number;
    likedArtists: number;
  };
  ratingDistribution: {
    album: Array<{ rating: number; count: number; percentage: number }>;
    track: Array<{ rating: number; count: number; percentage: number }>;
  };
  myCollections: Array<{
    id: string;
    title: string;
    description: string;
    itemCount: number;
    coverImages: string[];
    creator?: string;
    likes?: number;
  }>;
  likedCollections: Array<{
    id: string;
    title: string;
    description: string;
    itemCount: number;
    coverImages: string[];
    creator: string;
    likes: number;
  }>;
  genreKeywords: Array<{
    name: string;
    weight: number;
    color: string;
  }>;
  recentAlbums: Array<{
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    rating: number;
    ratedDate: string;
  }>;
  recentTracks: Array<{
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    rating: number;
    ratedDate: string;
  }>;
}

export function useMyActivity() {
  const [data, setData] = useState<MyActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // getMyActivity_3()를 사용 (파라미터 없음, /users/me/activity)
      const response = await usersApi.getMyActivity_3();

      // API 응답 구조: { success: true, data: { ... } }
      // Axios는 이미 response.data로 래핑하므로, 실제로는 response.data.data를 사용해야 함
      const fullResponse = response as any;

      // 디버깅: 전체 응답 구조 확인
      console.group('🔍 Full Response Structure');
      console.log('Response:', fullResponse);
      console.log('Response.data:', fullResponse.data);
      console.log('Response.data type:', typeof fullResponse.data);
      if (fullResponse.data) {
        console.log('Response.data keys:', Object.keys(fullResponse.data));
      }
      console.groupEnd();

      // 실제 데이터 추출 - { success: true, data: {...} } 구조에서 data 추출
      let apiData;
      if (fullResponse.data && fullResponse.data.data) {
        // Case 1: Axios가 래핑한 경우 - response.data.data
        apiData = fullResponse.data.data;
      } else if (fullResponse.data && fullResponse.data.userId) {
        // Case 2: 이미 data 필드가 언래핑된 경우 - response.data
        apiData = fullResponse.data;
      } else if (fullResponse.userId) {
        // Case 3: 완전히 언래핑된 경우 - response
        apiData = fullResponse;
      } else {
        throw new Error('Unable to extract data from API response');
      }

      if (!apiData) {
        throw new Error('No data received from API');
      }

      // 디버깅: API 응답 구조 확인
      console.group('🔍 API Response Analysis');
      console.log('Extracted API Data:', apiData);
      console.log('Available Fields:', Object.keys(apiData));
      console.log('rateDistribution (단수):', apiData.rateDistribution);
      console.log('rateDistributions (복수):', (apiData as any).rateDistributions);
      console.log('userProfile data:', {
        userId: apiData.userId,
        username: apiData.username,
        bio: apiData.bio,
        profileImageUrl: apiData.profileImageUrl
      });
      console.groupEnd();

      // API 응답 구조 확인 (복수형일 수도 있음)
      const ratingDist = (apiData as any).rateDistributions || apiData.rateDistribution;

      // 데이터 변환 (null/undefined 안전 처리)
      const transformedData: MyActivityData = {
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
          // rateDistributions.album, rateDistributions.track 구조인지 확인
          album: transformRatingDistribution(
            ratingDist?.album || apiData.rateDistribution
          ),
          track: transformRatingDistribution(
            ratingDist?.track || apiData.rateDistribution
          )
        },
        myCollections: (apiData.myCollections || []).map(transformCollection),
        likedCollections: (apiData.likedCollections || []).map(transformCollection),
        genreKeywords: transformGenreKeywords(apiData.userPreferences || []),
        recentAlbums: (apiData.ratedAlbums || []).map(transformRatedAlbum),
        recentTracks: (apiData.ratedTracks || []).map(transformRatedTrack)
      };

      // 변환된 데이터 확인
      console.group('✅ Transformed Data Check');
      console.log('Rating Distribution (album):', transformedData.ratingDistribution.album);
      console.log('Rating Distribution (track):', transformedData.ratingDistribution.track);
      console.log('Genre Keywords:', transformedData.genreKeywords);
      console.log('Recent Albums count:', transformedData.recentAlbums.length);
      console.log('Recent Tracks count:', transformedData.recentTracks.length);
      console.log('My Collections count:', transformedData.myCollections.length);
      console.log('Liked Collections count:', transformedData.likedCollections.length);
      console.groupEnd();

      setData(transformedData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching my activity:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
