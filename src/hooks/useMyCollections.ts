/**
 * My Collections Hook
 *
 * 내가 만든 컬렉션 목록 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetMyCollections200ResponseAllOfDataCollectionsInner } from '@/api/models';

interface UseMyCollectionsReturn {
  data: GetMyCollections200ResponseAllOfDataCollectionsInner[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 내가 만든 컬렉션 목록 hook
 *
 * 현재 인증된 사용자가 생성한 모든 컬렉션의 목록을 조회합니다.
 * 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.
 */
export const useMyCollections = (): UseMyCollectionsReturn => {
  const [data, setData] = useState<GetMyCollections200ResponseAllOfDataCollectionsInner[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMyCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 (/users/me/collections)
      const response = await apiService.collections.getMyCollections_5();

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        // data.collections 배열 추출
        const collections = (responseData.data as any).collections || [];
        setData(collections);
      } else {
        throw new Error('Failed to fetch my collections');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch my collections:', err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '내 컬렉션을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCollections();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return {
    data,
    loading,
    error,
    refetch: fetchMyCollections
  };
};
