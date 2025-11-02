import { useState, useEffect } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { getAuthToken, clearAuthToken } from "./api/client";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { RateRecordPage } from "./pages/RateRecordPage";
import { UserPage } from "./pages/UserPage";
import { AuthPage } from "./pages/AuthPage";
import { AlbumDetailPage } from "./pages/AlbumDetailPage";
import { TrackDetailPage } from "./pages/TrackDetailPage";
import { ArtistDetailPage } from "./pages/ArtistDetailPage";
import { RatedAlbumsPage } from "./pages/RatedAlbumsPage";
import { RatedTracksPage } from "./pages/RatedTracksPage";
import { CommentDetailPage } from "./pages/CommentDetailPage";
import { CurationDetailPage } from "./pages/CurationDetailPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { LikedArtistsPage } from "./pages/LikedArtistsPage";
import { CreateCollectionPage } from "./pages/CreateCollectionPage";
import { KMACollectionPage } from "./pages/KMACollectionPage";
import { MyCollectionsPage } from "./pages/MyCollectionsPage";
import { LikedCollectionsPage } from "./pages/LikedCollectionsPage";
import { AllCollectionsPage } from "./pages/AllCollectionsPage";
import { WriteReviewPage } from "./pages/WriteReviewPage";
import { MyReviewsPage } from "./pages/MyReviewsPage";

type Page = 'auth' | 'home' | 'search' | 'rate-record' | 'user' | 'album-detail' | 'track-detail' | 'artist-detail' | 'rated-albums' | 'rated-tracks' | 'comment-detail' | 'curation-detail' | 'user-profile' | 'liked-artists' | 'create-collection' | 'kma-collection' | 'my-collections' | 'liked-collections' | 'all-collections' | 'write-review' | 'my-reviews';

export default function App() {
  // Check for existing token on mount
  const token = getAuthToken();
  const [currentPage, setCurrentPage] = useState<Page>(token ? 'home' : 'auth');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [selectedId, setSelectedId] = useState<string>('');

  // Listen for unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      handleLogout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    clearAuthToken();
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentPage('auth');
  };

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setSelectedId(id);
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentPage(tab as Page);
  };

  // 인증되지 않은 상태에서는 AuthPage만 표시
  if (!isLoggedIn) {
    return (
      <div className="size-full">
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  // 메인 앱 렌더링
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} />;
      case 'rate-record':
        return <RateRecordPage onNavigate={handleNavigate} />;
      case 'user':
        return <UserPage onNavigate={handleNavigate} />;
      case 'album-detail':
        return <AlbumDetailPage albumId={selectedId} onNavigate={handleNavigate} />;
      case 'track-detail':
        return <TrackDetailPage trackId={selectedId} onNavigate={handleNavigate} />;
      case 'artist-detail':
        return <ArtistDetailPage artistId={selectedId} onNavigate={handleNavigate} />;
      case 'rated-albums':
        return <RatedAlbumsPage onNavigate={handleNavigate} />;
      case 'rated-tracks':
        return <RatedTracksPage onNavigate={handleNavigate} />;
      case 'comment-detail':
        return <CommentDetailPage commentId={selectedId} onNavigate={handleNavigate} />;
      case 'curation-detail':
        return <CurationDetailPage curationId={selectedId} onNavigate={handleNavigate} />;
      case 'user-profile':
        return <UserProfilePage userId={selectedId} onNavigate={handleNavigate} />;
      case 'liked-artists':
        return <LikedArtistsPage onNavigate={handleNavigate} />;
      case 'create-collection':
        return <CreateCollectionPage onNavigate={handleNavigate} />;
      case 'kma-collection':
        return <KMACollectionPage onNavigate={handleNavigate} />;
      case 'my-collections':
        return <MyCollectionsPage onNavigate={handleNavigate} />;
      case 'liked-collections':
        return <LikedCollectionsPage onNavigate={handleNavigate} />;
      case 'all-collections':
        return <AllCollectionsPage onNavigate={handleNavigate} />;
      case 'write-review':
        return <WriteReviewPage albumId={selectedId} onNavigate={handleNavigate} />;
      case 'my-reviews':
        return <MyReviewsPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
  };

  const showBottomNavigation = !['album-detail', 'track-detail', 'artist-detail', 'rated-albums', 'rated-tracks', 'comment-detail', 'curation-detail', 'user-profile', 'liked-artists', 'create-collection', 'kma-collection', 'my-collections', 'liked-collections', 'all-collections', 'write-review', 'my-reviews'].includes(currentPage);

  return (
    <div className="size-full relative">
      {renderCurrentPage()}
      {showBottomNavigation && (
        <BottomNavigation
          activeTab={['album-detail', 'track-detail', 'artist-detail', 'rated-albums', 'rated-tracks', 'comment-detail', 'curation-detail', 'user-profile', 'liked-artists', 'create-collection', 'kma-collection', 'my-collections', 'liked-collections', 'all-collections', 'write-review', 'my-reviews'].includes(currentPage) ? 'rate-record' : currentPage}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}