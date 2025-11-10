import { Star, Music } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MusicListItemProps {
  rank: number;
  id: string;
  title: string;
  artist: string;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  userRating?: number;
  isRated?: boolean;
  type: 'album' | 'track';
  onClick?: () => void;
}

export function MusicListItem({
  rank,
  id,
  title,
  artist,
  imageUrl,
  rating,
  ratingCount,
  userRating,
  isRated,
  type,
  onClick
}: MusicListItemProps) {
  // 모든 순위를 원형 배지로 표시 (흰색 배경 + primary 텍스트)
  const getRankDisplay = () => {
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-primary text-primary font-bold text-xs">
        {rank}
      </div>
    );
  };

  return (
    <div
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      {/* 순위 */}
      <div className="flex-shrink-0">
        {getRankDisplay()}
      </div>

      {/* 앨범 커버 */}
      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden bg-muted relative">
        {imageUrl ? (
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Music className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base truncate">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">
          {artist}
        </p>

        {/* 평점 및 평가 수 */}
        <div className="flex items-center gap-3 mt-1">
          {rating !== undefined && (
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}

          {ratingCount !== undefined && (
            <span className="text-xs text-muted-foreground">
              {ratingCount.toLocaleString()}명 평가
            </span>
          )}

          {isRated && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              평가완료
            </span>
          )}
        </div>
      </div>

      {/* 사용자 평점 (데스크톱에서만 표시) */}
      {userRating !== undefined && (
        <div className="hidden sm:flex flex-col items-end flex-shrink-0">
          <span className="text-xs text-muted-foreground">내 평점</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-bold text-primary">{userRating.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
