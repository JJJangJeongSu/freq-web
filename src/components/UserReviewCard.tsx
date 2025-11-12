import { Star, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface UserReviewData {
  id: number;
  rating: number;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
  album: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
  };
}

interface UserReviewCardProps {
  review: UserReviewData;
  onClick?: () => void;
}

export function UserReviewCard({ review, onClick }: UserReviewCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Album Cover */}
          <ImageWithFallback
            src={review.album.imageUrl}
            alt={review.album.title}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />

          {/* Review Content */}
          <div className="flex-1 space-y-2">
            {/* Album Info & Rating */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold line-clamp-1">
                  {review.album.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {review.album.artist}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            {review.content && (
              <p className="text-sm line-clamp-2">
                {review.content}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{review.createdAt}</span>
              <div className="flex items-center gap-1">
                <Heart className={`w-4 h-4 ${review.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{review.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{review.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
