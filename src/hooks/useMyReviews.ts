import { useState, useEffect } from 'react';
import { UsersApi, Configuration } from '../api';
import { apiClient } from '../api/client';

// UsersApi 인스턴스 생성
const usersApi = new UsersApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL
  }),
  undefined,
  apiClient
);

export interface MyReview {
  id: string;
  album: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
  };
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export function useMyReviews() {
  const [reviews, setReviews] = useState<MyReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출: GET /users/me/review-list
      const response = await usersApi.getRatedAlbums();

      // API 응답 구조: { success: true, data: { reviews: [...] } }
      const fullResponse = response as any;

      console.group('🔍 My Reviews API Response');
      console.log('Response:', fullResponse);
      console.log('Response.data:', fullResponse.data);
      console.groupEnd();

      // 데이터 추출
      let apiData;
      if (fullResponse.data && fullResponse.data.data) {
        apiData = fullResponse.data.data;
      } else if (fullResponse.data && fullResponse.data.reviews) {
        apiData = fullResponse.data;
      } else if (fullResponse.reviews) {
        apiData = fullResponse;
      } else {
        throw new Error('Unable to extract reviews from API response');
      }

      if (!apiData || !apiData.reviews) {
        throw new Error('No reviews data received from API');
      }

      // 데이터 변환
      const transformedReviews: MyReview[] = apiData.reviews.map((review: any) => ({
        id: String(review.reviewId),
        album: {
          id: review.album.id,
          title: review.album.title,
          artist: Array.isArray(review.album.artist)
            ? review.album.artist.join(', ')
            : review.album.artist,
          imageUrl: review.album.imageUrl
        },
        rating: review.rating,
        content: review.content,
        createdAt: new Date(review.createdAt).toLocaleDateString('ko-KR'),
        likes: review.likeCount,
        comments: review.commentCount
      }));

      console.log('✅ Transformed Reviews:', transformedReviews);
      setReviews(transformedReviews);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('❌ Error fetching my reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { reviews, loading, error, refetch: fetchData };
}
