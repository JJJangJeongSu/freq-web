import { ArrowLeft, Heart, Reply, Send, MoreVertical, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StarRating } from "../components/StarRating";
import { Textarea } from "../components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReviewDetail } from "../hooks/useReviewDetail";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CommentDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { data: review, loading, error, refetch } = useReviewDetail(reviewId || '');

  const [replyText, setReplyText] = useState('');
  const [isReviewLiked, setIsReviewLiked] = useState(review?.isLiked || false);
  const [reviewLikes, setReviewLikes] = useState(review?.likeCount || 0);

  // Update likes when review data changes
  useState(() => {
    if (review) {
      setIsReviewLiked(review.isLiked || false);
      setReviewLikes(review.likeCount);
    }
  });

  const handleLikeReview = () => {
    // TODO: API 호출로 좋아요 토글
    setIsReviewLiked(!isReviewLiked);
    setReviewLikes(prev => isReviewLiked ? prev - 1 : prev + 1);
  };

  const handleLikeComment = (commentId: number) => {
    console.log('댓글 좋아요:', commentId);
    // TODO: API 호출로 댓글 좋아요 토글
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      console.log('댓글 제출:', replyText);
      // TODO: API 호출로 댓글 작성
      setReplyText('');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">리뷰</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">리뷰를 불러오는 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !review) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">리뷰</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <p className="font-semibold text-destructive">리뷰를 불러올 수 없습니다</p>
            <p className="text-sm text-muted-foreground">
              {error?.message || '리뷰를 찾을 수 없습니다'}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">리뷰</h1>
        <div className="w-8" /> {/* 균형을 위한 빈 공간 */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Target (Album/Track) Info */}
          <div
            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
            onClick={() => {
              const path = review.targetType === 'album'
                ? `/albums/${review.targetId}`
                : `/tracks/${review.targetId}`;
              navigate(path);
            }}
          >
            <ImageWithFallback
              src={review.imageUrl}
              alt={review.targetTitle}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{review.targetTitle}</p>
              <p className="text-sm text-muted-foreground">
                {review.artists?.join(', ') || 'Unknown Artist'}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.releaseDate).getFullYear()}
              </p>
            </div>
          </div>

          {/* Original Review */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={review.userImageUrl} />
                <AvatarFallback>{review.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium">{review.username}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </span>
                  {review.updatedAt && review.updatedAt !== review.createdAt && (
                    <span className="text-xs text-muted-foreground">(수정됨)</span>
                  )}
                </div>
                <div className="mb-3">
                  <StarRating rating={review.rating} readonly size="sm" />
                </div>
                {review.title && (
                  <h2 className="font-semibold mb-2">{review.title}</h2>
                )}
                {review.content && (
                  <p className="text-sm leading-relaxed mb-4">{review.content}</p>
                )}

                {/* Review Actions */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={handleLikeReview}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${isReviewLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm">{reviewLikes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    <span className="text-sm">{review.commentCount}</span>
                  </Button>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>신고하기</DropdownMenuItem>
                  <DropdownMenuItem>공유하기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator />

          {/* Comment Input */}
          <div className="space-y-3">
            <h3 className="font-medium">댓글 {review.commentCount}개</h3>
            <div className="space-y-3">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="댓글을 작성해보세요..."
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>

          {review.comments && review.comments.length > 0 && (
            <>
              <Separator />

              {/* Comments */}
              <div className="space-y-4">
                {review.comments.map((comment) => (
                  <div key={comment.commentId} className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.profileImageUrl} />
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{comment.userName}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                        {comment.updatedAt && (
                          <span className="text-xs text-muted-foreground">(수정됨)</span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed mb-2">{comment.content}</p>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-foreground"
                          onClick={() => handleLikeComment(comment.commentId)}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="text-xs">{comment.likeCount}</span>
                        </Button>

                        {comment.commentCount !== undefined && comment.commentCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto text-muted-foreground hover:text-foreground"
                          >
                            <Reply className="w-3 h-3 mr-1" />
                            <span className="text-xs">{comment.commentCount}개 답글</span>
                          </Button>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>신고하기</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
