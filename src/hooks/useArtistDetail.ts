/**
 * Artist Detail Hook
 *
 * 아티스트 상세 정보 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import { ArtistDetail } from '@/api/models';

interface UseArtistDetailReturn {
  data: ArtistDetail | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 아티스트 상세 정보 hook
 *
 * @param artistId - Spotify Artist ID
 */
export const useArtistDetail = (artistId: string): UseArtistDetailReturn => {
  const [data, setData] = useState<ArtistDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArtistDetail = async () => {
    if (!artistId) {
      setError(new Error('Artist ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // API 호출
      const response = await apiService.detailPages.getArtistDetail(artistId);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        setData(responseData.data as unknown as ArtistDetail);
      } else {
        throw new Error('Failed to fetch artist detail');
      }
    } catch (err: any) {
      console.error(`❌ Failed to fetch artist detail (${artistId}):`, err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '아티스트 정보를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistDetail();
  }, [artistId]); // artistId 변경 시 재조회

  return {
    data,
    loading,
    error,
    refetch: fetchArtistDetail
  };
};
