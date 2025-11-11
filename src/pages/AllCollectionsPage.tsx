import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { CollectionCard } from "../components/CollectionCard";
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { ArrowLeft, Search, SlidersHorizontal, Loader2, RefreshCw, Plus } from "lucide-react";
import { useAllCollectionsPaginated } from "../hooks/useAllCollectionsPaginated";
import { apiService } from "../services/api.service";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

export function AllCollectionsPage() {
  const navigate = useNavigate();

  // Paginated hook (infinite scroll)
  const {
    collections,
    pagination,
    loading: allLoading,
    error: allError,
    sortBy,
    setSortBy,
    loadMore,
    refresh,
    hasMore
  } = useAllCollectionsPaginated('infinite');

  // 검색 관련 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // 검색 API 호출
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearchMode(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError(null);
      setIsSearchMode(true);

      console.log('🔍 Searching collections with query:', searchQuery, 'sortBy:', sortBy);

      const response = await apiService.collections.search(searchQuery, sortBy as any);

      console.log('✅ Search response:', response);

      // API 응답 구조: { success: true, data: { collections: [...] } }
      const results = (response.data as any)?.data?.collections || [];
      setSearchResults(results);

    } catch (err: any) {
      console.error('❌ Search failed:', err);
      setSearchError(err.response?.data?.error?.message || '검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Enter 키로 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 검색 초기화
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchMode(false);
    setSearchError(null);
  };

  // 표시할 컬렉션 결정
  const displayCollections = isSearchMode ? searchResults : collections;
  const loading = isSearchMode ? isSearching : allLoading;
  const error = isSearchMode ? searchError : allError?.message;

  // 초기 로딩 상태 (데이터가 없을 때만)
  if (loading && displayCollections.length === 0) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">컬렉션을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 (데이터가 없을 때만)
  if (error && !searchQuery.trim() && displayCollections.length === 0) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
          <p className="font-semibold text-destructive">컬렉션을 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => refresh()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/home')}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">모든 컬렉션</h1>
            </div>
            <Button onClick={() => navigate('/collections/new')}>
              <Plus className="w-4 h-4 mr-2" />
              컬렉션 만들기
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-8 pb-8">
        {/* Search Section - Material 3 Style */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2">
            {/* Combined Search Bar */}
            <div
              className="flex-1 h-14 rounded-full flex items-center px-4 border"
              style={{
                backgroundColor: 'var(--surface-container)',
                borderColor: 'var(--outline)'
              }}
            >
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full px-3 flex-shrink-0">
                    <SlidersHorizontal className="w-4 h-4 mr-1.5" />
                    <span className="text-sm">
                      {sortBy === "recent" ? "최신순" : sortBy === "popularity" ? "인기순" : "오래된순"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    최신순
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                    인기순
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("old")}>
                    오래된순
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="w-px h-6 mx-2 flex-shrink-0" style={{ backgroundColor: 'var(--outline)' }} />

              {/* Search Icon */}
              <Search className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: 'var(--on-surface-variant)' }} />

              {/* Search Input */}
              <Input
                placeholder="컬렉션 제목으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ color: 'var(--on-surface)' }}
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="h-14 px-6 rounded-full flex-shrink-0"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  검색 중
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  검색
                </>
              )}
            </Button>
          </div>

          {/* Filter Bar */}
          {isSearchMode && (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearSearch}
                className="rounded-full"
              >
                검색 초기화
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {isSearchMode
              ? `'${searchQuery}' 검색 결과: ${displayCollections.length}개의 컬렉션`
              : pagination
              ? `총 ${pagination.totalItems}개의 컬렉션 (${displayCollections.length}개 표시)`
              : `${displayCollections.length}개의 컬렉션`
            }
          </p>
        </div>

        {/* Search Error Message */}
        {error && isSearchMode && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Collections Grid */}
        {displayCollections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {displayCollections.map((collection) => (
                <CollectionCard
                  key={collection.collectionId}
                  collectionId={collection.collectionId}
                  title={collection.title}
                  description={collection.description}
                  author={{
                    id: collection.author.id,
                    username: collection.author.username,
                    imageUrl: collection.author.imageUrl
                  }}
                  itemCount={collection.itemCount}
                  likeCount={collection.likeCount}
                  coverImageUrl={collection.coverImageUrl}
                  tags={collection.tags}
                  onClick={() => navigate(`/collections/${collection.collectionId}`)}
                  onAuthorClick={(authorId) => navigate(`/users/${authorId}`)}
                />
              ))}
            </div>

            {/* Infinite Scroll Trigger (검색 모드가 아닐 때만) */}
            {!isSearchMode && (
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
                threshold={200}
              />
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SlidersHorizontal className="h-16 w-16 mb-6" style={{ color: 'var(--outline)' }} />
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
              {isSearchMode ? '검색 결과가 없습니다' : '컬렉션이 없습니다'}
            </p>
            <p className="text-base" style={{ color: 'var(--on-surface-variant)' }}>
              {isSearchMode ? '다른 검색어를 시도해보세요.' : '새로운 컬렉션을 만들어보세요.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
