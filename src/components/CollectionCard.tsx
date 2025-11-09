import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, Music } from "lucide-react";

interface CollectionCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  creator: {
    name: string;
    avatar: string;
  };
  stats: {
    likes: number;
    itemCount: number;
  };
  onClick: () => void;
}

export function CollectionCard({
  id,
  title,
  description,
  imageUrl,
  creator,
  stats,
  onClick,
}: CollectionCardProps) {
  return (
    <div
      className="group w-full bg-card rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden border border-border"
      onClick={onClick}
    >
      {/* Thumbnail Area */}
      <div className="relative h-36 md:h-40">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-lg font-bold text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-[2.5em]">
          {description}
        </p>

        {/* Creator & Stats */}
        <div className="flex items-center justify-between">
          {/* Creator */}
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={creator.avatar || undefined} alt={creator.name} />
              <AvatarFallback>{creator.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{creator.name}</span>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium">{stats.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium">{stats.itemCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
