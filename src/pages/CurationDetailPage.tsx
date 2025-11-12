import { ArrowLeft, Heart, MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { StarRating } from "../components/StarRating";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Textarea } from "../components/ui/textarea";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import { apiService } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";
import { getRelativeTime } from "@/utils/timeUtils";

export function CurationDetailPage() {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const curationId = collectionId; // Using collectionId
  const { toast } = useToast();

  // API 데이터 가져오기
  const { data: collection, loading, error, refetch } = useCollectionDetail(curationId);

  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentLikeStates, setCommentLikeStates] = useState<Record<number, boolean>>({});
  const [commentLikeCounts, setCommentLikeCounts] = useState<Record<number, number>>({});

  // API 데이터가 로드되면 좋아요 상태 업데이트
  useEffect(() => {
    if (collection) {
      setIsLiked(collection.isLiked || false);
      setLikes(collection.likeCount);

      // 댓글 좋아요 상태 및 카운트 초기화
      const states: Record<number, boolean> = {};
      const counts: Record<number, number> = {};
      collection.comments.forEach(comment => {
        states[comment.commentId] = comment.isLiked;
        counts[comment.commentId] = comment.likeCount;
      });
      setCommentLikeStates(states);
      setCommentLikeCounts(counts);
    }
  }, [collection]);

  const handleLike = async () => {
    if (isLikeLoading) return; // 중복 클릭 방지

    // Optimistic update (낙관적 업데이트)
    const previousIsLiked = isLiked;
    const previousLikes = likes;

    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);

    try {
      setIsLikeLoading(true);

      // API 호출
      const response = await apiService.collections.toggleCollectionLike(curationId);

      // API 응답에서 실제 좋아요 상태 확인
      const apiData = (response.data as any)?.data;

      if (apiData) {
        // API 응답으로 최종 상태 동기화
        setIsLiked(apiData.liked);
      }

      // 성공 toast (선택적 - 너무 빈번하면 생략 가능)
      // toast({
      //   description: apiData.liked ? "좋아요를 눌렀습니다" : "좋아요를 취소했습니다",
      // });

    } catch (err: any) {
      // 에러 발생 시 이전 상태로 롤백
      setIsLiked(previousIsLiked);
      setLikes(previousLikes);

      console.error('❌ 좋아요 토글 실패:', err);

      toast({
        variant: "destructive",
        title: "좋아요 처리 실패",
        description: err.response?.data?.error?.message || "다시 시도해주세요.",
      });
    } finally {
      setIsLikeLoading(false);
    }
  };

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
      // API 호출 (commentId를 string으로 변환)
      const response = await apiService.comments.toggleCommentLike(String(commentId));
      const apiData = (response.data as any)?.data;

      // API 응답으로 최종 상태 동기화
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

      // API 호출: 댓글 작성
      await apiService.comments.createComment({
        type: 'collection',
        targetId: Number(curationId),
        content: commentText.trim()
      });

      setCommentText("");

      // 댓글 목록 새로고침
      await refetch();
    } catch (err: any) {
      console.error('❌ 댓글 등록 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleItemClick = (item: any) => {
    if (item.type === 'album') {
      navigate(`/albums/${item.id}`);
    } else {
      navigate(`/tracks/${item.id}`);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">컬렉션을 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error || !collection) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">컬렉션</h1>
          <div className="w-8" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-destructive font-medium">{error || '컬렉션을 찾을 수 없습니다'}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/home')}
          >
            홈으로 돌아가기
          </Button>
        </div>
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
        <h1 className="font-semibold">컬렉션</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isLikeLoading}
          className={isLiked ? "text-red-500" : ""}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''} ${isLikeLoading ? 'opacity-50' : ''}`} />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Curation Header */}
        <div className="relative">
          <ImageWithFallback
            src={collection.coverImgUrl}
            alt={collection.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{collection.title}</h1>
            <div className="flex items-center gap-2">
              <div
                role="button"
                tabIndex={0}
                aria-label={`${collection.author.username} 프로필 보기`}
                className="cursor-pointer hover:opacity-80 active:opacity-60 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/users/${collection.author.id}`);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/users/${collection.author.id}`);
                  }
                }}
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src={collection.author.imageUrl} />
                  <AvatarFallback>{collection.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{collection.author.username}</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Description & Tags */}
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{collection.description}</p>
            {collection.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {collection.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {collection.commentCount}
            </div>
            <span className="text-xs">
              {new Date(collection.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>

          <Separator />

          {/* Items List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">수록 목록 ({collection.items.length})</h3>
            <div className="space-y-4">
              {collection.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.type === 'album' ? '앨범' : '트랙'}
                      </Badge>
                    </div>
                    {item.artists && item.artists.length > 0 && (
                      <p className="text-sm text-muted-foreground">{item.artists.join(', ')}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <StarRating rating={item.rating || 0} readonly size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {item.rating ? item.rating.toFixed(1) : '0.0'}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">댓글</h3>
                <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                  {collection.commentCount}
                </span>
              </div>
              {collection.commentCount > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/collections/${curationId}/comments`)}
                  style={{ color: 'var(--primary)' }}
                >
                  전체보기
                </Button>
              )}
            </div>
            {collection.comments.length > 0 ? (
              <div className="space-y-4">
                {collection.comments.slice(0, 3).map((comment) => (
                  <div key={comment.commentId} className="flex gap-3">
                    <Avatar className="w-8 h-8">
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
                      <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCommentLike(comment.commentId);
                        }}
                      >
                        <Heart className={`w-3 h-3 mr-1 ${commentLikeStates[comment.commentId] ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="text-xs">{commentLikeCounts[comment.commentId] ?? comment.likeCount}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  아직 댓글이 없습니다
                </p>
                <p className="text-xs text-muted-foreground/70">
                  이 컬렉션에 첫 댓글을 남겨보세요
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Add Comment */}
          <div className="space-y-3 sticky bottom-0 bg-background pt-4 pb-2 border-t">
            <h3 className="text-lg font-bold">댓글 남기기</h3>
            <div className="space-y-3">
              <Textarea
                placeholder="댓글을 남겨주세요..."
                className="w-full min-h-[100px] resize-none"
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
      </main>
    </div>
  );
}