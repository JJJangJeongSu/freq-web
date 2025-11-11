import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Plus, Star, Heart, FolderOpen, Tag, Disc, Music, MessageSquare, ThumbsUp, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ProfileEditDialog } from "../components/ProfileEditDialog";
import { useState } from "react";
import { useMyActivity } from "../hooks/useMyActivity";

export function RateRecordPage() {
  const navigate = useNavigate();
  // API 데이터 가져오기
  const { data, loading, error, refetch } = useMyActivity();

  // 별점 분포 토글 상태
  const [ratingType, setRatingType] = useState<'album' | 'track'>('album');

  // 프로필 편집 모달 상태
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Loading 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-lg font-semibold">평가 기록</h1>
          <div className="w-8" />
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
          <h1 className="text-lg font-semibold">평가 기록</h1>
          <div className="w-8" />
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



  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">

        <h1 className="text-lg font-semibold">평가 기록</h1>
        <div className="w-8" />
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
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Follow Stats & Received Likes */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => navigate('/followers')}
            >
              팔로워 <span className="font-semibold">{data.statistics.followerCount}</span>
            </div>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => navigate('/following')}
            >
              팔로잉 <span className="font-semibold">{data.statistics.followingCount}</span>
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
            <div
              className="cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => navigate('/rated-albums')}
            >
              <Disc className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.albumReviews}</div>
              <div className="text-xs text-muted-foreground">앨범</div>
            </div>

            {/* Rated Tracks */}
            <div
              className="cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => navigate('/rated-tracks')}
            >
              <Music className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.trackReviews}</div>
              <div className="text-xs text-muted-foreground">트랙</div>
            </div>

            {/* Liked Artists */}
            <div
              className="cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => navigate('/liked-artists')}
            >
              <Heart className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.likedArtists}</div>
              <div className="text-xs text-muted-foreground">아티스트</div>
            </div>

            {/* Written Reviews */}
            <div
              className="cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => navigate('/my-reviews')}
            >
              <MessageSquare className="w-5 h-5 mx-auto text-primary mb-1.5" />
              <div className="text-xl font-bold mb-0.5">{data.statistics.writtenReviews}</div>
              <div className="text-xs text-muted-foreground">리뷰</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">내 별점 분포</h2>
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
                <p className="text-xs text-muted-foreground/70">
                  음악을 평가하고 나만의 취향을 분석해보세요
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">내가 만든 콜렉션</h2>
            <button
              onClick={() => navigate('/my-collections')}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              모두 보기 →
            </button>
          </div>
          <div className="px-6 space-y-4">
            {data.myCollections.length > 0 ? (
              <>
                {data.myCollections.map((collection) => (
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
                ))}
                <Button
                  variant="outline"
                  className="w-full h-12 mt-4"
                  onClick={() => navigate('/collections/new')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  새 콜렉션 만들기
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  아직 만든 콜렉션이 없습니다
                </p>
                <p className="text-xs text-muted-foreground/70 mb-6">
                  좋아하는 음악들을 모아 나만의 콜렉션을 만들어보세요
                </p>
                <Button
                  onClick={() => navigate('/collections/new')}
                  className="h-10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  첫 콜렉션 만들기
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 좋아요한 콜렉션 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">좋아요한 콜렉션</h2>
            <button
              onClick={() => navigate('/liked-collections')}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              모두 보기 →
            </button>
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
                <p className="text-xs text-muted-foreground/70 mb-6">
                  다른 사람들의 콜렉션을 둘러보고 마음에 드는 것을 저장해보세요
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/collections')}
                  className="h-10"
                >
                  콜렉션 둘러보기
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 장르 키워드 맵 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5 px-6">
            <h2 className="text-xl font-semibold">내가 좋아하는 장르</h2>
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
                <p className="text-xs text-muted-foreground/70">
                  더 많은 음악을 평가하면 선호하는 장르를 분석해드립니다
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
            onViewAll={() => navigate('/rated-albums')}
          />

          <HorizontalMusicSection
            title="평가한 트랙"
            items={data.recentTracks}
            type="track"
            onItemClick={(id) => navigate(`/tracks/${id}`)}
            onViewAll={() => navigate('/rated-tracks')}
          />
        </div>
      </main>

      {/* 프로필 편집 모달 */}
      <ProfileEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profileImageUrl={data.userProfile.profileImageUrl}
        username={data.userProfile.username || '사용자'}
        bio={data.userProfile.bio || ''}
        onSuccess={refetch}
      />
    </div>
  );
}
