import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Heart, MessageCircle, MoreVertical } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Separator } from "../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export function MyReviewsPage() {
  const navigate = useNavigate();
  // 내가 작성한 리뷰 목록 (실제로는 API에서 가져와야 함)
  const [myReviews] = useState([
    {
      id: '1',
      album: {
        id: 'album-1',
        title: 'Thriller',
        artist: 'Michael Jackson',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      rating: 5,
      content: '역사상 최고의 팝 앨범 중 하나입니다. 마이클 잭슨의 보컬과 프로덕션이 완벽하게 조화를 이룹니다.',
      createdAt: '2024-01-15',
      likes: 23,
      comments: 5,
      isLiked: false
    },
    {
      id: '2',
      album: {
        id: 'album-2',
        title: 'Abbey Road',
        artist: 'The Beatles',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      rating: 5,
      content: '비틀즈의 최고 걸작. Come Together부터 The End까지 완벽한 흐름을 보여줍니다.',
      createdAt: '2024-01-10',
      likes: 18,
      comments: 3,
      isLiked: true
    },
    {
      id: '3',
      album: {
        id: 'album-3',
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      rating: 5,
      content: '프로그레시브 록의 정점. Time과 Money는 지금 들어도 혁신적입니다.',
      createdAt: '2024-01-05',
      likes: 31,
      comments: 7,
      isLiked: false
    },
    {
      id: '4',
      album: {
        id: 'album-4',
        title: 'Kind of Blue',
        artist: 'Miles Davis',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      rating: 5,
      content: '재즈 입문자에게 강력 추천. 마일스 데이비스의 트럼펫 연주가 정말 아름답습니다.',
      createdAt: '2023-12-28',
      likes: 15,
      comments: 2,
      isLiked: true
    },
    {
      id: '5',
      album: {
        id: 'album-5',
        title: 'Rumours',
        artist: 'Fleetwood Mac',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      rating: 4,
      content: 'Dreams와 Go Your Own Way는 명곡입니다. 70년대 록의 정수를 보여주는 앨범.',
      createdAt: '2023-12-20',
      likes: 12,
      comments: 1,
      isLiked: false
    }
  ]);

  const handleDeleteReview = (reviewId: string) => {
    console.log('리뷰 삭제:', reviewId);
    // TODO: 리뷰 삭제 API 호출
  };

  const handleEditReview = (reviewId: string) => {
    console.log('리뷰 수정:', reviewId);
    // TODO: 리뷰 수정 페이지로 이동
  };

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
                            <Heart className={`w-4 h-4 ${review.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditReview(review.id);
                              }}
                            >
                              수정하기
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReview(review.id);
                              }}
                              className="text-destructive"
                            >
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
    </div>
  );
}
