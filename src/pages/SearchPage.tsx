import { useState } from "react";
import { Search, Loader2, Star, Heart } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useSearch } from "../hooks/useSearch";

interface SearchPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function SearchPage({ onNavigate }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, loading: isLoading, error, search } = useSearch();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // 실제 API 검색 호출
    await search(searchQuery, 'all');
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
                        {album.releaseYear && <span>{album.releaseYear}</span>}
                        {album.popularity !== undefined && (
                          <>
                            {album.releaseYear && <span>•</span>}
                            <span>인기도 {album.popularity}</span>
                          </>
                        )}
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
                        {track.releaseYear && <span>{track.releaseYear}</span>}
                        {track.popularity !== undefined && (
                          <>
                            {track.releaseYear && <span>•</span>}
                            <span>인기도 {track.popularity}</span>
                          </>
                        )}
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
                      <AvatarImage src={artist.imageUrl} alt={artist.title} />
                      <AvatarFallback className="text-lg font-semibold">{artist.title?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      {/* 이름 - 가장 중요한 정보 */}
                      <h3 className="font-semibold text-base line-clamp-1 mb-1.5 leading-tight">{artist.title}</h3>
                      {/* 타입 및 인기도 정보 */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>아티스트</span>
                        {artist.popularity !== undefined && (
                          <>
                            <span>•</span>
                            <span>인기도 {artist.popularity}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Quick Action */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={artist.isRated ? "default" : "outline"}
                        size="sm"
                        className="h-10 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick rate action for artists
                        }}
                      >
                        <Star className={`w-4 h-4 mr-2 ${artist.isRated ? 'fill-current' : ''}`} />
                        {artist.isRated ? '평가됨' : '평가'}
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