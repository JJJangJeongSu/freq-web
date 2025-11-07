import { useState, useEffect } from 'react';
import { UsersApi, Configuration } from '../api';
import { apiClient } from '../api/client';
import type { GetRatedTracks200Response } from '../api/models';
import { transformRatedTrack } from '../utils/apiDataTransformers';

// UsersApi 인스턴스 생성
const usersApi = new UsersApi(
  new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL
  }),
  undefined,
  apiClient
);

export interface RatedTrackItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  rating: number;
  ratedDate: string;
}

export function useRatedTracks() {
  const [tracks, setTracks] = useState<RatedTrackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response: GetRatedTracks200Response = await usersApi.getRatedTracks();

      // API 응답에서 data 추출
      const apiData = (response as any).data;

      if (!apiData || !apiData.tracks) {
        setTracks([]);
        return;
      }

      // 데이터 변환
      const transformedTracks: RatedTrackItem[] = apiData.tracks.map(transformRatedTrack);

      setTracks(transformedTracks);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching rated tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { tracks, loading, error, refetch: fetchData };
}
