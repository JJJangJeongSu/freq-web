import { ArrowLeft, Heart, Share2, MessageCircle, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { StarRating } from "../components/StarRating";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

interface CurationDetailPageProps {
  curationId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function CurationDetailPage({ curationId, onNavigate }: CurationDetailPageProps) {
  const [curation] = useState({
    id: curationId,
    title: "새벽에 듣는 음악",
    description: "조용한 새벽 시간에 어울리는 차분한 음악들을 모았습니다. 하루를 조용히 시작하거나 깊은 밤 사색에 잠길 때 완벽한 선택입니다.",
    creator: {
      name: "음악평론가",
      avatar: "https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isVerified: true
    },
    coverImage: "https://images.unsplash.com/photo-1559121060-686a11356a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGN1cmF0b3IlMjBlZGl0b3JpYWwlMjBwaWNrc3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["#새벽", "#감성", "#차분함", "#사색"],
    stats: {
      likes: 234,
      saves: 89,
      comments: 45
    },
    createdAt: "2024-01-15",
    isLiked: false,
    isSaved: false
  });

  const [items] = useState([
    {
      id: '1',
      type: 'album' as const,
      title: 'Bon Iver',
      artist: 'Bon Iver',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      explanation: '저스틴 버논의 허스키한 목소리와 미니멀한 편곡이 새벽의 고요함과 완벽하게 어울립니다. 특히 "Skinny Love"는 마음 깊은 곳의 감정을 건드리는 명곡입니다.'
    },
    {
      id: '2',
      type: 'track' as const,
      title: 'Mad World',
      artist: 'Gary Jules',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      explanation: 'Tears for Fears의 원곡을 완전히 새롭게 해석한 이 버전은 깊은 우울함과 아름다움을 동시에 담고 있습니다. 새벽의 적막함에 완벽하게 어울리는 곡입니다.'
    },
    {
      id: '3',
      type: 'album' as const,
      title: 'In a Silent Way',
      artist: 'Miles Davis',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      explanation: '마일스 데이비스의 전기 시대 초기 작품으로, 조용하면서도 혁신적인 사운드가 특징입니다. 새벽의 고요함 속에서 재즈의 깊이를 느낄 수 있는 걸작입니다.'
    },
    {
      id: '4',
      type: 'track' as const,
      title: 'The Night We Met',
      artist: 'Lord Huron',
      imageUrl: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.6,
      explanation: '그리움과 후회가 담긴 가사와 멜로디가 새벽의 감성과 완벽하게 맞아떨어집니다. 혼자만의 시간에 깊은 생각에 잠길 때 듣기 좋은 곡입니다.'
    }
  ]);

  const [comments] = useState([
    {
      id: '1',
      user: {
        name: '새벽러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '정말 완벽한 큐레이션이네요! 특히 Bon Iver는 새벽에 들으면 정말 마음이 평온해져요. 감사합니다.',
      date: '2024-01-20',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      user: {
        name: '감성플레이어',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: 'Mad World 이 버전 정말 좋죠. 원곡과는 완전히 다른 느낌인데 더 감동적인 것 같아요.',
      date: '2024-01-19',
      likes: 8,
      isLiked: true
    }
  ]);

  const [isLiked, setIsLiked] = useState(curation.isLiked);
  const [likes, setLikes] = useState(curation.stats.likes);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // 댓글 제출 로직 (시뮬레이션)
      console.log("댓글 제출:", commentText);
      setCommentText("");
    }
  };

  const handleItemClick = (item: typeof items[0]) => {
    if (item.type === 'album') {
      onNavigate('album-detail', item.id);
    } else {
      onNavigate('track-detail', item.id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">컬렉션</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Curation Header */}
        <div className="relative">
          <ImageWithFallback
            src={curation.coverImage}
            alt={curation.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{curation.title}</h1>
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={curation.creator.avatar} />
                <AvatarFallback>{curation.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{curation.creator.name}</span>
              {curation.creator.isVerified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Description & Tags */}
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{curation.description}</p>
            <div className="flex flex-wrap gap-2">
              {curation.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {curation.stats.comments}
            </div>
            <span className="text-xs">
              {curation.createdAt}
            </span>
          </div>

          <Separator />

          {/* Items List */}
          <div className="space-y-4">
            <h3 className="font-semibold">수록 목록 ({items.length})</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.type === 'album' ? '앨범' : '트랙'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={item.rating} readonly size="sm" />
                      <span className="text-xs text-muted-foreground">{item.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="font-semibold">댓글 ({comments.length})</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{comment.user.name}</p>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Add Comment */}
          <div className="space-y-3">
            <h3 className="font-semibold">댓글 남기기</h3>
            <div className="flex gap-3 items-start">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="댓글을 남겨주세요..."
                  className="flex-1 min-h-[80px] resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}