import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, Heart, FolderOpen, Tag, Disc, Music, MessageSquare, UserPlus, UserCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState, useEffect } from "react";
import { useUserActivity } from "../hooks/useUserActivity";
import { apiService } from "../services/api.service";

export function UserProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // API 데이터 가져오기
  const { data, loading, error, refetch } = useUserActivity(userId);

  // 별점 분포 토글 상태
  const [ratingType, setRatingType] = useState<'album' | 'track'>('album');

  // 팔로우 상태
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // 본인 프로필인 경우 평가 기록 페이지로 리다이렉트
  useEffect(() => {
    // TODO: 현재 로그인한 사용자 ID와 비교하여 본인인 경우 /rate-record로 리다이렉트
    // const currentUserId = getCurrentUserId();
    // if (userId === currentUserId) {
    //   navigate('/rate-record', { replace: true });
    // }
  }, [userId, navigate]);

  // Loading 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">프로필</h1>
          <div className="w-10" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">프로필</h1>
          <div className="w-10" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">데이터를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!data) {
    return null;
  }

  // 현재 선택된 타입의 별점 분포
  const currentRatingDistribution = ratingType === 'album'
    ? data.ratingDistribution.album
    : data.ratingDistribution.track;

  // 실제 평가 개수 계산 (모든 count의 합)
  const totalRatings = currentRatingDistribution.reduce((sum, item) => sum + item.count, 0);

  // 팔로우 버튼 핸들러
  const handleFollowToggle = async () => {
    if (!userId || isFollowLoading) return;

    // Optimistic update
    const previousIsFollowing = isFollowing;
    const previousFollowerCount = followerCount;

    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);

    try {
      setIsFollowLoading(true);

      // API 호출
      const response = await apiService.follows.toggleFollow(Number(userId));

      console.log('✅ Follow toggle response:', response);

      // API 응답에서 실제 상태 확인
      const apiData = (response.data as any)?.data;

      if (apiData) {
        const newIsFollowing = apiData.action === 'FOLLOWED';
        setIsFollowing(newIsFollowing);
      }

    } catch (err: any) {
      // 에러 발생 시 이전 상태로 롤백
      setIsFollowing(previousIsFollowing);
      setFollowerCount(previousFollowerCount);

      console.error('❌ 팔로우 토글 실패:', err);
    } finally {
      setIsFollowLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">프로필</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Profile Header - Instagram Style */}
        <div className="px-6 py-4 border-b border-border">
          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={data.userProfile.profileImageUrl} />
              <AvatarFallback className="text-xl">
                {data.userProfile.username?.substring(0, 2) || '사용자'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{data.userProfile.username || '사용자'}</h2>
            </div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={handleFollowToggle}
              disabled={isFollowLoading}
              className="h-8 px-4"
            >
              {isFollowLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1" />
                  처리 중...
                </>
              ) : isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4 mr-1" />
                  팔로잉
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  팔로우
                </>
              )}
            </Button>
          </div>

          {/* Follow Stats & Received Likes */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div>
              팔로워 <span className="font-semibold">{followerCount}</span>
            </div>
            <div>
              팔로잉 <span className="font-semibold">{followingCount}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <Heart className="w-4 h-4 fill-red-500" />
              <span className="font-semibold">{data.statistics.receivedLikes}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {data.userProfile.bio || '소개글이 없습니다.'}
          </p>

          {/* Main Stats - 4 Column Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Rated Albums */}
            <div className="p-3 rounded-lg">
              <Disc className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.albumReviews}</div>
              <div className="text-xs text-muted-foreground">앨범</div>
            </div>

            {/* Rated Tracks */}
            <div className="p-3 rounded-lg">
              <Music className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.trackReviews}</div>
              <div className="text-xs text-muted-foreground">트랙</div>
            </div>

            {/* Liked Artists */}
            <div className="p-3 rounded-lg">
              <Heart className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.likedArtists}</div>
              <div className="text-xs text-muted-foreground">아티스트</div>
            </div>

            {/* Written Reviews */}
            <div className="p-3 rounded-lg">
              <MessageSquare className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.writtenReviews}</div>
              <div className="text-xs text-muted-foreground">리뷰</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">별점 분포</h2>
            <Tabs value={ratingType} onValueChange={(value) => setRatingType(value as 'album' | 'track')}>
              <TabsList className="h-8">
                <TabsTrigger value="album" className="text-xs px-3">
                  <Disc className="w-3.5 h-3.5 mr-1.5" />
                  앨범
                </TabsTrigger>
                <TabsTrigger value="track" className="text-xs px-3">
                  <Music className="w-3.5 h-3.5 mr-1.5" />
                  트랙
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="px-6 space-y-4">
            {totalRatings > 0 ? (
              currentRatingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 w-14">
                    <span className="text-sm font-medium">{item.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{item.count}개</span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  아직 {ratingType === 'album' ? '앨범을' : '트랙을'} 평가하지 않았습니다
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">만든 콜렉션</h2>
            {data.myCollections.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/users/${userId}/collections`)}
                className="text-primary"
              >
                전체보기
              </Button>
            )}
          </div>
          <div className="px-6 space-y-4">
            {data.myCollections.length > 0 ? (
              data.myCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {collection.coverImages[0] && (
                      <img
                        src={collection.coverImages[0]}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base mb-1.5 line-clamp-1">{collection.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-1 leading-relaxed">{collection.description}</p>
                    <p className="text-xs text-muted-foreground/80">{collection.itemCount}곡</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  아직 만든 콜렉션이 없습니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 좋아요한 콜렉션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">좋아요한 콜렉션</h2>
            {data.likedCollections.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/users/${userId}/liked-collections`)}
                className="text-primary"
              >
                전체보기
              </Button>
            )}
          </div>
          <div className="px-6 space-y-4">
            {data.likedCollections.length > 0 ? (
              data.likedCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/collections/${collection.id}`)}
                >
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {collection.coverImages[0] ? (
                      <img
                        src={collection.coverImages[0]}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderOpen className="w-7 h-7 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base mb-1.5 line-clamp-1">{collection.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">{collection.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                      <span>by {collection.creator}</span>
                      <span>•</span>
                      <span>{collection.itemCount}곡</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {collection.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  좋아요한 콜렉션이 없습니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 장르 키워드 맵 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">좋아하는 장르</h2>
          </div>
          <div className="px-6">
            {data.genreKeywords.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-3">
                  {data.genreKeywords.map((genre) => (
                    <Badge
                      key={genre.name}
                      variant="secondary"
                      className={`${genre.color} text-xs`}
                      style={{
                        fontSize: `${Math.max(0.7, genre.weight / 100)}rem`,
                        padding: `${Math.max(6, genre.weight / 20)}px ${Math.max(10, genre.weight / 15)}px`
                      }}
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Tag className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  장르 분석 데이터가 없습니다
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="pt-4">
          <HorizontalMusicSection
            title="평가한 앨범"
            items={data.recentAlbums}
            type="album"
            onItemClick={(id) => navigate(`/albums/${id}`)}
          />

          <HorizontalMusicSection
            title="평가한 트랙"
            items={data.recentTracks}
            type="track"
            onItemClick={(id) => navigate(`/tracks/${id}`)}
          />
        </div>
      </main>
    </div>
  );
}
