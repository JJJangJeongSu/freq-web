import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft, Search, SlidersHorizontal, Heart, Loader2, RefreshCw } from "lucide-react";
import { useAllCollections } from "../hooks/useAllCollections";

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
      <div className="min-h-screen pb-20 flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto" style={{ color: '#2196F3' }} />
          <p style={{ color: '#757575' }}>컬렉션을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center p-6" style={{ background: '#FFFFFF' }}>
        <div className="text-center space-y-4">
          <p className="font-semibold" style={{ color: '#F44336' }}>컬렉션을 불러올 수 없습니다</p>
          <p className="text-sm" style={{ color: '#757575' }}>{error.message}</p>
          <Button onClick={refetch}>
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <div className="sticky top-0 z-10" style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E0E0' }}>
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="h-10 w-10 p-0 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" style={{ color: '#2196F3' }} />
          </Button>
          <h1 className="text-xl" style={{ color: '#000000' }}>모든 컬렉션</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 space-y-4" style={{ background: '#FFFFFF' }}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#757575' }} />
          <Input
            placeholder="컬렉션 제목 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-full"
            style={{ 
              background: '#F5F5F5',
              border: '1px solid #E0E0E0'
            }}
          />
        </div>


      </div>

      {/* Results Count */}
      <div className="px-4 py-2">
        <p className="text-sm" style={{ color: '#757575' }}>
          총 {filteredCollections.length}개의 컬렉션
        </p>
      </div>

      {/* Collections Grid */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
        {filteredCollections.map((collection) => (
          <Card
            key={collection.id}
            className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
            style={{ 
              background: '#FFFFFF',
              border: '1px solid #E0E0E0'
            }}
            onClick={() => onNavigate('curation-detail', collection.id)}
          >
            <CardContent className="p-0">
              {/* Collection Image */}
              <div className="relative aspect-square">
                <ImageWithFallback
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Collection Info */}
              <div className="p-4 space-y-3">
                {/* Title & Description */}
                <div>
                  <h3 className="line-clamp-1 mb-1" style={{ color: '#000000' }}>
                    {collection.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: '#757575' }}>
                    {collection.description}
                  </p>
                </div>

                {/* Creator */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={collection.creator.avatar} />
                    <AvatarFallback>{collection.creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm" style={{ color: '#757575' }}>
                    {collection.creator.name}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid #E0E0E0' }}>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" style={{ color: '#757575' }} />
                    <span className="text-sm" style={{ color: '#757575' }}>
                      {collection.stats.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SlidersHorizontal className="h-4 w-4" style={{ color: '#757575' }} />
                    <span className="text-sm" style={{ color: '#757575' }}>
                      {collection.stats.itemCount}개
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <SlidersHorizontal className="h-16 w-16 mb-4" style={{ color: '#E0E0E0' }} />
          <p className="text-lg mb-2" style={{ color: '#757575' }}>
            검색 결과가 없습니다
          </p>
          <p className="text-sm" style={{ color: '#BDBDBD' }}>
            다른 검색어나 필터를 시도해보세요
          </p>
        </div>
      )}
    </div>
  );
}
