# Pagination 구현 전략 및 로드맵

## 전체 페이지 및 API 매핑

### 1. Pagination 필요 페이지 목록

| 우선순위 | 페이지 | 경로 | API Endpoint | Sort Options | 현재 상태 |
|---------|--------|------|--------------|--------------|-----------|
| **P0 (필수)** | 컬렉션 전체 조회 | `/collections/all` | `GET /collections/all` | `popularity`, `recent`, `old` | ❌ 미구현 |
| **P0** | 내 컬렉션 | `/collections/my` | `GET /users/me/collections` | `popularity`, `recent`, `old` | ❌ 미구현 |
| **P0** | 좋아요한 컬렉션 | `/collections/liked` | `GET /users/{userId}/collections/liked` | `popularity`, `recent`, `old` | ❌ 미구현 |
| **P0** | 내 리뷰 | `/reviews/my` | `GET /users/me/review-list` | N/A (전체 가져오기) | ❌ 미구현 |
| **P1 (중요)** | 평가한 앨범 | `/rated/albums` | `GET /users/{userId}/rated-albums` | `sortBy`, `page`, `limit` | ❌ 미구현 |
| **P1** | 평가한 트랙 | `/rated/tracks` | `GET /users/{userId}/rated-tracks` | `sortBy`, `page`, `limit` | ❌ 미구현 |
| **P1** | 좋아요한 아티스트 | `/artists/liked` | `GET /users/me/liked-artist` | `popularity`, `recent`, `old` | ❌ 미구현 |
| **P1** | 인기 앨범 | `/popular-albums` | `GET /popular-albums` | 고정 (인기순 100개) | ❌ 미구현 |
| **P1** | 인기 트랙 | `/popular-tracks` | `GET /popular-tracks` | 고정 (인기순 100개) | ❌ 미구현 |
| **P2 (일반)** | 알림 | `/notifications` | `GET /notifications` (추정) | `recent` | ❌ 미구현 |
| **P2** | 컬렉션 댓글 | `/collections/:id/comments` | `GET /comments/detail/{itemId}` | `recent`, `old`, `popularity` | ✅ 구현됨 |
| **P2** | 앨범 리뷰 목록 | `/albums/:id/reviews` | `GET /reviews?itemId={albumId}` | `recent`, `old`, `popularity` | ✅ 구현됨 |
| **P2** | 팔로워 목록 | `/followers` | `GET /users/me/followers` | `page`, `limit` | ❌ 미구현 |
| **P2** | 팔로잉 목록 | `/following` | `GET /users/me/following` | `page`, `limit` | ❌ 미구현 |
| **P3 (낮음)** | 통합 검색 | `/search` | `GET /search` | `type` 필터만 | ❌ 미구현 |

---

## API 상세 분석

### P0: 컬렉션 관련 (최우선)

#### 1. 컬렉션 전체 조회
```typescript
GET /collections/all
Query Parameters:
  - sortBy?: 'popularity' | 'recent' | 'old' (default: 'recent')
  - page?: number (default: 1)
  - limit?: number (default: 20)

Response:
{
  success: boolean;
  data: {
    collections: Collection[];
    pagination: PaginationInfo;
  };
}
```

**구현 필요사항**:
- `useAllCollections` hook → `useAllCollectionsPaginated` 로 대체
- Infinite scroll 패턴 적용
- Sort 변경 시 데이터 리셋

---

#### 2. 내 컬렉션
```typescript
GET /users/me/collections
Query Parameters:
  - sortBy?: string ('popularity' | 'recent' | 'old')
  - page?: number
  - limit?: number

Response: GetMyCollections200Response2
```

**구현 필요사항**:
- `useMyCollections` hook 업데이트 (pagination 지원)
- `MyCollectionsPage`에 infinite scroll 적용

---

#### 3. 좋아요한 컬렉션
```typescript
GET /users/{userId}/collections/liked
Query Parameters:
  - sortBy?: string
  - page?: number
  - limit?: number

Response: GetMyCollections200Response3
```

**구현 필요사항**:
- `useLikedCollections` hook 업데이트
- `LikedCollectionsPage`에 infinite scroll 적용

---

### P0: 리뷰 관련

#### 4. 내 리뷰 목록
```typescript
GET /users/me/review-list
⚠️ Pagination 파라미터 없음 (전체 가져오기)
```

**현재 상태**: Pagination 불필요 (API가 전체 데이터 반환)
**조치**: 현재 상태 유지

---

### P1: 평가 관련 (중요)

#### 5. 평가한 앨범
```typescript
GET /users/{userId}/rated-albums
Query Parameters:
  - sortBy?: string
  - page?: number
  - limit?: number

Response: GetUserRatedAlbums200ResponseAllOfData
{
  totalCount: number;
  albums: Album[];
  pagination: PaginationInfo;
}
```

**구현 필요사항**:
- `useRatedAlbums` hook 업데이트
- `RatedAlbumsPage`에 infinite scroll 적용

