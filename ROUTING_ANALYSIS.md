# Routing 시스템 상세 분석

## 📊 Executive Summary

**현재 구현: Custom State-based Routing (React Router 미사용)**

### 핵심 발견사항
- ✅ **작동 방식**: React state 기반 페이지 전환
- ❌ **URL 동기화**: 없음 (새로고침 시 초기화)
- ❌ **브라우저 히스토리**: 없음 (뒤로가기 버튼 작동 안 함)
- ❌ **Deep linking**: 불가능
- ⚠️ **확장성**: 페이지 추가 시 여러 곳 수정 필요
- ⚠️ **상태 관리**: selectedId 하나로 모든 페이지 ID 관리 (충돌 가능성)

---

## 🏗️ 현재 아키텍처

### 1. App.tsx - 중앙 Routing 관리자

#### 1.1 State 구조
```typescript
// src/App.tsx (line 28-35)
type Page = 'auth' | 'home' | 'search' | 'rate-record' | 'user'
  | 'album-detail' | 'track-detail' | 'artist-detail'
  | 'rated-albums' | 'rated-tracks' | 'comment-detail'
  | 'curation-detail' | 'user-profile' | 'liked-artists'
  | 'create-collection' | 'kma-collection' | 'my-collections'
  | 'liked-collections' | 'all-collections' | 'write-review'
  | 'my-reviews' | 'notifications';

const [currentPage, setCurrentPage] = useState<Page>(token ? 'home' : 'auth');
const [isLoggedIn, setIsLoggedIn] = useState(!!token);
const [selectedId, setSelectedId] = useState<string>('');
```

**문제점:**
- **28개 페이지 타입** - Union type이 매우 김
- **selectedId 하나만 존재** - 여러 페이지가 동시에 ID를 필요로 할 때 충돌
- **타입 안전성 부족** - string으로 페이지 이름 전달 시 오타 가능

#### 1.2 Navigation 함수
```typescript
// src/App.tsx (line 62-67)
const handleNavigate = (page: string, id?: string) => {
  setCurrentPage(page as Page);
  if (id) {
    setSelectedId(id);
  }
};

const handleTabChange = (tab: string) => {
  setCurrentPage(tab as Page);
};
```

**문제점:**
- **타입 캐스팅** (`as Page`) - 런타임 오류 가능성
- **ID 덮어쓰기** - 이전 페이지의 ID 손실
- **히스토리 없음** - 뒤로가기 위한 이전 상태 저장 안 됨

#### 1.3 Switch 기반 렌더링
```typescript
// src/App.tsx (line 84-131)
const renderCurrentPage = () => {
  switch (currentPage) {
    case 'home':
      return <HomePage onNavigate={handleNavigate} onLogout={handleLogout} />;
    case 'search':
      return <SearchPage onNavigate={handleNavigate} />;
    case 'album-detail':
      return <AlbumDetailPage albumId={selectedId} onNavigate={handleNavigate} />;
    // ... 25 more cases
    default:
      return <HomePage onNavigate={handleNavigate} onLogout={handleLogout} />;
  }
};
```

**문제점:**
- **유지보수 비용** - 페이지 추가 시 switch 문 수정 필요
- **Props drilling** - onNavigate를 모든 페이지에 전달
- **코드 중복** - 유사한 패턴 반복

---

### 2. BottomNavigation 컴포넌트

#### 2.1 하드코딩된 탭 구조
```typescript
// src/components/BottomNavigation.tsx (line 9-15)
const tabs = [
  { id: 'home', icon: Home, label: '홈' },
  { id: 'search', icon: Search, label: '검색' },
  { id: 'rate-record', icon: Star, label: '평가 기록' },
  { id: 'notifications', icon: Bell, label: '알림' },
  { id: 'user', icon: User, label: '프로필' },
];
```

**특징:**
- ✅ Material 3 디자인 적용
- ✅ 활성 탭 시각적 피드백
- ⚠️ 탭 목록 변경 시 하드코딩 필요

