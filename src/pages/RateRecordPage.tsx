import { ArrowLeft, MoreVertical, RefreshCw, Bug, Plus, Star, Heart, FolderOpen, Tag, Disc, Music } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";

interface RateRecordPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function RateRecordPage({ onNavigate }: RateRecordPageProps) {
  // 프로필 데이터 (읽기 전용)
  const profileData = {
    name: '뮤직러버',
    bio: '클래식 록과 재즈를 사랑하는 음악 애호가입니다.\n좋은 음악을 발견하고 공유하는 것을 즐깁니다.',
    avatarUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  };

  const [userStats, setUserStats] = useState({
    albumReviews: 42,
    trackReviews: 138,
    writtenReviews: 18,
    receivedLikes: 256,
    likedArtists: 89
  });

  // 별점 분포 토글 상태
  const [ratingType, setRatingType] = useState<'album' | 'track'>('album');

  // 앨범 별점 분포 데이터
  const [albumRatingDistribution] = useState([
    { rating: 5, count: 15, percentage: 36 },
    { rating: 4, count: 18, percentage: 43 },
    { rating: 3, count: 6, percentage: 14 },
    { rating: 2, count: 2, percentage: 5 },
    { rating: 1, count: 1, percentage: 2 }
  ]);

  // 트랙 별점 분포 데이터
  const [trackRatingDistribution] = useState([
    { rating: 5, count: 45, percentage: 33 },
    { rating: 4, count: 58, percentage: 42 },
    { rating: 3, count: 22, percentage: 16 },
    { rating: 2, count: 9, percentage: 7 },
    { rating: 1, count: 4, percentage: 3 }
  ]);

  // 현재 선택된 타입의 별점 분포
  const currentRatingDistribution = ratingType === 'album' ? albumRatingDistribution : trackRatingDistribution;

