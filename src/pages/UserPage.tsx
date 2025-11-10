import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Palette, Info, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { useTheme } from "../components/theme-provider";
import { useUserProfile } from "../hooks/useUserProfile";
import { clearAuthToken } from "../api/client";

export function UserPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // 현재 로그인한 사용자의 ID 가져오기
  const userId = localStorage.getItem('userId') || '';

  const handleLogout = () => {
    clearAuthToken();
    localStorage.clear();
    navigate('/auth');
  };

  // API에서 프로필 데이터 가져오기 (캐싱 적용)
  const { data: apiProfile, isLoading: profileLoading, error: profileError, refetch } = useUserProfile(userId);

  // Loading 상태
  if (profileLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate('/home')}>
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
          <Button variant="ghost" size="sm" onClick={() => navigate('/home')}>
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
        <Button variant="ghost" size="sm" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">설정</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-6 py-6">
          {/* Settings Sections */}
          <div className="space-y-8">
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
                
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors" onClick={handleLogout}>
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
    </div>
  );
}