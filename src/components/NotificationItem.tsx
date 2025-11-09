import { useNavigate } from "react-router-dom";
import {
  Notification,
  NotificationActor,
  NotificationTypeEnum,
} from "@/api/models";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageSquare, Star, UserPlus } from "lucide-react";

interface NotificationItemProps {
  notification: Notification;
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

export function NotificationItem({
  notification,
}: NotificationItemProps) {
  const navigate = useNavigate();
  const { id, actor, entity, message, isRead, createdAt, type } = notification;

  const handleItemClick = () => {
    const path = getEntityPath(entity);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      key={id}
      className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 ${
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
      <div className="flex-1">
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <time className="text-xs text-muted-foreground mt-1">
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>
      {!isRead && (
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 self-center"></div>
      )}
    </div>
  );
}
