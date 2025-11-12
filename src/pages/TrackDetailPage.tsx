import {
  ArrowLeft,
  Heart,
  RefreshCw,
  Star,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import React from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Progress } from "../components/ui/progress";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrackDetail } from "../hooks/useTrackDetail";
import { useCreateReview } from "../hooks/useCreateReview";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { CreateReviewRequestTypeEnum, UpdateReviewRequestTypeEnum } from "../api/models";

export function TrackDetailPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  // API 데이터 가져오기
  const { data: track, loading, error, refetch } = useTrackDetail(trackId);
  const { createReview, loading: createLoading, error: createError } = useCreateReview();
  const { updateReview, loading: updateLoading, error: updateError } = useUpdateReview();

  const [userRating, setUserRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviewId, setReviewId] = useState<string | null>(null); // ⭐ 로컬 reviewId 상태

  // 로딩과 에러를 통합
  const reviewLoading = createLoading || updateLoading;
  const reviewError = createError || updateError;

  // 초기 별점 및 reviewId 설정
  useEffect(() => {
    console.log('🔍 Track data loaded:', {
      hasTrack: !!track,
      userRating: track?.userRating,
      reviewId: track?.reviewId,
      fullTrack: track
    });

    if (track?.userRating) {
      setUserRating(track.userRating);
    }
    if (track?.reviewId) {
      setReviewId(track.reviewId);
      console.log('✅ reviewId set from server:', track.reviewId);
    } else {
      console.log('⚠️ No reviewId in server response');
    }
  }, [track?.userRating, track?.reviewId]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    setSubmitSuccess(false);
  };

  const handleSubmitRating = async () => {
    if (!track || userRating === 0) return;

    console.log('🚀 Submit rating triggered:', {
      reviewId,
      userRating,
      trackUserRating: track.userRating,
      willUpdate: !!reviewId,
      willCreate: !reviewId
    });

    try {
      if (reviewId) {
        // ⭐ 리뷰 수정 - PATCH
        console.log('📝 Updating review:', reviewId);

        await updateReview(reviewId, {
          rating: userRating,
          type: UpdateReviewRequestTypeEnum.Track
        });

        console.log('✅ Review updated');
      } else {
        // ⭐ 리뷰 생성 - POST
        console.log('✨ Creating new review');

        const result = await createReview({
          rating: userRating,
          type: CreateReviewRequestTypeEnum.Track,
          targetId: trackId,
          artistIds: track.artists.map(a => a.id)
        });

        // 생성된 reviewId 저장
        setReviewId(result.reviewId);
        console.log('✅ Review created, reviewId:', result.reviewId);
      }

      setSubmitSuccess(true);

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      console.error('❌ Review submission failed:', err);
    }
  };

  

  const handleWriteComment = () => {
    console.log("코멘트 작성");
  };

  // Loading 상태
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">트랙 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error 상태
  if (error || !track) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center space-y-4">
          <p className="text-destructive font-semibold">트랙 정보를 불러올 수 없습니다</p>
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
  const artistNames = track.artists?.map(a => a.name).join(', ') || '알 수 없는 아티스트';
  const primaryArtistId = track.artists?.[0]?.id;

  // 평점 분포 배열 변환 (5성 → 1성 순서, 퍼센트로 변환)
  const calculateRatingPercentages = () => {
    if (!track.rating?.distribution) return [0, 0, 0, 0, 0];

    const dist = track.rating.distribution;
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

  const ratingDistribution = calculateRatingPercentages();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">트랙 상세</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="p-6 space-y-8">
          {/* Track Info */}
          <div className="text-center space-y-4">
            <ImageWithFallback
              src={track.imageUrl}
              alt={track.title}
              className="w-60 h-60 mx-auto rounded-lg object-cover shadow-lg"
            />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                {track.title}
              </h1>
              <p
                className="text-lg text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={() =>
                  primaryArtistId && navigate(`/artists/${primaryArtistId}`)
                }
              >
                {artistNames}
              </p>
              <p
                className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={() =>
                  navigate(`/albums/${track.album.id}`)
                }
              >
                {track.album.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {track.releaseDate}
              </p>
            </div>

          {/* Action Buttons 제거: 좋아요/공유 삭제 */}
          </div>

          {/* User Rating */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">
              이 트랙을 평가해보세요
            </h3>
            <div className="flex justify-center">
              <StarRating
                rating={userRating}
                onRatingChange={handleRatingChange}
                size="lg"
              />
            </div>
            {userRating > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {userRating}점으로 평가하셨습니다
                </p>

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

                <Button
                  className="w-full"
                  onClick={handleSubmitRating}
                  disabled={reviewLoading || submitSuccess || track?.userRating === userRating}
                >
                  {reviewLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {reviewId ? '수정 중...' : '제출 중...'}
                    </>
                  ) : track?.userRating === userRating ? (
                    '기존 평점과 동일합니다'
                  ) : reviewId ? (
                    '평가 수정하기'
                  ) : (
                    '제출하기'
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Overall Rating */}
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <StarRating
                  rating={track.rating.averageRating}
                  readonly
                  size="md"
                />
                <span className="text-3xl font-bold">
                  {track.rating.averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                총 {track.rating.totalParticipants}개 평가
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              <h3 className="font-semibold">별점 분포</h3>
              {ratingDistribution.map(
                (percentage, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm w-2">
                      {5 - index}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Progress
                      value={percentage}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {percentage}%
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Album Link */}
          <div
            className="bg-card rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() =>
              navigate(`/albums/${track.album.id}`)
            }
          >
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={track.album.imageUrl}
                alt={track.album.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{track.album.title}</p>
                <p className="text-sm text-muted-foreground">
                  <span
                    className="hover:text-primary cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 div의 클릭 이벤트 중단
                      primaryArtistId && navigate(
                        `/artists/${primaryArtistId}`
                      );
                    }}
                  >
                    {artistNames}
                  </span>
                  의 앨범
                </p>
              </div>
              <Button variant="ghost" size="sm">
                보기
              </Button>
            </div>
          </div>

          {/* 관련 컬렉션 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              이 트랙이 포함된 컬렉션
            </h3>
            {track.collections && track.collections.length > 0 ? (
              <div className="space-y-3">
                {track.collections.map((collection) => (
                  <div
                    key={collection.collectionId}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() =>
                      navigate(`/collections/${collection.collectionId}`)
                    }
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
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {collection.author.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          •
                        </span>
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
                  아직 이 트랙이 포함된 컬렉션이 없습니다
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      
    </div>
  );
}