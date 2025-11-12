import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { UserReviewCard } from "../components/UserReviewCard";
import { useUserReviews } from "../hooks/useUserReviews";

export function UserReviewsPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [currentPage, setCurrentPage] = useState(1);

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
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">작성한 리뷰</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {userReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <MessageCircle className="w-16 h-16 mb-4 text-muted-foreground" />
            <p className="text-lg mb-2">작성한 리뷰가 없습니다</p>
            <p className="text-sm text-muted-foreground">
              아직 작성된 리뷰가 없습니다
            </p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {/* Total Count */}
              <div className="px-2">
                <p className="text-sm text-muted-foreground">
                  총 {totalCount}개의 리뷰
                </p>
              </div>

              {/* Reviews List */}
              {userReviews.map((review) => (
                <UserReviewCard
                  key={review.id}
                  review={review}
                  onClick={() => navigate(`/reviews/${review.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 pb-8">
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
