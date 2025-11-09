import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, SlidersHorizontal, Loader2, RefreshCw } from "lucide-react";
import { useAllCollections } from "../hooks/useAllCollections";
import { CollectionCard } from "../components/CollectionCard";

interface AllCollectionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function AllCollectionsPage({ onNavigate }: AllCollectionsPageProps) {
  // API 데이터 가져오기
  const { data: apiData, loading, error, refetch } = useAllCollections();

  const [searchQuery, setSearchQuery] = useState("");

  // API 데이터를 useMemo로 변환
  const allCollections = useMemo(() => {
    if (!apiData) return [];

    return apiData.map(collection => ({
      id: String(collection.collectionId),
      title: collection.title,
      description: collection.description,
      creator: {
        name: collection.author.username,
        avatar: collection.author.imageUrl,
        id: String(collection.author.id)
      },
      imageUrl: collection.coverImageUrl,
      stats: {
        likes: collection.likeCount,
        itemCount: collection.itemCount
      }
    }));
  }, [apiData]);

  // 필터링 (검색어만)
  const filteredCollections = allCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">컬렉션을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center p-6 bg-white">
        <div className="text-center space-y-4">
          <p className="font-semibold text-destructive">컬렉션을 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="h-10 w-10 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">모든 컬렉션</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 space-y-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="컬렉션 제목 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-full bg-muted/50 border"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2">
        <p className="text-sm text-muted-foreground">
          총 {filteredCollections.length}개의 컬렉션
        </p>
      </div>

      {/* Collections Grid */}
      <div className="p-4 flex flex-wrap justify-center gap-6">
        {filteredCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            {...collection}
            onClick={() => onNavigate('curation-detail', collection.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <SlidersHorizontal className="h-16 w-16 mb-4 text-muted" />
          <p className="text-lg mb-2 text-muted-foreground">
            검색 결과가 없습니다
          </p>
          <p className="text-sm text-muted-foreground/80">
            다른 검색어를 시도해보세요
          </p>
        </div>
      )}
    </div>
  );
}
