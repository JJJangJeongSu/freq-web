import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../api/apis/users-api';
import { apiClient } from '../api/client';

const usersApi = new UsersApi(undefined, '', apiClient);

/**
 * 내가 팔로우하는 사용자 목록 조회 Hook
 */
export function useFollowing(page?: number, limit?: number) {
  return useQuery({
    queryKey: ['following', page, limit],
    queryFn: async () => {
      const response = await usersApi.getMyFollowing(page, limit);
      return response.data;
    },
  });
}
