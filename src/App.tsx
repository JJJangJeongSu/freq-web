import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { clearAuthToken } from './api/client';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { RateRecordPage } from './pages/RateRecordPage';
import { UserPage } from './pages/UserPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { TrackDetailPage } from './pages/TrackDetailPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';
import { CommentDetailPage } from './pages/CommentDetailPage';
import { CurationDetailPage } from './pages/CurationDetailPage';
import { RatedAlbumsPage } from './pages/RatedAlbumsPage';
import { RatedTracksPage } from './pages/RatedTracksPage';
import { PopularAlbumsPage } from './pages/PopularAlbumsPage';
import { PopularTracksPage } from './pages/PopularTracksPage';
import { LikedArtistsPage } from './pages/LikedArtistsPage';
import { MyCollectionsPage } from './pages/MyCollectionsPage';
import { LikedCollectionsPage } from './pages/LikedCollectionsPage';
import { AllCollectionsPage } from './pages/AllCollectionsPage';
import { MyReviewsPage } from './pages/MyReviewsPage';
import { CreateCollectionPage } from './pages/CreateCollectionPage';
import { WriteReviewPage } from './pages/WriteReviewPage';
import { KMACollectionPage } from './pages/KMACollectionPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { CollectionCommentsPage } from './pages/CollectionCommentsPage';
import { AllReviewsPage } from './pages/AllReviewsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FollowersPage } from './pages/FollowersPage';
import { FollowingPage } from './pages/FollowingPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

/**
 * UnauthorizedListener Component
 *
 * 전역 auth:unauthorized 이벤트를 감지하여 로그아웃 처리
 */
function UnauthorizedListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuthToken();
      localStorage.clear();
      navigate('/auth', { replace: true });
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return null;
}

/**
 * App Component
 *
 * React Router 기반 라우팅 설정
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UnauthorizedListener />
        <Routes>
          {/* Public Route */}
          <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/* Main Navigation Routes */}
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/rate-record" element={<RateRecordPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/user" element={<UserPage />} />

            {/* Detail Pages */}
            <Route path="/albums/:albumId" element={<AlbumDetailPage />} />
            <Route path="/tracks/:trackId" element={<TrackDetailPage />} />
            <Route path="/artists/:artistId" element={<ArtistDetailPage />} />
            <Route path="/reviews/:reviewId" element={<CommentDetailPage />} />
            <Route path="/collections/:collectionId" element={<CurationDetailPage />} />
            <Route path="/users/:userId" element={<UserProfilePage />} />

            {/* List Pages */}
            <Route path="/rated-albums" element={<RatedAlbumsPage />} />
            <Route path="/rated-tracks" element={<RatedTracksPage />} />
            <Route path="/popular-albums" element={<PopularAlbumsPage />} />
            <Route path="/popular-tracks" element={<PopularTracksPage />} />
            <Route path="/liked-artists" element={<LikedArtistsPage />} />
            <Route path="/my-collections" element={<MyCollectionsPage />} />
            <Route path="/liked-collections" element={<LikedCollectionsPage />} />
            <Route path="/collections" element={<AllCollectionsPage />} />
            <Route path="/my-reviews" element={<MyReviewsPage />} />
            <Route path="/followers" element={<FollowersPage />} />
            <Route path="/following" element={<FollowingPage />} />

            {/* Action Pages - More specific routes first */}
            <Route path="/collections/new" element={<CreateCollectionPage />} />
            <Route path="/collections/kma" element={<KMACollectionPage />} />
            <Route path="/collections/:collectionId/comments" element={<CollectionCommentsPage />} />
            <Route path="/albums/:albumId/reviews" element={<AllReviewsPage />} />
            <Route path="/albums/:albumId/write-review/:reviewId?" element={<WriteReviewPage />} />
            {/* Legal/Info Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}
