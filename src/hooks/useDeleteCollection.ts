/**
 * useDeleteCollection Hook
 *
 * 컬렉션 삭제 API 호출을 위한 custom hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseDeleteCollectionReturn {
  deleteCollection: (collectionId: number) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const useDeleteCollection = (): UseDeleteCollectionReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteCollection = async (collectionId: number) => {
    try {
      setLoading(true);
      setError(null);

      // API 호출 - DELETE /collections/{collectionId}
      await apiService.collections.deleteCollection(String(collectionId));

    } catch (err: any) {
      console.error('❌ Failed to delete collection:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '컬렉션 삭제 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      throw err; // Re-throw to allow caller to handle
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCollection,
    loading,
    error,
  };
};
