import { ArrowLeft, Heart, Reply, Send, MoreVertical, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StarRating } from "../components/StarRating";
import { Textarea } from "../components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReviewDetail } from "../hooks/useReviewDetail";
import { useToggleReviewLike } from "../hooks/useToggleReviewLike";
import { useToggleCommentLike } from "../hooks/useToggleCommentLike";
import { useCreateComment } from "../hooks/useCreateComment";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CommentDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { data: review, loading, error, refetch } = useReviewDetail(reviewId || '');
  const { toggleLike: toggleReviewLike } = useToggleReviewLike();
  const { toggleLike: toggleCommentLike } = useToggleCommentLike();
  const { createComment, loading: createCommentLoading } = useCreateComment();

  const [replyText, setReplyText] = useState('');
  const [isReviewLiked, setIsReviewLiked] = useState(false);
  const [reviewLikes, setReviewLikes] = useState(0);

  // 로딩 상태 (중복 클릭 방지)
  const [isReviewLikeLoading, setIsReviewLikeLoading] = useState(false);
  const [commentLikeLoading, setCommentLikeLoading] = useState<Record<number, boolean>>({});

  // 댓글별 좋아요 상태 관리
  const [commentLikes, setCommentLikes] = useState<Record<number, { isLiked: boolean; count: number }>>({});

  // Update likes when review data changes
  useEffect(() => {
    if (review) {
      console.log('🔄 Review data changed, updating like state:', {
        reviewId: review.reviewId,
        isLiked: review.isLiked,
        likeCount: review.likeCount
      });
      setIsReviewLiked(review.isLiked || false);
      setReviewLikes(review.likeCount);

      // 댓글 좋아요 상태 초기화
      if (review.comments) {
        const initialCommentLikes: Record<number, { isLiked: boolean; count: number }> = {};
        review.comments.forEach(comment => {
          console.log(`❤️ Comment ${comment.commentId} like state:`, {
            isLiked: comment.isLiked,
            likeCount: comment.likeCount
          });
          initialCommentLikes[comment.commentId] = {
            isLiked: comment.isLiked || false,
            count: comment.likeCount
          };
        });
        setCommentLikes(initialCommentLikes);
      }
    }
  }, [review]);

  const handleLikeReview = async () => {
    if (!reviewId || isReviewLikeLoading) return; // 로딩 중이면 무시

    // 낙관적 업데이트: 즉시 UI 반영
    const newIsLiked = !isReviewLiked;
    const newLikeCount = isReviewLiked ? reviewLikes - 1 : reviewLikes + 1;

    setIsReviewLiked(newIsLiked);
    setReviewLikes(newLikeCount);
    setIsReviewLikeLoading(true); // 로딩 시작

    // 백그라운드에서 API 호출
    const result = await toggleReviewLike(reviewId, isReviewLiked, reviewLikes);

    setIsReviewLikeLoading(false); // 로딩 종료

    // 에러 발생 시 롤백
    if (result.error) {
      setIsReviewLiked(result.optimisticIsLiked);
      setReviewLikes(result.optimisticLikeCount);
      console.error('리뷰 좋아요 토글 실패:', result.error.message);
      // TODO: 사용자에게 에러 알림 (토스트 등)
    }
  };

  const handleLikeComment = async (commentId: number) => {
    const currentState = commentLikes[commentId];
    if (!currentState || commentLikeLoading[commentId]) return; // 로딩 중이면 무시

    // 낙관적 업데이트: 즉시 UI 반영
    const newIsLiked = !currentState.isLiked;
    const newLikeCount = currentState.isLiked
      ? currentState.count - 1
      : currentState.count + 1;

    setCommentLikes(prev => ({
      ...prev,
      [commentId]: {
        isLiked: newIsLiked,
        count: newLikeCount
      }
    }));

    // 로딩 시작
    setCommentLikeLoading(prev => ({ ...prev, [commentId]: true }));

    // 백그라운드에서 API 호출
    const result = await toggleCommentLike(
      commentId,
      currentState.isLiked,
      currentState.count
    );

    // 로딩 종료
    setCommentLikeLoading(prev => ({ ...prev, [commentId]: false }));

    // 에러 발생 시 롤백
    if (result.error) {
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: {
          isLiked: result.optimisticIsLiked,
          count: result.optimisticLikeCount
        }
      }));
      console.error('댓글 좋아요 토글 실패:', result.error.message);
      // TODO: 사용자에게 에러 알림 (토스트 등)
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim() || !reviewId) return;

    // 댓글 작성 API 호출
    const result = await createComment({
      type: 'review',
      targetId: Number(reviewId),
      content: replyText.trim()
    });

    if (result.success) {
      console.log('✅ 댓글 작성 성공, 리뷰 데이터 새로고침...');

      // 댓글 작성 성공 시 입력 필드 초기화
      setReplyText('');

      // 리뷰 데이터 새로고침하여 새 댓글 표시
      await refetch();

      console.log('✅ 리뷰 데이터 새로고침 완료');
    } else {
      console.error('❌ 댓글 작성 실패:', result.error?.message);
      // TODO: 사용자에게 에러 알림 (토스트 등)
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
              <Avatar
                className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate(`/users/${review.userId}`)}
              >
                <AvatarImage src={review.userImageUrl || undefined} />
                <AvatarFallback>{review.username?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p
                    className="font-medium cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/users/${review.userId}`)}
                  >
                    {review.username || 'Unknown'}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </span>
                  
                </div>
                <div className="mb-3">
                  <StarRating rating={review.rating} readonly size="sm" />
                </div>
                {review.title && (
                  <h2 className="font-semibold mb-2">{review.title}</h2>
                )}
                {review.content && (
                  <p className="text-sm leading-relaxed mb-4 whitespace-pre-line">{review.content}</p>
                )}

                {/* Review Actions */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={handleLikeReview}
                    disabled={isReviewLikeLoading}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${isReviewLiked ? 'fill-red-500 text-red-500' : ''} ${isReviewLikeLoading ? 'opacity-50' : ''}`} />
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
                disabled={createCommentLoading}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim() || createCommentLoading}
                  size="sm"
                >
                  {createCommentLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      작성 중...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      댓글 작성
                    </>
                  )}
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
                    <Avatar
                      className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigate(`/users/${comment.userId}`)}
                    >
                      <AvatarImage src={comment.profileImageUrl} />
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className="font-medium text-sm cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigate(`/users/${comment.userId}`)}
                        >
                          {comment.userName}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                        
                      </div>
                      <p className="text-sm leading-relaxed mb-2 whitespace-pre-line">{comment.content}</p>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-foreground"
                          onClick={() => handleLikeComment(comment.commentId)}
                          disabled={commentLikeLoading[comment.commentId]}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${commentLikes[comment.commentId]?.isLiked ? 'fill-red-500 text-red-500' : ''} ${commentLikeLoading[comment.commentId] ? 'opacity-50' : ''}`} />
                          <span className="text-xs">{commentLikes[comment.commentId]?.count ?? comment.likeCount}</span>
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
