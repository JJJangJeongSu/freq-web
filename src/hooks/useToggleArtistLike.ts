/**
 * Toggle Artist Like Hook
 *
 * 아티스트 좋아요 토글을 위한 mutation hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseToggleArtistLikeReturn {
  toggleLike: (artistId: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * 아티스트 좋아요 토글 hook
 *
 * @example
 * const { toggleLike, loading } = useToggleArtistLike();
 * await toggleLike('artistId');
 */
export const useToggleArtistLike = (): UseToggleArtistLikeReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleLike = async (artistId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Toggling artist like:', artistId);

      // API 호출
      const response = await apiService.reviews.toggleArtistLike(artistId);

      // 응답 확인
      const responseData = response.data;

      if (responseData.success) {
        console.log('✅ Artist like toggled successfully');
      } else {
        throw new Error('Failed to toggle artist like');
      }
    } catch (err: any) {
      console.error('❌ Failed to toggle artist like:', err);

      // 에러 메시지 추출
      let errorMessage = '좋아요 처리 중 오류가 발생했습니다.';

      if (err.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
      } else if (err.response?.status === 404) {
        errorMessage = '아티스트를 찾을 수 없습니다.';
      } else if (err.response?.data?.error?.message) {
        errorMessage = err.response.data.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      const finalError = new Error(errorMessage);
      setError(finalError);
      throw finalError;
    } finally {
      setLoading(false);
    }
  };

  return {
    toggleLike,
    loading,
    error
  };
};
