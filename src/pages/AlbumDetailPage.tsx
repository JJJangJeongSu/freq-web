import { ArrowLeft, Star, MessageCircle, MoreVertical, RefreshCw, Bug, Plus, Edit3, Heart, Reply, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import { useAlbumDetail } from "../hooks/useAlbumDetail";
import { Loader2 } from "lucide-react";

interface AlbumDetailPageProps {
  albumId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function AlbumDetailPage({ albumId, onNavigate }: AlbumDetailPageProps) {
  // API 데이터 가져오기
  const { data: album, loading, error } = useAlbumDetail(albumId);

  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    setShowCommentInput(true);
  };

  const handleDummyData = () => {
    setUserRating(Math.floor(Math.random() * 5) + 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleError = () => {
    console.log('에러 시뮬레이션');
  };

  const handleAddReview = () => {
    console.log('리뷰 작성');
  };

  const handleWriteComment = () => {
    setShowCommentInput(true);
  };

  const handleLikeReview = (reviewId: string) => {
    console.log('리뷰 좋아요:', reviewId);
  };

  const handleReplyReview = (reviewId: string) => {
    console.log('리뷰 댓글:', reviewId);
  };

  const handleCommentClick = (reviewId: string) => {
    onNavigate('comment-detail', reviewId);
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('코멘트 제출:', commentText);
      setCommentText('');
    }
  };

  // Loading 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">앨범 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error 상태
  if (error || !album) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-4">
          <p className="text-destructive font-semibold">앨범 정보를 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error?.message || '알 수 없는 오류가 발생했습니다'}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 아티스트 정보 변환
  const artistNames = album.artists?.map(a => a.name).join(', ') || '알 수 없는 아티스트';
  const primaryArtistId = album.artists?.[0]?.id;

  // 평점 분포 배열 변환 (5성 → 1성 순서)
  const ratingDistributionArray = album.ratingDistribution
    ? [
        album.ratingDistribution.star5 || 0,
        album.ratingDistribution.star4 || 0,
        album.ratingDistribution.star3 || 0,
        album.ratingDistribution.star2 || 0,
        album.ratingDistribution.star1 || 0
      ]
    : [0, 0, 0, 0, 0];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-6 space-y-6">
          {/* Album Info */}
          <div className="flex gap-4">
            <ImageWithFallback
              src={album.imageUrl}
              alt={album.title}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold">{album.title}</h1>
              <p
                className="text-lg text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={() => primaryArtistId && onNavigate('artist-detail', primaryArtistId)}
              >
                {artistNames}
              </p>
              <p className="text-sm text-muted-foreground">{album.releaseDate}</p>
              {album.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{album.description}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Primary Action - Rating Section */}
          <div className="bg-accent/30 rounded-xl p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">이 앨범을 평가해보세요</h3>
              <p className="text-sm text-muted-foreground mb-4">별점을 터치하여 평가할 수 있습니다</p>
            </div>
            
            <div className="flex justify-center">
              <StarRating
                rating={userRating}
                onRatingChange={handleRatingChange}
                size="lg"
              />
            </div>
            
            {userRating > 0 && (
              <div className="text-center">
                <p className="text-base font-medium text-primary">
                  ⭐ {userRating}점으로 평가하셨습니다
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            {userRating > 0 && (
              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      console.log('별점만 제출:', userRating);
                      // TODO: 별점만 등록하는 API 호출
                    }}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    제출하기
                  </Button>
                  <Button 
                    onClick={() => {
                      onNavigate('write-review', albumId);
                    }}
                    className="flex-1 h-12"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    리뷰 작성하기
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Rating Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StarRating rating={album.averageRating} readonly size="md" />
                <span className="text-2xl font-bold">{album.averageRating}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">총 {album.ratingCount}개 리뷰</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              <h3 className="font-semibold">별점 분��</h3>
              {ratingDistributionArray.map((percentage, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm w-2">{5 - index}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Progress value={percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Track List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">수록곡</h3>
            <div className="space-y-2">
              {album.tracks?.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => onNavigate('track-detail', track.id)}
                >
                  <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{track.title}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰</h3>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.user.avatar} />
                      <AvatarFallback className="text-foreground bg-muted">{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{review.user.name}</p>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="mb-2">
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      <p 
                        className="text-sm leading-relaxed text-foreground mb-3 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleCommentClick(review.id)}
                      >
                        {review.comment}
                      </p>
                      
                      {/* 액션 버튼들 */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-foreground"
                          onClick={() => handleLikeReview(review.id)}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${review.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="text-xs">{review.likes}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-muted-foreground hover:text-foreground"
                          onClick={() => handleReplyReview(review.id)}
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          <span className="text-xs">{review.replies}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 관련 컬렉션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">이 앨범이 포함된 컬렉션</h3>
            <div className="space-y-3">
              <div 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => onNavigate('curation-detail', '1')}
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1559121060-686a11356a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGN1cmF0b3IlMjBlZGl0b3JpYWwlMjBwaWNrc3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="컬렉션"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">80년대 팝의 정수</h4>
                  <p className="text-sm text-muted-foreground">80년대를 대표하는 팝 명반들을 모았습니다</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                      <AvatarFallback className="text-xs">음</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">음악평론가</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3 h-3" />
                      345
                    </div>
                  </div>
                </div>
              </div>
              
              <div 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => onNavigate('curation-detail', '2')}
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="컬렉션"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">댄스 플로어 명반</h4>
                  <p className="text-sm text-muted-foreground">춤추고 싶어지는 클래식 앨범들</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                      <AvatarFallback className="text-xs">댄</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">댄스러버</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3 h-3" />
                      278
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Debug Menu */}
      <div className="fixed bottom-20 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Bug className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDummyData}>
              <Plus className="w-4 h-4 mr-2" />
              더미 데이터
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              새로고침
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleError}>
              <Bug className="w-4 h-4 mr-2" />
              에러
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddReview}>
              <MessageCircle className="w-4 h-4 mr-2" />
              댓글 작성
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}