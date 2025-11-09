import { useNotifications } from "@/hooks/useNotifications";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/NotificationItem";

export function NotificationsPage() {
  const { data, isLoading, error, refetch } = useNotifications();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">알림을 불러오는 중...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
          <AlertCircle className="w-12 h-12 text-destructive" />
          <p className="font-semibold text-destructive">알림을 불러오는데 실패했습니다.</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            다시 시도
          </Button>
        </div>
      );
    }

    if (!data || data.notifications.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">새로운 알림이 없습니다.</p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-border">
        {data.notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <h1 className="text-lg font-semibold">알림</h1>
        {data && data.unreadCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            {data.unreadCount}
          </div>
        )}
      </header>
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
