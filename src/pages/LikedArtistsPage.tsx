import { ArrowLeft, Heart, Music, Users, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useMemo } from "react";
import { useLikedArtists } from "../hooks/useLikedArtists";
import { useToggleArtistLike } from "../hooks/useToggleArtistLike";

interface LikedArtistsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function LikedArtistsPage({ onNavigate }: LikedArtistsPageProps) {
  // API 데이터 가져오기
  const { data: apiData, loading, error, refetch } = useLikedArtists();
  const { toggleLike } = useToggleArtistLike();

  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');

  // API 데이터를 UI 형식으로 변환
  const likedArtists = useMemo(() => {
    if (!apiData) return [];

    return apiData.map(artist => ({
      id: artist.artistId,
      name: artist.name,
      imageUrl: artist.imageUrl,
      genres: artist.genres,
      likedDate: artist.likedDate
    }));
  }, [apiData]);

  const sortedArtists = [...likedArtists].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleUnlike = async (artistId: string) => {
    try {
      // API 호출하여 좋아요 토글 (좋아요 취소)
      await toggleLike(artistId);

      // 성공 시 데이터 재조회
      refetch();
    } catch (err) {
      console.error('Failed to unlike artist:', err);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('rate-record')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">좋아요한 아티스트</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">좋아요한 아티스트를 불러오는 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('rate-record')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">좋아요한 아티스트</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <p className="text-destructive font-semibold">아티스트를 불러올 수 없습니다</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button onClick={refetch}>
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('rate-record')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">좋아요한 아티스트</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Stats & Sort */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">총 {likedArtists.length}명의 아티스트</p>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'recent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('recent')}
              >
                최신순
              </Button>
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('name')}
              >
                이름순
              </Button>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-2 gap-3">
            {sortedArtists.map((artist) => (
              <Card 
                key={artist.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('artist-detail', artist.id)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {/* Artist Image */}
                    <div className="relative aspect-square">
                      <ImageWithFallback
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlike(artist.id);
                        }}
                      >
                        <Heart className="w-3 h-3 text-white fill-white" />
                      </Button>
                    </div>
                    
                    {/* Artist Info */}
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm line-clamp-1">{artist.name}</h3>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-1">
                        {artist.genres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs px-1.5 py-0.5">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {likedArtists.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">좋아요한 아티스트가 없습니다</h3>
                <p className="text-sm text-muted-foreground">
                  음악을 듣고 마음에 드는 아티스트에게 좋아요를 눌러보세요
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}