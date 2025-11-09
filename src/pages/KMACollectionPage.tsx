import { ArrowLeft, Award, Calendar, Users, Heart, MessageCircle, Share2, Trophy, Star, Music, Album, Crown, ExternalLink, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MusicCard } from "../components/MusicCard";
import { useNavigate } from "react-router-dom";

export function KMACollectionPage() {
  const navigate = useNavigate();
  // 2024 한국대중음악상 수상작 데이터
  const awardCategories = [
    {
      id: 'album-of-year',
      category: '올해의 앨범',
      winner: {
        id: 'kma-1',
        title: '리버사이드',
        artist: '하현상',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.8,
        description: '감성적인 보컬과 몽환적인 사운드가 돋보이는 작품'
      }
    },
    {
      id: 'song-of-year',
      category: '올해의 노래',
      winner: {
        id: 'kma-2',
        title: 'Love wins all',
        artist: '아이유',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.9,
        description: '사랑에 대한 깊이 있는 메시지를 담은 명곡'
      }
    },
    {
      id: 'best-pop',
      category: '최우수 팝 음반',
      winner: {
        id: 'kma-3',
        title: 'Get Up',
        artist: 'NewJeans',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.7,
        description: 'Y2K 사운드와 모던한 감각의 완벽한 조화'
      }
    },
    {
      id: 'best-rock',
      category: '최우수 록 음반',
      winner: {
        id: 'kma-4',
        title: 'Rock Is Dead?',
        artist: '실리카겔',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.6,
        description: '현대적 록 사운드의 새로운 가능성을 제시'
      }
    },
    {
      id: 'best-rb',
      category: '최우수 R&B 음반',
      winner: {
        id: 'kma-5',
        title: 'Heaven',
        artist: '에일리',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.8,
        description: '탁월한 보컬 실력이 돋보이는 R&B 걸작'
      }
    },
    {
      id: 'best-hiphop',
      category: '최우수 힙합 음반',
      winner: {
        id: 'kma-6',
        title: 'D-2',
        artist: 'Agust D',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.7,
        description: '개인적이면서도 보편적인 이야기를 담은 힙합 앨범'
      }
    }
  ];

  const popularComments = [
    {
      id: '1',
      user: {
        name: '음악평론가김',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '올해 한국대중음악상 선정작들이 정말 다양성과 완성도를 모두 갖췄네요. 특히 하현상의 "리버사이드"는 정말 압도적이었어요.',
      likes: 234,
      timeAgo: '3시간 전'
    },
    {
      id: '2',
      user: {
        name: 'K-POP매니아',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: 'NewJeans의 "Get Up"이 팝 부문에서 수상한 것도 정말 적절한 선택이었다고 생각해요. 국내외 모두에게 사랑받은 앨범이죠.',
      likes: 189,
      timeAgo: '5시간 전'
    }
  ];

  const collectionStats = {
    totalAlbums: 15,
    totalTracks: 147,
    followers: 2849,
    likes: 892,
    comments: 143
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">컬렉션</h1>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkcyUyMGNlcmVtb255JTIwc3RhZ2V8ZW58MXx8fHwxNzU4NzAzMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="2024 한국대중음악상"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                공식 컬렉션
              </Badge>
              <Badge variant="secondary" className="bg-red-500 text-white">
                <Award className="w-3 h-3 mr-1" />
                2024 수상작
              </Badge>
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">
              2024 한국대중음악상 수상작
            </h1>
            <p className="text-white/90 text-sm mb-3">
              올해 한국대중음악상을 수상한 뛰어난 작품들을 만나보세요
            </p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                {collectionStats.totalAlbums}개 앨범
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                2024년
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {collectionStats.followers.toLocaleString()}명 팔로우
              </div>
            </div>
          </div>
        </div>

        {/* Creator & Stats */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar 
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate('/users/korean-music-awards')}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback>한음</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="font-medium cursor-pointer hover:underline"
                    onClick={() => navigate('/users/korean-music-awards')}
                  >
                    한국대중음악상
                  </span>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">공식 계정</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                팔로우
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                공식 사이트
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {collectionStats.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {collectionStats.comments}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              컬렉션 저장
            </div>
          </div>
        </div>

        {/* Award Categories */}
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              수상 부문별 작품
            </h2>
            <Badge variant="outline">{awardCategories.length}개 부문</Badge>
          </div>

          <div className="space-y-4">
            {awardCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <CardTitle className="text-base">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/albums/${category.winner.id}`)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={category.winner.imageUrl}
                        alt={category.winner.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{category.winner.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{category.winner.artist}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{category.winner.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{category.winner.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Comments Section */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              댓글 ({collectionStats.comments})
            </h3>
            <Button variant="outline" size="sm">
              댓글 작성
            </Button>
          </div>

          <div className="space-y-3">
            {popularComments.map((comment) => (
              <Card key={comment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{comment.user.name}</p>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3" />
                        {comment.likes}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            댓글 더보기
          </Button>
        </div>
      </main>
    </div>
  );
}