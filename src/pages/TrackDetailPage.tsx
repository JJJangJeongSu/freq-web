import {
  ArrowLeft,
  Heart,
  Share,
  MoreVertical,
  RefreshCw,
  Bug,
  Edit3,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { StarRating } from "../components/StarRating";
import { Progress } from "../components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useState } from "react";

interface TrackDetailPageProps {
  trackId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function TrackDetailPage({
  trackId,
  onNavigate,
}: TrackDetailPageProps) {
  const [track] = useState({
    id: trackId,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    artistId: "artist-2", // 아티스트 ID 추가
    album: "A Night at the Opera",
    albumId: "album-1", // 앨범 ID도 추가
    releaseDate: "1975-10-31",
    duration: "5:55",
    imageUrl:
      "https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    averageRating: 4.9,
    totalReviews: 856,
    ratingDistribution: [1, 2, 8, 25, 64], // 1-5성 비율 (%)
  });

  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleDummyData = () => {
    setUserRating(Math.floor(Math.random() * 5) + 1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleError = () => {
    console.log("에러 시뮬레이션");
  };

  const handleWriteComment = () => {
    console.log("코멘트 작성");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("home")}
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
                  onNavigate("artist-detail", track.artistId)
                }
              >
                {track.artist}
              </p>
              <p
                className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                onClick={() =>
                  onNavigate("album-detail", track.albumId)
                }
              >
                {track.album}
              </p>
              <p className="text-sm text-muted-foreground">
                {track.releaseDate} • {track.duration}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={
                  isLiked ? "text-red-500 border-red-500" : ""
                }
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`}
                />
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4" />
              </Button>
            </div>
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
                <Button className="w-full">제출하기</Button>
              </div>
            )}
          </div>

          {/* Overall Rating */}
          <div className="bg-card rounded-lg p-6 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <StarRating
                  rating={track.averageRating}
                  readonly
                  size="md"
                />
                <span className="text-3xl font-bold">
                  {track.averageRating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                총 {track.totalReviews}개 평가
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              <h3 className="font-semibold">별점 분포</h3>
              {track.ratingDistribution.map(
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
              onNavigate("album-detail", track.albumId)
            }
          >
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={track.imageUrl}
                alt={track.album}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{track.album}</p>
                <p className="text-sm text-muted-foreground">
                  <span
                    className="hover:text-primary cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 div의 클릭 이벤트 중단
                      onNavigate(
                        "artist-detail",
                        track.artistId,
                      );
                    }}
                  >
                    {track.artist}
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
            <div className="space-y-3">
              <div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() =>
                  onNavigate("curation-detail", "3")
                }
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="컬렉션"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">록의 명곡들</h4>
                  <p className="text-sm text-muted-foreground">
                    록 역사상 가장 위대한 명곡들만 모았습니다
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      록마니아
                    </span>
                    <span className="text-xs text-muted-foreground">
                      •
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3 h-3" />
                      567
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() =>
                  onNavigate("curation-detail", "4")
                }
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbXVzaWMlMjB3b3Jrb3V0fGVufDF8fHx8MTc1ODcwMTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="컬렉션"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    카라오케 필수곡
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    노래방에서 부르면 분위기 최고조
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      노래방킹
                    </span>
                    <span className="text-xs text-muted-foreground">
                      •
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart className="w-3 h-3" />
                      423
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Debug Menu */}
      <div className="fixed bottom-20 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Bug className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDummyData}>
              더미 평점
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              새로고침
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleError}>
              <Bug className="w-4 h-4 mr-2" />
              에러
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}