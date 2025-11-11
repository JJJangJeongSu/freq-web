import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../api/apis/users-api';
import { apiClient } from '../api/client';

const usersApi = new UsersApi(undefined, '', apiClient);

/**
 * 내 팔로워 목록 조회 Hook
 */
export function useFollowers(page?: number, limit?: number) {
  return useQuery({
    queryKey: ['followers', page, limit],
    queryFn: async () => {
      const response = await usersApi.getMyFollwers(page, limit);
      return response.data;
    },
  });
}
