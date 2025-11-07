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

      const response: GetMyActivity200Response = await usersApi.getMyActivity();

      // API 응답에서 data 추출
      const apiData = (response as any).data;

      if (!apiData) {
        throw new Error('No data received from API');
      }

      // 디버깅: API 응답 구조 확인
      console.group('🔍 API Response Analysis');
      console.log('Full API Response:', apiData);
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
