import { useState } from "react";
import { ArrowLeft, Search, Filter, Plus, MoreVertical, Music, Heart, Share2 } from "lucide-react";
import { EnhancedButton } from "../components/EnhancedButton";
import { EnhancedCard } from "../components/EnhancedCard";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  imageUrl: string;
  isPublic: boolean;
  createdAt: string;
  tags: string[];
  likes: number;
}

interface MyCollectionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function MyCollectionsPage({ onNavigate }: MyCollectionsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "items" | "likes">("recent");
  
  // Mock data
  const [collections] = useState<Collection[]>([
    {
      id: "1",
      title: "나의 겨울 플레이리스트",
      description: "추운 겨울날 듣기 좋은 따뜻한 감성의 곡들을 모아놓은 컬렉션입니다.",
      itemCount: 24,
      imageUrl: "https://images.unsplash.com/photo-1741701862902-d8606228b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxlY3Rpb24lMjB2aW55bCUyMHJlY29yZHN8ZW58MXx8fHwxNzU5NTY0NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPublic: true,
      createdAt: "2024-12-15",
      tags: ["겨울", "감성", "발라드"],
      likes: 156
    },
    {
      id: "2",
      title: "K-POP 명곡 모음",
      description: "2024년 최고의 K-POP 트랙들을 한 곳에 모았습니다.",
      itemCount: 42,
      imageUrl: "https://images.unsplash.com/photo-1627491694773-e62d90a0f304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY29sbGVjdGlvbiUyMGFsYnVtc3xlbnwxfHx8fDE3NTk1NjQ2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPublic: true,
      createdAt: "2024-11-28",
      tags: ["K-POP", "트렌드", "2024"],
      likes: 89
    },
    {
      id: "3",
      title: "개인 취향 모음",
      description: "개인적으로 좋아하는 곡들만 모은 프라이빗 컬렉션",
      itemCount: 16,
      imageUrl: "https://images.unsplash.com/photo-1741701862902-d8606228b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbGxlY3Rpb24lMjB2aW55bCUyMHJlY29yZHN8ZW58MXx8fHwxNzU5NTY0NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPublic: false,
      createdAt: "2024-10-20",
      tags: ["개인취향", "즐겨듣기"],
      likes: 0
    },
    {
      id: "4",
      title: "재즈 & 블루스 클래식",
      description: "시대를 초월한 재즈와 블루스의 명곡들",
      itemCount: 31,
      imageUrl: "https://images.unsplash.com/photo-1627491694773-e62d90a0f304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY29sbGVjdGlvbiUyMGFsYnVtc3xlbnwxfHx8fDE3NTk1NjQ2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPublic: true,
      createdAt: "2024-09-15",
      tags: ["재즈", "블루스", "클래식"],
      likes: 234
    }
  ]);

  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleCollectionClick = (collectionId: string) => {
    onNavigate('curation-detail', collectionId);
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
            <h1 className="text-title-large">내가 만든 컬렉션</h1>
            <p className="text-body-medium text-on-surface-variant">
              {collections.length}개의 컬렉션
            </p>
          </div>
          <EnhancedButton
            variant="filled"
            size="icon"
            onClick={() => onNavigate('create-collection')}
            className="shrink-0"
          >
            <Plus className="size-6" />
          </EnhancedButton>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-3 md:p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-on-surface-variant" />
            <Input
              placeholder="컬렉션 검색..."
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
                최근 생성순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                이름순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("items")}>
                아이템 많은순
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("likes")}>
                좋아요 많은순
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="p-3 md:p-4">
        {sortedCollections.length === 0 ? (
          <div className="text-center py-12">
            <Music className="size-12 mx-auto mb-4 text-on-surface-variant" />
            <h3 className="text-title-medium mb-2">컬렉션이 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant mb-6">
              {searchQuery ? "검색 결과가 없습니다." : "첫 번째 컬렉션을 만들어보세요."}
            </p>
            {!searchQuery && (
              <EnhancedButton
                variant="filled"
                onClick={() => onNavigate('create-collection')}
              >
                <Plus className="size-4 mr-2" />
                컬렉션 만들기
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
                  <div className="absolute top-2 right-2 flex gap-1">
                    {!collection.isPublic && (
                      <Badge variant="secondary" className="text-xs">
                        비공개
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <EnhancedButton
                          variant="filled"
                          size="icon"
                          className="size-8 bg-surface-container/80 hover:bg-surface-container"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="size-4" />
                        </EnhancedButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>편집</DropdownMenuItem>
                        <DropdownMenuItem>공유</DropdownMenuItem>
                        <DropdownMenuItem>복제</DropdownMenuItem>
                        <DropdownMenuItem className="text-error">삭제</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  
                  <div className="flex items-center justify-between text-body-small text-on-surface-variant">
                    <span>{new Date(collection.createdAt).toLocaleDateString()}</span>
                    {collection.isPublic && (
                      <div className="flex items-center gap-1">
                        <Heart className="size-3" />
                        <span>{collection.likes}</span>
                      </div>
                    )}
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