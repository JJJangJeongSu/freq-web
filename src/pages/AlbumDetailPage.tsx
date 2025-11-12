import { ArrowLeft, Star, RefreshCw, Edit3, Heart, Loader2, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../components/ui/button";
import React from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ReviewCard } from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlbumDetail } from "../hooks/useAlbumDetail";
import { useCreateReview } from "../hooks/useCreateReview";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useToggleReviewLike } from "../hooks/useToggleReviewLike";
import { CreateReviewRequestTypeEnum, UpdateReviewRequestTypeEnum } from "../api/models";

export function AlbumDetailPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  // API 데이터 가져오기
  const { data: album, loading, error, refetch } = useAlbumDetail(albumId);
  const { createReview, loading: createLoading, error: createError } = useCreateReview();
  const { updateReview, loading: updateLoading, error: updateError } = useUpdateReview();
  const { user } = useCurrentUser();
  const { toggleLike } = useToggleReviewLike();

  const [userRating, setUserRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackListExpanded, setTrackListExpanded] = useState(false);
  const [reviewId, setReviewId] = useState<string | null>(null); // ⭐ 로컬 reviewId 상태

  // Optimistic UI를 위한 리뷰 로컬 상태
  const [localReviews, setLocalReviews] = useState<any[]>([]);

  // 로딩과 에러를 통합
  const reviewLoading = createLoading || updateLoading;
  const reviewError = createError || updateError;

  // 초기 별점 및 reviewId 설정
  useEffect(() => {
    if (album && typeof (album as any).userRating === 'number') {
      setUserRating((album as any).userRating);
    }
    if (album && (album as any).reviewId) {
      setReviewId((album as any).reviewId);
    }
  }, [album]);

  // 앨범 리뷰 데이터가 로드되면 로컬 상태 초기화
  useEffect(() => {
    if (album && (album as any).reviews) {
      setLocalReviews((album as any).reviews);
    }
  }, [album]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    setSubmitSuccess(false);
  };

  // 새 리뷰 생성 (reviewId 없을 때만)
  const handleSubmitRating = async () => {
    if (!album || userRating === 0 || !albumId) return;

    try {
      // ⭐ 리뷰 생성 - POST
      console.log('✨ Creating new review');

      const result = await createReview({
        rating: userRating,
        type: CreateReviewRequestTypeEnum.Album,
        targetId: albumId,
        artistIds: album.artists.map(a => a.artistId)
      });

      // 생성된 reviewId 저장
      setReviewId(result.reviewId);
      console.log('✅ Review created, reviewId:', result.reviewId);

      setSubmitSuccess(true);
      refetch(); // 앨범 정보 새로고침

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      console.error('❌ Review submission failed:', err);
    }
  };

  // 리뷰 좋아요 토글 핸들러 (인증 체크 + Optimistic UI)
  const handleLikeClick = async (reviewId: number) => {
    // 인증 확인
    if (!user) {
      console.log('🔒 User not authenticated, redirecting to /auth');
      navigate('/auth');
      return;
    }

    // 해당 리뷰 찾기
    const reviewIndex = localReviews.findIndex(r => r.reviewId === reviewId);
    if (reviewIndex === -1) return;

    const review = localReviews[reviewIndex];
    const currentIsLiked = review.isLiked ?? false;
    const currentLikeCount = review.likeCount ?? 0;

    // Optimistic UI: 즉시 로컬 상태 업데이트
    const updatedReviews = [...localReviews];
    updatedReviews[reviewIndex] = {
      ...review,
      isLiked: !currentIsLiked,
      likeCount: currentIsLiked ? currentLikeCount - 1 : currentLikeCount + 1,
    };
    setLocalReviews(updatedReviews);

    // API 호출 (백그라운드)
    const result = await toggleLike(reviewId, currentIsLiked, currentLikeCount);

    // 에러 발생 시 롤백
    if (result.error) {
      console.error('⚠️ Like toggle failed, rolling back');
      const rollbackReviews = [...localReviews];
      rollbackReviews[reviewIndex] = {
        ...review,
        isLiked: currentIsLiked,
        likeCount: currentLikeCount,
      };
      setLocalReviews(rollbackReviews);
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
  const primaryArtistId = album.artists?.[0]?.artistId;

  // 평점 분포 배열 변환 (5성 → 1성 순서, 퍼센트로 변환)
  const calculateRatingPercentages = () => {
    if (!album.ratingDistribution) return [0, 0, 0, 0, 0];

    const dist = album.ratingDistribution;
    // 전체 개수 합계
    const total =
      (dist['0.5'] || 0) + (dist['1.0'] || 0) + (dist['1.5'] || 0) + (dist['2.0'] || 0) +
      (dist['2.5'] || 0) + (dist['3.0'] || 0) + (dist['3.5'] || 0) + (dist['4.0'] || 0) +
      (dist['4.5'] || 0) + (dist['5.0'] || 0);

    if (total === 0) return [0, 0, 0, 0, 0];

    // 각 별점별 개수 합산 (0.5와 정수 합치기)
    const star1Count = (dist['0.5'] || 0) + (dist['1.0'] || 0);
    const star2Count = (dist['1.5'] || 0) + (dist['2.0'] || 0);
    const star3Count = (dist['2.5'] || 0) + (dist['3.0'] || 0);
    const star4Count = (dist['3.5'] || 0) + (dist['4.0'] || 0);
    const star5Count = (dist['4.5'] || 0) + (dist['5.0'] || 0);

    // 퍼센트로 변환 (5성 → 1성 순서)
    return [
      Math.round((star5Count / total) * 100),
      Math.round((star4Count / total) * 100),
      Math.round((star3Count / total) * 100),
      Math.round((star2Count / total) * 100),
      Math.round((star1Count / total) * 100)
    ];
  };

  const ratingDistributionArray = calculateRatingPercentages();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
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
                onClick={() => primaryArtistId && navigate(`/artists/${primaryArtistId}`)}
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
              <p className="text-sm text-muted-foreground mb-4">
                {(album as any).isRated === true
                  ? '이미 평가한 앨범입니다'
                  : '별점을 터치하여 평가할 수 있습니다'}
              </p>
            </div>
            
            <div className="flex justify-center">
              <StarRating
                rating={userRating}
                onRatingChange={handleRatingChange}
                size="lg"
                readonly={(album as any).isRated === true}
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
                {/* 에러 메시지 */}
                {reviewError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{reviewError.message}</p>
                  </div>
                )}

                {/* 성공 메시지 */}
                {submitSuccess && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600">
                      ✓ 평가가 {reviewId ? '수정' : '등록'}되었습니다!
                    </p>
                  </div>
                )}

                {/* 이미 평가한 경우 */}
                {(album as any).isRated === true ? (
                  reviewId ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm font-medium mb-1">이미 리뷰를 작성하셨습니다</p>
                        <p className="text-xs text-muted-foreground">
                          리뷰 수정 페이지에서 평점과 코멘트를 수정할 수 있습니다
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          try {
                            const meta = {
                              id: albumId,
                              title: album.title,
                              artist: album.artists?.map(a => a.name).join(', ') || '',
                              imageUrl: album.imageUrl,
                              artistIds: album.artists?.map(a => a.artistId) || [],
                              rating: userRating,
                            };
                            sessionStorage.setItem('review:albumMeta', JSON.stringify(meta));
                          } catch {}
                          navigate(`/albums/${albumId}/write-review/${reviewId}`);
                        }}
                        className="w-full h-12"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        수정하기
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">
                        리뷰 정보를 불러올 수 없습니다. 페이지를 새로고침해주세요.
                      </p>
                    </div>
                  )
                ) : (
                  /* 새 리뷰 작성 */
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitRating}
                      variant="outline"
                      className="flex-1 h-12"
                      disabled={reviewLoading || submitSuccess}
                    >
                      {createLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        '제출하기'
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        try {
                          const meta = {
                            id: albumId,
                            title: album.title,
                            artist: album.artists?.map(a => a.name).join(', ') || '',
                            imageUrl: album.imageUrl,
                            artistIds: album.artists?.map(a => a.artistId) || [],
                            rating: userRating,
                          };
                          sessionStorage.setItem('review:albumMeta', JSON.stringify(meta));
                        } catch {}
                        navigate(`/albums/${albumId}/write-review`);
                      }}
                      className="flex-1 h-12"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      리뷰 작성하기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Rating Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StarRating rating={album.averageRating} readonly size="md" />
                <span className="text-2xl font-bold">{album.averageRating.toFixed(1)}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">총 {album.ratingCount}개 평가</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              <h3 className="font-semibold">별점 분포</h3>
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
              {album.tracks?.slice(0, trackListExpanded ? undefined : 5).map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => navigate(`/tracks/${track.id}`)}
                >
                  <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.artists.join(', ')}</p>
                  </div>
                  {track.rating != null && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{track.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* 트랙 리스트 하단 전체보기/접기 버튼 */}
            {album.tracks && album.tracks.length > 5 && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setTrackListExpanded(!trackListExpanded)}
                  className="w-full max-w-xs"
                >
                  {trackListExpanded ? (
                    <>
                      접기 <ChevronUp className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      전체보기 ({album.tracks.length}곡) <ChevronDown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  총 {((album as any).reviewCount ?? localReviews.length ?? 0)}개
                </span>
                {((album as any).reviewCount ?? localReviews.length ?? 0) > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/albums/${albumId}/reviews`)}
                    className="text-primary hover:text-primary"
                  >
                    전체보기
                  </Button>
                )}
              </div>
            </div>
            {localReviews && localReviews.length > 0 ? (
              <div className="space-y-3">
                {localReviews.map((review: any) => (
                  <ReviewCard
                    key={review.reviewId}
                    review={{
                      reviewId: review.reviewId,
                      userId: review.userId,
                      username: review.username,
                      userProfileImage: review.userImageUrl,
                      rating: review.rating,
                      content: review.content,
                      likeCount: review.likeCount ?? 0,
                      commentCount: review.commentCount ?? 0,
                      createdAt: review.createdAt,
                      isLiked: review.isLiked
                    }}
                    onReviewClick={(id) => navigate(`/reviews/${id}`)}
                    onUserClick={(id) => navigate(`/users/${id}`)}
                    onLikeClick={handleLikeClick}
                    onReplyClick={(id) => navigate(`/reviews/${id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">아직 리뷰가 없어요</p>
                <p className="text-xs text-muted-foreground mt-2">이 앨범에 대한 첫 리뷰를 작성해보세요!</p>
              </div>
            )}
          </div>

          {/* 관련 컬렉션 */}
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">이 앨범이 포함된 컬렉션</h3>
            {album.collections && album.collections.length > 0 ? (
              <div className="space-y-3">
                {album.collections.map((collection) => (
                  <div
                    key={collection.collectionId}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => navigate(`/collections/${collection.collectionId}`)}
                  >
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                      <ImageWithFallback
                        src={collection.coverImageUrl}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{collection.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{collection.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={collection.author.imageUrl} />
                          <AvatarFallback className="text-xs">{collection.author.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{collection.author.username}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3 h-3" />
                          {collection.likeCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  아직 이 앨범이 포함된 컬렉션이 없습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
