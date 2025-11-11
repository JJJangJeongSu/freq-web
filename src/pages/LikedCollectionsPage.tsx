import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Music, Loader2, RefreshCw, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { CollectionCard } from "../components/CollectionCard";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { InfiniteScrollTrigger } from "../components/InfiniteScrollTrigger";
import { useLikedCollectionsPaginated } from "../hooks/useLikedCollectionsPaginated";

export function LikedCollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Paginated hook (infinite scroll)
  const {
    collections,
    pagination,
    loading,
    error,
    sortBy,
    setSortBy,
    loadMore,
    refresh,
    hasMore
  } = useLikedCollectionsPaginated('infinite');

  // Client-side search filtering (필터링만, 정렬은 서버에서)
  const filteredCollections = useMemo(() => {
    if (!searchQuery.trim()) return collections;

    return collections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.author.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [collections, searchQuery]);

  const handleCollectionClick = (collectionId: number) => {
    navigate(`/collections/${collectionId}`);
  };

  // 초기 로딩 상태 (데이터가 없을 때만)
  if (loading && collections.length === 0) {
    return (
      <div className="size-full bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="size-12 animate-spin mx-auto text-primary" />
          <p className="text-body-medium text-on-surface-variant">
            좋아요한 컬렉션을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 에러 상태 (데이터가 없을 때만)
  if (error && collections.length === 0) {
    return (
      <div className="size-full bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-title-medium text-error">
            컬렉션을 불러올 수 없습니다
          </p>
          <p className="text-body-medium text-on-surface-variant">
            {error?.message || '좋아요한 컬렉션을 불러오는 중 오류가 발생했습니다.'}
          </p>
          <Button onClick={() => refresh()}>
            <RefreshCw className="size-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-4 p-3 md:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-title-large">좋아요한 컬렉션</h1>
            <p className="text-body-medium text-on-surface-variant">
              {pagination
                ? `총 ${pagination.totalItems}개의 컬렉션 (${collections.length}개 표시)`
                : `${collections.length}개의 컬렉션`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-3 md:p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-on-surface-variant" />
            <Input
              placeholder="컬렉션, 제작자 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
        </div>
      </div>

      {/* Collections Grid */}
      <div className="p-3 md:p-4">
        {filteredCollections.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="size-12 mx-auto mb-4 text-on-surface-variant" />
            <h3 className="text-title-medium mb-2">좋아요한 컬렉션이 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant">
              {searchQuery ? "검색 결과가 없습니다." : "마음에 드는 컬렉션에 좋아요를 눌러보세요."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {filteredCollections.map((collection) => (
              <CollectionCard
                key={collection.collectionId}
                collectionId={collection.collectionId}
                title={collection.title}
                description={collection.description}
                author={collection.author}
                itemCount={collection.itemCount}
                likeCount={collection.likeCount}
                coverImageUrl={collection.coverImageUrl}
                tags={collection.tags}
                onClick={() => handleCollectionClick(collection.collectionId)}
                onAuthorClick={(authorId) => navigate(`/users/${authorId}`)}
              />
            ))}
            </div>

            {/* Infinite Scroll Trigger (검색 모드가 아닐 때만) */}
            {!searchQuery && (
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
                threshold={200}
              />
            )}
          </>
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}