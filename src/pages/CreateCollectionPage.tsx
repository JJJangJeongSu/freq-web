import { ArrowLeft, Camera, Plus, X, Search, Music, Album, Hash, Globe, Lock, Save, ImageIcon, Edit3, MessageSquare, Check, Disc, Upload } from "lucide-react";
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
import { useState, useEffect, useRef } from "react";
import { useSearch, SearchType } from "@/hooks/useSearch";
import { SearchResult, CreateCollectionRequest, CollectionItemInput, CreateCollectionRequestIsPublicEnum } from "@/api/models";
import { apiService } from "@/services/api.service";

interface CreateCollectionPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function CreateCollectionPage({ onNavigate }: CreateCollectionPageProps) {
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'albums' as 'albums' | 'tracks' | 'mixed',
    isPublic: true,
    coverImage: coverOptions[0].url // 기본값으로 첫 번째 이미지 설정
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedMusic, setSelectedMusic] = useState<SearchResult[]>([]);
  const [musicDescriptions, setMusicDescriptions] = useState<Record<string, string>>({});
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  // 검색 관련 state
  const [musicSearchQuery, setMusicSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('album');
  const { data: searchData, loading: searchLoading, error: searchError, search } = useSearch();

  // 저장 상태
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 이미지 업로드 상태
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 검색 타입 변경 시 컬렉션 타입에 맞게 제한
  useEffect(() => {
    if (formData.type === 'albums') {
      setSearchType('album');
    } else if (formData.type === 'tracks') {
      setSearchType('track');
    }
  }, [formData.type]);

  // 검색어 변경 시 디바운스 처리하여 API 호출
  useEffect(() => {
    if (musicSearchQuery.trim().length === 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      search(musicSearchQuery, searchType);
    }, 500); // 500ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [musicSearchQuery, searchType]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddMusic = (music: SearchResult) => {
    if (!selectedMusic.find(item => item.id === music.id)) {
      setSelectedMusic([...selectedMusic, music]);
    }
  };

  const handleRemoveMusic = (musicId: string) => {
    setSelectedMusic(selectedMusic.filter(item => item.id !== musicId));
  };

  const handleEditDescription = (musicId: string) => {
    setEditingDescription(musicId);
    setTempDescription(musicDescriptions[musicId] || '');
  };

  const handleSaveDescription = (musicId: string) => {
    setMusicDescriptions({
      ...musicDescriptions,
      [musicId]: tempDescription
    });
    setEditingDescription(null);
    setTempDescription('');
  };

  const handleCancelEdit = () => {
    setEditingDescription(null);
    setTempDescription('');
  };

  /**
   * 파일 선택 다이얼로그 열기
   */
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  /**
   * 파일 선택 및 업로드
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadError(null);

      // API 호출
      const response = await apiService.utilities.uploadImage(file);

      console.log('✅ 이미지 업로드 성공:', response.data);

      // 업로드된 이미지 URL 설정
      if (response.data.data?.imageUrl) {
        setFormData({
          ...formData,
          coverImage: response.data.data.imageUrl
        });
      }
    } catch (error: any) {
      console.error('❌ 이미지 업로드 실패:', error);

      const errorMessage = error.response?.data?.error?.message
        || error.message
        || '이미지 업로드 중 오류가 발생했습니다.';

      setUploadError(errorMessage);
    } finally {
      setIsUploadingImage(false);
      // input 초기화 (같은 파일을 다시 선택할 수 있도록)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * SearchResult를 CollectionItemInput으로 변환
   */
  const convertToCollectionItem = (music: SearchResult): CollectionItemInput => {
    // type 변환: API 스펙에서는 integer라고 했지만 예시에서는 string 사용
    // 테스트 후 필요시 수정 필요
    const itemType = music.type === 'album' ? 0 : music.type === 'track' ? 1 : 2;

    return {
      type: itemType,
      id: music.id,
      title: music.title,
      description: musicDescriptions[music.id] || undefined,
      coverUrl: music.imageUrl,
      artists: music.artist ? [music.artist] : []
    };
  };

  const handleSave = async () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      alert('컬렉션 제목을 입력해주세요.');
      return;
    }

    if (selectedMusic.length === 0) {
      alert('최소 1개 이상의 음악을 추가해주세요.');
      return;
    }

    if (!formData.coverImage) {
      alert('커버 이미지를 선택해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      // Request body 구성
      const requestBody: CreateCollectionRequest = {
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic
          ? CreateCollectionRequestIsPublicEnum.Public
          : CreateCollectionRequestIsPublicEnum.Private,
        coverImageUrl: formData.coverImage,
        items: selectedMusic.map(convertToCollectionItem),
        tags: tags.length > 0 ? tags : undefined
      };

      // API 호출
      const response = await apiService.collections.createCollection(requestBody);

      console.log('✅ 컬렉션 생성 성공:', response.data);

      // 성공 알림
      alert('컬렉션이 성공적으로 생성되었습니다!');

      // 성공 후 이전 페이지로 이동
      onNavigate('rate-record');
    } catch (error: any) {
      console.error('❌ 컬렉션 생성 실패:', error);

      // 에러 메시지 추출
      const errorMessage = error.response?.data?.error?.message
        || error.message
        || '컬렉션 생성 중 오류가 발생했습니다.';

      setSaveError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // 검색 결과를 단일 배열로 통합
  const searchResults: SearchResult[] = searchData
    ? [...(searchData.albums || []), ...(searchData.tracks || [])]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('rate-record')}
          disabled={isSaving}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">새 컬렉션 만들기</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={!formData.title.trim() || isSaving}
        >
          {isSaving ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Save className="w-4 h-4" />
          )}
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

            {/* 컬렉션 타입 */}
            <div className="space-y-2">
              <Label>컬렉션 타입</Label>
              <Select value={formData.type} onValueChange={(value: 'albums' | 'tracks' | 'mixed') => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="albums">앨범만</SelectItem>
                  <SelectItem value="tracks">트랙만</SelectItem>
                  <SelectItem value="mixed">앨범 + 트랙</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.type === 'albums' && '이 컬렉션에는 앨범만 추가할 수 있습니다'}
                {formData.type === 'tracks' && '이 컬렉션에는 트랙만 추가할 수 있습니다'}
                {formData.type === 'mixed' && '이 컬렉션에는 앨범과 트랙을 모두 추가할 수 있습니다'}
              </p>
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
              커버 이미지 *
            </h3>

            {/* 업로드 에러 메시지 */}
            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{uploadError}</p>
              </div>
            )}

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
                    disabled={isUploadingImage}
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
                  onClick={() => {
                    setFormData({...formData, coverImage: option.url});
                    setUploadError(null); // 프리셋 선택 시 에러 초기화
                  }}
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

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              variant="outline"
              className="w-full"
              onClick={handleOpenFileDialog}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  직접 업로드
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              JPEG, PNG, GIF 형식 지원 (최대 10MB)
            </p>
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

            {/* 검색 타입 토글 (mixed 타입일 때만 표시) */}
            {formData.type === 'mixed' && (
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <Label className="text-xs text-muted-foreground">검색 타입:</Label>
                <div className="flex gap-1">
                  <Button
                    variant={searchType === 'album' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSearchType('album')}
                    className="h-7 px-3 text-xs"
                  >
                    <Album className="w-3 h-3 mr-1" />
                    앨범
                  </Button>
                  <Button
                    variant={searchType === 'track' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSearchType('track')}
                    className="h-7 px-3 text-xs"
                  >
                    <Disc className="w-3 h-3 mr-1" />
                    트랙
                  </Button>
                </div>
              </div>
            )}

            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="음악을 검색하세요 (영어, 띄어쓰기 없이)"
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
                            onClick={() => handleEditDescription(music.id)}
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
                            {musicDescriptions[music.id] ? (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {musicDescriptions[music.id]}
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

              {/* 로딩 상태 */}
              {searchLoading && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  <div className="animate-pulse">검색 중...</div>
                </div>
              )}

              {/* 에러 상태 */}
              {searchError && !searchLoading && (
                <div className="text-sm text-red-500 text-center py-4 bg-red-50 rounded-lg">
                  {searchError.message}
                </div>
              )}

              {/* 검색 결과 */}
              {!searchLoading && !searchError && searchResults.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((music) => (
                    <div key={music.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                      <ImageWithFallback
                        src={music.imageUrl}
                        alt={music.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{music.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{music.artist || 'Unknown Artist'}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {music.type === 'album' ? '앨범' : music.type === 'track' ? '트랙' : '아티스트'}
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
              )}

              {/* 빈 상태 */}
              {!searchLoading && !searchError && musicSearchQuery && searchResults.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  검색 결과가 없습니다
                </p>
              )}

              {!musicSearchQuery && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  음악을 검색해보세요 (영어, 띄어쓰기 없이)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 저장 버튼 */}
        <Card>
          <CardContent className="p-4 space-y-3">
            {/* 에러 메시지 */}
            {saveError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{saveError}</p>
              </div>
            )}

            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  컬렉션 저장
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {formData.isPublic ? '공개 컬렉션으로 저장됩니다' : '비공개 컬렉션으로 저장됩니다'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}