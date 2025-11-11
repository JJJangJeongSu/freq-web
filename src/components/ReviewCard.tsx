import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { StarRating } from "./StarRating";
import { Heart, MessageCircle } from "lucide-react";
import { formatDate } from "../utils/timeUtils";

interface ReviewCardProps {
  review: {
    reviewId: number;
    userId: number;
    username: string;
    userProfileImage?: string | null;
    rating: number;
    content: string;
    likeCount: number;
    commentCount?: number;
    createdAt: string;
    isLiked?: boolean;
  };
  onReviewClick?: (reviewId: number) => void;
  onUserClick?: (userId: number) => void;
  onLikeClick?: (reviewId: number) => void;
  onReplyClick?: (reviewId: number) => void;
}

export function ReviewCard({
  review,
  onReviewClick,
  onUserClick,
  onLikeClick,
  onReplyClick,
}: ReviewCardProps) {
  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          className="w-10 h-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onUserClick?.(review.userId);
          }}
        >
          <AvatarImage src={review.userProfileImage || undefined} />
          <AvatarFallback className="text-foreground bg-muted">
            {review.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p
              className="font-medium text-foreground cursor-pointer hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onUserClick?.(review.userId);
              }}
            >
              {review.username}
            </p>
            <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
          </div>
          <div className="mb-2">
            <StarRating rating={review.rating} readonly size="sm" />
          </div>
          <p
            className="text-sm leading-relaxed text-foreground mb-3 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onReviewClick?.(review.reviewId)}
          >
            {review.content}
          </p>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onLikeClick?.(review.reviewId);
              }}
            >
              <Heart
                className={`w-4 h-4 mr-1 ${
                  review.isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-xs">{review.likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onReplyClick?.(review.reviewId);
              }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{review.commentCount ?? 0}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
