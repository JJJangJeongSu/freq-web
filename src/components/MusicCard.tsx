import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Heart, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState, memo } from "react";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
  type: 'album' | 'track';
  onClick?: () => void;
  onQuickRate?: (rating: number) => void;
  onQuickLike?: () => void;
  showQuickActions?: boolean;
  releaseYear?: string;
  genre?: string;
}

export const MusicCard = memo(function MusicCard({
  title,
  artist,
  imageUrl,
  rating,
  type,
  onClick,
  onQuickRate,
  onQuickLike,
  showQuickActions = false,
  releaseYear,
  genre
}: MusicCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showRatingMenu, setShowRatingMenu] = useState(false);

  const handleQuickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onQuickLike?.();
  };

  const handleQuickRate = (e: React.MouseEvent, starRating: number) => {
    e.stopPropagation();
    onQuickRate?.(starRating);
    setShowRatingMenu(false);
  };

  const toggleRatingMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRatingMenu(!showRatingMenu);
  };

  return (
    <div 
      className="flex-shrink-0 w-36 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full aspect-square rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Quick Actions - 호버 시 표시 */}
        {showQuickActions && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
            {/* Quick Like Button */}
            <Button
              size="sm"
              variant={isLiked ? "default" : "secondary"}
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={handleQuickLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>

            {/* Quick Rating Button */}
            <div className="relative">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={toggleRatingMenu}
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </Button>

              {/* Quick Rating Menu */}
              {showRatingMenu && (
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-lg p-2 flex gap-1 z-50">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-1"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={(e) => handleQuickRate(e, star)}
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          star <= hoveredStar 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Content - 시각적 계층 구조 강화 */}
      <div className="space-y-1.5">
        {/* 제목 - 가장 중요한 정보 */}
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        {/* 아티스트 - 두 번째로 중요한 정보 */}
        <p className="text-xs font-medium text-muted-foreground line-clamp-1">
          {artist}
        </p>
        
        {/* 기타 정보 - 가장 덜 중요한 정보 */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
          {releaseYear && <span>{releaseYear}</span>}
          {releaseYear && genre && <span>•</span>}
          {genre && <span className="line-clamp-1">{genre}</span>}
        </div>
      </div>
    </div>
  );
});