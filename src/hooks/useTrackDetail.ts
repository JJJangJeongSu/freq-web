/**
 * Track Detail Hook
 *
 * 트랙 상세 정보 조회를 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { TrackDetailWithReviewId } from '@/types/api-overrides';

interface UseTrackDetailReturn {
  data: TrackDetailWithReviewId | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * 트랙 상세 정보 hook
 *
 * @param trackId - Spotify Track ID
 */
export const useTrackDetail = (trackId: string): UseTrackDetailReturn => {
  const [data, setData] = useState<TrackDetailWithReviewId | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrackDetail = async () => {
    if (!trackId) {
      setError(new Error('Track ID is required'));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // API 호출
      const response = await apiService.detailPages.getTrackDetail(trackId);

      // 응답 unwrap
      const responseData = response.data;

      console.log('📦 Track detail API response:', {
        success: responseData.success,
        hasData: !!responseData.data,
        myReviewId: responseData.data?.myReviewId,
        userRating: responseData.data?.userRating,
        isRated: responseData.data?.isRated,
        fullData: responseData.data
      });

      if (responseData.success && responseData.data) {
        // myReviewId를 reviewId로 매핑
        const trackData = responseData.data;
        const mappedData: TrackDetailWithReviewId = {
          ...trackData,
          reviewId: trackData.myReviewId !== null ? String(trackData.myReviewId) : undefined
        };

        setData(mappedData);
      } else {
        throw new Error('Failed to fetch track detail');
      }
    } catch (err: any) {
      console.error(`❌ Failed to fetch track detail (${trackId}):`, err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '트랙 정보를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackDetail();
  }, [trackId]); // trackId 변경 시 재조회

  return {
    data,
    loading,
    error,
    refetch: fetchTrackDetail
  };
};
