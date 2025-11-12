import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Loader2, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { UserReviewCard } from "../components/UserReviewCard";
import { useUserReviews } from "../hooks/useUserReviews";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function UserReviewsPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"recent" | "popularity" | "old">("recent");

  // API에서 리뷰 목록 가져오기
  const {
    reviews: userReviews,
    loading,
    error,
    hasMore,
    totalCount,
    refetch
  } = useUserReviews({
    userId: userId || '',
    sortBy,
    page: currentPage,
    limit: 20
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(totalCount / 20);

  // Loading 상태
  if (loading && currentPage === 1) {
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
  if (error && currentPage === 1) {
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
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
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
              <h1 className="text-xl font-bold">작성한 리뷰</h1>
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

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-8 pb-8">
        {/* Results Count */}
        {totalCount > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              총 {totalCount}개의 리뷰
            </p>
          </div>
        )}

        {userReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MessageCircle className="h-16 w-16 mb-6 text-muted-foreground" />
            <p className="text-xl font-semibold mb-2">
              리뷰가 없습니다
            </p>
            <p className="text-base text-muted-foreground">
              아직 작성된 리뷰가 없습니다
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">

              {/* Reviews List */}
              {userReviews.map((review) => (
                <UserReviewCard
                  key={review.reviewId}
                  review={review}
                  onClick={() => navigate(`/reviews/${review.reviewId}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || loading}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
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
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || loading}
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
