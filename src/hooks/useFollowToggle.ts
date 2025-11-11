import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FollowsApi } from '../api/apis/follows-api';
import { apiClient } from '../api/client';

const followsApi = new FollowsApi(undefined, '', apiClient);

interface UseFollowToggleOptions {
  skipRefetch?: boolean; // refetch를 건너뛸지 여부
}

/**
 * 팔로우/언팔로우 토글 Hook
 */
export function useFollowToggle(options: UseFollowToggleOptions = {}) {
  const queryClient = useQueryClient();
  const { skipRefetch = false } = options;

  return useMutation({
    mutationFn: async (targetUserId: number) => {
      const response = await followsApi.toggleFollow(targetUserId);
      return response.data;
    },
    onSuccess: () => {
      // skipRefetch가 false일 때만 쿼리 무효화
      if (!skipRefetch) {
        queryClient.invalidateQueries({ queryKey: ['followers'] });
        queryClient.invalidateQueries({ queryKey: ['following'] });
        queryClient.invalidateQueries({ queryKey: ['myActivity'] });
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      }
    },
  });
}
