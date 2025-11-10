import { ArrowLeft, SortAsc } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MusicCard } from "./MusicCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
}

type SortOption = 'rating-high' | 'rating-low' | 'title' | 'artist';

interface MusicGridPageProps {
  title: string;
  type: 'album' | 'track';
  items: MusicItem[];
  loading: boolean;
  error: Error | null;
  sortOptions?: SortOption[];
  onRefetch?: () => void;
}

export function MusicGridPage({
  title,
  type,
  items,
  loading,
  error,
  sortOptions = ['rating-high', 'rating-low', 'title', 'artist'],
  onRefetch
}: MusicGridPageProps) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('rating-high');

  // 정렬 로직 (useMemo로 최적화)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'rating-high':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-low':
          return (a.rating || 0) - (b.rating || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        default:
          return 0;
      }
    });
  }, [items, sortBy]);

  // 정렬 옵션 레이블
  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case 'rating-high':
        return '평점 높은순';
      case 'rating-low':
        return '평점 낮은순';
      case 'title':
        return '제목순';
      case 'artist':
        return '아티스트순';
      default:
        return '';
    }
  };

  // Loading 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
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
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-destructive mb-2">데이터를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            {onRefetch && (
              <Button onClick={onRefetch} variant="outline">
                다시 시도
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-xs text-muted-foreground">총 {items.length}개</p>
        </div>
        <div className="w-8" />
      </header>

      {/* Sort Controls */}
      <div className="p-4 border-b border-border">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-full">
            <div className="flex items-center">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="정렬" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {getSortLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Header */}
      <div className="px-4 py-2 text-sm text-muted-foreground">
        {sortedItems.length}개의 {type === 'album' ? '앨범' : '트랙'}
      </div>

      {/* Grid */}
      <main className="flex-1 p-4 pb-20">
        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-2">데이터가 없습니다</p>
            <p className="text-sm text-muted-foreground">
              아직 {type === 'album' ? '앨범' : '트랙'}이 없습니다
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedItems.map((item) => (
              <MusicCard
                key={item.id}
                id={item.id}
                title={item.title}
                artist={item.artist}
                imageUrl={item.imageUrl}
                rating={item.rating}
                type={type}
                onClick={() => navigate(`/${type}s/${item.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
