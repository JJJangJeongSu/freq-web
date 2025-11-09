import { ArrowLeft, Settings, Edit, Camera, Shield, Palette, Volume2, Download, Info, LogOut, FolderOpen, Plus, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../components/theme-provider";
import { useUpdateBio } from "../hooks/useUpdateBio";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import { useUserProfile } from "../hooks/useUserProfile";

interface UserPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function UserPage({ onNavigate }: UserPageProps) {
  const { theme, setTheme } = useTheme();

  // 현재 로그인한 사용자의 ID 가져오기
  const userId = localStorage.getItem('userId') || '';

  // API에서 프로필 데이터 가져오기 (캐싱 적용)
  const { data: apiProfile, isLoading: profileLoading, error: profileError, refetch } = useUserProfile(userId);

  // API Hooks
  const { updateBio, loading: bioLoading, error: bioError } = useUpdateBio();
  const { updateProfileImage, loading: imageLoading, error: imageError } = useUpdateProfileImage();

  // 프로필 편집 모달 상태
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  // 이미지 업로드 상태
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // API 프로필 데이터가 로드되면 editedBio 업데이트
  useEffect(() => {
    if (apiProfile) {
      setEditedBio(apiProfile.bio);
    }
  }, [apiProfile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 유효성 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 파일은 5MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = async () => {
    try {
      setSubmitSuccess(false);

      // 이미지 업데이트
      if (selectedFile) {
        await updateProfileImage(selectedFile);
      }

      // 소개글 업데이트
      if (apiProfile && editedBio !== apiProfile.bio) {
        await updateBio(editedBio);
      }

      // 프로필 데이터 다시 가져오기 (캐시 업데이트)
      await refetch();

      // 성공 처리
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsEditDialogOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      }, 2000);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  // Loading 상태
  if (profileLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">설정</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">프로필을 불러오는 중...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error 상태
  if (profileError || !apiProfile) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">설정</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">프로필을 불러오는데 실패했습니다</p>
            {profileError && <p className="text-sm text-muted-foreground">{profileError.message}</p>}
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              다시 시도
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">설정</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Profile Section */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-5 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src={apiProfile.profileImageUrl} />
              <AvatarFallback className="text-xl">
                {apiProfile.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{apiProfile.username}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{apiProfile.bio}</p>
              <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                프로필 편집
              </Button>
            </div>
          </div>

          <Separator />

          {/* Settings Sections */}
          <div className="space-y-8 mt-8">
            {/* 계정 설정 */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg">계정</h3>
              <div className="space-y-3">

                
                

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors" onClick={() => onNavigate('create-collection')}>
                  <div className="flex items-center gap-4">
                    <Plus className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">새 컬렉션 만들기</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">나만의 음악 컬렉션 제작</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <FolderOpen className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">나의 컬렉션 관리</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">만든 컬렉션 편집 및 삭제</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            

            {/* 앱 설정 */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg">앱 설정</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Palette className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">다크 모드</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">테마 설정</p>
                    </div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* 기타 */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg">기타</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">개인정보 처리방침</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">앱 정보</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">버전 1.0.0</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <LogOut className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">로그아웃</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 프로필 편집 모달 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로필 편집</DialogTitle>
            <DialogDescription>이미지와 소개를 변경할 수 있습니다.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* 프로필 이미지 업로드 */}
                        <div className="space-y-2">
                          <Label>프로필 이미지</Label>
                          <div className="flex justify-center py-4">
                            <div className="relative">
                              <Avatar className="w-32 h-32 border-2 border-border">
                                <AvatarImage src={previewUrl || apiProfile.profileImageUrl} />
                                <AvatarFallback className="text-4xl">
                                  {apiProfile.username.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <Button
                                size="icon"
                                className="absolute bottom-0 right-0 w-9 h-9 rounded-full"
                                variant="secondary"
                                onClick={handleImageClick}
                                disabled={bioLoading || imageLoading}
                              >
                                <Camera className="w-5 h-5" />
                              </Button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                style={{ display: 'none' }}
                              />
                            </div>
                          </div>
                        </div>

            <div className="space-y-2">
              <Label htmlFor="bio">소개</Label>
              <Textarea
                id="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="col-span-3"
                disabled={bioLoading || imageLoading}
              />
            </div>

            {/* 에러 메시지 */}
            {(bioError || imageError) && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">
                  {bioError?.message || imageError?.message}
                </p>
              </div>
            )}

            {/* 성공 메시지 */}
            {submitSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-600">✓ 프로필이 업데이트되었습니다!</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              disabled={bioLoading || imageLoading}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleEditProfile}
              disabled={bioLoading || imageLoading || submitSuccess}
            >
              {bioLoading || imageLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}