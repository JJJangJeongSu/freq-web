/**
 * Mark Notification as Read Hook
 *
 * 단일 알림을 읽음 상태로 변경하는 mutation hook
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';

interface UseMarkNotificationReadReturn {
  markAsRead: (notificationId: number) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * 알림 읽음 처리 hook
 *
 * @example
 * const { markAsRead, loading } = useMarkNotificationRead();
 * await markAsRead(123);
 */
export const useMarkNotificationRead = (): UseMarkNotificationReadReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const markAsRead = async (notificationId: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      console.log('📬 Marking notification as read:', notificationId);

      // API 호출
      const response = await apiService.notifications.markNotificationRead(notificationId);

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        console.log('✅ Notification marked as read:', responseData.data);
      } else {
        throw new Error('Failed to mark notification as read');
      }
    } catch (err: any) {
      console.error('❌ Failed to mark notification as read:', err);

      // 에러 메시지 추출
      let errorMessage = '알림 읽음 처리 중 오류가 발생했습니다.';

      if (err.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
      } else if (err.response?.status === 404) {
        errorMessage = '알림을 찾을 수 없습니다.';
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
    markAsRead,
    loading,
    error
  };
};
