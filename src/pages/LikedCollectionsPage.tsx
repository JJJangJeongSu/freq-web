import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Music, Loader2, RefreshCw, Heart } from "lucide-react";
import { EnhancedButton } from "../components/EnhancedButton";
import { CollectionCard } from "../components/CollectionCard";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useLikedCollections } from "../hooks/useLikedCollections";

export function LikedCollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "items" | "likes" | "creator">("recent");

  // API 데이터 가져오기
  const { data: collections, loading, error, refetch } = useLikedCollections();

  // Filter and sort collections
  const sortedCollections = useMemo(() => {
    if (!collections) return [];

    // Filter
    const filtered = collections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.author.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "items":
          return b.itemCount - a.itemCount;
        case "likes":
          return b.likeCount - a.likeCount;
        case "creator":
          return a.author.username.localeCompare(b.author.username);
        case "recent":
        default:
          return new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime();
      }
    });
  }, [collections, searchQuery, sortBy]);

  const handleCollectionClick = (collectionId: number) => {
    navigate(`/collections/${collectionId}`);
  };

  // 로딩 상태
  if (loading) {
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

  // 에러 상태
  if (error) {
    return (
      <div className="size-full bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-title-medium text-error">
            컬렉션을 불러올 수 없습니다
          </p>
          <p className="text-body-medium text-on-surface-variant">
            {error.message}
          </p>
          <EnhancedButton variant="filled" onClick={refetch}>
            <RefreshCw className="size-4 mr-2" />
            다시 시도
          </EnhancedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-4 p-3 md:p-4">
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-6" />
          </EnhancedButton>
          <div className="flex-1">
            <h1 className="text-title-large">좋아요한 컬렉션</h1>
            <p className="text-body-medium text-on-surface-variant">
              {collections?.length || 0}개의 컬렉션
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
              <EnhancedButton variant="outlined" size="icon">
                <Filter className="size-4" />
              </EnhancedButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                최근 좋아요순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                이름순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("creator")}>
                제작자순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("items")}>
                아이템 많은순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("likes")}>
                인기순
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="p-3 md:p-4">
        {sortedCollections.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="size-12 mx-auto mb-4 text-on-surface-variant" />
            <h3 className="text-title-medium mb-2">좋아요한 컬렉션이 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant">
              {searchQuery ? "검색 결과가 없습니다." : "마음에 드는 컬렉션에 좋아요를 눌러보세요."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {sortedCollections.map((collection) => (
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
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}