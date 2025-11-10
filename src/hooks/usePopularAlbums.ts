import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { AlbumPreview } from '@/api/models';

export interface PopularAlbumItem {
  id: string;
  title: string;
  artist: string; // artists 배열을 join한 문자열
  imageUrl: string;
  rating?: number; // averageRating
  ratingCount?: number;
  userRating?: number;
  isRated?: boolean;
}

/**
 * 인기 앨범 목록 (100개) 조회 Hook
 *
 * API: GET /popular-albums
 * 인증 필요: Bearer token
 */
export function usePopularAlbums() {
  const [albums, setAlbums] = useState<PopularAlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출: getUserCollections_1 = GET /popular-albums
      const response = await apiService.home.getUserCollections_1();

      // API 응답 구조: { success: true, data: [...], message: "..." }
      // data가 바로 배열 형태
      const apiData = (response.data as any)?.data;

      if (!apiData || !Array.isArray(apiData)) {
        console.warn('⚠️ No popular albums data in API response');
        setAlbums([]);
        return;
      }

      console.log(`✅ Fetched ${apiData.length} popular albums`);

      // 데이터 변환: AlbumPreview -> PopularAlbumItem
      const transformedAlbums: PopularAlbumItem[] = apiData.map(
        (album: AlbumPreview) => ({
          id: album.id,
          title: album.title,
          artist: album.artists.join(', '), // 배열을 문자열로 변환
          imageUrl: album.imageUrl,
          rating: album.averageRating,
          ratingCount: album.ratingCount,
          userRating: album.userRating,
          isRated: album.isRated
        })
      );

      setAlbums(transformedAlbums);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('인기 앨범을 불러올 수 없습니다');
      setError(error);
      console.error('❌ Error fetching popular albums:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { albums, loading, error, refetch: fetchData };
}
