import { ArrowLeft, Star, RefreshCw, Edit3, Heart, Loader2, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import React from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlbumDetail } from "../hooks/useAlbumDetail";
import { useCreateReview } from "../hooks/useCreateReview";
import { CreateReviewRequestTypeEnum } from "../api/models";

export function AlbumDetailPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  // API 데이터 가져오기
  const { data: album, loading, error } = useAlbumDetail(albumId);
  const { createReview, loading: reviewLoading, error: reviewError } = useCreateReview();

  const [userRating, setUserRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 이미 평가한 경우 서버 제공 사용자 평점으로 초기화
  useEffect(() => {
    if (album && (album as any).isRated && typeof (album as any).userRating === 'number') {
      const initial = (album as any).userRating as number;
      if (initial > 0) {
        setUserRating(initial);
      }
    }
  }, [album]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    setSubmitSuccess(false);
  };

  const handleSubmitRating = async () => {
    if (!album || userRating === 0) return;

    try {
      await createReview({
        rating: userRating,
        type: CreateReviewRequestTypeEnum.Album,
        targetId: albumId,
        artistIds: album.artists.map(a => a.artistId)
      });

      setSubmitSuccess(true);
      // 3초 후 성공 메시지 숨기기
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      // 에러는 useCreateReview에서 처리됨
      console.error('Review submission failed:', err);
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
                {/* 에러 메시지 */}
                {reviewError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{reviewError.message}</p>
                  </div>
                )}

                {/* 성공 메시지 */}
                {submitSuccess && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600">✓ 평가가 등록되었습니다!</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitRating}
                    variant="outline"
                    className="flex-1 h-12"
                    disabled={reviewLoading || submitSuccess}
                  >
                    {reviewLoading ? (
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
                        };
                        sessionStorage.setItem('review:albumMeta', JSON.stringify(meta));
                      } catch {}
                      navigate(`/albums/${albumId}/review`);
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

          {/* Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰</h3>
              <span className="text-sm text-muted-foreground">총 {('reviewCount' in album ? (album as any).reviewCount : (album as any).reviews?.length || 0)}개</span>
            </div>
            {('reviews' in album && (album as any).reviews && (album as any).reviews.length > 0) ? (
              <div className="space-y-3">
                {(album as any).reviews.map((review: any) => (
                  <div key={review.reviewId} className="flex gap-3 p-3 rounded-lg border border-border/50">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userProfileImage} />
                      <AvatarFallback>{(review.username || '?').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{review.username}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{Number(review.rating).toFixed(1)}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                      </div>
                      {review.content && (
                        <p className="text-sm line-clamp-2">{review.content}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{review.likeCount ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{review.commentCount ?? 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">아직 리뷰가 없어요</p>
              </div>
            )}
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
