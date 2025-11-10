import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetMyActivity200ResponseAllOfData } from '@/api';

interface UseUserActivityReturn {
  data: GetMyActivity200ResponseAllOfData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 사용자 활동 정보를 가져오는 훅
 * @param userId 사용자 ID
 */
export function useUserActivity(userId: string | undefined): UseUserActivityReturn {
  const [data, setData] = useState<GetMyActivity200ResponseAllOfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserActivity = async () => {
    if (!userId) {
      console.warn('⚠️ useUserActivity: No userId provided');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching user activity for userId:', userId);
      setLoading(true);
      setError(null);

      const response = await apiService.usersSocial.getMyActivity(userId);

      console.log('✅ User activity response:', response);
      console.log('📦 Response data:', response.data);

      // API 응답 구조 확인 (이중 래핑 체크)
      if (response.data.success && response.data.data) {
        const activityData = response.data.data;

        console.log('📦 Activity data:', activityData);

        // 이중 래핑 체크
        if ((activityData as any).success && (activityData as any).data) {
          console.log('✅ User activity fetched (double wrapped):', (activityData as any).data);
          setData((activityData as any).data);
        } else {
          console.log('✅ User activity fetched (single wrapped):', activityData);
          setData(activityData);
        }
      } else {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Failed to fetch user activity: Invalid response');
      }
    } catch (err: any) {
      console.error('❌ Error fetching user activity:', err);
      console.error('📍 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          method: err.config?.method,
        }
      });

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || 'Unknown error occurred';

      setError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, [userId]);

  return {
    data,
    loading,
    error,
    refetch: fetchUserActivity
  };
}
