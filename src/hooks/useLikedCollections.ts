/**
 * Liked Collections Hook
 *
 * 좋아요한 컬렉션 목록 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetMyCollections200ResponseAllOfDataCollectionsInner } from '@/api/models';

interface UseLikedCollectionsReturn {
  data: GetMyCollections200ResponseAllOfDataCollectionsInner[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 좋아요한 컬렉션 목록 hook
 */
export const useLikedCollections = (): UseLikedCollectionsReturn => {
  const [data, setData] = useState<GetMyCollections200ResponseAllOfDataCollectionsInner[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLikedCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user ID from localStorage
      const userId = localStorage.getItem('userId');

      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      // API 호출
      const response = await apiService.users.getMyCollections_5(userId);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        // data.collections 배열 추출
        const collections = (responseData.data as any).collections || [];
        setData(collections);
      } else {
        throw new Error('Failed to fetch liked collections');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch liked collections:', err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '좋아요한 컬렉션을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedCollections();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return {
    data,
    loading,
    error,
    refetch: fetchLikedCollections
  };
};
