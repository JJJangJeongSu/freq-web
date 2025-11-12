import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Palette, Info, LogOut, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { useTheme } from "../components/theme-provider";
import { useUserProfile } from "../hooks/useUserProfile";
import { clearAuthToken } from "../api/client";
import { userCache } from "../utils/userCache";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { sendFeedback } from "../services/feedback";
import { useToast } from "../hooks/use-toast";

export function UserPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 현재 로그인한 사용자의 ID 가져오기
  const userId = localStorage.getItem('userId') || '';

  const handleLogout = () => {
    clearAuthToken();
    userCache.clear();
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
                <div className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors" onClick={() => navigate('/privacy-policy')}>
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
            <Separator />

            {/* Feedback - 개선된 디자인 */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6 shadow-sm">
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl -z-10" />

              <div className="space-y-4">
                {/* 헤더 */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">피드백 보내기</h3>
                    <p className="text-sm text-muted-foreground">앱에 대한 의견을 들려주세요</p>
                  </div>
                </div>

                {/* 입력 영역 */}
                <div className="space-y-2">
                  <Textarea
                    id="feedback-message"
                    placeholder="불편한 점, 개선 아이디어 등을 자유롭게 적어주세요."
                    value={feedback}
                    maxLength={1000}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] resize-none bg-background/80 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      최소 5자 이상 입력해주세요
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {feedback.length}/1000
                    </div>
                  </div>
                </div>

                {/* 전송 버튼 */}
                <Button
                  className="w-full h-11 font-semibold shadow-md shadow-primary/20"
                  disabled={submitting || feedback.trim().length < 5}
                  onClick={async () => {
                    try {
                      setSubmitting(true);
                      await sendFeedback({ message: feedback.trim() });
                      setFeedback("");
                      toast({
                        title: "감사합니다!",
                        description: "소중한 의견이 전달되었습니다."
                      });
                    } catch (err: any) {
                      toast({
                        title: "전송 실패",
                        description: err?.message || "잠시 후 다시 시도해주세요.",
                        variant: "destructive"
                      });
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {submitting ? (
                    <span className="inline-flex items-center">
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      전송 중...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      피드백 전송하기
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