  // 내가 만든 콜렉션
  const [myCollections] = useState([
    {
      id: '1',
      title: '새벽에 듣는 음악',
      description: '조용한 새벽 시간에 어울리는 차분한 음악들',
      itemCount: 23,
      coverImages: [
        'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ]
    },
    {
      id: '2',
      title: '운동할 때 추천',
      description: '운동할 때 들으면 좋은 신나는 음악들',
      itemCount: 35,
      coverImages: [
        'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ]
    }
  ]);

  // 좋아요한 콜렉션
  const [likedCollections] = useState([
    {
      id: '3',
      title: '90년대 명곡 모음',
      description: '90년대를 대표하는 명곡들만 모았습니다',
      creator: '음악평론가',
      itemCount: 48,
      likes: 234
    },
    {
      id: '4', 
      title: '재즈 입문자를 위한 플레이리스트',
      description: '재즈를 처음 듣는 분들에게 추천하는 곡들',
      creator: '재즈마니아',
      itemCount: 28,
      likes: 156
    }
  ]);

  // 장르 키워드 (가중치에 따른 크기)
  const [genreKeywords] = useState([
    { name: 'Rock', weight: 85, color: 'bg-red-100 text-red-800' },
    { name: 'Pop', weight: 92, color: 'bg-blue-100 text-blue-800' },
    { name: 'Jazz', weight: 76, color: 'bg-purple-100 text-purple-800' },
    { name: 'Classical', weight: 68, color: 'bg-green-100 text-green-800' },
    { name: 'Hip Hop', weight: 45, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Electronic', weight: 58, color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Folk', weight: 34, color: 'bg-orange-100 text-orange-800' },
    { name: 'R&B', weight: 41, color: 'bg-pink-100 text-pink-800' }
  ]);

  const [recentAlbums, setRecentAlbums] = useState([
    {
      id: '1',
      title: 'Thriller',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Abbey Road',
      artist: 'The Beatles',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9
    }
  ]);

  const [recentTracks, setRecentTracks] = useState([
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9
    },
    {
      id: '2',
      title: 'Hotel California',
      artist: 'Eagles',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8
    }
  ]);

  const handleDummyData = () => {
    setUserStats({
      albumReviews: Math.floor(Math.random() * 100),
      trackReviews: Math.floor(Math.random() * 200),
      writtenReviews: Math.floor(Math.random() * 50),
      receivedLikes: Math.floor(Math.random() * 500),
      likedArtists: Math.floor(Math.random() * 150)
    });
  };

  const handleRefresh = () => {
    // 새로고침 시뮬레이션
    window.location.reload();
  };

  const handleError = () => {
    setRecentAlbums([]);
    setRecentTracks([]);
  };

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
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-5 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profileData.avatarUrl} />
              <AvatarFallback className="text-xl">뮤</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{profileData.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {profileData.bio}
              </p>
            </div>
          </div>
          
          {/* Primary Actions - 가장 중요한 액션들 */}
          <div className="flex gap-3 mb-6">
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

          {/* Stats */}
          <div className="grid grid-cols-5 gap-3">
            <div className="flex flex-col items-center justify-center min-h-[60px]">
              <div className="text-2xl font-bold text-primary">{userStats.albumReviews}</div>
              <div className="text-xs text-muted-foreground mt-1">앨범</div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[60px]">
              <div className="text-2xl font-bold text-primary">{userStats.trackReviews}</div>
              <div className="text-xs text-muted-foreground mt-1">트랙</div>
            </div>
            <div 
              className="flex flex-col items-center justify-center min-h-[60px] cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => onNavigate('my-reviews')}
            >
              <div className="text-2xl font-bold text-primary">{userStats.writtenReviews}</div>
              <div className="text-xs text-muted-foreground mt-1">리뷰</div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[60px]">
              <div className="text-2xl font-bold text-primary">{userStats.receivedLikes}</div>
              <div className="text-xs text-muted-foreground mt-1 text-center leading-tight">좋아요</div>
            </div>
            <div 
              className="flex flex-col items-center justify-center min-h-[60px] cursor-pointer hover:bg-muted/50 rounded-lg p-3 transition-colors"
              onClick={() => onNavigate('liked-artists')}
            >
              <div className="text-2xl font-bold text-primary">{userStats.likedArtists}</div>
              <div className="text-xs text-muted-foreground mt-1">아티스트</div>
            </div>
          </div>
        </div>

        {/* 별점 분포 */}
        <div className="px-6 py-6">
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
              {currentRatingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 w-14">
                    <span className="text-sm font-medium">{item.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{item.count}개</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 내가 만든 콜렉션 */}
        <div className="px-6 py-6">
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
              {myCollections.map((collection) => (
                <div key={collection.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors">
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
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 좋아요한 콜렉션 */}
        <div className="px-6 py-6">
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
              {likedCollections.map((collection) => (
                <div key={collection.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                    <FolderOpen className="w-7 h-7 text-muted-foreground" />
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
              ))}
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* 장르 키워드 맵 */}
        <div className="px-6 py-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                내가 좋아하는 장르
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {genreKeywords.map((genre) => (
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
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Recent Reviews */}
        <div className="pt-6">
          <HorizontalMusicSection
            title="평가한 앨범"
            items={recentAlbums}
            type="album"
            onItemClick={(id) => onNavigate('album-detail', id)}
            onViewAll={() => onNavigate('rated-albums')}
          />
          
          <HorizontalMusicSection
            title="평가한 트랙"
            items={recentTracks}
            type="track"
            onItemClick={(id) => onNavigate('track-detail', id)}
            onViewAll={() => onNavigate('rated-tracks')}
          />
        </div>
      </main>

      {/* Debug Menu */}
      <div className="fixed bottom-24 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 w-10 p-0">
              <Bug className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDummyData}>
              <Plus className="w-4 h-4 mr-2" />
              더미 데이터
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              새로고침
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleError}>
              <Bug className="w-4 h-4 mr-2" />
              에러 시뮬레이션
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}