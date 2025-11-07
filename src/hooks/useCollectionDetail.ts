import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import { CollectionDetail } from '@/api/models';

interface UseCollectionDetailResult {
  data: CollectionDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * 컬렉션 상세 정보를 가져오는 Hook
 * @param collectionId - 조회할 컬렉션 ID
 */
export function useCollectionDetail(collectionId: string | number): UseCollectionDetailResult {
  const [data, setData] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollectionDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.collections.getCollectionDetail(
        String(collectionId)
      );

      // API 응답 구조: { success: true, data: CollectionDetail }
      if (response.data && 'data' in response.data) {
        setData(response.data.data as CollectionDetail);
      } else {
        setData(response.data as any);
      }
    } catch (err: any) {
      console.error('❌ 컬렉션 상세 조회 실패:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '컬렉션 정보를 불러올 수 없습니다.';

      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId) {
      fetchCollectionDetail();
    }
  }, [collectionId]);

  return {
    data,
    loading,
    error,
    refetch: fetchCollectionDetail
  };
}
