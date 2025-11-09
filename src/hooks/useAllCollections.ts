/**
 * All Collections Hook
 *
 * 공개된 컬렉션 전체 목록 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { CollectionPreview } from '@/api/models';

interface UseAllCollectionsReturn {
  data: CollectionPreview[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 전체 컬렉션 목록 hook
 */
export const useAllCollections = (): UseAllCollectionsReturn => {
  const [data, setData] = useState<CollectionPreview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 (/collections/all)
      const response = await apiService.collections.getUserCollections();

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        // data.collections 배열 추출
        const collections = (responseData.data as any).collections || [];
        setData(collections);
      } else {
        throw new Error('Failed to fetch all collections');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch all collections:', err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '컬렉션을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCollections();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return {
    data,
    loading,
    error,
    refetch: fetchAllCollections
  };
};
