import { MusicCard } from "./MusicCard";

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
}

interface HorizontalMusicSectionProps {
  title: string;
  items: MusicItem[];
  type: 'album' | 'track';
  onItemClick?: (id: string) => void;
  onViewAll?: () => void;
}

export function HorizontalMusicSection({ title, items, type, onItemClick, onViewAll }: HorizontalMusicSectionProps) {
  if (items.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5 px-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              모두 보기 →
            </button>
          )}
        </div>
        <div className="px-6">
          <p className="text-muted-foreground text-center py-12 bg-muted/30 rounded-xl">
            표시할 {type === 'album' ? '앨범' : '트랙'}이 없습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-5 px-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            모두 보기 →
          </button>
        )}
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 px-6 pb-4">
          {items.map((item) => (
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist={item.artist}
              imageUrl={item.imageUrl}
              rating={item.rating}
              type={type}
              onClick={() => onItemClick?.(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}