import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export function StarRating({ rating, onRatingChange, size = 'md', readonly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12',
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseDown = (value: number) => {
    if (!readonly && onRatingChange) {
      setIsDragging(true);
      onRatingChange(value);
    }
  };

  const handleMouseMove = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
      // 드래그 중이면 별점 변경
      if (isDragging && onRatingChange) {
        onRatingChange(value);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  // 전역 마우스 up 이벤트 처리 (드래그가 컨테이너 밖에서 끝날 경우)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  return (
    <div
      className="flex gap-1"
      onMouseLeave={() => {
        handleMouseLeave();
        setIsDragging(false);
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseDown={() => handleMouseDown(star)}
            onMouseMove={() => handleMouseMove(star)}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => handleMouseEnter(star)}
            disabled={readonly}
            className={`${sizeClasses[size]} transition-colors ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <Star
              className={`w-full h-full ${
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}