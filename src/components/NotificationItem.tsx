import { useNavigate } from "react-router-dom";
import {
  Notification,
  NotificationActor,
  NotificationTypeEnum,
} from "@/api/models";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageSquare, Star, UserPlus } from "lucide-react";
import { useMarkNotificationRead } from "@/hooks/useMarkNotificationRead";

interface NotificationItemProps {
  notification: Notification;
  onRead?: () => void;
}

const getIconForType = (type: NotificationTypeEnum) => {
  switch (type) {
    case NotificationTypeEnum.ReviewLiked:
    case NotificationTypeEnum.CollectionLiked:
    case NotificationTypeEnum.AlbumLiked:
      return <Heart className="w-5 h-5 text-red-500" />;
    case NotificationTypeEnum.UserFollowedYou:
      return <UserPlus className="w-5 h-5 text-blue-500" />;
    case NotificationTypeEnum.ReviewCreated:
      return <MessageSquare className="w-5 h-5 text-green-500" />;
    default:
      return <Star className="w-5 h-5 text-yellow-500" />;
  }
};

const getEntityPath = (
  entity: Notification["entity"]
): string | null => {
  if (!entity || !entity.id) return null;
  switch (entity.type) {
    case "REVIEW":
      return `/reviews/${entity.id}`;
    case "COLLECTION":
      return `/collections/${entity.id}`;
    case "ALBUM":
      return `/albums/${entity.id}`;
    case "USER":
      return `/users/${entity.id}`;
    default:
      return null;
  }
};

/**
 * 알림 타입에 따른 메시지 생성
 */
const getNotificationMessage = (
  type: NotificationTypeEnum,
  actor: NotificationActor,
  entity: Notification["entity"]
): string => {
  const actorName = `<strong>${actor.username}</strong>`;
  const entityTitle = entity?.title ? `<strong>${entity.title}</strong>` : "";

  switch (type) {
    case NotificationTypeEnum.ReviewLiked:
      return `${actorName}님이 리뷰를 좋아해요`;
    case NotificationTypeEnum.CollectionLiked:
      return entityTitle
        ? `${actorName}님이 컬렉션 ${entityTitle}을 좋아해요`
        : `${actorName}님이 컬렉션을 좋아해요`;
    case NotificationTypeEnum.AlbumLiked:
      return `${actorName}님이 앨범 평가를 좋아해요`;
    case NotificationTypeEnum.UserFollowedYou:
      return `${actorName}님이 팔로우했어요`;
    case NotificationTypeEnum.ReviewCreated:
      return entityTitle
        ? `${actorName}님이 ${entityTitle} 리뷰를 작성했어요`
        : `${actorName}님이 리뷰를 작성했어요`;
    default:
      return `${actorName}님의 새로운 활동이 있어요`;
  }
};

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const navigate = useNavigate();
  const { markAsRead } = useMarkNotificationRead();
  const { id, actor, entity, isRead, createdAt, type } = notification;

  const handleItemClick = async () => {
    // 읽지 않은 알림이면 읽음 처리
    if (!isRead) {
      try {
        await markAsRead(id);
        // 알림 목록 갱신
        onRead?.();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
        // 에러가 발생해도 네비게이션은 계속 진행
      }
    }

    // 엔티티 페이지로 이동
    const path = getEntityPath(entity);
    if (path) {
      navigate(path);
    }
  };

  // 알림 타입에 맞는 메시지 생성
  const notificationMessage = getNotificationMessage(type, actor, entity);

  return (
    <div
      key={id}
      className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 cursor-pointer ${
        !isRead ? "bg-primary/10" : ""
      }`}
      onClick={handleItemClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={actor.profileImage} alt={actor.username} />
          <AvatarFallback>{actor.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full">
          {getIconForType(type)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: notificationMessage }}
        ></p>
        <time className="text-xs text-muted-foreground mt-1 block">
          {new Date(createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
      {!isRead && (
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 self-center flex-shrink-0"></div>
      )}
    </div>
  );
}
