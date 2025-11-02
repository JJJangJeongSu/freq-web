# Custom Hooks Directory

API 호출을 위한 custom hooks를 작성하는 디렉토리입니다.

## 📂 생성해야 할 Hook 파일들

### 1. useHomeData.ts ✅ (템플릿 생성됨)
홈페이지 데이터를 가져오는 hook

```typescript
const { data, loading, error, refetch } = useHomeData();
```

### 2. useSearch.ts
검색 기능을 위한 hook

```typescript
const { search, results, loading, error } = useSearch();
```

### 3. useAlbumDetail.ts
앨범 상세 정보를 가져오는 hook

```typescript
const { album, tracks, reviews, loading, error } = useAlbumDetail(albumId);
```

### 4. useTrackDetail.ts
트랙 상세 정보를 가져오는 hook

```typescript
const { track, reviews, loading, error } = useTrackDetail(trackId);
```

### 5. useArtistDetail.ts
아티스트 상세 정보를 가져오는 hook

```typescript
const { artist, albums, tracks, loading, error } = useArtistDetail(artistId);
```

### 6. useCollections.ts
컬렉션 관련 hook

```typescript
const { collections, loading, error, refetch } = useCollections(type);
// type: 'my' | 'liked' | 'all' | 'recommended'
```

### 7. useRatedItems.ts
평점 매긴 앨범/트랙 조회 hook

```typescript
const { items, loading, error } = useRatedItems('albums' | 'tracks');
```

### 8. useReviews.ts
리뷰 관련 hook

```typescript
const { reviews, loading, error, refetch } = useReviews('my' | 'all');
```

### 9. useAuth.ts
인증 관련 hook

```typescript
const { user, login, logout, register, loading, error } = useAuth();
```

### 10. useUserProfile.ts
사용자 프로필 조회 hook

```typescript
const { profile, loading, error } = useUserProfile(userId);
```

## 🔧 Hook 작성 패턴

모든 hook은 다음 패턴을 따릅니다:

```typescript
import { useState, useEffect } from 'react';
import { getDataFromApi } from '@/api/someApi';
import { DataType } from '@/api/types';

interface UseDataReturn {
  data: DataType | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useData = (params?: any): UseDataReturn => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDataFromApi(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
```

## ⚠️ APIdog 코드가 필요합니다

이 hook들을 완성하려면:
1. `src/api/`에 APIdog 생성 코드 배치 필요
2. 특히 `types.ts`와 각 `*Api.ts` 파일들이 있어야 함
3. Hook에서 해당 API 함수들을 import하여 사용

## 🚀 사용 예시

페이지 컴포넌트에서 hook 사용:

```typescript
import { useHomeData } from '@/hooks/useHomeData';

export function HomePage({ onNavigate }: Props) {
  const { data, loading, error, refetch } = useHomeData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.collections.map(collection => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
}
```
