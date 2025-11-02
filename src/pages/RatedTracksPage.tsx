import { ArrowLeft, Search, Filter, SortAsc } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MusicCard } from "../components/MusicCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface RatedTracksPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function RatedTracksPage({ onNavigate }: RatedTracksPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");

  // 확장된 더미 데이터
  const [ratedTracks] = useState([
    {
      id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      ratedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Hotel California',
      artist: 'Eagles',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      ratedDate: '2024-01-12'
    },
    {
      id: '3',
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      ratedDate: '2024-01-10'
    },
    {
      id: '4',
      title: 'So What',
      artist: 'Miles Davis',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5.0,
      ratedDate: '2024-01-08'
    },
    {
      id: '5',
      title: 'Good Vibrations',
      artist: 'The Beach Boys',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.6,
      ratedDate: '2024-01-05'
    },
    {
      id: '6',
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.4,
      ratedDate: '2024-01-03'
    },
    {
      id: '7',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      ratedDate: '2024-01-01'
    },
    {
      id: '8',
      title: 'Come As You Are',
      artist: 'Nirvana',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.3,
      ratedDate: '2023-12-30'
    }
  ]);

  // 필터링 및 정렬 로직
  const filteredAndSortedTracks = ratedTracks
    .filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === 'all' || 
                           (filterRating === '5' && track.rating === 5) ||
                           (filterRating === '4' && track.rating >= 4 && track.rating < 5) ||
                           (filterRating === '3' && track.rating >= 3 && track.rating < 4);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'recent':
        default:
          return new Date(b.ratedDate).getTime() - new Date(a.ratedDate).getTime();
      }
    });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('rate-record')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">평가한 트랙</h1>
        <div className="w-8" />
      </header>

      {/* Search and Filters */}
      <div className="p-4 space-y-3 border-b border-border">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="트랙이나 아티스트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최근 평가순</SelectItem>
              <SelectItem value="rating-high">평점 높은순</SelectItem>
              <SelectItem value="rating-low">평점 낮은순</SelectItem>
              <SelectItem value="title">제목순</SelectItem>
              <SelectItem value="artist">아티스트순</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 평점</SelectItem>
              <SelectItem value="5">5점</SelectItem>
              <SelectItem value="4">4점 이상</SelectItem>
              <SelectItem value="3">3점 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 py-2 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          총 {filteredAndSortedTracks.length}개의 트랙
        </p>
      </div>

      {/* Tracks Grid */}
      <main className="flex-1 overflow-y-auto pb-20">
        {filteredAndSortedTracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-2">검색 결과가 없습니다</p>
            <p className="text-sm text-muted-foreground">다른 검색어나 필터를 시도해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {filteredAndSortedTracks.map((track) => (
              <div key={track.id} className="space-y-2">
                <MusicCard
                  id={track.id}
                  title={track.title}
                  artist={track.artist}
                  imageUrl={track.imageUrl}
                  rating={track.rating}
                  type="track"
                  onClick={() => onNavigate('track-detail', track.id)}
                />
                <div className="text-xs text-muted-foreground text-center">
                  {new Date(track.ratedDate).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric'
                  })} 평가
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}