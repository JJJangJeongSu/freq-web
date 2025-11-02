import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Separator } from "../components/ui/separator";

interface WriteReviewPageProps {
  albumId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function WriteReviewPage({ albumId, onNavigate }: WriteReviewPageProps) {
  // TODO: 실제로는 albumId를 사용하여 앨범 정보를 가져와야 함
  const [album] = useState({
    id: albumId,
    title: 'Thriller',
    artist: 'Michael Jackson',
    imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  });

  const [rating, setRating] = useState(4); // 앨범 상세 페이지에서 선택한 별점이 전달됨
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (rating > 0 && reviewText.trim()) {
      console.log('리뷰 제출:', {
        albumId,
        rating,
        reviewText
      });
      // TODO: 리뷰 등록 API 호출
      // 성공 후 앨범 상세 페이지로 돌아가기
      onNavigate('album-detail', albumId);
    }
  };

  const canSubmit = rating > 0 && reviewText.trim().length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('album-detail', albumId)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">리뷰 작성</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">
          {/* Album Info */}
          <div className="flex flex-col items-center space-y-4">
            <ImageWithFallback
              src={album.imageUrl}
              alt={album.title}
              className="w-40 h-40 rounded-lg object-cover shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">{album.title}</h2>
              <p className="text-muted-foreground">{album.artist}</p>
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
                onRatingChange={setRating}
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

          {/* Review Text */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">리뷰</h3>
              <p className="text-sm text-muted-foreground mb-4">
                이 앨범에 대한 당신의 생각을 자유롭게 작성해주세요
              </p>
            </div>

            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="앨범에 대한 리뷰를 작성해주세요..."
              className="min-h-[200px] resize-none"
            />

            <div className="text-sm text-muted-foreground text-right">
              {reviewText.length}자
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-12"
        >
          <Send className="w-4 h-4 mr-2" />
          리뷰 제출하기
        </Button>
      </div>
    </div>
  );
}
