# React Router Migration - Testing Guide

This document outlines the testing approach for validating the React Router v6 migration.

## Build Validation

✅ **Build Status**: PASSED (2025-11-09)
- Command: `npm run build`
- Build time: 34.03s
- Output: 731.64 kB JS bundle, 76.82 kB CSS
- Warning: Chunk size exceeds 500 kB (can be optimized later with code splitting)
- No TypeScript compilation errors

## Testing Checklist

### 1. Authentication Flow
- [ ] Direct access to `/auth` shows login page
- [ ] Login with valid credentials redirects to `/home`
- [ ] Invalid credentials show error message
- [ ] Token is stored in localStorage after login
- [ ] Direct access to protected routes without token redirects to `/auth`
- [ ] Logout clears token and redirects to `/auth`

### 2. Main Navigation (BottomNavigation)
- [ ] `/home` - HomePage loads with collections and comments
- [ ] `/search` - SearchPage loads with search functionality
- [ ] `/rate-record` - RateRecordPage loads with tabs
- [ ] `/notifications` - NotificationsPage loads
- [ ] `/user` - UserPage loads with user profile
- [ ] Active tab highlights correctly in BottomNavigation
- [ ] BottomNavigation is visible on all main routes
- [ ] BottomNavigation is hidden on detail/action pages

### 3. Detail Pages (with URL params)
**Albums:**
- [ ] `/albums/:albumId` - AlbumDetailPage loads with correct album data
- [ ] Album image, title, artist display correctly
- [ ] Reviews section loads
- [ ] "Write Review" button navigates to `/albums/:albumId/review`
- [ ] Track list displays and is clickable
- [ ] Back button navigates to previous page

**Tracks:**
- [ ] `/tracks/:trackId` - TrackDetailPage loads
- [ ] Track metadata displays correctly
- [ ] Back navigation works

**Artists:**
- [ ] `/artists/:artistId` - ArtistDetailPage loads
- [ ] Artist info and discography display
- [ ] Album navigation works

**Comments:**
- [ ] `/comments/:commentId` - CommentDetailPage loads
- [ ] Comment content and user info display
- [ ] Like/reply functionality works

**Curations:**
- [ ] `/curations/:curationId` - CurationDetailPage loads
- [ ] Curation content displays correctly

**User Profiles:**
- [ ] `/users/:userId` - UserProfilePage loads
- [ ] User stats and content display
- [ ] Navigation to user's collections/reviews works

### 4. List Pages
**Rated Content:**
- [ ] `/rated/albums` - RatedAlbumsPage loads with user's rated albums
- [ ] `/rated/tracks` - RatedTracksPage loads with user's rated tracks
- [ ] Clicking album/track navigates to detail page
- [ ] Back button returns to previous page

**Collections:**
- [ ] `/collections/my` - MyCollectionsPage loads user's collections
- [ ] `/collections/liked` - LikedCollectionsPage loads liked collections
- [ ] `/collections/all` - AllCollectionsPage loads with search
- [ ] Search functionality filters collections
- [ ] Click collection navigates to `/collections/:collectionId`

**Artists:**
- [ ] `/artists/liked` - LikedArtistsPage loads
- [ ] Click artist navigates to `/artists/:artistId`

**Reviews:**
- [ ] `/reviews/my` - MyReviewsPage loads user's reviews
- [ ] Edit/Delete dropdown menus work
- [ ] Click review navigates to `/reviews/:reviewId`

### 5. Action Pages
**Create Collection:**
- [ ] `/collections/new` - CreateCollectionPage loads
- [ ] Form validation works (title required)
- [ ] Collection type selection works (mixed/albums/tracks)
- [ ] Add items functionality works
- [ ] Save navigates to `/rate-record`
- [ ] Cancel navigates back

**Write Review:**
- [ ] `/albums/:albumId/review` - WriteReviewPage loads
- [ ] Album metadata from sessionStorage displays
- [ ] Star rating is editable
- [ ] Review text is editable
- [ ] Submit button disabled when invalid
- [ ] Submit navigates back to `/albums/:albumId`
- [ ] Back button navigates to previous page

**KMA Collection:**
- [ ] `/kma-collection` - KMACollectionPage loads
- [ ] Nominees display correctly
- [ ] Click nominee navigates to detail page
- [ ] Back to home navigation works

### 6. Browser Behavior
- [ ] **Back button**: Browser back button navigates correctly
- [ ] **Forward button**: Browser forward button navigates correctly
- [ ] **Refresh**: Page refresh maintains current route and data
- [ ] **Direct URL access**: Pasting URL directly loads correct page
- [ ] **Deep linking**: Share URL works (e.g., `/albums/123`)

### 7. 404 Not Found
- [ ] Invalid routes show NotFoundPage
- [ ] Home button navigates to `/home`
- [ ] Search button navigates to `/search`
- [ ] Back button uses navigate(-1)

### 8. URL Synchronization
- [ ] URL updates when navigating between pages
- [ ] URL parameters are correctly extracted (albumId, trackId, etc.)
- [ ] Browser address bar reflects current page
- [ ] Navigation history is maintained

## Key User Journeys

### Journey 1: Login → Album Detail → Write Review
1. Start at `/auth`
2. Login with credentials
3. Redirected to `/home`
4. Click album from "주간 인기 컬렉션"
5. Navigate to `/albums/:albumId`
6. Click "리뷰 작성" button
7. Navigate to `/albums/:albumId/review`
8. Write review and submit
9. Navigate back to `/albums/:albumId`

### Journey 2: Search → Album → Track
1. Navigate to `/search` via BottomNavigation
2. Search for album
3. Click album result → `/albums/:albumId`
4. Click track from tracklist → `/tracks/:trackId`
5. Back button returns to album
6. Back button returns to search

### Journey 3: Create Collection
1. Navigate to `/home`
2. Click "컬렉션 만들기" or navigate to `/collections/all`
3. Click "컬렉션 만들기" button → `/collections/new`
4. Fill in title and description
5. Select collection type
6. Add items (mock for now)
7. Click save → `/rate-record`

### Journey 4: Rate Record → Rated Albums → Album Detail
1. Navigate to `/rate-record` via BottomNavigation
2. Click "평가한 앨범" tab
3. Navigate to `/rated/albums`
4. Click album card → `/albums/:albumId`
5. Back button returns to `/rated/albums`

### Journey 5: User Profile → User's Collections
1. Navigate to `/user` via BottomNavigation
2. Click "내 컬렉션" → `/collections/my`
3. Click collection → `/collections/:collectionId`
4. Back button navigation works

## Known Issues

None identified during build validation. Manual testing required to identify runtime issues.

## Performance Considerations

- **Bundle size**: 731.64 kB (exceeds 500 kB recommendation)
  - **Recommendation**: Implement code splitting with React.lazy() and Suspense
  - **Priority**: Low (functionality first, optimization later)

## Browser Compatibility

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Test Data

Most pages currently use mock/hardcoded data. API integration is partially configured but not fully connected. Testing focuses on:
1. Navigation logic
2. URL parameter extraction
3. Route protection
4. Layout rendering

## Next Steps After Testing

1. Complete manual testing checklist
2. Document any issues found
3. Fix critical navigation bugs
4. Optimize bundle size (optional)
5. Update CLAUDE.md with React Router patterns
6. Create pull request for review
