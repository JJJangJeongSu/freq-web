import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import type { GetUserRatedTracks200ResponseAllOfDataTracksInner } from '@/api/models';

export interface RatedTrackItem {
  id: string;
  title: string;
  artist: string; // artists 배열을 join한 문자열
  imageUrl: string;
  rating: number;
  ratedDate: string;
  reviewId: number;
  content?: string;
}

export function useRatedTracks(userId?: string) {
  const [tracks, setTracks] = useState<RatedTrackItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // userId가 없으면 localStorage에서 가져오기
      const userIdToUse = userId || localStorage.getItem('userId') || '';

      if (!userIdToUse) {
        throw new Error('User ID not found');
      }

      const response = await apiService.users.getUserRatedTracks(userIdToUse);

      // API 응답 구조: { success: true, data: { totalCount, tracks } }
      const apiData = (response.data as any)?.data;

      if (!apiData || !apiData.tracks) {
        setTracks([]);
        setTotalCount(0);
        return;
      }

      setTotalCount(apiData.totalCount || 0);

      // 데이터 변환
      const transformedTracks: RatedTrackItem[] = apiData.tracks.map(
        (track: GetUserRatedTracks200ResponseAllOfDataTracksInner) => ({
          id: track.id,
          title: track.title,
          artist: track.artists.join(', '), // 배열을 문자열로 변환
          imageUrl: track.imageUrl,
          rating: track.rating,
          ratedDate: track.ratedDate,
          reviewId: track.reviewId,
          content: track.content
        })
      );

      setTracks(transformedTracks);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('평가한 트랙을 불러올 수 없습니다');
      setError(error);
      console.error('❌ Error fetching rated tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { tracks, totalCount, loading, error, refetch: fetchData };
}
