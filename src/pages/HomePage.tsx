import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LogOut, Music, Search, Heart, MessageCircle, Clock, Star, Sparkles, TrendingUp, Plus, Loader2, RefreshCw } from "lucide-react";
import { Input } from "../components/ui/input";
import { useHomeData } from "../hooks/useHomeData";
import { StarRating } from "../components/StarRating";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { clearAuthToken } from "../api/client";

export function HomePage() {
  const navigate = useNavigate();

  // Fetch home page data from API
  const { data: homeData, loading, error, refetch } = useHomeData();

  const handleLogout = () => {
    clearAuthToken();
    localStorage.clear();
    navigate('/auth');
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--surface)' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--primary)' }} />
        <p className="mt-4 text-body-large" style={{ color: 'var(--on-surface-variant)' }}>
          로딩 중...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="text-center space-y-4">
          <p className="text-body-large" style={{ color: 'var(--error)' }}>
            데이터를 불러오는데 실패했습니다
          </p>
          <p className="text-body-medium" style={{ color: 'var(--on-surface-variant)' }}>
            {error.message}
          </p>
          <Button
            onClick={refetch}
            className="h-10 px-6 rounded-full"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)'
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to convert timestamp to relative time
  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  // Collections data
  const collections = homeData?.recommandedCollections || [];

  // Map popular reviews (filter out reviews without album data)
  const popularReviews = (homeData?.popularReviews || [])
    .filter(review => review.album) // Only include reviews with album data
    .map(review => ({
      id: String(review.reviewId),
      user: {
        name: review.username,
        avatar: review.userProfileImage
      },
      content: review.content,
      album: {
        title: review.album.title,
        artist: review.album.artists?.[0] || 'Unknown Artist',
        id: review.album.id,
        imageUrl: review.album.imageUrl
      },
      timeAgo: getTimeAgo(review.createdAt),
      likes: review.likeCount,
      rating: review.rating,
      commentCount: review.commentCount
    }));

  // Map recent reviews with timeAgo (filter out reviews without album data)
  const recentReviews = (homeData?.recentReviews || [])
    .filter(review => review.album) // Only include reviews with album data
    .map(review => ({
      id: String(review.reviewId),
      user: {
        name: review.username,
        avatar: review.userProfileImage
      },
      content: review.content,
      album: {
        title: review.album.title,
        artist: review.album.artists?.[0] || 'Unknown Artist',
        id: review.album.id,
        imageUrl: review.album.imageUrl
      },
      timeAgo: getTimeAgo(review.createdAt),
      rating: review.rating,
      likes: review.likeCount,
      commentCount: review.commentCount
    }));

  // Map popular albums
  const popularAlbums = (homeData?.popularAlbums || []).map(album => ({
    id: album.id,
    title: album.title,
    artist: album.artists.join(', '),
    imageUrl: album.imageUrl,
    rating: album.averageRating
  }));

  // Map popular tracks
  const popularTracks = (homeData?.popularTracks || []).map(track => ({
    id: track.id,
    title: track.title,
    artist: track.artists.join(', '),
    imageUrl: track.imageUrl,
    rating: track.averageRating
  }));






  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Minimal White Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
            <Music className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="text-title-large" style={{ color: 'var(--on-surface)' }}>뮤직레이트</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-10 h-10 p-0 rounded-full">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-4">
          {/* Hero Section with Primary Actions */}
          <div className="px-4 md:px-6 pt-4 space-y-6">
            {/* Main Search - Minimal Border Style */}
            <div 
              className="w-full h-16 rounded-xl flex items-center px-6 cursor-pointer transition-all border"
              style={{ 
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--outline)'
              }}
              onClick={() => navigate('/search')}
            >
              <Search className="w-6 h-6 mr-4" style={{ color: 'var(--on-surface-variant)' }} />
              <span className="text-body-large" style={{ color: 'var(--on-surface-variant)' }}>
                요즘 듣는 음악을 찾아보세요
              </span>
            </div>
          </div>

          {/* Material 3 컬렉션 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>추천 컬렉션</h2>
              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 px-3 md:px-4 rounded-full border-2 state-layer-hover"
                  style={{
                    borderColor: 'var(--outline)',
                    color: 'var(--primary)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => navigate('/collections/new')}
                >
                  <Plus className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="text-label-large">만들기</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 px-3 md:px-4 rounded-full state-layer-hover"
                  style={{ color: 'var(--primary)' }}
                  onClick={() => navigate('/collections')}
                >
                  <span className="text-label-large">전체보기</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-3 md:gap-6 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {collections.map((collection) => (
                <div
                  key={collection.collectionId}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-80 lg:w-96 cursor-pointer transition-all rounded-xl overflow-hidden border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                  onClick={() => navigate(`/collections/${collection.collectionId}`)}
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={collection.coverImageUrl || ''}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex flex-wrap gap-2">
                        {collection.tags?.slice(0, 2).map((tag) => (
                          <div
                            key={tag}
                            className="px-3 py-1 rounded-full text-label-small"
                            style={{
                              backgroundColor: 'var(--surface-container)',
                              color: 'var(--on-surface)'
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    {/* 제목 */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-title-medium line-clamp-1 flex-1" style={{ color: 'var(--on-surface)' }}>
                        {collection.title}
                      </h3>
                    </div>

                    {/* 설명 */}
                    <p className="text-body-medium line-clamp-2 mb-4" style={{ color: 'var(--on-surface-variant)' }}>
                      {collection.description}
                    </p>

                    {/* 크리에이터 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          className="w-6 h-6 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${collection.author.id}`);
                          }}
                        >
                          <AvatarImage src={collection.author.imageUrl} />
                          <AvatarFallback className="text-label-small">{collection.author.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className="text-label-medium cursor-pointer hover:underline"
                          style={{ color: 'var(--on-surface-variant)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${collection.author.id}`);
                          }}
                        >
                          {collection.author.username}
                        </span>
                      </div>
                    </div>

                    {/* 통계 */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
                          {collection.likeCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Music className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
                          {collection.itemCount}곡
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 인기 앨범 섹션 */}
          <HorizontalMusicSection
            title="인기 앨범"
            items={popularAlbums}
            type="album"
            onItemClick={(id) => navigate(`/albums/${id}`)}
            onViewAll={() => navigate('/popular-albums')}
          />

          {/* 인기 트랙 섹션 */}
          <HorizontalMusicSection
            title="인기 트랙"
            items={popularTracks}
            type="track"
            onItemClick={(id) => navigate(`/tracks/${id}`)}
            onViewAll={() => navigate('/popular-tracks')}
          />

          {/* Material 3 인기 리뷰 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-xl font-semibold">
                인기 리뷰
              </h2>
            </div>
            <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {popularReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] lg:w-[550px] cursor-pointer transition-all rounded-2xl p-4 border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                onClick={() => navigate(`/reviews/${review.id}`)}
                >
                  {/* 상단: 프로필 & 별점 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback className="text-label-large">{review.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                          {review.user.name}
                        </p>
                        <span className="text-label-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.timeAgo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 하단: 좌측(앨범 커버 + 정보) + 우측(리뷰 내용 + 좋아요/댓글) */}
                  <div className="flex gap-3">
                    {/* 좌측: 앨범 커버 + 정보 */}
                    <div
                      className="flex flex-col gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      navigate(`/albums/${review.album.id}`);
                      }}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={review.album.imageUrl}
                          alt={review.album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center w-20">
                        <div className="text-xs font-medium truncate" style={{ color: 'var(--on-surface)' }}>
                          {review.album.title}
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.album.artist}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 리뷰 내용 + 좋아요/댓글 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-body-medium leading-relaxed" style={{ color: 'var(--on-surface)' }}>
                        {review.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 justify-end">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />
                          <span className="text-body-medium" style={{ color: 'var(--on-surface)' }}>
                            {review.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />
                          <span className="text-body-medium" style={{ color: 'var(--on-surface)' }}>
                            {review.commentCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material 3 최근 리뷰 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-xl font-semibold">
                최근 리뷰
              </h2>
            </div>
            <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] lg:w-[550px] cursor-pointer transition-all rounded-2xl p-4 border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                onClick={() => navigate(`/reviews/${review.id}`)}
                >
                  {/* 상단: 프로필 & 별점 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback className="text-label-large">{review.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                          {review.user.name}
                        </p>
                        <span className="text-label-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.timeAgo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 하단: 좌측(앨범 커버 + 정보) + 우측(리뷰 내용 + 좋아요/댓글) */}
                  <div className="flex gap-3">
                    {/* 좌측: 앨범 커버 + 정보 */}
                    <div
                      className="flex flex-col gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      navigate(`/albums/${review.album.id}`);
                      }}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={review.album.imageUrl}
                          alt={review.album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center w-20">
                        <div className="text-xs font-medium truncate" style={{ color: 'var(--on-surface)' }}>
                          {review.album.title}
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.album.artist}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 리뷰 내용 + 좋아요/댓글 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-body-medium leading-relaxed" style={{ color: 'var(--on-surface)' }}>
                        {review.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 justify-end">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />
                          <span className="text-body-medium" style={{ color: 'var(--on-surface)' }}>
                            {review.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5" style={{ color: 'var(--on-surface)' }} />
                          <span className="text-body-medium" style={{ color: 'var(--on-surface)' }}>
                            {review.commentCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </main>
    </div>
  );
}