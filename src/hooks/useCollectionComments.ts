/**
 * useCollectionComments Hook
 *
 * 컬렉션의 댓글 목록을 페이지네이션과 함께 가져오는 custom hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';

interface Comment {
  commentId: number;
  userName: string;
  profileImageUrl: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

interface CommentsResponse {
  comments: Comment[];
  currentPage: number;
  totalPages: number;
  totalComments: number;
}

interface UseCollectionCommentsParams {
  collectionId: string | undefined;
  page?: number;
  pageSize?: number;
}

interface UseCollectionCommentsReturn {
  data: CommentsResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCollectionComments = ({
  collectionId,
  page = 1,
  pageSize = 10
}: UseCollectionCommentsParams): UseCollectionCommentsReturn => {
  const [data, setData] = useState<CommentsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!collectionId) {
      setError(new Error('Collection ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: API 호출 - 사용자가 API 상세 정보 제공 후 연결
      // const response = await apiService.collections.getCollectionComments(
      //   collectionId,
      //   { page, pageSize }
      // );

      // 임시 mock 데이터 (API 연결 전까지)
      const mockData: CommentsResponse = {
        comments: [],
        currentPage: page,
        totalPages: 0,
        totalComments: 0
      };

      setData(mockData);
    } catch (err: any) {
      console.error('❌ Failed to fetch collection comments:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '댓글을 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionId, page, pageSize]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
