/**
 * Update Bio Hook
 *
 * 사용자 소개글 업데이트를 위한 mutation hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseUpdateBioReturn {
  updateBio: (bio: string) => Promise<{ message: string }>;
  loading: boolean;
  error: Error | null;
}

/**
 * 소개글 업데이트 hook
 *
 * @example
 * const { updateBio, loading, error } = useUpdateBio();
 * await updateBio("새로운 소개글입니다.");
 */
export const useUpdateBio = (): UseUpdateBioReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateBio = async (bio: string): Promise<{ message: string }> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Updating bio:', bio);

      // API 호출
      const response = await apiService.authUpdate.updateBio({ bio });

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        const result = {
          message: responseData.data.message || '소개글이 업데이트되었습니다.'
        };

        console.log('✅ Bio updated successfully:', result);
        return result;
      } else {
        throw new Error('Failed to update bio');
      }
    } catch (err: any) {
      console.error('❌ Failed to update bio:', err);

      // 에러 메시지 추출
      let errorMessage = '소개글 업데이트 중 오류가 발생했습니다.';

      if (err.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
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
    updateBio,
    loading,
    error
  };
};
