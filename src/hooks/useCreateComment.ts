import { useState } from 'react';
import { apiService } from '@/services/api.service';
import type { CreateCommentRequest } from '@/api';

interface CreateCommentResult {
  success: boolean;
  commentId?: string;
  error?: Error;
}

/**
 * 댓글 작성 훅
 * 리뷰 또는 컬렉션에 댓글/대댓글을 작성합니다.
 */
export function useCreateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createComment = async (
    request: CreateCommentRequest
  ): Promise<CreateCommentResult> => {
    console.log('📝 Creating comment:', {
      type: request.type,
      targetId: request.targetId,
      contentLength: request.content.length,
      isReply: !!request.parentId,
      parentId: request.parentId
    });

    try {
      setLoading(true);
      setError(null);

      // API 호출
      const response = await apiService.comments.createComment(request);

      console.log('✅ Comment created successfully:', response.data);
      console.log('📦 Response data:', response.data.data);

      // API 응답 구조 확인
      if (response.data.success && response.data.data) {
        const commentData = response.data.data;

        console.log('✅ Comment details:', {
          commentId: commentData.commentId,
          username: commentData.username,
          content: commentData.content.substring(0, 50) + (commentData.content.length > 50 ? '...' : ''),
          createdAt: commentData.createdAt
        });

        return {
          success: true,
          commentId: commentData.commentId
        };
      } else {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Failed to create comment: Invalid response');
      }
    } catch (err: any) {
      console.error('❌ Error creating comment:', err);
      console.error('📍 Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: {
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          method: err.config?.method,
          data: err.config?.data
        }
      });

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || 'Failed to create comment';

      const errorObj = new Error(errorMessage);
      setError(errorObj);

      return {
        success: false,
        error: errorObj
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createComment,
    loading,
    error
  };
}
