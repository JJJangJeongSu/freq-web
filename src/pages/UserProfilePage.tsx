import { ArrowLeft, Heart, MessageCircle, Calendar, Star, Users, Music, Album, FolderOpen, Award, Crown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HorizontalMusicSection } from "../components/HorizontalMusicSection";
import { useState } from "react";

interface UserProfilePageProps {
  userId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function UserProfilePage({ userId, onNavigate }: UserProfilePageProps) {
  // 한국대중음악상 특별 프로필 데이터
  const [userProfile] = useState(() => {
    if (userId === 'korean-music-awards') {
      return {
        id: 'korean-music-awards',
        name: '한국대중음악상',
        username: '@kma_official',
        bio: '한국 대중음악의 우수성을 발굴하고 격려하는 한국대중음악상 공식 계정입니다. 매년 뛰어난 음악 작품들을 선정하여 시상하�� 있습니다.',
        avatar: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        coverImage: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isOfficial: true,
        isVerified: true,
        joinDate: '2010-03-15',
        stats: {
          followers: 245000,
          following: 1520,
          collections: 25,
          totalLikes: 89543
        },
        specialBadges: ['공식계정', '한국대중음악상'],
        yearlyAwards: [
          {
            year: 2024,
            totalAwards: 12,
            categories: ['올해의 음반', '올해의 노래', '최우수 팝 음반', '최우수 록 음반', '최우수 일렉트로닉 음반', '최우수 재즈 음반'],
            featured: true
          },
          {
            year: 2023,
            totalAwards: 11,
            categories: ['올해의 음반', '올해의 노래', '최우수 팝 음반', '최우수 록 음반', '최우수 포크 음반'],
            featured: false
          },
          {
            year: 2022,
            totalAwards: 10,
            categories: ['올해의 음반', '올해의 노래', '최우수 팝 음반', '최우수 록 음반'],
            featured: false
          }
        ]
      };
    } else {
      return {
        id: userId,
        name: '음악애호가',
        username: '@musiclover',
        bio: '클래식 록과 재즈를 사랑하는 음악 애호가입니다. 좋은 음악을 발견하고 공유하는 것을 즐깁니다.',
        avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        coverImage: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        isOfficial: false,
        isVerified: false,
        joinDate: '2022-05-20',
        stats: {
          followers: 1250,
          following: 890,
          collections: 8,
          totalLikes: 2340
        },
        specialBadges: [],
        yearlyAwards: []
      };
    }
  });

  const [isFollowing, setIsFollowing] = useState(false);

  // 최근 컬렉션 데이터
  const [recentCollections] = useState(() => {
    if (userId === 'korean-music-awards') {
      return [
        {
          id: 'kma-2024',
          title: '2024 한국대중음악상 수상작',
          description: '올해 한국대중음악상을 수상한 뛰어난 작품들',
          imageUrl: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          likes: 892,
          itemCount: 12,
          type: 'albums'
        },
        {
          id: 'kma-2023',
          title: '2023 한국대중음악상 수상작',
          description: '2023년도 우수한 한국 음악 작품들',
          imageUrl: 'https://images.unsplash.com/photo-1512352036558-e6fb1f0c8340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBtdXNpYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NzAyNjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          likes: 675,
          itemCount: 11,
          type: 'albums'
        }
      ];
    } else {
      return [
        {
          id: '1',
          title: '새벽에 듣는 음악',
          description: '조용한 새벽 시간에 어울리는 차분한 음악들',
          imageUrl: 'https://images.unsplash.com/photo-1559121060-686a11356a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGN1cmF0b3IlMjBlZGl0b3JpYWwlMjBwaWNrc3xlbnwxfHx8fDE3NTg3MDE3ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          likes: 234,
          itemCount: 23,
          type: 'mixed'
        }
      ];
    }
  });

  // 평가한 음악 데이터
  const [recentAlbums] = useState([
    {
      id: '1',
      title: 'Thriller',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8
    }
  ]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">프로필</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Cover Image */}
        <div className="relative h-32">
          <ImageWithFallback
            src={userProfile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Info */}
        <div className="p-4 -mt-8 relative">
          <div className="flex items-end gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-background">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {userProfile.isOfficial && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                {userProfile.isVerified && (
                  <div className={`w-4 h-4 ${userProfile.isOfficial ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{userProfile.username}</p>
            </div>

            {!userProfile.isOfficial && (
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                size="sm"
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </Button>
            )}
          </div>

          {/* Special Badges */}
          {userProfile.specialBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {userProfile.specialBadges.map((badge) => (
                <Badge key={badge} className="bg-yellow-500 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Bio */}
          <p className="text-sm leading-relaxed mb-4">{userProfile.bio}</p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{formatNumber(userProfile.stats.followers)}</div>
              <div className="text-xs text-muted-foreground">팔로워</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{formatNumber(userProfile.stats.following)}</div>
              <div className="text-xs text-muted-foreground">팔로잉</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{userProfile.stats.collections}</div>
              <div className="text-xs text-muted-foreground">컬렉션</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{formatNumber(userProfile.stats.totalLikes)}</div>
              <div className="text-xs text-muted-foreground">총 좋아요</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(userProfile.joinDate).toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long' 
            })}에 가입
          </div>
        </div>

        <Separator />

        {/* 한국대중음악상 전용 - 연도별 수상 내역 */}
        {userProfile.yearlyAwards.length > 0 && (
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              연도별 수상 내역
            </h3>
            
            <div className="space-y-3">
              {userProfile.yearlyAwards.map((award) => (
                <Card key={award.year} className={award.featured ? 'border-yellow-200 bg-yellow-50/50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{award.year}년</h4>
                        {award.featured && (
                          <Badge className="bg-yellow-500 text-white text-xs">
                            최신
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        총 {award.totalAwards}개 부문
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {award.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    {award.featured && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => onNavigate('curation-detail', 'kma-2024')}
                      >
                        수상작 보기
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {userProfile.yearlyAwards.length > 0 && <Separator />}

        {/* 컬렉션 */}
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            컬렉션
          </h3>
          
          <div className="space-y-3">
            {recentCollections.map((collection) => (
              <Card 
                key={collection.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('curation-detail', collection.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={collection.imageUrl}
                      alt={collection.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium line-clamp-1 flex-1">{collection.title}</h4>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {collection.type === 'albums' ? '앨범' : 
                           collection.type === 'tracks' ? '트랙' : '믹스'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{collection.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{collection.itemCount}곡</span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {collection.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 평가한 음악 (일반 사용자만) */}
        {!userProfile.isOfficial && (
          <>
            <Separator />
            <div className="pt-4">
              <HorizontalMusicSection
                title="최근 평가한 앨범"
                items={recentAlbums}
                type="album"
                onItemClick={(id) => onNavigate('album-detail', id)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}