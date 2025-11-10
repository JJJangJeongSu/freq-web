import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MusicListItem } from "./MusicListItem";

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  userRating?: number;
  isRated?: boolean;
}

interface MusicListPageProps {
  title: string;
  type: 'album' | 'track';
  items: MusicItem[];
  loading: boolean;
  error: Error | null;
  onRefetch?: () => void;
}

/**
 * 차트/랭킹용 리스트뷰 페이지 컴포넌트
 *
 * MusicGridPage와 달리:
 * - 순위 표시 (1-100)
 * - 리스트 레이아웃 (그리드 아님)
 * - 정렬 기능 없음 (인기순 고정)
 * - 더 많은 정보 표시 (평점, 평가 수)
 */
export function MusicListPage({
  title,
  type,
  items,
  loading,
  error,
  onRefetch
}: MusicListPageProps) {
  const navigate = useNavigate();

  // Loading 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-destructive mb-2">데이터를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            {onRefetch && (
              <Button onClick={onRefetch} variant="outline">
                다시 시도
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-xs text-muted-foreground">총 {items.length}개</p>
        </div>
        <div className="w-8" />
      </header>

      {/* List */}
      <main className="flex-1 pb-20">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-2">데이터가 없습니다</p>
            <p className="text-sm text-muted-foreground">
              아직 {type === 'album' ? '앨범' : '트랙'}이 없습니다
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item, index) => (
              <MusicListItem
                key={item.id}
                rank={index + 1}
                id={item.id}
                title={item.title}
                artist={item.artist}
                imageUrl={item.imageUrl}
                rating={item.rating}
                ratingCount={item.ratingCount}
                userRating={item.userRating}
                isRated={item.isRated}
                type={type}
                onClick={() => navigate(`/${type}s/${item.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
