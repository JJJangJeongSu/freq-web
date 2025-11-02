import { ArrowLeft, Camera, Plus, X, Search, Music, Album, Hash, Globe, Lock, Save, ImageIcon, Edit3, MessageSquare, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

interface CreateCollectionPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function CreateCollectionPage({ onNavigate }: CreateCollectionPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'mixed' as 'albums' | 'tracks' | 'mixed',
    isPublic: true,
    coverImage: ''
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedMusic, setSelectedMusic] = useState<any[]>([]);
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  // 커버 이미지 옵션
  const coverOptions = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1672847900914-3fbd4fa39037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY292ZXIlMjBpbWFnZXxlbnwxfHx8fDE3NTg3MDI4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '바이올렛 그라데이션'
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1724052177913-6c181f3abf29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG11c2ljJTIwYWxidW0lMjBjb3ZlcnxlbnwxfHx8fDE3NTg3MDI4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '추상적 패턴'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1736176421274-546a4eaf57d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwZ3JhZGllbnQlMjBtdXNpY3xlbnwxfHx8fDE3NTg3MDI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '무지개 그라데이션'
    }
  ];

  // 추천 음악 데이터 (검색 결과)
  const [searchResults] = useState([
    {
      id: '1',
      title: 'Thriller',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'album' as const
    },
    {
      id: '2',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      imageUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwbXVzaWMlMjB2aW55bHxlbnwxfHx8fDE3NTg2ODUwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      type: 'track' as const
    }
  ]);

  const [musicSearchQuery, setMusicSearchQuery] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddMusic = (music: any) => {
    if (!selectedMusic.find(item => item.id === music.id)) {
      setSelectedMusic([...selectedMusic, { ...music, description: '' }]);
    }
  };

  const handleRemoveMusic = (musicId: string) => {
    setSelectedMusic(selectedMusic.filter(item => item.id !== musicId));
  };

  const handleEditDescription = (musicId: string, description: string) => {
    setEditingDescription(musicId);
    setTempDescription(description);
  };

  const handleSaveDescription = (musicId: string) => {
    setSelectedMusic(selectedMusic.map(item => 
      item.id === musicId ? { ...item, description: tempDescription } : item
    ));
    setEditingDescription(null);
    setTempDescription('');
  };

  const handleCancelEdit = () => {
    setEditingDescription(null);
    setTempDescription('');
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('컬렉션 제목을 입력해주세요.');
      return;
    }
    
    // 저장 로직
    console.log('컬렉션 저장:', {
      ...formData,
      tags,
      selectedMusic
    });
    
    // 성공 후 이전 페이지로 이동
    onNavigate('rate-record');
  };

  const filteredSearchResults = searchResults.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(musicSearchQuery.toLowerCase()) ||
                         item.artist.toLowerCase().includes(musicSearchQuery.toLowerCase());
    const matchesType = formData.type === 'mixed' || 
                       (formData.type === 'albums' && item.type === 'album') ||
                       (formData.type === 'tracks' && item.type === 'track');
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('rate-record')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">새 컬렉션 만들기</h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSave}
          disabled={!formData.title.trim()}
        >
          <Save className="w-4 h-4" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 기본 정보 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">기본 정보</h3>
            
            {/* 제목 */}
            <div className="space-y-2">
              <Label htmlFor="title">컬렉션 제목 *</Label>
              <Input
                id="title"
                placeholder="컬렉션 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">{formData.title.length}/50</p>
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="이 컬렉션에 대해 설명해주세요"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                maxLength={200}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">{formData.description.length}/200</p>
            </div>

            {/* 공개 설정 */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>공개 설정</Label>
                <p className="text-sm text-muted-foreground">다른 사람들이 이 컬렉션을 볼 수 있습니다</p>
              </div>
              <div className="flex items-center gap-2">
                {formData.isPublic ? <Globe className="w-4 h-4 text-green-500" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 커버 이미지 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              커버 이미지
            </h3>
            
            {/* 현재 선택된 이미지 */}
            {formData.coverImage && (
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <ImageWithFallback
                    src={formData.coverImage}
                    alt="커버 이미지"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    onClick={() => setFormData({...formData, coverImage: ''})}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* 이미지 옵션 */}
            <div className="grid grid-cols-3 gap-3">
              {coverOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                    formData.coverImage === option.url ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setFormData({...formData, coverImage: option.url})}
                >
                  <ImageWithFallback
                    src={option.url}
                    alt={option.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs text-center">{option.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              직접 업로드
            </Button>
          </CardContent>
        </Card>

        {/* 태그 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Hash className="w-4 h-4" />
              태그 (최대 5개)
            </h3>
            
            {/* 태그 입력 */}
            <div className="flex gap-2">
              <Input
                placeholder="태그 입력 후 추가 버튼을 누르세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                maxLength={20}
              />
              <Button 
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= 5}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* 태그 목록 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    #{tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-4 h-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 음악 추가 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">음악 추가</h3>
            
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="음악을 검색하세요"
                value={musicSearchQuery}
                onChange={(e) => setMusicSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 선택된 음악 */}
            {selectedMusic.length > 0 && (
              <div className="space-y-2">
                <Label>선택된 음악 ({selectedMusic.length})</Label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedMusic.map((music) => (
                    <div key={music.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={music.imageUrl}
                          alt={music.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{music.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{music.artist}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {music.type === 'album' ? '앨범' : '트랙'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDescription(music.id, music.description || '')}
                            className="w-7 h-7 p-0"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMusic(music.id)}
                            className="w-7 h-7 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* 설명 표시/편집 */}
                      {editingDescription === music.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="이 곡에 대한 설명을 추가해보세요..."
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            className="text-xs resize-none"
                            rows={2}
                            maxLength={200}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {tempDescription.length}/200
                            </span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="h-6 px-2 text-xs"
                              >
                                취소
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleSaveDescription(music.id)}
                                className="h-6 px-2 text-xs"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                저장
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            {music.description ? (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {music.description}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">
                                설명이 없습니다. 편집 버튼을 클릭해서 설명을 추가해보세요.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 검색 결과 */}
            <div className="space-y-2">
              <Label>검색 결과</Label>
              {filteredSearchResults.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredSearchResults.map((music) => (
                    <div key={music.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                      <ImageWithFallback
                        src={music.imageUrl}
                        alt={music.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{music.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{music.artist}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {music.type === 'album' ? '앨범' : '트랙'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddMusic(music)}
                        disabled={selectedMusic.find(item => item.id === music.id) !== undefined}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {musicSearchQuery ? '검색 결과가 없습니다' : '음악을 검색해보세요'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 저장 버튼 */}
        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={handleSave}
              disabled={!formData.title.trim()}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              컬렉션 저장
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {formData.isPublic ? '공개 컬렉션으로 저장됩니다' : '비공개 컬렉션으로 저장됩니다'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}