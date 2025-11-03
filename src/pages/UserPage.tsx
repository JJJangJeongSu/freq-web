import { ArrowLeft, Settings, Edit, Camera, Shield, Palette, Volume2, Download, Info, LogOut, FolderOpen, Plus, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState, useRef } from "react";
import { useUpdateBio } from "../hooks/useUpdateBio";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";

interface UserPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function UserPage({ onNavigate }: UserPageProps) {
  // API Hooks
  const { updateBio, loading: bioLoading, error: bioError } = useUpdateBio();
  const { updateProfileImage, loading: imageLoading, error: imageError } = useUpdateProfileImage();

  // 프로필 상태
  const [profileData, setProfileData] = useState({
    name: '뮤직러버',
    bio: '클래식 록과 재즈를 사랑하는 음악 애호가입니다.',
    avatar: 'https://images.unsplash.com/photo-1707944789575-3a4735380a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFydGlzdCUyMHBlcmZvcm1lciUyMHN0YWdlfGVufDF8fHx8MTc1ODcwMDE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  // 프로필 편집 모달 상태
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(profileData.name);
  const [editedBio, setEditedBio] = useState(profileData.bio);

  // 이미지 업로드 상태
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
        const result = await updateProfileImage(selectedFile);
        setProfileData(prev => ({
          ...prev,
          avatar: result.imageUrl
        }));
      }

      // 소개글 업데이트
      if (editedBio !== profileData.bio) {
        await updateBio(editedBio);
        setProfileData(prev => ({
          ...prev,
          bio: editedBio
        }));
      }

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
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="text-xl">뮤</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{profileData.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{profileData.bio}</p>
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
                <div 
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => {
                    setEditedName(profileData.name);
                    setEditedBio(profileData.bio);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Edit className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">프로필 편집</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">이름, 소개 변경</p>
                    </div>
                  </div>
                </div>
                
                

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
                  <Switch />
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
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={previewUrl || profileData.avatar} />
                    <AvatarFallback className="text-xl">뮤</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full"
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
                  />
                </div>
              </div>
              {selectedFile && (
                <p className="text-xs text-center text-muted-foreground">
                  선택된 파일: {selectedFile.name}
                </p>
              )}
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