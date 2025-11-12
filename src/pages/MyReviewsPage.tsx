import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart, MessageCircle, MoreVertical, Loader2, Trash2, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useMyReviews } from "../hooks/useMyReviews";
import { useDeleteReview } from "../hooks/useDeleteReview";

export function MyReviewsPage() {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<any | null>(null);

  // API에서 리뷰 목록 가져오기
  const { reviews: myReviews, loading, error, refetch } = useMyReviews();
  const { deleteReview, loading: deleting } = useDeleteReview();

  const handleDeleteClick = (review: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      await deleteReview(String(reviewToDelete.id));
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
      refetch();
      console.log('✅ 리뷰 삭제 성공:', reviewToDelete.id);
    } catch (error: any) {
      console.error('❌ 리뷰 삭제 실패:', error);
    }
  };

  const handleEditClick = (review: any, e: React.MouseEvent) => {
    e.stopPropagation();

    // sessionStorage에 앨범 정보 저장 (WriteReviewPage에서 사용)
    if (review.album) {
      sessionStorage.setItem('review:albumMeta', JSON.stringify({
        id: review.album.id,
        title: review.album.title,
        artist: review.album.artist,
        imageUrl: review.album.imageUrl,
        artistIds: review.album.artistIds || [],
        rating: review.rating
      }));
    }

    // 리뷰 수정 페이지로 이동
    navigate(`/albums/${review.album.id}/write-review/${review.id}`);
    console.log('✅ 리뷰 수정 페이지로 이동:', review.id);
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
                              onClick={(e) => handleEditClick(review, e)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              수정하기
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => handleDeleteClick(review, e)}
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>리뷰를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              {reviewToDelete && (
                <>
                  <span className="font-semibold">{reviewToDelete.album?.title}</span>에 대한 리뷰가 영구적으로 삭제됩니다.
                  <br />
                  이 작업은 되돌릴 수 없습니다.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReviewToDelete(null)} disabled={deleting}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="!bg-red-600 hover:!bg-red-700 !text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  삭제 중...
                </div>
              ) : (
                "삭제"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
