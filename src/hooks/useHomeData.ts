/**
 * useHomeData Hook
 *
 * 홈페이지 데이터를 가져오는 custom hook
 *
 * ⚠️ 이 파일은 템플릿입니다.
 * APIdog에서 생성한 homeApi.ts가 있어야 완전히 작동합니다.
 */

import { useState, useEffect } from 'react';
// TODO: APIdog 생성 후 주석 해제
// import { getHomeData } from '@/api/homeApi';
// import { HomePageData } from '@/api/types';

// 임시 타입 정의 (APIdog types.ts로 대체 예정)
interface HomePageData {
  collections: any[];
  popularComments: any[];
  recentComments: any[];
}

interface UseHomeDataReturn {
  data: HomePageData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useHomeData = (): UseHomeDataReturn => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: APIdog 생성 후 주석 해제하고 아래 mock data 제거
      // const response = await getHomeData();
      // setData(response);

      // 임시 mock data (APIdog 연동 후 제거)
      setTimeout(() => {
        setData({
          collections: [],
          popularComments: [],
          recentComments: [],
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
