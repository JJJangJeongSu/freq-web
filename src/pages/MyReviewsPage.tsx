import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart, MessageCircle, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useMyReviews } from "../hooks/useMyReviews";

export function MyReviewsPage() {
  const navigate = useNavigate();

  // API에서 리뷰 목록 가져오기
  const { reviews: myReviews, loading, error, refetch } = useMyReviews();

  const handleDeleteReview = (reviewId: string) => {
    console.log('리뷰 삭제:', reviewId);
    // TODO: 리뷰 삭제 API 호출
  };

  const handleEditReview = (reviewId: string) => {
    console.log('리뷰 수정:', reviewId);
    // TODO: 리뷰 수정 페이지로 이동
  };

  // Loading 상태
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">작성한 리뷰</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">리뷰를 불러오는 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error 상태
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">작성한 리뷰</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">리뷰를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
            <Button variant="outline" onClick={refetch}>
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
        <h1 className="text-lg font-semibold">작성한 리뷰</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {myReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <MessageCircle className="w-16 h-16 mb-4 text-muted-foreground" />
            <p className="text-lg mb-2">작성한 리뷰가 없습니다</p>
            <p className="text-sm text-muted-foreground mb-4">
              앨범을 평가하고 리뷰를 작성해보세요
            </p>
            <Button onClick={() => navigate('/search')}>
              음악 찾아보기
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Total Count */}
            <div className="px-2">
              <p className="text-sm text-muted-foreground">
                총 {myReviews.length}개의 리뷰
              </p>
            </div>

            {/* Reviews List */}
            {myReviews.map((review) => (
              <Card
                key={review.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/reviews/${review.id}`)}
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
                      <p className="text-sm line-clamp-2">
                        {review.content}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{review.createdAt}</span>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{review.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{review.comments}</span>
                          </div>
                        </div>

                        {/* More Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditReview(review.id);
                              }}
                            >
                              수정하기
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReview(review.id);
                              }}
                              className="text-destructive"
                            >
                              삭제하기
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