#### 2.2 조건부 표시 로직
```typescript
// src/App.tsx (line 133)
const showBottomNavigation = !['album-detail', 'track-detail',
  'artist-detail', 'rated-albums', 'rated-tracks', 'comment-detail',
  'curation-detail', 'user-profile', 'liked-artists', 'create-collection',
  'kma-collection', 'my-collections', 'liked-collections', 'all-collections',
  'write-review', 'my-reviews'].includes(currentPage);
```

**문제점:**
- **매직 배열** - 13개 페이지 이름 하드코딩
- **유지보수 어려움** - 새 페이지 추가 시 여기도 수정 필요
- **가독성 저하** - 조건이 매우 김

---

### 3. 페이지 컴포넌트 패턴

#### 3.1 공통 Props 인터페이스
```typescript
// 모든 페이지 컴포넌트가 받는 props
interface PageProps {
  onNavigate: (page: string, id?: string) => void;
}

// Detail 페이지의 경우
interface DetailPageProps {
  [itemType]Id: string;  // albumId, trackId, artistId, etc.
  onNavigate: (page: string, id?: string) => void;
}
```

**발견된 패턴:**
- 총 **24개 페이지** 파일 (.tsx)
- **20개 페이지**에서 onNavigate 사용 (146회 호출)
- **18개 페이지**에서 ArrowLeft 아이콘 사용 (뒤로가기)

#### 3.2 뒤로가기 버튼 구현
```typescript
// 대부분의 페이지에서 이 패턴 반복
<Button
  variant="ghost"
  size="icon"
  onClick={() => onNavigate('home')}  // 하드코딩된 목적지
  className="h-10 w-10 rounded-full"
>
  <ArrowLeft className="h-5 w-5" />
</Button>
```

**문제점:**
- **하드코딩된 목적지** - 항상 'home'으로 이동
- **이전 페이지 기억 안 됨** - 실제 브라우저 뒤로가기와 다름
- **중복 코드** - 18개 페이지에서 반복

#### 3.3 Navigation 호출 예시
```typescript
// src/pages/HomePage.tsx
onClick={() => onNavigate('album-detail', album.id)}
onClick={() => onNavigate('curation-detail', collection.id)}
onClick={() => onNavigate('user-profile', userId)}

// src/pages/SearchPage.tsx
onClick={() => onNavigate('album-detail', album.id)}
onClick={() => onNavigate('track-detail', track.id)}
onClick={() => onNavigate('artist-detail', artist.id)}

// src/pages/AlbumDetailPage.tsx
onClick={() => onNavigate('write-review', albumId)}
onClick={() => onNavigate('artist-detail', artist.artistId)}
```

---

## ⚠️ 주요 문제점 및 리스크

### 1. URL 동기화 부재

#### 문제 상황
```
사용자 시나리오:
1. 홈 → 앨범 상세 → 리뷰 작성 페이지 이동
2. URL은 여전히 "localhost:3001/" (변화 없음)
3. 새로고침 (F5) 클릭
4. 홈 화면으로 돌아감 (리뷰 작성 내용 손실)
```

**영향:**
- ❌ 특정 페이지 URL 공유 불가능
- ❌ 북마크 불가능
- ❌ 새로고침 시 현재 위치 손실
- ❌ SEO 최적화 불가능

---

### 2. 브라우저 히스토리 미지원

#### 문제 상황
```
사용자 시나리오:
1. 홈 → 검색 → 앨범 상세 이동
2. 브라우저 뒤로가기 버튼 클릭
3. 아무 일도 일어나지 않음 (또는 사이트 이탈)
```

**영향:**
- ❌ 브라우저 뒤로가기/앞으로가기 버튼 작동 안 됨
- ❌ 사용자 경험 저하
- ❌ 모바일 제스처 뒤로가기 미작동

---

### 3. selectedId 단일 상태 문제

#### 문제 상황
```typescript
// 시나리오: 앨범 상세 → 아티스트 상세 → 앨범 상세 복귀
1. onNavigate('album-detail', 'album-123')  // selectedId = 'album-123'
2. onNavigate('artist-detail', 'artist-456') // selectedId = 'artist-456' (덮어씀)
3. 뒤로가기 시도 → onNavigate('album-detail')
4. albumId가 'artist-456'이 됨 (잘못된 데이터)
```

