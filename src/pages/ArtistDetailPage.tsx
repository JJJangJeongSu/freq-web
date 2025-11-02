import { ArrowLeft, Heart, Music, Disc, Tag, Users, Calendar, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

interface ArtistDetailPageProps {
  artistId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function ArtistDetailPage({ artistId, onNavigate }: ArtistDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);

  // 더미 아티스트 데이터
  const artist = {
    id: artistId,
    name: "IU",
    koreanName: "아이유",
    profileImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzaW5nZXIlMjBwb3AlMjBhcnRpc3R8ZW58MXx8fHwxNzU4NzAzMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    genres: ["K-Pop", "발라드", "포크"],
    debut: "2008년",
    agency: "EDAM Entertainment",
    followers: "2.8M",
    description: "대한민국의 싱어송라이터이자 배우. 독특하고 깊이 있는 음악 세계관으로 많은 사랑을 받고 있다.",
    stats: {
      albums: 12,
      tracks: 89,
      likes: 425000
    }
  };

  // 발매 앨범들
  const albums = [
    {
      id: "1",
      title: "Love poem",
      year: "2019",
      type: "정규앨범",
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8
    },
    {
      id: "2", 
      title: "LILAC",
      year: "2021",
      type: "정규앨범",
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9
    },
    {
      id: "3",
      title: "strawberry moon",
      year: "2021", 
      type: "디지털 싱글",
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7
    }
  ];

  // 인기 트랙들
  const popularTracks = [
    {
      id: "1",
      title: "Celebrity", 
      album: "LILAC",
      year: "2021",
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9
    },
    {
      id: "2",
      title: "Through the Night",
      album: "palette",
      year: "2017", 
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8
    },
    {
      id: "3",
      title: "Love poem",
      album: "Love poem",
      year: "2019",
      imageUrl: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7
    }
  ];

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

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
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Artist Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-xl font-bold">{artist.name}</h1>
                    {artist.koreanName && (
                      <p className="text-sm text-muted-foreground">{artist.koreanName}</p>
                    )}
                  </div>
                  
                  {/* Like Button */}
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLikeToggle}
                    className="flex-shrink-0"
                  >
                    <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? '좋아요' : '좋아요'}
                  </Button>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {artist.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Disc className="w-4 h-4 text-muted-foreground" />
                <span>{artist.stats.albums}개 앨범</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4 text-muted-foreground" />
                <span>{artist.stats.tracks}개 트랙</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span>{(artist.stats.likes / 1000).toFixed(1)}K</span>
              </div>
            </div>

            {/* Artist Info */}
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>데뷔: {artist.debut}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>소속사: {artist.agency}</span>
              </div>
            </div>

            {/* Description */}
            {artist.description && (
              <p className="mt-3 text-sm leading-relaxed">{artist.description}</p>
            )}
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
              {albums.map((album) => (
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
                      <span className="text-xs text-muted-foreground">{album.year}</span>
                      <Badge variant="outline" className="text-xs">{album.type}</Badge>
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
              {popularTracks.map((track, index) => (
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
                      
                      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={track.imageUrl}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{track.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {track.album} • {track.year}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>★ {track.rating}</span>
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