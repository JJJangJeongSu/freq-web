import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ReviewCard } from "../components/ReviewCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ArrowLeft, SlidersHorizontal, Loader2, RefreshCw, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useAlbumReviews } from "../hooks/useAlbumReviews";

export function AllReviewsPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"recent" | "popularity" | "old">("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // API 데이터 가져오기
  const { data, loading, error, refetch } = useAlbumReviews({
    targetId: albumId!,
    sortBy,
    page: currentPage,
    limit: 20
  });

  const reviews = data?.reviews || [];
  const pagination = data?.pagination;

  // 로딩 상태
  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error && currentPage === 1) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
          <p className="font-semibold text-destructive">리뷰를 불러올 수 없습니다</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 앨범 정보 (첫 번째 리뷰에서 가져오기)
  const albumInfo = reviews[0]?.album;

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">모든 리뷰</h1>
                {albumInfo && (
                  <p className="text-xs text-muted-foreground">
                    {albumInfo.title} - {albumInfo.artists?.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {sortBy === "recent" ? "최신순" : sortBy === "popularity" ? "인기순" : "오래된순"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setSortBy("recent"); setCurrentPage(1); }}>
                  최신순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("popularity"); setCurrentPage(1); }}>
                  인기순
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSortBy("old"); setCurrentPage(1); }}>
                  오래된순
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-8 pb-8">
        {/* Results Count */}
        {pagination && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              총 {pagination.totalItems}개의 리뷰
            </p>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <ReviewCard
                key={review.reviewId}
                review={{
                  reviewId: review.reviewId,
                  userId: review.userId,
                  username: review.username,
                  userProfileImage: review.userProfileImage,
                  rating: review.rating,
                  content: review.content,
                  likeCount: review.likeCount ?? 0,
                  commentCount: review.commentCount ?? 0,
                  createdAt: review.createdAt,
                  isLiked: review.isLiked
                }}
                onReviewClick={(reviewId) => navigate(`/reviews/${reviewId}`)}
                onUserClick={(userId) => navigate(`/users/${userId}`)}
                onLikeClick={(reviewId) => {
                  console.log('Like review:', reviewId);
                  // TODO: Implement like functionality
                }}
                onReplyClick={(reviewId) => {
                  console.log('Reply to review:', reviewId);
                  // Navigate to review detail for replying
                  navigate(`/reviews/${reviewId}`);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MessageCircle className="h-16 w-16 mb-6" style={{ color: 'var(--outline)' }} />
            <p className="text-xl font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
              리뷰가 없습니다
            </p>
            <p className="text-base" style={{ color: 'var(--on-surface-variant)' }}>
              이 앨범에 대한 첫 리뷰를 작성해보세요!
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrevious || loading}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                let pageNumber;
                if (pagination.totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNumber = pagination.totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNumber)}
                    disabled={loading}
                    className="rounded-full w-10 h-10"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={!pagination.hasNext || loading}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