**영향:**
- ❌ ID 충돌 및 데이터 불일치
- ❌ 중첩 네비게이션 불가능
- ❌ 여러 Detail 페이지 왕복 시 버그

---

### 4. 확장성 및 유지보수 문제

#### 새 페이지 추가 시 수정 필요한 곳
```typescript
// 1. Page type 정의 (App.tsx:28)
type Page = 'existing-pages' | 'new-page';

// 2. renderCurrentPage switch 문 (App.tsx:84-131)
case 'new-page':
  return <NewPage onNavigate={handleNavigate} />;

// 3. showBottomNavigation 배열 (App.tsx:133)
const showBottomNavigation = !['existing-pages', 'new-page'].includes(currentPage);

// 4. BottomNavigation tabs 배열 (필요시, BottomNavigation.tsx:9-15)
```

**문제점:**
- **4곳 이상 수정 필요** - 실수 가능성 높음
- **타입 안전성 부족** - string literal 타이핑 오류
- **코드 중복** - 페이지 이름이 여러 곳에 반복

---

### 5. Deep Linking 불가능

#### 영향
```typescript
// 불가능한 시나리오들:
❌ 특정 앨범 직접 접근: /album/123
❌ 검색 결과 공유: /search?q=beatles
❌ 사용자 프로필 공유: /user/456
❌ 이메일 링크: /notifications?highlight=789
```

---

## 📊 페이지 구조 분석

### 페이지 계층 구조
```
Root (App.tsx)
├── Auth Layer
│   └── AuthPage (로그인/회원가입)
│
└── Main App (isLoggedIn = true)
    ├── 메인 네비게이션 (BottomNavigation 표시)
    │   ├── HomePage
    │   ├── SearchPage
    │   ├── RateRecordPage
    │   ├── NotificationsPage
    │   └── UserPage
    │
    └── Sub Pages (BottomNavigation 숨김)
        ├── Detail Pages (ID 필요)
        │   ├── AlbumDetailPage (albumId)
        │   ├── TrackDetailPage (trackId)
        │   ├── ArtistDetailPage (artistId)
        │   ├── CommentDetailPage (commentId)
        │   ├── CurationDetailPage (curationId)
        │   └── UserProfilePage (userId)
        │
        ├── List Pages
        │   ├── RatedAlbumsPage
        │   ├── RatedTracksPage
        │   ├── LikedArtistsPage
        │   ├── MyCollectionsPage
        │   ├── LikedCollectionsPage
        │   ├── AllCollectionsPage
        │   └── MyReviewsPage
        │
        └── Action Pages
            ├── CreateCollectionPage
            ├── WriteReviewPage (albumId 필요)
            └── KMACollectionPage
```

**통계:**
- **총 28개** 페이지 타입
- **5개** 메인 탭 (BottomNavigation)
- **6개** Detail 페이지 (ID 필요)
- **13개** Sub 페이지 (BottomNavigation 숨김)

---

## 💡 개선 방안

### Option 1: React Router 도입 (권장)

#### 장점
- ✅ URL 기반 routing (새로고침, 북마크, 공유 가능)
- ✅ 브라우저 히스토리 자동 관리
- ✅ Nested routes 지원
- ✅ Code splitting 용이
- ✅ Protected routes 구현 간편
- ✅ TypeScript 타입 안전성

#### 구현 예시
```typescript
// 라우터 설정
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="rate-record" element={<RateRecordPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="user" element={<UserPage />} />

            {/* Detail pages with params */}
            <Route path="albums/:albumId" element={<AlbumDetailPage />} />
            <Route path="tracks/:trackId" element={<TrackDetailPage />} />
            <Route path="artists/:artistId" element={<ArtistDetailPage />} />
            <Route path="reviews/:reviewId" element={<CommentDetailPage />} />
            <Route path="collections/:collectionId" element={<CurationDetailPage />} />
            <Route path="users/:userId" element={<UserProfilePage />} />

            {/* Other routes */}
            <Route path="rated-albums" element={<RatedAlbumsPage />} />
            <Route path="rated-tracks" element={<RatedTracksPage />} />
            <Route path="liked-artists" element={<LikedArtistsPage />} />
            {/* ... more routes */}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Layout with BottomNavigation
function Layout() {
  const location = useLocation();
  const hideBottomNav = ['/albums/', '/tracks/', '/artists/', '/reviews/']
    .some(path => location.pathname.startsWith(path));

  return (
    <>
      <Outlet />
      {!hideBottomNav && <BottomNavigation />}
    </>
  );
}

// Protected route wrapper
function ProtectedRoute({ isAllowed, children }) {
  if (!isAllowed) {
    return <Navigate to="/auth" replace />;
  }
  return children || <Outlet />;
}

// 페이지 컴포넌트에서 사용
function AlbumDetailPage() {
  const { albumId } = useParams(); // URL에서 ID 추출
  const navigate = useNavigate();  // 프로그래매틱 네비게이션

  return (
    <div>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      <Button onClick={() => navigate(`/artists/${artistId}`)}>
        아티스트 보기
      </Button>
    </div>
  );
}
```

