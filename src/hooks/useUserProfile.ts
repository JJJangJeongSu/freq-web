import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryClient';
import { apiClient } from '@/api/client';
import { AxiosResponse } from 'axios';

export interface UserProfile {
  userId: number;
  username: string;
  profileImageUrl: string;
  bio: string;
}

interface UserProfileResponse {
  data: UserProfile;
}

/**
 * 사용자 프로필 조회 Hook
 *
 * React Query를 사용하여 프로필 데이터를 캐싱합니다.
 * - staleTime: 5분 (기본값)
 * - gcTime: 10분 (기본값)
 *
 * @param userId - 조회할 사용자 ID
 * @param enabled - 쿼리 활성화 여부 (기본값: true)
 */
export function useUserProfile(userId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: async (): Promise<UserProfile> => {
      const response: AxiosResponse<UserProfileResponse> = await apiClient.get(
        `/users/${userId}/profile`
      );
      return response.data.data;
    },
    enabled: enabled && !!userId,
    // staleTime과 gcTime은 queryClient의 기본값 사용 (5분, 10분)
  });
}
