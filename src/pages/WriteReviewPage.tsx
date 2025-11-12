import { useEffect, useState } from "react";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Separator } from "../components/ui/separator";
import { useCreateReview } from "../hooks/useCreateReview";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { useReviewDetail } from "../hooks/useReviewDetail";
import { CreateReviewRequestTypeEnum, UpdateReviewRequestTypeEnum } from "../api/models";

export function WriteReviewPage() {
  const { albumId, reviewId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!reviewId;

  const { createReview, loading: creating, error: createError } = useCreateReview();
  const { updateReview, loading: updating, error: updateError } = useUpdateReview();
  const { data: existingReview, loading: loadingReview, error: loadError } = useReviewDetail(reviewId);

  const loading = creating || updating;
  const error = createError || updateError || loadError;

  // 앨범 메타데이터: 앨범 상세에서 세션 스토리지로 전달됨
  const [album, setAlbum] = useState<{
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    artistIds: string[];
    rating: number;
  }>({
    id: albumId || '',
    title: '',
    artist: '',
    imageUrl: '',
    artistIds: [],
    rating: 0
  });

  // 앨범 메타데이터 로드 (작성 모드 + 수정 모드 공통)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('review:albumMeta');
      if (raw) {
        const meta = JSON.parse(raw);
        if (meta && meta.id === albumId) {
          setAlbum({
            id: meta.id,
            title: meta.title || '',
            artist: meta.artist || '',
            imageUrl: meta.imageUrl || '',
            artistIds: meta.artistIds || [],
            rating: meta.rating || 0
          });
          // 작성 모드일 때만 전달받은 별점으로 초기화
          if (!isEditMode && meta.rating > 0) {
            setRating(meta.rating);
          }
        }
      }
    } catch {}
  }, [albumId, isEditMode]);

  // 기존 리뷰 데이터 로드 (수정 모드)
  useEffect(() => {
    if (isEditMode && existingReview) {
      setRating(existingReview.rating || 0);
      setTitle(existingReview.title || '');
      setReviewText(existingReview.content || '');

      // 앨범 정보도 리뷰 데이터에서 가져오기
      if (existingReview.album) {
        setAlbum({
          id: existingReview.album.albumId || albumId || '',
          title: existingReview.album.title || '',
          artist: existingReview.album.artists?.join(', ') || '',
          imageUrl: existingReview.album.imageUrl || '',
          artistIds: existingReview.album.artistIds || [],
          rating: existingReview.rating || 0
        });
      }
    }
  }, [isEditMode, existingReview, albumId]);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !reviewText.trim()) {
      return;
    }

    try {
      if (isEditMode && reviewId) {
        // 수정 모드: updateReview 호출
        // ⚠️ PATCH /reviews/{itemId} - itemId는 앨범 ID
        if (!albumId) return;

        const result = await updateReview(albumId, {
          rating,
          title: title.trim() || undefined,
          content: reviewText.trim(),
          type: UpdateReviewRequestTypeEnum.Album
        });

        console.log('✅ 리뷰 수정 성공:', result);
      } else {
        // 작성 모드: createReview 호출
        if (!albumId) return;

        const result = await createReview({
          rating,
          title: title.trim() || undefined,
          content: reviewText.trim(),
          type: CreateReviewRequestTypeEnum.Album,
          targetId: albumId,
          artistIds: album.artistIds
        });

        console.log('✅ 리뷰 작성 성공:', result);
      }

      setSubmitSuccess(true);

      // 성공 메시지 표시 후 앨범 상세 페이지로 이동
      setTimeout(() => {
        navigate(`/albums/${albumId}`, { replace: true });
      }, 1500);
    } catch (err) {
      console.error(`❌ 리뷰 ${isEditMode ? '수정' : '작성'} 실패:`, err);
      // 에러는 hook에서 처리됨
    }
  };

  const canSubmit = rating > 0 && reviewText.trim().length > 0 && !loading && !submitSuccess;

  // 로딩 중일 때
  if (isEditMode && loadingReview) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">리뷰를 불러오는 중...</p>
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
        <h1 className="text-lg font-semibold">{isEditMode ? '리뷰 수정' : '리뷰 작성'}</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">
          {/* Album Info */}
          <div className="flex flex-col items-center space-y-4">
            <ImageWithFallback
              src={album.imageUrl || 'https://placehold.co/300x300?text=Album'}
              alt={album.title}
              className="w-40 h-40 rounded-lg object-cover shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">{album.title || '앨범 제목'}</h2>
              <p className="text-muted-foreground">{album.artist || '아티스트'}</p>
            </div>
          </div>

          <Separator />

          {/* Rating Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">별점</h3>
              <p className="text-sm text-muted-foreground mb-4">
                별을 터치하여 평점을 수정할 수 있습니다
              </p>
            </div>

            <div className="flex justify-center">
              <StarRating
                rating={rating}
                onRatingChange={loading || submitSuccess ? undefined : setRating}
                readonly={loading || submitSuccess}
                size="lg"
              />
            </div>

            {rating > 0 && (
              <div className="text-center">
                <p className="font-medium text-primary">
                  ⭐ {rating}점
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Review Title (Optional) */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                리뷰 제목 <span className="text-sm text-muted-foreground font-normal">(선택)</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                리뷰를 요약할 수 있는 짧은 제목을 작성해주세요
              </p>
            </div>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 올해 최고의 앨범!"
              maxLength={100}
              disabled={loading || submitSuccess}
            />

            <div className="text-sm text-muted-foreground text-right">
              {title.length}/100자
            </div>
          </div>

          <Separator />

          {/* Review Text */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">리뷰 내용</h3>
              <p className="text-sm text-muted-foreground mb-4">
                이 앨범에 대한 당신의 생각을 자유롭게 작성해주세요
              </p>
            </div>

            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="앨범에 대한 리뷰를 작성해주세요..."
              className="min-h-[200px] resize-none"
              maxLength={2000}
              disabled={loading || submitSuccess}
            />

            <div className="text-sm text-muted-foreground text-right">
              {reviewText.length}/2000자
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">{error.message}</p>
            </div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                ✓ 리뷰가 성공적으로 {isEditMode ? '수정' : '등록'}되었습니다!
              </p>
              <p className="text-xs text-green-600/80 mt-1">잠시 후 앨범 페이지로 이동합니다...</p>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isEditMode ? '수정 중...' : '제출 중...'}
            </>
          ) : submitSuccess ? (
            <>
              ✓ {isEditMode ? '수정 완료' : '제출 완료'}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {isEditMode ? '리뷰 수정하기' : '리뷰 제출하기'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