#### 마이그레이션 체크리스트
- [ ] `react-router-dom` 설치 (`npm install react-router-dom`)
- [ ] `BrowserRouter`로 App 감싸기
- [ ] Routes/Route 구조 설계
- [ ] Protected routes 구현
- [ ] Layout 컴포넌트 생성 (BottomNavigation 포함)
- [ ] 모든 페이지에서 `onNavigate` → `useNavigate()` 변경
- [ ] ID props → `useParams()` 변경
- [ ] 뒤로가기 버튼 → `navigate(-1)` 변경
- [ ] 404 페이지 추가
- [ ] 서버 설정 (SPA fallback)

---

### Option 2: History API 직접 사용 (중간 단계)

React Router 도입 전 단계로 URL 동기화만 추가:

```typescript
// App.tsx에 추가
useEffect(() => {
  // URL 업데이트
  const url = selectedId
    ? `/${currentPage}/${selectedId}`
    : `/${currentPage}`;
  window.history.pushState({ page: currentPage, id: selectedId }, '', url);
}, [currentPage, selectedId]);

// 브라우저 뒤로가기 처리
useEffect(() => {
  const handlePopState = (event: PopStateEvent) => {
    if (event.state) {
      setCurrentPage(event.state.page);
      setSelectedId(event.state.id || '');
    }
  };

  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);

// URL에서 초기 state 복원
useEffect(() => {
  const path = window.location.pathname.split('/').filter(Boolean);
  if (path.length > 0) {
    setCurrentPage(path[0] as Page);
    if (path.length > 1) {
      setSelectedId(path[1]);
    }
  }
}, []);
```

**장점:**
- ✅ 라이브러리 의존성 없음
- ✅ 점진적 마이그레이션 가능
- ✅ URL 동기화 및 브라우저 히스토리 지원

**단점:**
- ⚠️ 수동 구현 필요 (버그 가능성)
- ⚠️ TypeScript 타입 안전성 부족
- ⚠️ Nested routes 복잡

---

### Option 3: 현재 구조 유지 + 개선 (최소 변경)

근본적인 문제는 해결 안 되지만 코드 품질 개선:

```typescript
// 1. Page 타입을 별도 파일로 분리
// src/types/routes.ts
export const ROUTES = {
  AUTH: 'auth',
  HOME: 'home',
  SEARCH: 'search',
  ALBUM_DETAIL: 'album-detail',
  // ... 모든 페이지
} as const;

export type Page = typeof ROUTES[keyof typeof ROUTES];

// 페이지 메타데이터
export const PAGE_CONFIG: Record<Page, { hideBottomNav: boolean }> = {
  [ROUTES.HOME]: { hideBottomNav: false },
  [ROUTES.ALBUM_DETAIL]: { hideBottomNav: true },
  // ...
};

// 2. Navigation context로 props drilling 제거
// src/contexts/NavigationContext.tsx
const NavigationContext = createContext<{
  currentPage: Page;
  navigate: (page: Page, id?: string) => void;
  goBack: () => void;
}>(null!);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState<Page>(ROUTES.HOME);
  const [selectedId, setSelectedId] = useState<string>('');
  const [history, setHistory] = useState<Array<{ page: Page; id?: string }>>([]);

  const navigate = useCallback((page: Page, id?: string) => {
    setHistory(prev => [...prev, { page: currentPage, id: selectedId }]);
    setCurrentPage(page);
    setSelectedId(id || '');
  }, [currentPage, selectedId]);

  const goBack = useCallback(() => {
    const previous = history[history.length - 1];
    if (previous) {
      setCurrentPage(previous.page);
      setSelectedId(previous.id || '');
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history]);

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);

// 3. 페이지 컴포넌트에서 사용
function AlbumDetailPage({ albumId }: { albumId: string }) {
  const { navigate, goBack } = useNavigation();

  return (
    <div>
      <Button onClick={goBack}>뒤로가기</Button>
      <Button onClick={() => navigate(ROUTES.ARTIST_DETAIL, artistId)}>
        아티스트 보기
      </Button>
    </div>
  );
}
```

