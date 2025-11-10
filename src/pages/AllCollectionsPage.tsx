import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, SlidersHorizontal, Loader2, RefreshCw, Plus } from "lucide-react";
import { useAllCollections } from "../hooks/useAllCollections";
import { CollectionCard } from "../components/CollectionCard";

export function AllCollectionsPage() {
  const navigate = useNavigate();
  // API 데이터 가져오기
  const { data: apiData, loading, error, refetch } = useAllCollections();

  const [searchQuery, setSearchQuery] = useState("");

  // API 데이터를 그대로 사용
  const allCollections = useMemo(() => {
    return apiData || [];
  }, [apiData]);

  // 필터링 (검색어만)
  const filteredCollections = allCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
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
      <div className="min-h-screen pb-20 flex items-center justify-center p-6 bg-background">
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
    <div className="min-h-screen pb-20 bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
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

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="컬렉션 제목 또는 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full bg-card border-border focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            총 {filteredCollections.length}개의 컬렉션
          </p>
        </div>

        {/* Collections Grid */}
        {filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
                variant="grid"
                onClick={() => navigate(`/collections/${collection.collectionId}`)}
                onAuthorClick={(authorId) => navigate(`/users/${authorId}`)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SlidersHorizontal className="h-16 w-16 mb-6 text-muted-foreground/50" />
            <p className="text-xl font-semibold mb-2 text-foreground">
              검색 결과가 없습니다
            </p>
            <p className="text-base text-muted-foreground">
              다른 검색어를 시도해보세요.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