---

#### 6. 평가한 트랙
```typescript
GET /users/{userId}/rated-tracks
Query Parameters:
  - sortBy?: string
  - page?: number
  - limit?: number

Response: GetUserRatedTracks200ResponseAllOfData
```

**구현 필요사항**:
- `useRatedTracks` hook 업데이트
- `RatedTracksPage`에 infinite scroll 적용

---

#### 7. 좋아요한 아티스트
```typescript
GET /users/me/liked-artist
Query Parameters:
  - sortBy?: string ('popularity' | 'recent' | 'old')
  - page?: number
  - limit?: number

Response: GetLikedArtists200Response
```

**구현 필요사항**:
- `useLikedArtists` hook 업데이트
- `LikedArtistsPage`에 infinite scroll 적용

---

### P1: 인기 목록

#### 8. 인기 앨범
```typescript
GET /popular-albums
⚠️ 고정 100개 반환 (Pagination 불필요)
```

**조치**: Infinite scroll 불필요, 전체 로드 유지

---

#### 9. 인기 트랙
```typescript
GET /popular-tracks
⚠️ 고정 100개 반환 (Pagination 불필요)
```

**조치**: Infinite scroll 불필요, 전체 로드 유지

---

### P2: 소셜 기능

#### 10. 팔로워 목록
```typescript
GET /users/me/followers
Query Parameters:
  - page?: number
  - limit?: number

Response: GetMyFollwers200Response
```

**구현 필요사항**:
- 새로운 hook `useMyFollowers` 생성
- Infinite scroll 적용

---

#### 11. 팔로잉 목록
```typescript
GET /users/me/following
Query Parameters:
  - page?: number
  - limit?: number

Response: GetMyFollowing200Response
```

**구현 필요사항**:
- 새로운 hook `useMyFollowing` 생성
- Infinite scroll 적용

---

### P2: 댓글 및 리뷰

#### 12. 컬렉션 댓글
```typescript
GET /comments/detail/{itemId}
Query Parameters:
  - type?: 'collection' | 'review'
  - sortBy?: 'recent' | 'old' | 'popularity' (default: 'recent')
  - page?: number (default: 1)
  - limit?: number (default: 20)

Response: GetMyCollections200Response (댓글 목록)
```

**현재 상태**: ✅ 이미 pagination 구현됨 (`useCollectionComments`)
**조치**: 유지

---

#### 13. 앨범 리뷰 목록
```typescript
GET /reviews?itemId={albumId}
Query Parameters:
  - itemId: string
  - type?: 'album' | 'track'
  - sortBy?: 'recent' | 'old' | 'popularity'
  - page?: number
  - limit?: number
```

**현재 상태**: ✅ 이미 pagination 구현됨 (`useAlbumReviews`)
**조치**: 유지

---

### P2: 알림

#### 14. 알림 목록
```typescript
GET /notifications (추정)
⚠️ API 문서 미확인
```

**조치**: API 스펙 확인 후 구현

---

### P3: 검색

#### 15. 통합 검색
```typescript
GET /search
Query Parameters:
  - query: string (검색어)
  - type: 'all' | 'album' | 'track' | 'artist'
  ⚠️ page, limit 파라미터 없음
```

**현재 상태**: Pagination 미지원 (API 제약)
**조치**: 현재 상태 유지 (전체 결과 반환)

---

## 구현 우선순위 및 로드맵

### Phase 1: 기반 구축 (1-2일)

**목표**: 재사용 가능한 pagination 인프라 구축

1. **공통 Hook 생성**
   - [ ] `usePagination<SortType>()` - 범용 pagination 상태 관리
   - [ ] `InfiniteScrollTrigger` 컴포넌트 - Intersection Observer 기반

2. **타입 정의**
   - [ ] `PaginationParams<SortType>` interface
   - [ ] `PaginatedResponse<T>` interface
   - [ ] Sort type aliases (CollectionSort, ReviewSort, etc.)

---

### Phase 2: P0 구현 (2-3일)

**목표**: 컬렉션 관련 핵심 기능 pagination

1. **컬렉션 전체 조회** (`AllCollectionsPage`)
   - [ ] `useAllCollectionsPaginated()` hook 생성
   - [ ] Infinite scroll 적용
   - [ ] Sort 변경 처리

2. **내 컬렉션** (`MyCollectionsPage`)
   - [ ] `useMyCollectionsPaginated()` hook 업데이트
   - [ ] Infinite scroll 적용

3. **좋아요한 컬렉션** (`LikedCollectionsPage`)
   - [ ] `useLikedCollectionsPaginated()` hook 업데이트
   - [ ] Infinite scroll 적용

---

### Phase 3: P1 구현 (2-3일)

**목표**: 평가 및 좋아요 기능 pagination

1. **평가한 앨범** (`RatedAlbumsPage`)
   - [ ] `useRatedAlbumsPaginated()` hook 업데이트
   - [ ] Infinite scroll 적용

