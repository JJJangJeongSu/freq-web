# Pagination 현황 검토 보고서

## 📊 현재 상태 요약

**결론: 현재 프로젝트는 pagination을 지원하지 않습니다.**

- ❌ API 레벨: pagination 파라미터 없음 (page, limit, offset 등)
- ❌ 프론트엔드: pagination UI/로직 없음
- ⚠️ API 응답: `total` 또는 `totalCount` 필드만 존재 (일관성 부족)
- ⚠️ 데이터 로딩: 모든 데이터를 한 번에 가져옴 (성능 이슈 가능성)

---

## 🔍 상세 분석

### 1. API 응답 구조

#### 1.1 `total` 사용 (검색, 리뷰)
```typescript
// src/api/models/search200-response-all-of-data.ts
export interface Search200ResponseAllOfData {
  results?: Array<CollectionPreview>;
  total?: number;  // 전체 검색 결과 개수
}

// src/api/models/get-reviews200-response-all-of-data.ts
export interface GetReviews200ResponseAllOfData {
  reviews?: Array<ReviewSummary>;
  total?: number;  // 전체 리뷰 개수
}
```

#### 1.2 `totalCount` 사용 (평가 목록)
```typescript
// src/api/models/get-user-rated-albums200-response-all-of-data.ts
export interface GetUserRatedAlbums200ResponseAllOfData {
  totalCount: number;  // 전체 평가한 앨범 수
  albums: Array<GetUserRatedAlbumsInner>;
}

// src/api/models/get-user-rated-tracks200-response-all-of-data.ts
export interface GetUserRatedTracks200ResponseAllOfData {
  totalCount: number;  // 전체 평가한 트랙 수
  tracks: Array<GetUserRatedTracksInner>;
}
```

**문제점:**
- `total` vs `totalCount` - 필드명 불일치
- pagination 메타데이터 부재 (`hasMore`, `currentPage`, `totalPages` 등)

---

### 2. API 엔드포인트 분석

#### 2.1 검색 API
```typescript
// src/api/apis/search-api.ts (line 44-67)
search: async (q?: string, sortBy?: string, options: RawAxiosRequestConfig = {})
```
**파라미터:** `q` (검색어), `sortBy` (정렬)
**pagination 파라미터:** ❌ 없음

#### 2.2 리뷰 API
```typescript
// src/api/apis/reviews-api.ts (line 261-289)
getReviews: async (targetId: string, options: RawAxiosRequestConfig = {})
```
**파라미터:** `targetId` (앨범/트랙 ID)
**pagination 파라미터:** ❌ 없음

#### 2.3 컬렉션 전체 조회 API
```typescript
// src/api/apis/collections-api.ts (line 477-505)
getUserCollections: async (options: RawAxiosRequestConfig = {})
// 엔드포인트: /collections/all
```
**파라미터:** 없음
**pagination 파라미터:** ❌ 없음

#### 2.4 사용자 평가 목록 API
```typescript
// src/api/apis/users-api.ts
getRatedAlbums: async (options: RawAxiosRequestConfig = {})
getRatedTracks: async (options: RawAxiosRequestConfig = {})
```
**파라미터:** 없음
**pagination 파라미터:** ❌ 없음

---

### 3. 프론트엔드 구현 현황

#### 3.1 AllCollectionsPage 예시
```typescript
// src/pages/AllCollectionsPage.tsx
const { data: apiData, loading, error, refetch } = useAllCollections();

// ❌ 모든 데이터를 한 번에 로드
// ❌ 클라이언트 사이드 필터링만 수행
const filteredCollections = allCollections.filter(collection =>
  collection.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**문제점:**
- 모든 컬렉션을 한 번에 메모리에 로드
- 데이터가 많아지면 성능 저하 발생
- 네트워크 비용 증가 (불필요한 데이터 전송)

#### 3.2 useAllCollections Hook
```typescript
// src/hooks/useAllCollections.ts (line 32)
const response = await apiService.collections.getUserCollections();
```
**pagination 로직:** ❌ 없음
**한 번에 모든 데이터 요청**

---

## ⚠️ 주요 이슈

### 1. 성능 문제
- **데이터 증가 시 위험**: 100개 이상 컬렉션 존재 시 로딩 시간 증가
- **메모리 사용량**: 모든 데이터를 클라이언트 메모리에 보관
- **네트워크 비용**: 불필요한 데이터까지 모두 전송

### 2. 사용자 경험 (UX)
- **로딩 시간**: 첫 화면 로딩이 오래 걸림
- **스크롤 성능**: 많은 아이템 렌더링 시 스크롤 버벅임
- **검색 결과**: 서버 사이드 검색 불가능 (클라이언트 필터링만)

### 3. 데이터 일관성
- **필드명 불일치**: `total` vs `totalCount`
- **표준 부재**: pagination 메타데이터 구조 없음

---

## 💡 권장사항

### Option 1: 백엔드 API 수정 (권장)

#### 1.1 표준 Pagination 파라미터 추가
```typescript
interface PaginationParams {
  page?: number;       // 페이지 번호 (1부터 시작)
  limit?: number;      // 페이지당 아이템 수 (기본값: 20)
  // OR
  offset?: number;     // 건너뛸 아이템 수
  limit?: number;      // 가져올 아이템 수
}
```

#### 1.2 표준 응답 구조
```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];              // 실제 데이터
    pagination: {
      currentPage: number;   // 현재 페이지
      totalPages: number;    // 전체 페이지 수
      totalItems: number;    // 전체 아이템 수
      itemsPerPage: number;  // 페이지당 아이템 수
      hasNext: boolean;      // 다음 페이지 존재 여부
      hasPrev: boolean;      // 이전 페이지 존재 여부
    };
  };
}
```

#### 1.3 적용 대상 API
- `GET /collections/all?page=1&limit=20`
- `GET /reviews?targetId=xxx&page=1&limit=10`
- `GET /collections/search?q=xxx&page=1&limit=20`
- `GET /users/me/review-list?page=1&limit=20`
- `GET /users/{userId}/rated-albums?page=1&limit=20`
- `GET /users/{userId}/rated-tracks?page=1&limit=20`

---

### Option 2: 프론트엔드 Infinite Scroll 구현 (임시 방편)

API 수정 없이 프론트엔드에서만 처리:

```typescript
// 클라이언트 사이드 pagination
const [page, setPage] = useState(1);
const ITEMS_PER_PAGE = 20;

