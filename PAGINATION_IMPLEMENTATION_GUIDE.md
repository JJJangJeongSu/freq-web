# Pagination 구현 가이드

## 개요

이 문서는 뮤직레이트 앱에서 pagination을 구현하는 표준 전략을 정의합니다.
모든 목록 페이지(컬렉션, 리뷰, 앨범, 트랙 등)에서 일관된 pagination 패턴을 사용합니다.

## API 스펙

### 표준 Pagination 파라미터

대부분의 목록 API는 다음 쿼리 파라미터를 지원합니다:

```typescript
interface PaginationParams {
  page?: number;      // 페이지 번호 (1부터 시작, default: 1)
  limit?: number;     // 페이지당 항목 수 (default: 20)
  sortBy?: SortType;  // 정렬 기준 (API마다 다름)
}
```

### 표준 Pagination 응답

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];           // 실제 데이터 배열 (collections, reviews, albums 등)
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
  message: string;
}
```

## API별 Sort 옵션

### 1. 컬렉션 전체 조회 (`GET /collections/all`)
```typescript
type CollectionSortBy = 'popularity' | 'recent' | 'old';
```

### 2. 사용자 컬렉션 조회 (`GET /users/{userId}/collections`)
```typescript
type UserCollectionSortBy = 'popularity' | 'recent' | 'old';
```

### 3. 리뷰 목록 조회 (`GET /reviews`)
```typescript
type ReviewSortBy = 'recent' | 'old' | 'popularity';
```

### 4. 댓글 목록 조회 (`GET /comments/detail/{itemId}`)
```typescript
type CommentSortBy = 'recent' | 'old' | 'popularity';
```

### 5. 기타 목록 API
각 API 문서(`src/api/docs/*.md`)를 확인하여 지원하는 sortBy 옵션을 파악합니다.

## UI 패턴 선택

### 1. Infinite Scroll (추천: 모바일 우선)
- 사용자가 스크롤을 내릴 때 자동으로 다음 페이지 로드
- 부드러운 UX, 모바일에 최적화
- **추천 사용처**: 컬렉션 목록, 리뷰 목록, 피드

**장점**:
- 끊김 없는 사용자 경험
- 모바일 친화적
- 탐색에 집중

**단점**:
- 특정 페이지로 직접 이동 불가
- 브라우저 성능 이슈 (매우 긴 목록)

### 2. Load More Button
- 버튼 클릭 시 다음 페이지 로드
- 사용자가 로딩 제어 가능
- **추천 사용처**: 검색 결과, 필터링된 목록

**장점**:
- 사용자가 로딩 시점 제어
- 성능 예측 가능
- 간단한 구현

**단점**:
- 클릭 액션 필요
- 덜 부드러운 경험

### 3. Page Numbers
- 전통적인 페이지네이션 컨트롤
- 특정 페이지로 직접 이동 가능
- **추천 사용처**: 관리 페이지, 검색 결과 (Desktop)

**장점**:
- 특정 페이지 직접 접근
- 전체 범위 파악 용이
- SEO 친화적 (URL 기반)

**단점**:
- 모바일에서 UX 저하
- 구현 복잡도 높음

## 구현 전략

### Phase 1: Custom Hook 생성

모든 pagination 로직을 재사용 가능한 custom hook으로 분리합니다.

```typescript
// src/hooks/usePagination.ts
import { useState, useCallback } from 'react';

interface UsePaginationOptions<SortType = string> {
  initialPage?: number;
  initialLimit?: number;
  initialSortBy?: SortType;
}

interface PaginationState<SortType = string> {
  page: number;
  limit: number;
  sortBy: SortType;
}

interface UsePaginationReturn<SortType = string> {
  // 상태
  page: number;
  limit: number;
  sortBy: SortType;

  // 액션
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: SortType) => void;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;

  // 헬퍼
  getParams: () => PaginationState<SortType>;
}

export function usePagination<SortType = string>(
  options: UsePaginationOptions<SortType> = {}
): UsePaginationReturn<SortType> {
  const {
    initialPage = 1,
    initialLimit = 20,
    initialSortBy
  } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState<SortType>(initialSortBy as SortType);

  const nextPage = useCallback(() => setPage(p => p + 1), []);
  const previousPage = useCallback(() => setPage(p => Math.max(1, p - 1)), []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSortBy(initialSortBy as SortType);
  }, [initialPage, initialLimit, initialSortBy]);

  const getParams = useCallback(() => ({
    page,
    limit,
    sortBy
  }), [page, limit, sortBy]);

  return {
    page,
    limit,
    sortBy,
    setPage,
    setLimit,
    setSortBy,
    nextPage,
    previousPage,
    reset,
    getParams
  };
}
```

### Phase 2: API Hook 패턴

API 호출과 pagination을 통합하는 hook 패턴입니다.

```typescript
// src/hooks/useAllCollectionsPaginated.ts
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import { usePagination } from './usePagination';

type CollectionSortBy = 'popularity' | 'recent' | 'old';

interface Collection {
  collectionId: number;
  title: string;
  // ... 기타 필드
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface UseAllCollectionsPaginatedReturn {
  // 데이터
  collections: Collection[];
  pagination: PaginationInfo | null;

  // 상태
  loading: boolean;
  error: Error | null;

  // Pagination 컨트롤
  page: number;
  sortBy: CollectionSortBy;
  setSortBy: (sortBy: CollectionSortBy) => void;

  // 액션
  loadMore: () => void;
  refresh: () => void;
  hasMore: boolean;
}

export function useAllCollectionsPaginated(
  mode: 'infinite' | 'paginated' = 'infinite'
): UseAllCollectionsPaginatedReturn {
  const {
    page,
    limit,
    sortBy,
    setSortBy,
    nextPage,
    setPage,
    getParams
  } = usePagination<CollectionSortBy>({
    initialSortBy: 'recent',
    initialLimit: 20
  });

  const [collections, setCollections] = useState<Collection[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCollections = useCallback(async (append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.collections.getUserCollections(
        sortBy,
        page,
        limit
      );

      const data = response.data.data;

      if (append && mode === 'infinite') {
        // Infinite scroll: 기존 데이터에 추가
        setCollections(prev => [...prev, ...data.collections]);
      } else {
        // Paginated: 새로운 데이터로 교체
        setCollections(data.collections);
      }

      setPagination(data.pagination);
    } catch (err: any) {
      setError(err);
      console.error('❌ Failed to fetch collections:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, mode]);

  // 초기 로드 및 page/sortBy 변경 시 자동 fetch
  useEffect(() => {
    fetchCollections(false);
  }, [fetchCollections]);

  // sortBy 변경 시 page 리셋
  const handleSetSortBy = useCallback((newSortBy: CollectionSortBy) => {
    setCollections([]);  // 기존 데이터 클리어
    setPage(1);          // 첫 페이지로 리셋
    setSortBy(newSortBy);
  }, [setSortBy, setPage]);

  const loadMore = useCallback(() => {
    if (pagination?.hasNext && !loading) {
      nextPage();
    }
  }, [pagination?.hasNext, loading, nextPage]);

  const refresh = useCallback(() => {
    setCollections([]);
    setPage(1);
    fetchCollections(false);
  }, [setPage, fetchCollections]);

  return {
    collections,
    pagination,
    loading,
    error,
    page,
    sortBy,
    setSortBy: handleSetSortBy,
    loadMore,
    refresh,
    hasMore: pagination?.hasNext ?? false
  };
}
```

### Phase 3: Infinite Scroll 컴포넌트

재사용 가능한 Infinite Scroll 감지 컴포넌트입니다.

```typescript
// src/components/InfiniteScrollTrigger.tsx
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
  threshold?: number;  // 화면 하단으로부터 몇 px에서 트리거할지
}

export function InfiniteScrollTrigger({
  onLoadMore,
  loading,
  hasMore,
  threshold = 200
}: InfiniteScrollTriggerProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, onLoadMore, threshold]);

  if (!hasMore) return null;

  return (
    <div ref={observerRef} className="flex justify-center py-8">
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">로딩 중...</span>
        </div>
      )}
    </div>
  );
}
```

### Phase 4: Page 컴포넌트 통합 예시

```typescript
// src/pages/AllCollectionsPage.tsx (예시)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionCard } from "../components/CollectionCard";
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { useAllCollectionsPaginated } from "../hooks/useAllCollectionsPaginated";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { SlidersHorizontal, Loader2, RefreshCw } from "lucide-react";

export function AllCollectionsPage() {
  const navigate = useNavigate();

  const {
    collections,
    pagination,
    loading,
    error,
    sortBy,
    setSortBy,
    loadMore,
    refresh,
    hasMore
  } = useAllCollectionsPaginated('infinite');

  // 초기 로딩
  if (loading && collections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  // 에러 상태
  if (error && collections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error.message}</p>
        <Button onClick={refresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">모든 컬렉션</h1>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {sortBy === 'recent' ? '최신순' : sortBy === 'popularity' ? '인기순' : '오래된순'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('recent')}>
                  최신순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('popularity')}>
                  인기순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('old')}>
                  오래된순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Count */}
        {pagination && (
          <p className="text-sm text-muted-foreground mb-4">
            총 {pagination.totalItems}개의 컬렉션
          </p>
        )}

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.collectionId}
              {...collection}
              onClick={() => navigate(`/collections/${collection.collectionId}`)}
            />
          ))}
        </div>

        {/* Infinite Scroll Trigger */}
        <InfiniteScrollTrigger
          onLoadMore={loadMore}
          loading={loading}
          hasMore={hasMore}
        />
      </main>
    </div>
  );
}
```

## Sort 변경 시 주의사항

### 1. 데이터 클리어 및 페이지 리셋
Sort 옵션이 변경될 때는 반드시:
- 기존 컬렉션 배열 클리어 (`setCollections([])`)
- 페이지를 1로 리셋 (`setPage(1)`)
- 새로운 데이터 fetch

### 2. 로딩 상태 관리
- Sort 변경 중에는 전체 로딩 표시
- 기존 데이터 유지하지 않음 (혼란 방지)

### 3. URL Query Sync (Optional)
SEO 및 공유를 위해 URL에 pagination 상태 저장:

```typescript
// URL: /collections/all?page=2&sortBy=popularity
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();

