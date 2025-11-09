/**
 * Update Profile Image Hook
 *
 * 프로필 이미지 업데이트를 위한 mutation hook
 * 1. 이미지 파일을 업로드하여 presigned URL 받기
 * 2. Presigned URL로 S3에 업로드
 * 3. 최종 이미지 URL로 프로필 업데이트
 */

import { useState } from 'react';
import { apiService } from '@/services/api.service';
import axios from 'axios';

interface UseUpdateProfileImageReturn {

  updateProfileImage: (file: File) => Promise<{ message: string }>;

  loading: boolean;

  error: Error | null;

}



/**

 * 프로필 이미지 업데이트 hook

 *

 * @example

 * const { updateProfileImage, loading, error } = useUpdateProfileImage();

 * const file = event.target.files[0];

 * await updateProfileImage(file);

 */

export const useUpdateProfileImage = (): UseUpdateProfileImageReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProfileImage = async (file: File): Promise<{ message: string }> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Starting profile image update (direct upload):', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      // API를 통해 직접 파일 업로드
      const response = await apiService.authUpdate.updateProfileImage(file);
      const responseData = response.data;

      if (responseData.success) {
        const result = {
          message: '프로필 이미지가 업데이트되었습니다.'
        };

        console.log('✅ Profile image updated successfully:', result);
        return result;
      } else {
        throw new Error(responseData.error?.message || 'Failed to update profile image');
      }
    } catch (err: any) {
      console.error('❌ Failed to update profile image:', err);

      // 에러 메시지 추출
      let errorMessage = '프로필 이미지 업데이트 중 오류가 발생했습니다.';

      if (err.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
      } else if (err.response?.status === 413) {
        errorMessage = '이미지 파일이 너무 큽니다. (최대 5MB)';
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
    updateProfileImage,
    loading,
    error
  };
};
