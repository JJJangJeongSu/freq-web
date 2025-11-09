import { ArrowLeft, Heart, Music, Disc, Tag, Users, Calendar, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { useArtistDetail } from "../hooks/useArtistDetail";
import { useToggleArtistLike } from "../hooks/useToggleArtistLike";

interface ArtistDetailPageProps {
  artistId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function ArtistDetailPage({ artistId, onNavigate }: ArtistDetailPageProps) {
  // API 데이터 가져오기
  const { data: artist, loading, error, refetch } = useArtistDetail(artistId);

  // 좋아요 토글 hook
  const { toggleLike, loading: likeLoading } = useToggleArtistLike();

  // isLiked 상태는 API의 isLiked 값으로 초기화
  const [isLiked, setIsLiked] = useState(false);

  // artist 데이터가 로드되면 isLiked 상태 업데이트
  useEffect(() => {
    if (artist?.isLiked !== undefined) {
      setIsLiked(artist.isLiked);
    }
  }, [artist?.isLiked]);

  const handleLikeToggle = async () => {
    const previousLikedState = isLiked;

    try {
      // 낙관적 업데이트 (UI 즉시 변경)
      setIsLiked(!isLiked);

      // API 호출
      await toggleLike(artistId);
    } catch (err) {
      // 실패 시 원래 상태로 되돌림
      setIsLiked(previousLikedState);
      console.error('Failed to toggle like:', err);
    }
  };

  // Loading 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">아티스트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error 상태
  if (error || !artist) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-4">
          <p className="text-destructive font-semibold">아티스트 정보를 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error?.message || '알 수 없는 오류가 발생했습니다'}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('search')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">아티스트</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-6">
        {/* Artist Profile */}
        <div className="relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-64" />
          
          <div className="relative px-4 pt-6 pb-4">
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Artist Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-xl font-bold">{artist.name}</h1>
                  </div>

                  {/* Like Button */}
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLikeToggle}
                    disabled={likeLoading}
                    className="flex-shrink-0"
                  >
                    {likeLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        처리중
                      </>
                    ) : (
                      <>
                        <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                        {isLiked ? '좋아요' : '좋아요'}
                      </>
                    )}
                  </Button>
                </div>

                {/* Genres */}
                {artist.genres && artist.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {artist.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Disc className="w-4 h-4 text-muted-foreground" />
                <span>{artist.albums.length}개 앨범</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4 text-muted-foreground" />
                <span>{artist.popularTracks.length}개 인기 트랙</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span>{artist.likes >= 1000 ? `${(artist.likes / 1000).toFixed(1)}K` : artist.likes}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Albums Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Disc className="w-5 h-5" />
                발매 앨범
              </h2>
              <Button variant="ghost" size="sm">
                전체보기
              </Button>
            </div>
            
            <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
              {artist.albums.map((album) => (
                <Card
                  key={album.id}
                  className="flex-shrink-0 w-32 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('album-detail', album.id)}
                >
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={album.imageUrl}
                      alt={album.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-2">
                    <h3 className="font-medium text-sm line-clamp-1">{album.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {album.releaseDate ? new Date(album.releaseDate).getFullYear() : ''}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Popular Tracks Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Music className="w-5 h-5" />
                인기 트랙
              </h2>
              <Button variant="ghost" size="sm">
                전체보기
              </Button>
            </div>
            
            <div className="px-4 space-y-2">
              {artist.popularTracks.map((track, index) => (
                <Card
                  key={track.id}
                  className="cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => onNavigate('track-detail', track.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 text-sm text-muted-foreground w-4 text-center">
                        {index + 1}
                      </div>

                      {track.imageUrl && (
                        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={track.imageUrl}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{track.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {track.artists.join(', ')}
                          {track.releaseDate && ` • ${new Date(track.releaseDate).getFullYear()}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}