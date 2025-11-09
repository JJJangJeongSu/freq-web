import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useParams, useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";

export function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  // API에서 프로필 데이터 가져오기 (캐싱 적용)
  const { data: userProfile, isLoading, error } = useUserProfile(userId);

  // Loading 상태
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">프로필</h1>
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
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="font-semibold">프로필</h1>
          <div className="w-8" />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-2">프로필을 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate('/home')}
            >
              돌아가기
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!userProfile) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">프로필</h1>
        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userProfile.profileImageUrl || undefined} />
              <AvatarFallback className="text-2xl">
                {userProfile.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{userProfile.username}</h2>
              <p className="text-sm text-muted-foreground">ID: {userProfile.userId}</p>
            </div>
          </div>

          {/* Bio */}
          {userProfile.bio && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm leading-relaxed">{userProfile.bio}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
