import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';
import { Notification } from '@/api/models';

// API 응답 데이터 타입 정의
interface NotificationsData {
  notifications: Notification[];
  unreadCount: number;
}

// useNotifications 훅의 반환 타입 정의
interface UseNotificationsReturn {
  data: NotificationsData | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 알림 목록을 가져오는 커스텀 훅
 */
export const useNotifications = (): UseNotificationsReturn => {
  const { data, isLoading, error, refetch } = useQuery<NotificationsData, Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiService.notifications.getNotifications();
      // Assuming the actual data is nested under a 'data' property
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });

  return { data, isLoading, error: error || null, refetch };
};
