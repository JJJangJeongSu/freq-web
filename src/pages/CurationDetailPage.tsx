import { ArrowLeft, Heart, Share2, MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { StarRating } from "../components/StarRating";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Textarea } from "../components/ui/textarea";
import { useState, useEffect } from "react";
import { useCollectionDetail } from "@/hooks/useCollectionDetail";
import { apiService } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";

interface CurationDetailPageProps {
  curationId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function CurationDetailPage({ curationId, onNavigate }: CurationDetailPageProps) {
  const { toast } = useToast();

  // API 데이터 가져오기
  const { data: collection, loading, error } = useCollectionDetail(curationId);

  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // API 데이터가 로드되면 좋아요 상태 업데이트
  useEffect(() => {
    if (collection) {
      setIsLiked(collection.isLiked || false);
      setLikes(collection.likeCount);
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

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // 댓글 제출 로직 (시뮬레이션)
      console.log("댓글 제출:", commentText);
      setCommentText("");
    }
  };

  const handleItemClick = (item: any) => {
    if (item.type === 'album') {
      onNavigate('album-detail', String(item.id));
    } else {
      onNavigate('track-detail', String(item.id));
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
          <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
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
            onClick={() => onNavigate('home')}
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
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">컬렉션</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLikeLoading}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''} ${isLikeLoading ? 'opacity-50' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{collection.title}</h1>
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={collection.author.imageUrl} />
                <AvatarFallback>{collection.author.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{collection.author.username}</span>
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
            <h3 className="font-semibold">수록 목록 ({collection.items.length})</h3>
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
                      className="w-16 h-16 rounded object-cover"
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
            <h3 className="font-semibold">댓글 ({collection.commentCount})</h3>
            <div className="space-y-4">
              {collection.comments.map((comment) => (
                <div key={comment.commentId} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.profileImageUrl} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{comment.userName}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-xs">{comment.likeCount}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Add Comment */}
          <div className="space-y-3">
            <h3 className="font-semibold">댓글 남기기</h3>
            <div className="flex gap-3 items-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="댓글을 남겨주세요..."
                  className="flex-1 min-h-[80px] resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}