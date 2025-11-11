import { ArrowLeft, Search, Filter, SortAsc, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MusicCard } from "../components/MusicCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { useUserRatedTracksPaginated } from "../hooks/useUserRatedTracksPaginated";

export function UserRatedTracksPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  // Client-side sort and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [clientSortBy, setClientSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");

  // Determine server-side sort (recent/old only)
  const serverSortBy = (clientSortBy === 'recent' || clientSortBy === 'old')
    ? clientSortBy as 'recent' | 'old'
    : 'recent';

  // Paginated hook (infinite scroll)
  const {
    tracks,
    pagination,
    loading,
    error,
    loadMore,
    refresh,
    hasMore
  } = useUserRatedTracksPaginated(Number(userId), 'infinite');

  // 필터링 및 정렬 로직 (useMemo로 최적화)
  // Server handles recent/old, client handles other sorts and filters
  const filteredAndSortedTracks = useMemo(() => {
    let result = tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === 'all' ||
                           (filterRating === '5' && track.rating === 5) ||
                           (filterRating === '4' && track.rating >= 4 && track.rating < 5) ||
                           (filterRating === '3' && track.rating >= 3 && track.rating < 4);
      return matchesSearch && matchesRating;
    });

    // Client-side sort (for non-server sorts)
    if (clientSortBy !== 'recent' && clientSortBy !== 'old') {
      result = result.sort((a, b) => {
        switch (clientSortBy) {
          case 'rating-high':
            return b.rating - a.rating;
          case 'rating-low':
            return a.rating - b.rating;
          case 'title':
            return a.title.localeCompare(b.title);
          case 'artist':
            return a.artist.localeCompare(b.artist);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [tracks, searchQuery, filterRating, clientSortBy]);

  // 초기 로딩 상태 (데이터가 없을 때만)
  if (loading && tracks.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">평가한 트랙</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // 에러 상태 (데이터가 없을 때만)
  if (error && tracks.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">평가한 트랙</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">데이터를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{error?.message || '평가한 트랙을 불러오는 중 오류가 발생했습니다.'}</p>
            <Button variant="outline" onClick={() => refresh()} className="mt-4">
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
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">평가한 트랙</h1>
          <p className="text-xs text-muted-foreground">
            {pagination
              ? `총 ${pagination.totalItems}개 (${tracks.length}개 표시)`
              : `${tracks.length}개`
            }
          </p>
        </div>
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
          <Select value={clientSortBy} onValueChange={setClientSortBy}>
            <SelectTrigger className="flex-1">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최근 평가순</SelectItem>
              <SelectItem value="old">오래된 평가순</SelectItem>
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
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {filteredAndSortedTracks.map((track) => (
                <div key={track.trackId} className="space-y-2">
                  <MusicCard
                    id={track.trackId}
                    title={track.title}
                    artist={track.artist}
                    imageUrl={track.coverUrl}
                    rating={track.rating}
                    type="track"
                    onClick={() => navigate(`/tracks/${track.trackId}`)}
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

            {/* Infinite Scroll Trigger (검색/필터 없을 때만) */}
            {!searchQuery && filterRating === 'all' && (clientSortBy === 'recent' || clientSortBy === 'old') && (
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
                threshold={200}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
