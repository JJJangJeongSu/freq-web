import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { TrackPreview } from '@/api/models';

export interface PopularTrackItem {
  id: string;
  title: string;
  artist: string; // artists 배열을 join한 문자열
  imageUrl?: string;
  rating?: number; // averageRating
  releaseDate?: string;
  userRating?: number;
  isRated?: boolean;
}

/**
 * 인기 트랙 목록 (100개) 조회 Hook
 *
 * API: GET /popular-tracks
 * 인증 필요: Bearer token
 */
export function usePopularTracks() {
  const [tracks, setTracks] = useState<PopularTrackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출: getUserCollections_2 = GET /popular-tracks
      const response = await apiService.home.getUserCollections_2();

      // API 응답 구조: { success: true, data: [...], message: "..." }
      // data가 바로 배열 형태
      const apiData = (response.data as any)?.data;

      if (!apiData || !Array.isArray(apiData)) {
        console.warn('⚠️ No popular tracks data in API response');
        setTracks([]);
        return;
      }

      console.log(`✅ Fetched ${apiData.length} popular tracks`);

      // 데이터 변환: TrackPreview -> PopularTrackItem
      const transformedTracks: PopularTrackItem[] = apiData.map(
        (track: TrackPreview) => ({
          id: track.id,
          title: track.title,
          artist: track.artists.join(', '), // 배열을 문자열로 변환
          imageUrl: track.imageUrl,
          rating: track.averageRating,
          releaseDate: track.releaseDate,
          userRating: track.userRating,
          isRated: track.isRated
        })
      );

      setTracks(transformedTracks);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('인기 트랙을 불러올 수 없습니다');
      setError(error);
      console.error('❌ Error fetching popular tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { tracks, loading, error, refetch: fetchData };
}
