import { ArrowLeft, Heart, Send, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";
import { getRelativeTime } from "@/utils/timeUtils";

export function CollectionCommentsPage() {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // TODO: useCollectionComments hook으로 대체
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentLikeStates, setCommentLikeStates] = useState<Record<number, boolean>>({});
  const [commentLikeCounts, setCommentLikeCounts] = useState<Record<number, number>>({});

  const handleCommentLike = async (commentId: number) => {
    const prevState = commentLikeStates[commentId];
    const prevCount = commentLikeCounts[commentId] || 0;

    // Optimistic update
    setCommentLikeStates(prev => ({
      ...prev,
      [commentId]: !prevState
    }));
    setCommentLikeCounts(prev => ({
      ...prev,
      [commentId]: prevState ? prevCount - 1 : prevCount + 1
    }));

    try {
      const response = await apiService.comments.toggleCommentLike(String(commentId));
      const apiData = (response.data as any)?.data;

      if (apiData) {
        setCommentLikeStates(prev => ({
          ...prev,
          [commentId]: apiData.liked
        }));
      }
    } catch (err: any) {
      // 실패 시 롤백
      setCommentLikeStates(prev => ({
        ...prev,
        [commentId]: prevState
      }));
      setCommentLikeCounts(prev => ({
        ...prev,
        [commentId]: prevCount
      }));
      console.error('❌ 댓글 좋아요 실패:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await apiService.comments.createComment({
        type: 'collection',
        targetId: Number(collectionId),
        content: commentText.trim()
      });

      setCommentText("");

      toast({
        description: "댓글이 등록되었습니다.",
      });

      // TODO: 댓글 목록 새로고침
      // refetch();
    } catch (err: any) {
      console.error('❌ 댓글 등록 실패:', err);
      toast({
        variant: "destructive",
        title: "댓글 등록 실패",
        description: err.response?.data?.error?.message || "다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // TODO: API 호출로 페이지 변경
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">댓글을 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">댓글</h1>
          <div className="w-8" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-destructive font-medium">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">댓글</h1>
            <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
              {totalComments}
            </span>
          </div>
          <div className="w-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.commentId} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.profileImageUrl} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{comment.userName}</p>
                      <span className="text-xs text-muted-foreground">
                        {getRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3 whitespace-pre-line">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCommentLike(comment.commentId);
                      }}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${commentLikeStates[comment.commentId] ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-sm">{commentLikeCounts[comment.commentId] ?? comment.likeCount}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold mb-2">아직 댓글이 없습니다</p>
              <p className="text-sm text-muted-foreground">
                이 컬렉션에 첫 댓글을 남겨보세요
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Comment Input (Sticky Bottom) */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="space-y-3">
          <Textarea
            placeholder="댓글을 남겨주세요..."
            className="w-full min-h-[80px] resize-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {commentText.length > 0 && `${commentText.length}자`}
            </span>
            <Button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  등록 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  등록
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
