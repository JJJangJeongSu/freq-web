import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetUserRatedAlbums200ResponseAllOfDataAlbumsInner } from '@/api/models';

export interface RatedAlbumItem {
  id: string;
  title: string;
  artist: string; // artists 배열을 join한 문자열
  imageUrl: string;
  rating: number;
  ratedDate: string;
  reviewId: number;
  content: string;
}

export function useRatedAlbums(userId?: string) {
  const [albums, setAlbums] = useState<RatedAlbumItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // userId가 없으면 localStorage에서 가져오기
      const userIdToUse = userId || localStorage.getItem('userId') || '';

      if (!userIdToUse) {
        throw new Error('User ID not found');
      }

      const response = await apiService.users.getUserRatedAlbums(userIdToUse);

      // API 응답 구조: { success: true, data: { totalCount, albums } }
      const apiData = (response.data as any)?.data;

      if (!apiData || !apiData.albums) {
        setAlbums([]);
        setTotalCount(0);
        return;
      }

      setTotalCount(apiData.totalCount || 0);

      // 데이터 변환
      const transformedAlbums: RatedAlbumItem[] = apiData.albums.map(
        (album: GetUserRatedAlbums200ResponseAllOfDataAlbumsInner) => ({
          id: album.id,
          title: album.title,
          artist: album.artists.join(', '), // 배열을 문자열로 변환
          imageUrl: album.imageUrl,
          rating: album.rating,
          ratedDate: album.ratedDate,
          reviewId: album.reviewId,
          content: album.content
        })
      );

      setAlbums(transformedAlbums);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('평가한 앨범을 불러올 수 없습니다');
      setError(error);
      console.error('❌ Error fetching rated albums:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { albums, totalCount, loading, error, refetch: fetchData };
}
