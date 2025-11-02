import { ArrowLeft, Heart, Music, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

interface LikedArtistsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function LikedArtistsPage({ onNavigate }: LikedArtistsPageProps) {
  const [likedArtists, setLikedArtists] = useState([
    {
      id: '1',
      name: 'IU',
      koreanName: '아이유',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzaW5nZXIlMjBwb3AlMjBhcnRpc3R8ZW58MXx8fHwxNzU4NzAzMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['K-Pop', '발라드'],
      likedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'BTS', 
      koreanName: '방탄소년단',
      imageUrl: 'https://images.unsplash.com/photo-1681855178578-4535aba9b305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHNpbmdlciUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NTg3MDI0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['K-Pop', 'Hip-Hop'],
      likedDate: '2024-01-12'
    },
    {
      id: '3',
      name: 'NewJeans',
      koreanName: '뉴진스',
      imageUrl: 'https://images.unsplash.com/photo-1681855178578-4535aba9b305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHNpbmdlciUyMHBlcmZvcmer1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMjQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['K-Pop', 'R&B'],
      likedDate: '2024-01-10'
    },
    {
      id: '4',
      name: 'Taylor Swift',
      imageUrl: 'https://images.unsplash.com/photo-1681855178578-4535aba9b305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHNpbmdlciUyMHBlcmZvcmer1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMjQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['Pop', 'Country'],
      likedDate: '2024-01-08'
    },
    {
      id: '5',
      name: 'Ed Sheeran',
      imageUrl: 'https://images.unsplash.com/photo-1681855178578-4535aba9b305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHNpbmdlciUyMHBlcmZvcmer1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMjQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['Pop', 'Folk'],
      likedDate: '2024-01-05'
    },
    {
      id: '6',
      name: 'BLACKPINK',
      koreanName: '블랙핑크',
      imageUrl: 'https://images.unsplash.com/photo-1681855178578-4535aba9b305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHNpbmdlciUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NTg3MDI0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      genres: ['K-Pop', 'Hip-Hop'],
      likedDate: '2024-01-03'
    }
  ]);

  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');

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

  const handleUnlike = (artistId: string) => {
    setLikedArtists(prev => prev.filter(artist => artist.id !== artistId));
  };

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
                      {artist.koreanName && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{artist.koreanName}</p>
                      )}
                      
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
              <Button onClick={() => onNavigate('search')}>
                아티스트 찾아보기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}