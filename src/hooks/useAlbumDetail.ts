/**
 * Album Detail Hook
 *
 * 앨범 상세 정보 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import { AlbumDetail } from '@/api/models';

interface UseAlbumDetailReturn {
  data: AlbumDetail | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 앨범 상세 정보 hook
 *
 * @param albumId - Spotify Album ID
 */
export const useAlbumDetail = (albumId: string): UseAlbumDetailReturn => {
  const [data, setData] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlbumDetail = async () => {
    if (!albumId) {
      setError(new Error('Album ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // API 호출
      const response = await apiService.detailPages.getAlbumDetail(albumId);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        setData(responseData.data as unknown as AlbumDetail);
      } else {
        throw new Error('Failed to fetch album detail');
      }
    } catch (err: any) {
      console.error(`❌ Failed to fetch album detail (${albumId}):`, err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '앨범 정보를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumDetail();
  }, [albumId]); // albumId 변경 시 재조회

  return {
    data,
    loading,
    error,
    refetch: fetchAlbumDetail
  };
};