const paginatedItems = useMemo(() => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return allItems.slice(startIndex, endIndex);
}, [allItems, page]);
```

**장점:** API 수정 불필요
**단점:**
- 여전히 모든 데이터를 한 번에 로드
- 근본적인 성능 문제 미해결
- 서버 부하는 그대로

---

### Option 3: Cursor-based Pagination (대용량 데이터용)

무한 스크롤에 최적화된 방식:

```typescript
interface CursorPaginatedResponse<T> {
  data: {
    items: T[];
    nextCursor: string | null;  // 다음 페이지 커서
    hasMore: boolean;           // 더 있는지 여부
  };
}

// API 요청
GET /collections/all?cursor=xxx&limit=20
```

**장점:**
- 무한 스크롤에 최적
- 새 데이터 삽입/삭제 시 안정적
- 페이지 번호 문제 없음

**단점:**
- 특정 페이지로 점프 불가능
- 구현 복잡도 높음

---

## 📋 구현 체크리스트

### Phase 1: API 수정 (백엔드)
- [ ] pagination 파라미터 추가 (`page`, `limit`)
- [ ] 표준 응답 구조 정의
- [ ] 모든 목록 API에 pagination 적용
- [ ] API 문서 업데이트 (OpenAPI Spec)
- [ ] 필드명 통일 (`total` → `totalItems`)

### Phase 2: 타입 업데이트 (프론트엔드)
- [ ] APIdog에서 새 OpenAPI Spec 기반 코드 재생성
- [ ] `PaginatedResponse` 타입 정의
- [ ] 기존 API 모델 타입 업데이트

### Phase 3: Hooks 수정
- [ ] `useAllCollections` - pagination 지원
- [ ] `useReviews` - pagination 지원
- [ ] `useRatedAlbums` - pagination 지원
- [ ] `useRatedTracks` - pagination 지원
- [ ] `useSearch` - pagination 지원

### Phase 4: UI 구현
- [ ] Pagination 컴포넌트 제작 (페이지 번호 버튼)
- [ ] 또는 Infinite Scroll 구현 (react-intersection-observer)
- [ ] 로딩 스피너 추가
- [ ] 에러 처리 개선
- [ ] 스켈레톤 UI 추가

### Phase 5: 성능 최적화
- [ ] React Query 도입 (캐싱, 무효화)
- [ ] Virtual Scrolling (react-window)
- [ ] Debounce 검색 입력
- [ ] Prefetching 다음 페이지

---

## 🎯 다음 단계 제안

### 단기 (1-2주)
1. 백엔드 팀과 pagination API 스펙 협의
2. `/collections/all` 1개 엔드포인트에 먼저 적용 (POC)
3. 프론트엔드 pagination UI 프로토타입 제작

### 중기 (1개월)
1. 모든 목록 API에 pagination 적용
2. 프론트엔드 전체 페이지 업데이트
3. React Query 도입

### 장기 (2-3개월)
1. 성능 모니터링 및 최적화
2. Cursor-based pagination 검토 (필요 시)
3. 실시간 업데이트 (WebSocket) 검토

---

## 📚 참고 자료

### Pagination 베스트 프랙티스
- [GitHub API Pagination](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api)
- [Stripe API Pagination](https://stripe.com/docs/api/pagination)
- [RESTful API Design - Pagination](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/)

### 프론트엔드 라이브러리
- [TanStack Query (React Query)](https://tanstack.com/query/latest) - 서버 상태 관리 및 캐싱
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) - Infinite scroll
- [react-window](https://github.com/bvaughn/react-window) - Virtual scrolling

---

**작성일:** 2025-11-09
**브랜치:** `feature/pagination-review`
**작성자:** Claude Code
