import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowLeft, Search, SlidersHorizontal, Heart, MessageCircle, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface AllCollectionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

type SortType = "popular" | "latest";
type CategoryType = "all" | "mixed" | "albums" | "tracks";

export function AllCollectionsPage({ onNavigate }: AllCollectionsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("popular");
  const [category, setCategory] = useState<CategoryType>("all");

  // 전체 컬렉션 데이터
  const allCollections = [
    {
      id: '1',
      title: '새벽에 듣는 음악',
      description: '조용한 새벽 시간에 어울리는 차분한 음악들',
      type: 'mixed' as const,
      creator: {
        name: '음악평론가',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1559121060-686a11356a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGN1cmF0b3IlMjBlZGl0b3JpYWwlMjBwaWNrc3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#새벽', '#감성', '#차분함'],
      stats: { likes: 234, comments: 45 },
      createdAt: '2024-10-20'
    },
    {
      id: '2', 
      title: '운동할 때 추천',
      description: '운동할 때 들으면 좋은 신나는 음악들',
      type: 'tracks' as const,
      creator: {
        name: '피트니스러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: false
      },
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbXVzaWMlMjB3b3Jrb3V0fGVufDF8fHx8MTc1ODcwMTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#운동', '#에너지', '#업비트'],
      stats: { likes: 189, comments: 32 },
      createdAt: '2024-10-22'
    },
    {
      id: '3',
      title: '재즈 입문자를 위한',
      description: '재즈를 처음 듣는 분들에게 추천하는 곡들',
      type: 'albums' as const,
      creator: {
        name: '재즈마스터',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBpbnN0cnVtZW50fGVufDF8fHx8MTc1ODcwMTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#재즈', '#입문', '#클래식'],
      stats: { likes: 456, comments: 87 },
      createdAt: '2024-10-18'
    },
    {
      id: '4',
      title: '비 오는 날의 플레이리스트',
      description: '빗소리와 함께 듣기 좋은 음악',
      type: 'mixed' as const,
      creator: {
        name: '감성치즈',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: false
      },
      imageUrl: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlueSUyMGRheSUyMG11c2ljfGVufDF8fHx8MTc1ODcwMTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#비', '#감성', '#힐링'],
      stats: { likes: 312, comments: 54 },
      createdAt: '2024-10-24'
    },
    {
      id: '5',
      title: '집중력 UP 클래식',
      description: '공부하거나 일할 때 듣는 클래식 음악',
      type: 'albums' as const,
      creator: {
        name: '클래식러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBtdXNpYyUyMG9yY2hlc3RyYXxlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#클래식', '#집중', '#공부'],
      stats: { likes: 521, comments: 92 },
      createdAt: '2024-10-15'
    },
    {
      id: '6',
      title: '드라이브 필수 팝송',
      description: '드라이브하면서 듣기 좋은 신나는 팝송',
      type: 'tracks' as const,
      creator: {
        name: '드라이버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080',
        isVerified: false
      },
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2aW5nJTIwY2FyJTIwcm9hZHxlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['#드라이브', '#팝', '#신나는'],
      stats: { likes: 267, comments: 41 },
      createdAt: '2024-10-21'
    }
  ];

  // 필터링 및 정렬
  const filteredCollections = allCollections
    .filter(collection => {
      // 검색어 필터
      const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           collection.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 카테고리 필터
      const matchesCategory = category === "all" || collection.type === category;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.stats.likes - a.stats.likes;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

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
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="absolute top-2 right-2">
                  <Badge
                    className="rounded-full"
                    style={{
                      background: collection.type === 'mixed' ? '#2196F3' : 
                                 collection.type === 'albums' ? '#4CAF50' : '#FF9800',
                      color: '#FFFFFF'
                    }}
                  >
                    {collection.type === 'mixed' ? '혼합' : 
                     collection.type === 'albums' ? '앨범' : '트랙'}
                  </Badge>
                </div>
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

                {/* Tags */}
                <div className="flex gap-1 flex-wrap">
                  {collection.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-xs rounded-full"
                      style={{
                        background: '#F5F5F5',
                        color: '#2196F3',
                        border: 'none'
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
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
                  {collection.creator.isVerified && (
                    <CheckCircle className="h-4 w-4" style={{ color: '#2196F3' }} />
                  )}
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
                    <MessageCircle className="h-4 w-4" style={{ color: '#757575' }} />
                    <span className="text-sm" style={{ color: '#757575' }}>
                      {collection.stats.comments}
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
