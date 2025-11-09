import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Heart, Music, Share2, UserCheck, Loader2, RefreshCw } from "lucide-react";
import { EnhancedButton } from "../components/EnhancedButton";
import { EnhancedCard } from "../components/EnhancedCard";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLikedCollections } from "../hooks/useLikedCollections";

interface LikedCollection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  imageUrl: string;
  creatorName: string;
  creatorId: string;
  likes: number;
  likedAt: string;
  visibility?: 'public' | 'private';
}

export function LikedCollectionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "items" | "likes" | "creator">("recent");

  // API 데이터 가져오기
  const { data: apiData, loading, error, refetch } = useLikedCollections();

  // API 데이터를 UI 형식으로 변환
  const likedCollections = useMemo<LikedCollection[]>(() => {
    if (!apiData) return [];

    return apiData.map(collection => ({
      id: String(collection.collectionId),
      title: collection.title,
      description: collection.description,
      itemCount: collection.itemCount,
      imageUrl: collection.coverImageUrl,
      creatorName: collection.author.username,
      creatorId: String(collection.author.id),
      likes: collection.likeCount,
      likedAt: collection.likedDate,
      visibility: collection.visibility
    }));
  }, [apiData]);

  const filteredCollections = likedCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "items":
        return b.itemCount - a.itemCount;
      case "likes":
        return b.likes - a.likes;
      case "creator":
        return a.creatorName.localeCompare(b.creatorName);
      case "recent":
      default:
        return new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime();
    }
  });

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/collections/${collectionId}`);
  };

  const handleCreatorClick = (creatorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/users/${creatorId}`);
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
              {likedCollections.length}개의 컬렉션
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
              <EnhancedCard
                key={collection.id}
                variant="elevated"
                className="overflow-hidden cursor-pointer card-lift"
                onClick={() => handleCollectionClick(collection.id)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={collection.imageUrl}
                    alt={collection.title}
                    className="w-full h-48 md:h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <EnhancedButton
                      variant="filled"
                      size="icon"
                      className="size-8 bg-error/80 hover:bg-error text-on-error"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="size-4 fill-current" />
                    </EnhancedButton>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="bg-surface-container/80 text-xs">
                      {collection.itemCount}곡
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-title-medium mb-1 line-clamp-1">
                    {collection.title}
                  </h3>
                  <p className="text-body-small text-on-surface-variant mb-3 line-clamp-2">
                    {collection.description}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={(e) => handleCreatorClick(collection.creatorId, e)}
                      className="flex items-center gap-2 text-body-small text-primary hover:underline"
                    >
                      <UserCheck className="size-3" />
                      {collection.creatorName}
                    </button>
                    <div className="flex items-center gap-1 text-body-small text-on-surface-variant">
                      <Heart className="size-3" />
                      <span>{collection.likes}</span>
                    </div>
                  </div>
                  
                  <div className="text-body-small text-on-surface-variant">
                    좋아요: {new Date(collection.likedAt).toLocaleDateString()}
                  </div>
                </div>
              </EnhancedCard>
            ))}
          </div>
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}