2. **평가한 트랙** (`RatedTracksPage`)
   - [ ] `useRatedTracksPaginated()` hook 업데이트
   - [ ] Infinite scroll 적용

3. **좋아요한 아티스트** (`LikedArtistsPage`)
   - [ ] `useLikedArtistsPaginated()` hook 업데이트
   - [ ] Infinite scroll 적용

---

### Phase 4: P2 구현 (1-2일)

**목표**: 소셜 기능 pagination

1. **팔로워/팔로잉 목록**
   - [ ] `useMyFollowers()` hook 생성
   - [ ] `useMyFollowing()` hook 생성
   - [ ] Infinite scroll 적용

2. **알림**
   - [ ] API 스펙 확인
   - [ ] `useNotificationsPaginated()` hook 생성 (필요시)

---

### Phase 5: 최적화 및 개선 (1-2일)

**목표**: 성능 및 UX 개선

1. **성능 최적화**
   - [ ] React.memo 적용 (카드 컴포넌트)
   - [ ] useMemo로 정렬/필터링 최적화
   - [ ] Virtual scrolling 검토 (대량 데이터)

2. **UX 개선**
   - [ ] 로딩 스켈레톤 추가
   - [ ] 에러 바운더리 적용
   - [ ] 빈 상태 개선

3. **캐싱 전략**
   - [ ] React Query 도입 검토
   - [ ] Stale-while-revalidate 패턴 적용

---

## 공통 패턴 및 베스트 프랙티스

### 1. Hook 명명 규칙
```typescript
// ❌ Bad
useData()
useList()

// ✅ Good
useAllCollectionsPaginated()
useRatedAlbumsPaginated()
useLikedArtistsPaginated()
```

### 2. Sort 변경 처리
```typescript
const handleSetSortBy = useCallback((newSortBy: SortType) => {
  setCollections([]);  // 1. 기존 데이터 클리어
  setPage(1);          // 2. 페이지 리셋
  setSortBy(newSortBy); // 3. Sort 변경 → useEffect 트리거
}, [setSortBy, setPage]);
```

### 3. 무한 스크롤 트리거
```typescript
<InfiniteScrollTrigger
  onLoadMore={loadMore}
  loading={loading}
  hasMore={pagination?.hasNext ?? false}
  threshold={200}  // 하단 200px에서 트리거
/>
```

### 4. 에러 처리
```typescript
// 초기 로딩 에러
if (error && items.length === 0) {
  return <ErrorState message={error.message} onRetry={refresh} />;
}

// 추가 로딩 에러 (토스트)
if (error && items.length > 0) {
  showToast({ message: '더 불러올 수 없습니다', variant: 'error' });
}
```

---

## API 변경 요청 사항

### 우선순위 높음

1. **내 리뷰 목록 pagination 지원**
   ```
   GET /users/me/review-list
   현재: 전체 데이터 반환
   요청: page, limit 파라미터 추가
   ```

2. **통합 검색 pagination 지원**
   ```
   GET /search
   현재: 전체 결과 반환
   요청: page, limit 파라미터 추가
   ```

3. **알림 API 스펙 명확화**
   ```
   GET /notifications
   상태: API 문서 미확인
   요청: 엔드포인트 및 pagination 파라미터 확인
   ```

---

## 테스트 계획

### 단위 테스트
- [ ] `usePagination` hook 테스트
- [ ] `InfiniteScrollTrigger` 컴포넌트 테스트
- [ ] 각 paginated hook 테스트

### 통합 테스트
- [ ] Infinite scroll 동작 테스트
- [ ] Sort 변경 시 리셋 테스트
- [ ] 에러 처리 테스트
- [ ] 빈 목록 처리 테스트

### 수동 테스트 체크리스트
- [ ] 초기 페이지 로드
- [ ] 스크롤 시 자동 로드
- [ ] Sort 변경 시 데이터 리셋
- [ ] 마지막 페이지 도달 (더 이상 로드 안 함)
- [ ] 로딩 중 중복 요청 방지
- [ ] 네트워크 에러 처리
- [ ] 빈 목록 처리
- [ ] 다양한 화면 크기 테스트

---

## 성공 지표

### 성능 지표
- **초기 로드 시간**: < 1초
- **추가 페이지 로드**: < 500ms
- **메모리 사용량**: 안정적 (메모리 누수 없음)
- **FPS**: 60fps 유지 (스크롤 시)

### 사용성 지표
- **스크롤 끊김**: 없음
- **로딩 표시**: 명확함
- **에러 메시지**: 이해하기 쉬움
- **빈 상태**: 안내 명확함

---

## 참고 문서

- [Pagination 구현 가이드](./PAGINATION_IMPLEMENTATION_GUIDE.md)
- [Collections API 문서](./src/api/docs/CollectionsApi.md)
- [Users API 문서](./src/api/docs/UsersApi.md)
- [Reviews API 문서](./src/api/docs/ReviewsApi.md)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
