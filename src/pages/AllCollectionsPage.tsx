import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search, SlidersHorizontal, Loader2, RefreshCw, Plus } from "lucide-react";
import { useAllCollections } from "../hooks/useAllCollections";
import { CollectionCard } from "../components/CollectionCard";
import { apiService } from "../services/api.service";

export function AllCollectionsPage() {
  const navigate = useNavigate();
  // API 데이터 가져오기 (전체 컬렉션)
  const { data: apiData, loading: allLoading, error: allError, refetch } = useAllCollections();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // 검색 API 호출 (디바운스)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(null);

        console.log('🔍 Searching collections with query:', searchQuery);

        const response = await apiService.collections.search(searchQuery);

        console.log('✅ Search response:', response);

        // API 응답 구조 확인
        const results = (response.data as any)?.data || [];
        setSearchResults(results);

      } catch (err: any) {
        console.error('❌ Search failed:', err);
        setSearchError(err.response?.data?.error?.message || '검색 중 오류가 발생했습니다.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 표시할 컬렉션 결정
  const displayCollections = searchQuery.trim() ? searchResults : (apiData || []);
  const loading = searchQuery.trim() ? isSearching : allLoading;
  const error = searchQuery.trim() ? searchError : allError?.message;

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
  if (error && !searchQuery.trim()) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
          <p className="font-semibold text-destructive">컬렉션을 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error}</p>
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

      <main className="container mx-auto px-4 py-8">
        {/* Search Section - Material 3 Style */}
        <div className="mb-8">
          <div
            className="w-full h-16 rounded-xl flex items-center px-6 border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--outline)'
            }}
          >
            <Search className="w-6 h-6 mr-4 flex-shrink-0" style={{ color: 'var(--on-surface-variant)' }} />
            <Input
              placeholder="컬렉션 제목 또는 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-body-large p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-on-surface-variant"
              style={{ color: 'var(--on-surface)' }}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchQuery.trim() ? `'${searchQuery}' 검색 결과: ` : '총 '}{displayCollections.length}개의 컬렉션
          </p>
        </div>

        {/* Search Error Message */}
        {error && searchQuery.trim() && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Collections Grid */}
        {displayCollections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {displayCollections.map((collection) => (
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
              {searchQuery.trim() ? '검색 결과가 없습니다' : '컬렉션이 없습니다'}
            </p>
            <p className="text-base text-muted-foreground">
              {searchQuery.trim() ? '다른 검색어를 시도해보세요.' : '새로운 컬렉션을 만들어보세요.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
