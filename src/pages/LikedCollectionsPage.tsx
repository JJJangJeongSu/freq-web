import { useState } from "react";
import { ArrowLeft, Search, Filter, Heart, Music, Share2, UserCheck } from "lucide-react";
import { EnhancedButton } from "../components/EnhancedButton";
import { EnhancedCard } from "../components/EnhancedCard";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface LikedCollection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  imageUrl: string;
  creatorName: string;
  creatorId: string;
  createdAt: string;
  tags: string[];
  likes: number;
  likedAt: string;
}

interface LikedCollectionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function LikedCollectionsPage({ onNavigate }: LikedCollectionsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "items" | "likes" | "creator">("recent");
  
  // Mock data
  const [likedCollections] = useState<LikedCollection[]>([
    {
      id: "1",
      title: "인디 음악 추천 모음",
      description: "숨어있는 인디 뮤지션들의 보석 같은 곡들을 발굴해서 모았습니다. 메이저 레이블에서는 찾기 힘든 참신한 사운드들을 만나보세요.",
      itemCount: 38,
      imageUrl: "https://images.unsplash.com/photo-1741701862902-d8606228b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxlY3Rpb24lMjB2aW55bCUyMHJlY29yZHN8ZW58MXx8fHwxNzU5NTY0NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      creatorName: "음악탐험가",
      creatorId: "user1",
      createdAt: "2024-12-10",
      tags: ["인디", "발굴", "숨은명곡"],
      likes: 542,
      likedAt: "2024-12-14"
    },
    {
      id: "2",
      title: "드라이브 음악 완전판",
      description: "야간 드라이브에 완벽한 음악들만 엄선했습니다.",
      itemCount: 28,
      imageUrl: "https://images.unsplash.com/photo-1627491694773-e62d90a0f304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY29sbGVjdGlvbiUyMGFsYnVtc3xlbnwxfHx8fDE3NTk1NjQ2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      creatorName: "드라이버_J",
      creatorId: "user2",
      createdAt: "2024-11-25",
      tags: ["드라이브", "야간", "분위기"],
      likes: 892,
      likedAt: "2024-12-12"
    },
    {
      id: "3",
      title: "90년대 K-POP 명곡선",
      description: "세월이 흘러도 여전히 명곡인 90년대 K-POP 트랙들",
      itemCount: 45,
      imageUrl: "https://images.unsplash.com/photo-1741701862902-d8606228b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxlY3Rpb24lMjB2aW55bCUyMHJlY29yZHN8ZW58MXx8fHwxNzU5NTY0NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      creatorName: "레트로매니아",
      creatorId: "user3",
      createdAt: "2024-11-18",
      tags: ["90년대", "K-POP", "추억", "명곡"],
      likes: 1234,
      likedAt: "2024-12-08"
    },
    {
      id: "4",
      title: "집중력 향상 클래식",
      description: "업무나 공부할 때 집중력을 높여주는 클래식 음악 모음",
      itemCount: 22,
      imageUrl: "https://images.unsplash.com/photo-1627491694773-e62d90a0f304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY29sbGVjdGlvbiUyMGFsYnVtc3xlbnwxfHx8fDE3NTk1NjQ2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      creatorName: "클래식러버",
      creatorId: "user4",
      createdAt: "2024-10-30",
      tags: ["클래식", "집중", "공부", "업무"],
      likes: 376,
      likedAt: "2024-12-05"
    },
    {
      id: "5",
      title: "비 오는 날 감성곡",
      description: "비 오는 날 듣기 좋은 감성적인 곡들을 모았습니다",
      itemCount: 19,
      imageUrl: "https://images.unsplash.com/photo-1741701862902-d8606228b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxlY3Rpb24lMjB2aW55bCUyMHJlY29yZHN8ZW58MXx8fHwxNzU5NTY0NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      creatorName: "감성충전",
      creatorId: "user5",
      createdAt: "2024-10-15",
      tags: ["비", "감성", "힐링"],
      likes: 623,
      likedAt: "2024-11-28"
    }
  ]);

  const filteredCollections = likedCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
    onNavigate('curation-detail', collectionId);
  };

  const handleCreatorClick = (creatorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate('user-profile', creatorId);
  };

  return (
    <div className="size-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-4 p-3 md:p-4">
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('rate-record')}
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
            <p className="text-body-medium text-on-surface-variant mb-6">
              {searchQuery ? "검색 결과가 없습니다." : "마음에 드는 컬렉션에 좋아요를 눌러보세요."}
            </p>
            {!searchQuery && (
              <EnhancedButton
                variant="filled"
                onClick={() => onNavigate('search')}
              >
                <Search className="size-4 mr-2" />
                컬렉션 찾아보기
              </EnhancedButton>
            )}
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
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {collection.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {collection.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{collection.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
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