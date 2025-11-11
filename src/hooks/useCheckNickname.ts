/**
 * Check Nickname Hook
 *
 * 닉네임 중복 체크를 위한 hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseCheckNicknameReturn {
  checkNickname: (nickname: string) => Promise<boolean>;
  checking: boolean;
  error: Error | null;
}

/**
 * 닉네임 중복 체크 hook
 *
 * @returns checkNickname 함수, checking 상태, error
 *
 * @example
 * ```tsx
 * const { checkNickname, checking } = useCheckNickname();
 *
 * const isAvailable = await checkNickname('테스트닉네임');
 * ```
 */
export function useCheckNickname(): UseCheckNicknameReturn {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 닉네임 중복 체크
   * @param nickname - 체크할 닉네임
   * @returns 사용 가능하면 true, 중복이면 false
   */
  const checkNickname = async (nickname: string): Promise<boolean> => {
    try {
      setChecking(true);
      setError(null);

      console.log('🔍 Checking nickname availability:', nickname);

      // API 호출: GET /auth/check-nickname
      const response = await apiService.auth.checkNickname(nickname);

      // 응답 구조: { success: true, data: { available: true/false } }
      const isAvailable = response.data.data?.available === true;

      console.log('✅ Nickname check result:', { nickname, isAvailable });

      return isAvailable;
    } catch (err: any) {
      console.error('❌ Failed to check nickname:', err);

      // 409 에러는 중복을 의미할 수 있음
      if (err.response?.status === 409) {
        return false;
      }

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '닉네임 중복 체크에 실패했습니다.';

      setError(new Error(errorMessage));

      // 에러 발생 시 false 반환 (안전하게)
      return false;
    } finally {
      setChecking(false);
    }
  };

  return {
    checkNickname,
    checking,
    error
  };
}
