import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useFollowing } from "../hooks/useFollowing";
import { useFollowToggle } from "../hooks/useFollowToggle";
import { UserPreview } from "../api/models/user-preview";

export function FollowingPage() {
  const navigate = useNavigate();

  // 팔로우 상태를 로컬에서 관리 (userId -> isFollowing)
  const [followStates, setFollowStates] = useState<Record<number, boolean>>({});

  // API로 팔로잉 데이터 가져오기
  const { data, isLoading, error, refetch } = useFollowing();
  const followToggleMutation = useFollowToggle({ skipRefetch: true });

  // 팔로잉 목록 추출
  const following = (data as any)?.data?.followings || [];

  // 초기 팔로우 상태 설정 (모두 팔로잉 중)
  useEffect(() => {
    const initialStates: Record<number, boolean> = {};
    following.forEach((user: UserPreview) => {
      initialStates[user.id] = true; // 팔로잉 페이지이므로 모두 true
    });
    setFollowStates(initialStates);
  }, [data]);

  const handleFollowToggle = (userId: number) => {
    // 로컬 상태만 변경 (UI만 업데이트)
    setFollowStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));

    // API 호출은 하되 즉시 refetch하지 않음
    followToggleMutation.mutate(userId, {
      onSuccess: () => {
        // 아무것도 하지 않음 - 페이지를 다시 들어올 때 자동으로 최신 데이터 가져옴
      }
    });
  };

  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  // Loading 상태
  if (isLoading) {
    return (
      <div className="size-full bg-background">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
          <div className="flex items-center gap-4 p-3 md:p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-title-large">팔로잉</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error 상태
  if (error) {
    return (
      <div className="size-full bg-background">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
          <div className="flex items-center gap-4 p-3 md:p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-title-large">팔로잉</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-destructive mb-2">데이터를 불러오는데 실패했습니다</p>
            <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center gap-4 p-3 md:p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-title-large">팔로잉</h1>
            <p className="text-body-medium text-on-surface-variant">
              {following.length}명
            </p>
          </div>
        </div>
      </div>

      {/* Following List */}
      <div className="p-3 md:p-4">
        {following.length === 0 ? (
          <div className="text-center py-12">
            <Users className="size-12 mx-auto mb-4 text-on-surface-variant" />
            <h3 className="text-title-medium mb-2">팔로잉이 없습니다</h3>
            <p className="text-body-medium text-on-surface-variant">
              아직 팔로우한 사용자가 없어요.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {following.map((user: UserPreview) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors"
              >
                <Avatar
                  className="w-12 h-12 cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <h3 className="font-semibold line-clamp-1">{user.username}</h3>
                </div>

                <Button
                  variant={followStates[user.id] ? "outline" : "default"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollowToggle(user.id);
                  }}
                  disabled={followToggleMutation.isPending}
                  className="shrink-0"
                >
                  {followToggleMutation.isPending ? "처리중..." : (followStates[user.id] ? "팔로잉" : "팔로우")}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}