**장점:**
- ✅ 최소 변경으로 코드 품질 개선
- ✅ Props drilling 제거
- ✅ 간단한 히스토리 구현
- ✅ 타입 안전성 향상

**단점:**
- ❌ URL 동기화 여전히 없음
- ❌ Deep linking 여전히 불가능
- ❌ SEO 여전히 불가능

---

## 📋 마이그레이션 로드맵

### Phase 1: 준비 단계 (1주)
- [ ] React Router 학습 및 프로토타입 제작
- [ ] 라우트 구조 설계 (URL 스키마)
- [ ] 팀 리뷰 및 승인

### Phase 2: 기반 작업 (1-2주)
- [ ] `react-router-dom` 설치
- [ ] Routes 정의 및 BrowserRouter 설정
- [ ] Layout 컴포넌트 생성
- [ ] Protected routes 구현
- [ ] 404 페이지 추가

### Phase 3: 페이지별 마이그레이션 (2-3주)
- [ ] 메인 네비게이션 페이지 (5개)
  - [ ] HomePage
  - [ ] SearchPage
  - [ ] RateRecordPage
  - [ ] NotificationsPage
  - [ ] UserPage
- [ ] Detail 페이지 (6개)
  - [ ] AlbumDetailPage
  - [ ] TrackDetailPage
  - [ ] ArtistDetailPage
  - [ ] CommentDetailPage
  - [ ] CurationDetailPage
  - [ ] UserProfilePage
- [ ] List 페이지 (7개)
- [ ] Action 페이지 (3개)

### Phase 4: 테스트 및 최적화 (1주)
- [ ] E2E 테스트 (Playwright/Cypress)
- [ ] 네비게이션 플로우 테스트
- [ ] 브라우저 히스토리 테스트
- [ ] URL 공유 테스트
- [ ] 성능 최적화 (Code splitting)

### Phase 5: 배포 및 모니터링 (1주)
- [ ] 서버 설정 (SPA fallback)
- [ ] 배포
- [ ] 사용자 피드백 수집
- [ ] 버그 수정

**총 소요 시간: 6-8주**

---

## 🎯 권장사항

### 단기 (1-2주)
1. **React Router 도입 결정**
2. POC 제작 (HomePage, AlbumDetailPage만)
3. 라우트 구조 확정

### 중기 (1-2개월)
1. 전체 페이지 React Router 마이그레이션
2. Protected routes 및 Auth 플로우 개선
3. Code splitting 적용

### 장기 (3개월+)
1. SSR/SSG 검토 (Next.js 마이그레이션)
2. SEO 최적화
3. Analytics 통합 (페이지뷰 트래킹)

---

## 📚 참고 자료

### React Router
- [React Router v6 공식 문서](https://reactrouter.com/)
- [React Router v6 마이그레이션 가이드](https://reactrouter.com/en/main/upgrading/v5)
- [TypeScript + React Router](https://reactrouter.com/en/main/guides/typescript)

### Best Practices
- [React 라우팅 패턴](https://kentcdodds.com/blog/react-router-code-splitting)
- [Protected Routes in React](https://www.robinwieruch.de/react-router-private-routes/)
- [React Router Lazy Loading](https://reactrouter.com/en/main/route/lazy)

### 대안
- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- [Wouter](https://github.com/molefrog/wouter) - Minimalist router (2KB)

---

**작성일:** 2025-11-09
**브랜치:** `feature/routing-analysis`
**작성자:** Claude Code
