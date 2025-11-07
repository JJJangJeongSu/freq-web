import { useState, useEffect } from 'react';
import { UsersApi, Configuration } from '../api';
import { apiClient } from '../api/client';
import type { GetRatedAlbums200Response } from '../api/models';

// UsersApi 인스턴스 생성
const usersApi = new UsersApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL
  }),
  undefined,
  apiClient
);

export interface RatedAlbumItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  rating: number;
  ratedDate: string;
}

export function useRatedAlbums() {
  const [albums, setAlbums] = useState<RatedAlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response: GetRatedAlbums200Response = await usersApi.getRatedAlbums();

      // API 응답에서 data 추출
      const apiData = (response as any).data;

      if (!apiData || !apiData.reviews) {
        setAlbums([]);
        return;
      }

      // 데이터 변환: reviews → albums
      const transformedAlbums: RatedAlbumItem[] = apiData.reviews.map((review: any) => ({
        id: review.album.id,
        title: review.album.title,
        artist: review.album.artist,
        imageUrl: review.album.imageUrl,
        rating: review.rating,
        ratedDate: review.createdAt
      }));

      setAlbums(transformedAlbums);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching rated albums:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { albums, loading, error, refetch: fetchData };
}