// URL에서 초기값 가져오기
const initialPage = Number(searchParams.get('page')) || 1;
const initialSortBy = searchParams.get('sortBy') || 'recent';

// 상태 변경 시 URL 업데이트
useEffect(() => {
  setSearchParams({
    page: String(page),
    sortBy: sortBy
  });
}, [page, sortBy, setSearchParams]);
```

## 성능 최적화

### 1. React.memo 사용
```typescript
export const CollectionCard = React.memo(function CollectionCard(props) {
  // ...
});
```

### 2. useMemo로 필터링/정렬
```typescript
const displayCollections = useMemo(() => {
  return collections.filter(/* ... */);
}, [collections]);
```

### 3. Virtual List (대량 데이터)
매우 긴 목록의 경우 `react-window` 또는 `react-virtualized` 사용 고려

## 테스트 체크리스트

- [ ] 초기 로드 성공
- [ ] 다음 페이지 로드 (Infinite scroll or Load more)
- [ ] Sort 변경 시 데이터 클리어 및 리로드
- [ ] 마지막 페이지 도달 시 더 이상 로드 안 함
- [ ] 에러 발생 시 에러 메시지 표시
- [ ] 로딩 중 중복 요청 방지
- [ ] 빈 목록 처리
- [ ] 뒤로가기 시 스크롤 위치 복원 (Optional)

## 향후 확장 계획

### 1. 다른 목록 API에 적용
- `GET /reviews` - 리뷰 목록
- `GET /users/{userId}/collections` - 사용자 컬렉션
- `GET /comments/detail/{itemId}` - 댓글 목록
- `GET /users/me/collections/liked` - 좋아요한 컬렉션

### 2. 공통 Pagination Hook 제네릭화
```typescript
export function usePaginatedData<T, SortType>(
  fetchFn: (params: PaginationParams<SortType>) => Promise<PaginatedResponse<T>>,
  options: UsePaginationOptions<SortType>
): UsePaginatedDataReturn<T, SortType> {
  // 제네릭 구현
}
```

### 3. 캐싱 전략
- React Query 도입 고려
- 페이지별 캐싱
- Stale-while-revalidate 패턴

## 참고 자료

- [Collections API Documentation](src/api/docs/CollectionsApi.md)
- [Pagination Info Model](src/api/models/pagination-info.ts)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
