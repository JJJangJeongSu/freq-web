import { ArrowLeft, MoreVertical, Plus, Star, Heart, FolderOpen, Tag, Disc, Music, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";
import { useMyActivity } from "../hooks/useMyActivity";

interface RateRecordPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function RateRecordPage({ onNavigate }: RateRecordPageProps) {
  // API 데이터 가져오기
  const { data, loading, error } = useMyActivity();

  // 별점 분포 토글 상태
  const [ratingType, setRatingType] = useState<'album' | 'track'>('album');

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
        {/* Profile Header with Primary Actions */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-5 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={data.userProfile.profileImageUrl} />
              <AvatarFallback className="text-xl">
                {data.userProfile.username?.substring(0, 2) || '사용자'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{data.userProfile.username || '사용자'}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.userProfile.bio || '소개글이 없습니다.'}
              </p>
            </div>
          </div>
          
          {/* Primary Actions - 가장 중요한 액션들 */}
          <div className="flex gap-3 mb-4">
            <Button 
              className="flex-1 h-12" 
              onClick={() => onNavigate('search')}
            >
              <Star className="w-5 h-5 mr-2" />
              음악 평가하기
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-12" 
              onClick={() => onNavigate('create-collection')}
            >
              <Plus className="w-5 h-5 mr-2" />
              컬렉션 만들기
            </Button>
          </div>

          {/* Stats Section */}
          <div className="space-y-2">
            {/* ❤️ 좋아요 통계 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">❤️ 좋아요 통계</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {/* Rated Albums */}
                  <div
                    className="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
                    onClick={() => onNavigate('rated-albums')}
                  >
                    <Disc className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-3xl font-extrabold">{data.statistics.albumReviews}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">앨범</div>
                  </div>

                  {/* Rated Tracks */}
                  <div
                    className="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
                    onClick={() => onNavigate('rated-tracks')}
                  >
                    <Music className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-3xl font-extrabold">{data.statistics.trackReviews}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">트랙</div>
                  </div>

                  {/* Liked Artists */}
                  <div
                    className="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
                    onClick={() => onNavigate('liked-artists')}
                  >
                    <Heart className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-3xl font-extrabold">{data.statistics.likedArtists}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">아티스트</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 💬 활동 통계 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">💬 활동 통계</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {/* Written Reviews */}
                  <div
                    className="cursor-pointer hover:bg-muted/50 rounded-lg p-2 transition-colors"
                    onClick={() => onNavigate('my-reviews')}
                  >
                    <MessageSquare className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-3xl font-extrabold">{data.statistics.writtenReviews}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">작성한 리뷰</div>
                  </div>

                  {/* Received Likes */}
                  <div className="rounded-lg p-2">
                    <ThumbsUp className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-3xl font-extrabold">{data.statistics.receivedLikes}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">받은 좋아요</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-6 py-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  내 별점 분포
                </CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="px-6 py-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  내가 만든 콜렉션
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('my-collections')}
                  className="text-primary hover:text-primary/80"
                >
                  모두 보기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.myCollections.length > 0 ? (
                <>
                  {data.myCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onNavigate('curation-detail', String(collection.id))}
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
                    onClick={() => onNavigate('create-collection')}
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
                    onClick={() => onNavigate('create-collection')}
                    className="h-10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    첫 콜렉션 만들기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 좋아요한 콜렉션 */}
        <div className="px-6 py-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  좋아요한 콜렉션
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate('liked-collections')}
                  className="text-primary hover:text-primary/80"
                >
                  모두 보기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.likedCollections.length > 0 ? (
                data.likedCollections.map((collection) => (
                  <div
                    key={collection.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onNavigate('curation-detail', String(collection.id))}
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
                    onClick={() => onNavigate('all-collections')}
                    className="h-10"
                  >
                    콜렉션 둘러보기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 장르 키워드 맵 */}
        <div className="px-6 py-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                내가 좋아하는 장르
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    크기는 평가한 곡 수에 비례합니다
                  </p>
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
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Recent Reviews */}
        <div className="pt-4">
          <HorizontalMusicSection
            title="평가한 앨범"
            items={data.recentAlbums}
            type="album"
            onItemClick={(id) => onNavigate('album-detail', id)}
            onViewAll={() => onNavigate('rated-albums')}
          />

          <HorizontalMusicSection
            title="평가한 트랙"
            items={data.recentTracks}
            type="track"
            onItemClick={(id) => onNavigate('track-detail', id)}
            onViewAll={() => onNavigate('rated-tracks')}
          />
        </div>
      </main>

      
    </div>
  );
}
