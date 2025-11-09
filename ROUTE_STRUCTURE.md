# Route Structure Design

## URL Schema

### Public Routes
```
/auth              → AuthPage (로그인/회원가입)
```

### Protected Routes (인증 필요)

#### Main Navigation (BottomNavigation 표시)
```
/                  → HomePage (redirect to /home)
/home              → HomePage
/search            → SearchPage
/rate-record       → RateRecordPage
/notifications     → NotificationsPage
/user              → UserPage (내 프로필)
```

#### Detail Pages (BottomNavigation 숨김)
```
/albums/:albumId              → AlbumDetailPage
/tracks/:trackId              → TrackDetailPage
/artists/:artistId            → ArtistDetailPage
/reviews/:reviewId            → CommentDetailPage
/collections/:collectionId    → CurationDetailPage
/users/:userId                → UserProfilePage
```

#### List Pages (BottomNavigation 숨김)
```
/rated-albums                 → RatedAlbumsPage
/rated-tracks                 → RatedTracksPage
/liked-artists                → LikedArtistsPage
/my-collections               → MyCollectionsPage
/liked-collections            → LikedCollectionsPage
/collections                  → AllCollectionsPage
/my-reviews                   → MyReviewsPage
```

#### Action Pages (BottomNavigation 숨김)
```
/collections/new                      → CreateCollectionPage
/albums/:albumId/write-review         → WriteReviewPage
/collections/kma                      → KMACollectionPage
```

#### Error Pages
```
/404 or *          → NotFoundPage
```

---

## Route Components Structure

```
App.tsx
├── BrowserRouter
    ├── Routes
        ├── Public Routes
        │   └── Route path="/auth" → AuthPage
        │
        ├── Protected Routes (ProtectedRoute wrapper)
            └── Route element={<Layout />}
                ├── Route index → Navigate to /home
                ├── Route path="home" → HomePage
                ├── Route path="search" → SearchPage
                ├── Route path="rate-record" → RateRecordPage
                ├── Route path="notifications" → NotificationsPage
                ├── Route path="user" → UserPage
                │
                ├── Route path="albums/:albumId" → AlbumDetailPage
                ├── Route path="tracks/:trackId" → TrackDetailPage
                ├── Route path="artists/:artistId" → ArtistDetailPage
                ├── Route path="reviews/:reviewId" → CommentDetailPage
                ├── Route path="collections/:collectionId" → CurationDetailPage
                ├── Route path="users/:userId" → UserProfilePage
                │
                ├── Route path="rated-albums" → RatedAlbumsPage
                ├── Route path="rated-tracks" → RatedTracksPage
                ├── Route path="liked-artists" → LikedArtistsPage
                ├── Route path="my-collections" → MyCollectionsPage
                ├── Route path="liked-collections" → LikedCollectionsPage
                ├── Route path="collections" → AllCollectionsPage
                ├── Route path="my-reviews" → MyReviewsPage
                │
                ├── Route path="collections/new" → CreateCollectionPage
                ├── Route path="albums/:albumId/write-review" → WriteReviewPage
                └── Route path="collections/kma" → KMACollectionPage
        │
        └── Route path="*" → NotFoundPage
```

---

## Migration Mapping

### Before → After

| 기존 페이지 ID | 새 URL | 컴포넌트 |
|--------------|--------|---------|
| `'auth'` | `/auth` | AuthPage |
| `'home'` | `/home` | HomePage |
| `'search'` | `/search` | SearchPage |
| `'rate-record'` | `/rate-record` | RateRecordPage |
| `'notifications'` | `/notifications` | NotificationsPage |
| `'user'` | `/user` | UserPage |
| `'album-detail'` | `/albums/:albumId` | AlbumDetailPage |
| `'track-detail'` | `/tracks/:trackId` | TrackDetailPage |
| `'artist-detail'` | `/artists/:artistId` | ArtistDetailPage |
| `'comment-detail'` | `/reviews/:reviewId` | CommentDetailPage |
| `'curation-detail'` | `/collections/:collectionId` | CurationDetailPage |
| `'user-profile'` | `/users/:userId` | UserProfilePage |
| `'rated-albums'` | `/rated-albums` | RatedAlbumsPage |
| `'rated-tracks'` | `/rated-tracks` | RatedTracksPage |
| `'liked-artists'` | `/liked-artists` | LikedArtistsPage |
| `'my-collections'` | `/my-collections` | MyCollectionsPage |
| `'liked-collections'` | `/liked-collections` | LikedCollectionsPage |
| `'all-collections'` | `/collections` | AllCollectionsPage |
| `'my-reviews'` | `/my-reviews` | MyReviewsPage |
| `'create-collection'` | `/collections/new` | CreateCollectionPage |
| `'write-review'` | `/albums/:albumId/write-review` | WriteReviewPage |
| `'kma-collection'` | `/collections/kma` | KMACollectionPage |

---

## Navigation Examples

### Before (State-based)
```typescript
// 기존 방식
onNavigate('album-detail', '123')
onNavigate('artist-detail', '456')
onNavigate('home')
```

### After (React Router)
```typescript
// 새 방식
navigate('/albums/123')
navigate('/artists/456')
navigate('/home')
navigate(-1)  // 뒤로가기
```

---

## BottomNavigation Routes

```typescript
const tabs = [
  { path: '/home', icon: Home, label: '홈' },
  { path: '/search', icon: Search, label: '검색' },
  { path: '/rate-record', icon: Star, label: '평가 기록' },
  { path: '/notifications', icon: Bell, label: '알림' },
  { path: '/user', icon: User, label: '프로필' },
];
```

---

## Implementation Files

### 새로 생성할 파일
1. `src/components/ProtectedRoute.tsx` - 인증 보호 wrapper
2. `src/components/Layout.tsx` - BottomNavigation 조건부 렌더링
3. `src/pages/NotFoundPage.tsx` - 404 페이지

### 수정할 파일
1. `src/App.tsx` - BrowserRouter 및 Routes 설정
2. `src/components/BottomNavigation.tsx` - Link 컴포넌트 사용
3. 모든 페이지 컴포넌트 (28개) - useParams, useNavigate 사용

---

## Special Cases

### 1. KMA Collection 페이지
- URL: `/collections/kma`
- Note: `/collections/:collectionId`보다 먼저 정의해야 함 (더 구체적인 라우트)

### 2. Write Review 페이지
- URL: `/albums/:albumId/write-review`
- Nested route로 앨범 ID 전달

### 3. Root Path
- `/` → Redirect to `/home`

### 4. 인증되지 않은 사용자
- Protected routes 접근 시 → `/auth`로 redirect

---

## Browser History Examples

### 시나리오 1: 앨범 상세 → 아티스트 상세
```
1. /home
2. /albums/123        (앨범 클릭)
3. /artists/456       (아티스트 클릭)
4. [뒤로가기] → /albums/123
5. [뒤로가기] → /home
```

### 시나리오 2: 검색 → 결과 → 상세
```
1. /search
2. /search            (검색어 입력)
3. /albums/789        (검색 결과 클릭)
4. [뒤로가기] → /search
```

### 시나리오 3: URL 직접 접근
```
1. 사용자가 브라우저에 직접 입력: /albums/123
2. 인증 확인
3. 앨범 상세 페이지 렌더링
4. 새로고침해도 같은 페이지 유지
```

---

## Notes

- 모든 URL은 소문자 사용
- ID 파라미터는 `:paramName` 형식
- Nested routes는 최소화 (Layout만 사용)
- 404는 catch-all route (`*`)로 처리
- Protected routes는 HOC 패턴 사용
