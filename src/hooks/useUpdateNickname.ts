/**
 * Update Nickname Hook
 *
 * 사용자 닉네임 변경을 위한 hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseUpdateNicknameReturn {
  updateNickname: (nickname: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * 닉네임 변경 hook
 *
 * @returns updateNickname 함수, loading 상태, error
 *
 * @example
 * ```tsx
 * const { updateNickname, loading, error } = useUpdateNickname();
 *
 * await updateNickname('새닉네임');
 * ```
 */
export function useUpdateNickname(): UseUpdateNicknameReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateNickname = async (nickname: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Updating nickname:', nickname);

      // API 호출: PATCH /users/nickname
      const response = await apiService.auth.changeNickname({
        nickname
      });

      if (!response.data.success) {
        throw new Error('Failed to update nickname');
      }

      console.log('✅ Nickname updated successfully');

      // localStorage의 username도 업데이트
      localStorage.setItem('username', nickname);
    } catch (err: any) {
      console.error('❌ Failed to update nickname:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '닉네임 변경에 실패했습니다.';

      setError(new Error(errorMessage));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateNickname,
    loading,
    error
  };
}
