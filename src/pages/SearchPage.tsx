import { useState } from "react";
import { Search, Loader2, Star, Heart } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface SearchPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function SearchPage({ onNavigate }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // 시뮬레이션된 검색
    setTimeout(() => {
      setSearchResults({
        albums: [
          {
            id: '1',
            title: 'Thriller',
            artist: 'Michael Jackson',
            releaseDate: '1982',
            genre: 'Pop',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '2',
            title: 'Abbey Road',
            artist: 'The Beatles',
            releaseDate: '1969',
            genre: 'Rock',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '3',
            title: 'Kind of Blue',
            artist: 'Miles Davis',
            releaseDate: '1959',
            genre: 'Jazz',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ],
        tracks: [
          {
            id: '1',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            duration: '5:55',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '2',
            title: 'Hotel California',
            artist: 'Eagles',
            album: 'Hotel California',
            duration: '6:30',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '3',
            title: 'So What',
            artist: 'Miles Davis',
            album: 'Kind of Blue',
            duration: '9:22',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ],
        artists: [
          {
            id: '1',
            name: 'Michael Jackson',
            followers: '2.3M',
            isLiked: false,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '2',
            name: 'Queen',
            followers: '1.8M',
            isLiked: true,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          },
          {
            id: '3',
            name: 'Miles Davis',
            followers: '890K',
            isLiked: false,
            imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Material 3 Search Header */}
      <header 
        className="px-6 py-6 elevation-1"
        style={{ backgroundColor: 'var(--surface-container)' }}
      >
        <div className="flex gap-4">
          <div 
            className="flex-1 relative rounded-xl h-14 flex items-center px-4"
            style={{ backgroundColor: 'var(--surface-container-highest)' }}
          >
            <Search className="w-5 h-5 mr-3" style={{ color: 'var(--on-surface-variant)' }} />
            <input
              placeholder="앨범, 트랙, 아티스트 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent border-none outline-none text-body-large"
              style={{ color: 'var(--on-surface)' }}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="h-14 px-6 rounded-xl elevation-1 state-layer-hover"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--on-primary)' 
            }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {!searchResults ? (
          <div className="flex flex-col items-center justify-center h-96 px-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
              style={{ backgroundColor: 'var(--surface-container-highest)' }}
            >
              <Search className="w-10 h-10" style={{ color: 'var(--on-surface-variant)' }} />
            </div>
            <h3 className="text-headline-small mb-4" style={{ color: 'var(--on-surface)' }}>
              음악을 찾아보세요
            </h3>
            <p className="text-body-large text-center leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
              앨범, 트랙, 아티스트 이름을 입력하여<br />
              원하는 음악을 검색할 수 있습니다
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--primary-container)' }}
              >
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--on-primary-container)' }} />
              </div>
              <p className="text-title-medium" style={{ color: 'var(--on-surface-variant)' }}>
                검색 중...
              </p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="albums" className="px-6 pt-6">
            {/* Material 3 Tab List */}
            <TabsList className="grid grid-cols-3 rounded-xl p-1 mb-8" style={{ backgroundColor: 'var(--surface-container-highest)' }}>
              <TabsTrigger 
                value="albums"
                className="py-3 px-4 rounded-lg transition-all duration-200"
              >
                앨범
              </TabsTrigger>
              <TabsTrigger 
                value="tracks"
                className="py-3 px-4 rounded-lg transition-all duration-200"
              >
                트랙
              </TabsTrigger>
              <TabsTrigger 
                value="artists"
                className="py-3 px-4 rounded-lg transition-all duration-200"
              >
                아티스트
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="albums" className="mt-6">
              <div className="space-y-4">
                {searchResults.albums.map((album: any) => (
                  <div
                    key={album.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => onNavigate('album-detail', album.id)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={album.imageUrl}
                        alt={album.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      {album.rating && (
                        <div className="absolute -top-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span className="text-xs font-medium">{album.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* 제목 - 가장 중요한 정보 */}
                      <h3 className="font-semibold text-base line-clamp-1 mb-1.5 leading-tight">{album.title}</h3>
                      {/* 아티스트 - 두 번째로 중요한 정보 */}
                      <p className="text-sm font-medium text-muted-foreground line-clamp-1 mb-1">{album.artist}</p>
                      {/* 기타 정보 - 가장 덜 중요한 정보 */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                        <span>{album.releaseDate}</span>
                        <span>•</span>
                        <span>{album.genre}</span>
                      </div>
                    </div>
                    {/* Quick Action */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick rate action
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        평가
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tracks" className="mt-6">
              <div className="space-y-4">
                {searchResults.tracks.map((track: any) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => onNavigate('track-detail', track.id)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={track.imageUrl}
                        alt={track.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      {track.rating && (
                        <div className="absolute -top-1 -right-1 bg-primary text-white px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span className="text-xs font-medium">{track.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* 제목 - 가장 중요한 정보 */}
                      <h3 className="font-semibold text-base line-clamp-1 mb-1.5 leading-tight">{track.title}</h3>
                      {/* 아티스트 - 두 번째로 중요한 정보 */}
                      <p className="text-sm font-medium text-muted-foreground line-clamp-1 mb-1">{track.artist}</p>
                      {/* 기타 정보 - 가장 덜 중요한 정보 */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                        <span className="line-clamp-1">{track.album}</span>
                        <span>•</span>
                        <span>{track.duration}</span>
                      </div>
                    </div>
                    {/* Quick Action */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick rate action
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        평가
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="artists" className="mt-6">
              <div className="space-y-4">
                {searchResults.artists.map((artist: any) => (
                  <div
                    key={artist.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => onNavigate('artist-detail', artist.id)}
                  >
                    <Avatar className="w-16 h-16 flex-shrink-0">
                      <AvatarImage src={artist.imageUrl} alt={artist.name} />
                      <AvatarFallback className="text-lg font-semibold">{artist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      {/* 이름 - 가장 중요한 정보 */}
                      <h3 className="font-semibold text-base line-clamp-1 mb-1.5 leading-tight">{artist.name}</h3>
                      {/* 타입 및 팔로워 정보 */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>아티스트</span>
                        <span>•</span>
                        <span>{artist.followers} 팔로워</span>
                      </div>
                    </div>
                    {/* Quick Action */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={artist.isLiked ? "default" : "outline"}
                        size="sm"
                        className="h-10 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick like action for artists
                        }}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${artist.isLiked ? 'fill-current' : ''}`} />
                        {artist.isLiked ? '좋아요됨' : '좋아요'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}