import { ArrowLeft, Settings, Edit, Camera, Bell, Shield, Palette, Volume2, Download, Info, LogOut, FolderOpen, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState } from "react";

interface UserPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function UserPage({ onNavigate }: UserPageProps) {
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

  const handleEditProfile = () => {
    setProfileData({
      ...profileData,
      name: editedName,
      bio: editedBio
    });
    setIsEditDialogOpen(false);
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
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-xl">뮤</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full"
                variant="secondary"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>
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
                
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors" onClick={() => onNavigate('rate-record')}>
                  <div className="flex items-center gap-4">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">평가 기록</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">내가 평가한 음악 보기</p>
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

            {/* 알림 설정 */}
            <div className="space-y-5">
              <h3 className="font-semibold text-lg">알림</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">푸시 알림</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">새로운 음악, 업데이트 알림</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
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
            <DialogDescription>이름과 소개를 변경할 수 있습니다.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">소개</Label>
              <Textarea
                id="bio"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button type="button" onClick={handleEditProfile}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}