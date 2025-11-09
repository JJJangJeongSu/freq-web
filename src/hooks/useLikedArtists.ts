/**
 * Liked Artists Hook
 *
 * 좋아요한 아티스트 목록 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetLikedArtists200ResponseAllOfDataArtistsInner } from '@/api/models';

interface UseLikedArtistsReturn {
  data: GetLikedArtists200ResponseAllOfDataArtistsInner[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 좋아요한 아티스트 목록 hook
 */
export const useLikedArtists = (): UseLikedArtistsReturn => {
  const [data, setData] = useState<GetLikedArtists200ResponseAllOfDataArtistsInner[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLikedArtists = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 (/users/me/liked-artist)
      const response = await apiService.users.getLikedArtists_1();

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        // data.artists 배열 추출
        const artists = (responseData.data as any).artists || [];
        setData(artists);
      } else {
        throw new Error('Failed to fetch liked artists');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch liked artists:', err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '좋아요한 아티스트를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedArtists();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return {
    data,
    loading,
    error,
    refetch: fetchLikedArtists
  };
};
