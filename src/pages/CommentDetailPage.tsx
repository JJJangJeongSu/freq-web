import { ArrowLeft, Heart, Reply, Send, MoreVertical } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { StarRating } from "../components/StarRating";
import { Textarea } from "../components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function CommentDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const commentId = reviewId; // Using reviewId as commentId for backwards compatibility
  const [comment] = useState({
    id: commentId,
    user: {
      name: '음악애호가',
      avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    rating: 5,
    comment: '역사상 최고의 팝 앨범 중 하나입니다. 마이클 잭슨의 보컬과 프로덕션이 완벽하게 조화를 이룹니다.',
    date: '2024-01-15',
    likes: 23,
    isLiked: false,
    album: {
      id: 'album-1',
      title: 'Thriller',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  });

  const [replies] = useState([
    {
      id: '1',
      user: {
        name: '팝러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '정말 공감합니다! 특히 빌리 진은 들을 때마다 소름이 돋아요.',
      date: '2024-01-16',
      likes: 5,
      isLiked: false
    },
    {
      id: '2',
      user: {
        name: '음악평론가',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '동의합니다. 퀸시 존스의 프로듀싱도 이 앨범의 성공에 큰 역할을 했다고 생각해요.',
      date: '2024-01-17',
      likes: 8,
      isLiked: true
    },
    {
      id: '3',
      user: {
        name: '빈티지러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '80년대 음악의 정점이라고 할 수 있죠. 지금 들어도 전혀 촌스럽지 않아요.',
      date: '2024-01-18',
      likes: 3,
      isLiked: false
    }
  ]);

  const [replyText, setReplyText] = useState('');
  const [isCommentLiked, setIsCommentLiked] = useState(comment.isLiked);
  const [commentLikes, setCommentLikes] = useState(comment.likes);

  const handleLikeComment = () => {
    setIsCommentLiked(!isCommentLiked);
    setCommentLikes(prev => isCommentLiked ? prev - 1 : prev + 1);
  };

  const handleLikeReply = (replyId: string) => {
    console.log('댓글 좋아요:', replyId);
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      console.log('댓글 제출:', replyText);
      setReplyText('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">코멘트</h1>
        <div className="w-8" /> {/* 균형을 위한 빈 공간 */}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Album Info */}
          <div
            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
            onClick={() => navigate(`/albums/${comment.album?.id}`)}
          >
            <img
              src={comment.album?.imageUrl}
              alt={comment.album?.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <p className="font-medium">{comment.album?.title}</p>
              <p className="text-sm text-muted-foreground">{comment.album?.artist}</p>
            </div>
          </div>

          {/* Original Comment */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium">{comment.user.name}</p>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <div className="mb-3">
                  <StarRating rating={comment.rating} readonly size="sm" />
                </div>
                <p className="text-sm leading-relaxed mb-4">{comment.comment}</p>
                
                {/* Comment Actions */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={handleLikeComment}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${isCommentLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm">{commentLikes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    <span className="text-sm">{replies.length}</span>
                  </Button>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>신고하기</DropdownMenuItem>
                  <DropdownMenuItem>공유하기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator />

          {/* Reply Input */}
          <div className="space-y-3">
            <h3 className="font-medium">댓글 {replies.length}개</h3>
            <div className="space-y-3">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="댓글을 작성해보세요..."
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Replies */}
          <div className="space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={reply.user.avatar} />
                  <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{reply.user.name}</p>
                    <span className="text-xs text-muted-foreground">{reply.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2">{reply.content}</p>
                  
                  {/* Reply Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground"
                      onClick={() => handleLikeReply(reply.id)}
                    >
                      <Heart className={`w-3 h-3 mr-1 ${reply.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-xs">{reply.likes}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      <span className="text-xs">답글</span>
                    </Button>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>신고하기</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}