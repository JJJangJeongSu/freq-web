/**
 * Search Hook
 *
 * 통합 검색 기능을 위한 hook
 */

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';
import { SearchResult } from '@/api/models';

export type SearchType = 'all' | 'album' | 'track' | 'artist';

interface SearchResultsByType {
  albums: SearchResult[];
  tracks: SearchResult[];
  artists: SearchResult[];
  total: number;
}

interface UseSearchReturn {
  data: SearchResultsByType | null;
  loading: boolean;
  error: Error | null;
  search: (query: string, type?: SearchType) => Promise<void>;
}

/**
 * 검색 hook
 *
 * @param initialQuery - 초기 검색어 (선택)
 * @param initialType - 초기 검색 타입 (기본값: 'all')
 */
export const useSearch = (
  initialQuery: string = '',
  initialType: SearchType = 'all'
): UseSearchReturn => {
  const [data, setData] = useState<SearchResultsByType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * API 응답을 UI 구조로 변환
   * API는 단일 results[] 배열을 반환하지만,
   * UI는 albums[], tracks[], artists[]로 분리된 구조를 사용
   */
  const transformSearchResults = (results: SearchResult[] = []): SearchResultsByType => {
    const albums = results.filter(r => r.type === 'album');
    const tracks = results.filter(r => r.type === 'track');
    const artists = results.filter(r => r.type === 'artist');

    return {
      albums,
      tracks,
      artists,
      total: results.length
    };
  };

  /**
   * 검색 실행
   */
  const search = async (query: string, type: SearchType = 'all') => {
    // 빈 검색어는 무시
    if (!query || query.trim().length === 0) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // API 호출
      // Note: API는 영문 검색어만 지원하며 공백 불가
      // 프론트에서 한글 → 영문 변환 또는 공백 처리 필요할 수 있음
      const response = await apiService.search.search_1(
        query.trim(),
        type as any // API type enum과 매칭
      );

      // 응답 unwrap
      const responseData = response.data;

      if (responseData.success && responseData.data) {
        const results = responseData.data.results || [];
        const transformed = transformSearchResults(results);
        setData(transformed);
      } else {
        setData({ albums: [], tracks: [], artists: [], total: 0 });
      }
    } catch (err: any) {
      console.error('❌ Search failed:', err);

      // 에러 메시지 추출
      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '검색 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // 초기 검색어가 있으면 자동 검색
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      search(initialQuery, initialType);
    }
  }, []); // 마운트 시 한 번만 실행

  return {
    data,
    loading,
    error,
    search
  };
};
