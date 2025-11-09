import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { LogOut, Music, Search, Star, Plus, Loader2, RefreshCw, Heart, MessageCircle } from "lucide-react";
import { useHomeData } from "../hooks/useHomeData";
import { StarRating } from "../components/StarRating";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
  onLogout?: () => void;
}

export function HomePage({ onNavigate, onLogout }: HomePageProps) {
  // Fetch home page data from API
  const { data: homeData, loading, error, refetch } = useHomeData();

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
            {error}
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

  //  Map API reviews to display format
  const popularReviews = (homeData?.popularReviews || []).map(review => ({
    id: String(review.reviewId),
    user: {
      name: review.username,
      avatar: review.userProfileImage
    },
    content: review.content,
    likes: review.likeCount,
    rating: review.rating,
    commentCount: review.commentCount
  }));

  const recentReviews = (homeData?.recentReviews || []).map(review => ({
    id: String(review.reviewId),
    user: {
      name: review.username,
      avatar: review.userProfileImage
    },
    content: review.content,
    likes: review.likeCount,
    rating: review.rating,
    commentCount: review.commentCount
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
          {onLogout && (
            <Button variant="ghost" size="sm" onClick={onLogout} className="w-10 h-10 p-0 rounded-full">
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-8">
          {/* Hero Section with Primary Actions */}
          <div className="px-4 md:px-6 pt-8 space-y-6">
            {/* Main Search */}
            <div
              className="w-full h-16 rounded-xl flex items-center px-6 cursor-pointer transition-all border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--outline)'
              }}
              onClick={() => onNavigate('search')}
            >
              <Search className="w-6 h-6 mr-4" style={{ color: 'var(--on-surface-variant)' }} />
              <span className="text-body-large" style={{ color: 'var(--on-surface-variant)' }}>
                요즘 듣는 음악을 찾아보세요
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 h-14 rounded-xl"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)'
                }}
                onClick={() => onNavigate('rate-record')}
              >
                <Star className="w-5 h-5 mr-3" />
                <span className="text-label-large">평가하기</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-xl border-2"
                style={{
                  borderColor: 'var(--outline)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary)'
                }}
                onClick={() => onNavigate('create-collection')}
              >
                <Plus className="w-5 h-5 mr-3" />
                <span className="text-label-large">컬렉션 만들기</span>
              </Button>
            </div>
          </div>

          {/* Collections Placeholder */}
          <div className="px-4 md:px-6 space-y-4">
            <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>추천 컬렉션</h2>
            <div className="p-8 rounded-xl border text-center" style={{ borderColor: 'var(--outline)' }}>
              <p className="text-body-medium" style={{ color: 'var(--on-surface-variant)' }}>
                컬렉션 데이터 로딩 준비 중입니다
              </p>
              <Button
                className="mt-4 h-10 px-6 rounded-full"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)'
                }}
                onClick={() => onNavigate('all-collections')}
              >
                전체 컬렉션 보기
              </Button>
            </div>
          </div>

          {/* Popular Reviews */}
          {popularReviews.length > 0 && (
            <div className="space-y-6">
              <div className="px-4 md:px-6">
                <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>
                  인기 리뷰
                </h2>
              </div>
              <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
                {popularReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] cursor-pointer transition-all rounded-2xl p-4 md:p-6 border hover:shadow-md"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                    onClick={() => onNavigate('comment-detail', review.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.user.avatar} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                          {review.user.name}
                        </p>
                      </div>
                      <StarRating rating={review.rating} readonly size="sm" />
                    </div>
                    <p className="text-body-medium leading-relaxed mb-4" style={{ color: 'var(--on-surface)' }}>
                      {review.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {recentReviews.length > 0 && (
            <div className="space-y-6">
              <div className="px-4 md:px-6">
                <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>
                  최근 리뷰
                </h2>
              </div>
              <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] cursor-pointer transition-all rounded-2xl p-4 md:p-6 border hover:shadow-md"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                    onClick={() => onNavigate('comment-detail', review.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.user.avatar} />
                          <AvatarFallback>{review.user.name}</AvatarFallback>
                        </Avatar>
                        <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                          {review.user.name}
                        </p>
                      </div>
                      <StarRating rating={review.rating} readonly size="sm" />
                    </div>
                    <p className="text-body-medium leading-relaxed mb-4" style={{ color: 'var(--on-surface)' }}>
                      {review.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {review.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
