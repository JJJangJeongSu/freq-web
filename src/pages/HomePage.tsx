import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LogOut, Music, Search, Heart, MessageCircle, Clock, Star, Sparkles, TrendingUp, Plus } from "lucide-react";
import { Input } from "../components/ui/input";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
  onLogout?: () => void;
}

export function HomePage({ onNavigate, onLogout }: HomePageProps) {


  // 컬렉션 데이터  
  const collections = [
    {
      id: '1',
      title: '새벽에 듣는 음악',
      description: '조용한 새벽 시간에 어울리는 차분한 음악들',
      type: 'mixed' as const, // 앨범과 트랙 모두 포함
      creator: {
        name: '음악평론가',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isVerified: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1559121060-686a11356a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGN1cmF0b3IlMjBlZGl0b3JpYWwlMjBwaWNrc3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['#새벽', '#감성', '#차분함'],
      stats: { likes: 234, comments: 45 }
    },
    {
      id: '2', 
      title: '운동할 때 추천',
      description: '운동할 때 들으면 좋은 신나는 음악들',
      type: 'tracks' as const, // 트랙만 포함
      creator: {
        name: '피트니스러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isVerified: false
      },
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbXVzaWMlMjB3b3Jrb3V0fGVufDF8fHx8MTc1ODcwMTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['#운동', '#에너지', '#업비트'],
      stats: { likes: 189, comments: 32 }
    },
    {
      id: '3',
      title: '재즈 입문자를 위한',
      description: '재즈를 처음 듣는 분들에게 추천하는 곡들',
      type: 'albums' as const, // 앨범만 포함
      creator: {
        name: '재즈마니아',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isVerified: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbXVzaWMlMjBpbnN0cnVtZW50c3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['#재즈', '#입문', '#클래식'],
      stats: { likes: 156, comments: 28 }
    },
    {
      id: 'kma-2024',
      title: '2024 한국대중음악상 수상작',
      description: '올해 한국대중음악상을 수상한 뛰어난 작품들을 만나보세요',
      type: 'albums' as const,
      creator: {
        name: '한국대중음악상',
        avatar: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isVerified: true,
        isOfficial: true
      },
      imageUrl: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['#한국대중음악상', '#2024', '#수상작'],
      stats: { likes: 892, comments: 143 }
    }
  ];

  // 인기 댓글
  const popularComments = [
    {
      id: '1',
      user: {
        name: '음악애호가',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '역사상 최고의 팝 앨범 중 하나입니다. 마이클 잭슨의 보컬과 프로덕션이 완벽하게 조화를 이룹니다.',
      album: {
        title: 'Thriller',
        artist: 'Michael Jackson',
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      likes: 127,
      rating: 5
    },
    {
      id: '2', 
      user: {
        name: '록러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '이 앨범 없이는 모던 록을 논할 수 없죠. 특히 Money와 Time은 지금 들어도 혁신적입니다.',
      album: {
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      likes: 89,
      rating: 5
    }
  ];

  // 최근 댓글
  const recentComments = [
    {
      id: '3',
      user: {
        name: '새벽러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8fDE3NTg3MDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: 'Bon Iver의 목소리는 정말 마법 같아요. 새벽에 들으면 마음이 정화되는 느낌...',
      album: {
        title: 'Bon Iver',
        artist: 'Bon Iver',
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      timeAgo: '방금 전',
      rating: 5
    },
    {
      id: '4',
      user: {
        name: '재즈맨',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '처음 들었을 때의 충격을 잊을 수 없네요. 마일스 데이비스의 트펫이 이렇게 아름다울 줄이야.',
      album: {
        title: 'Kind of Blue',
        artist: 'Miles Davis',
        id: '5',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      timeAgo: '5분 전',
      rating: 5
    },
    {
      id: '5',
      user: {
        name: '팝러버',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      content: '40년이 지난 지금도 빌리 진과 스릴러는 여전히 최고예요. 시대를 초월한 명곡들.',
      album: {
        title: 'Thriller',
        artist: 'Michael Jackson',
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      timeAgo: '12분 전',
      rating: 4
    }
  ];





  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Minimal White Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
            <Music className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="text-title-large" style={{ color: 'var(--on-surface)' }}>뮤직레이트</h1>
        </div>
        <div className="flex items-center gap-2">
          {onLogout && (
            <Button variant="ghost" size="sm" onClick={onLogout} className="w-10 h-10 p-0 rounded-full">
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="space-y-8">
          {/* Hero Section with Primary Actions */}
          <div className="px-4 md:px-6 pt-8 space-y-6">
            {/* Main Search - Minimal Border Style */}
            <div 
              className="w-full h-16 rounded-xl flex items-center px-6 cursor-pointer transition-all border"
              style={{ 
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--outline)'
              }}
              onClick={() => onNavigate('search')}
            >
              <Search className="w-6 h-6 mr-4" style={{ color: 'var(--on-surface-variant)' }} />
              <span className="text-body-large" style={{ color: 'var(--on-surface-variant)' }}>
                요즘 듣는 음악을 찾아보세요
              </span>
            </div>
            
            {/* Material 3 Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 h-14 rounded-xl state-layer-hover"
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'var(--on-primary)' 
                }}
                onClick={() => onNavigate('rate-record')}
              >
                <Star className="w-5 h-5 mr-3" />
                <span className="text-label-large">평가하기</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-xl border-2 state-layer-hover"
                style={{ 
                  borderColor: 'var(--outline)',
                  backgroundColor: 'transparent',
                  color: 'var(--primary)' 
                }}
                onClick={() => onNavigate('create-collection')}
              >
                <Plus className="w-5 h-5 mr-3" />
                <span className="text-label-large">컬렉션 만들기</span>
              </Button>
            </div>
          </div>


          {/* Material 3 컬렉션 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>추천 컬렉션</h2>
              <div className="flex items-center gap-2 md:gap-3">
                <Button 
                  variant="outline"
                  size="sm"
                  className="h-10 px-3 md:px-4 rounded-full border-2 state-layer-hover"
                  style={{ 
                    borderColor: 'var(--outline)',
                    color: 'var(--primary)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => onNavigate('create-collection')}
                >
                  <Plus className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="text-label-large">만들기</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-10 px-3 md:px-4 rounded-full state-layer-hover"
                  style={{ color: 'var(--primary)' }}
                  onClick={() => onNavigate('all-collections')}
                >
                  <span className="text-label-large">전체보기</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-3 md:gap-6 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-80 lg:w-96 cursor-pointer transition-all rounded-xl overflow-hidden border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                  onClick={() => collection.id === 'kma-2024' ? onNavigate('kma-collection') : onNavigate('curation-detail', collection.id)}
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={collection.imageUrl}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex flex-wrap gap-2">
                        {collection.tags.slice(0, 2).map((tag) => (
                          <div
                            key={tag}
                            className="px-3 py-1 rounded-full text-label-small"
                            style={{
                              backgroundColor: 'var(--surface-container)',
                              color: 'var(--on-surface)'
                            }}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    {/* 제목과 타입 */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-title-medium line-clamp-1 flex-1" style={{ color: 'var(--on-surface)' }}>
                        {collection.title}
                      </h3>
                      <div
                        className="ml-3 px-2 py-1 rounded-md text-label-small flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--secondary-container)',
                          color: 'var(--on-secondary-container)'
                        }}
                      >
                        {collection.type === 'albums' ? '앨범' : 
                         collection.type === 'tracks' ? '트랙' : '믹스'}
                      </div>
                    </div>
                    
                    {/* 설명 */}
                    <p className="text-body-medium line-clamp-2 mb-4" style={{ color: 'var(--on-surface-variant)' }}>
                      {collection.description}
                    </p>
                    
                    {/* 크리에이터 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar 
                          className="w-6 h-6 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (collection.creator.isOfficial) {
                              onNavigate('user-profile', 'korean-music-awards');
                            } else {
                              onNavigate('user-profile', 'user-1');
                            }
                          }}
                        >
                          <AvatarImage src={collection.creator.avatar} />
                          <AvatarFallback className="text-label-small">{collection.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span 
                          className="text-label-medium cursor-pointer hover:underline"
                          style={{ color: 'var(--on-surface-variant)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (collection.creator.isOfficial) {
                              onNavigate('user-profile', 'korean-music-awards');
                            } else {
                              onNavigate('user-profile', 'user-1');
                            }
                          }}
                        >
                          {collection.creator.name}
                        </span>
                        {collection.creator.isVerified && (
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: collection.creator.isOfficial ? '#FFD700' : 'var(--primary)' 
                            }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 통계 */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
                          {collection.stats.likes}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                        <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
                          {collection.stats.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material 3 인기 댓글 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>
                인기 댓글
              </h2>
            </div>
            <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {popularComments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] lg:w-[550px] cursor-pointer transition-all rounded-2xl p-4 border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                  onClick={() => onNavigate('comment-detail', comment.id)}
                >
                  {/* 상단: 프로필 & 별점 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback className="text-label-large">{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                        {comment.user.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < comment.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 하단: 좌측(앨범 커버 + 정보) + 우측(댓글 내용 + 좋아요/댓글) */}
                  <div className="flex gap-3">
                    {/* 좌측: 앨범 커버 + 정보 */}
                    <div 
                      className="flex flex-col gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('album-detail', comment.album.id);
                      }}
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={comment.album.imageUrl}
                          alt={comment.album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center w-24">
                        <div className="text-body-medium truncate" style={{ color: 'var(--on-surface)' }}>
                          {comment.album.title}
                        </div>
                        <div className="text-body-small truncate" style={{ color: 'var(--on-surface-variant)' }}>
                          {comment.album.artist}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 댓글 내용 + 좋아요/댓글 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-body-medium leading-relaxed" style={{ color: 'var(--on-surface)' }}>
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2 justify-end">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                            {Math.floor(Math.random() * 20) + 3}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material 3 최근 댓글 섹션 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4 md:px-6">
              <h2 className="text-headline-small" style={{ color: 'var(--on-surface)' }}>
                최근 댓글
              </h2>
            </div>
            <div className="flex gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide">
              {recentComments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex-shrink-0 w-[90vw] sm:w-[75vw] md:w-[500px] lg:w-[550px] cursor-pointer transition-all rounded-2xl p-4 border hover:shadow-md"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
                  onClick={() => onNavigate('comment-detail', comment.id)}
                >
                  {/* 상단: 프로필 & 별점 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback className="text-label-large">{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-title-medium" style={{ color: 'var(--on-surface)' }}>
                          {comment.user.name}
                        </p>
                        <span className="text-label-small" style={{ color: 'var(--on-surface-variant)' }}>
                          {comment.timeAgo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < comment.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 하단: 좌측(앨범 커버 + 정보) + 우측(댓글 내용 + 좋아요/댓글) */}
                  <div className="flex gap-3">
                    {/* 좌측: 앨범 커버 + 정보 */}
                    <div 
                      className="flex flex-col gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('album-detail', comment.album.id);
                      }}
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                        <ImageWithFallback
                          src={comment.album.imageUrl}
                          alt={comment.album.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center w-24">
                        <div className="text-body-medium truncate" style={{ color: 'var(--on-surface)' }}>
                          {comment.album.title}
                        </div>
                        <div className="text-body-small truncate" style={{ color: 'var(--on-surface-variant)' }}>
                          {comment.album.artist}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 댓글 내용 + 좋아요/댓글 */}
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-body-medium leading-relaxed" style={{ color: 'var(--on-surface)' }}>
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                            {Math.floor(Math.random() * 50) + 10}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                          <span className="text-body-small" style={{ color: 'var(--on-surface-variant)' }}>
                            {Math.floor(Math.random() * 20) + 3}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </main>
    </div>
  );
}