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
      className="group w-[240px] bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail Area */}
      <div className="relative h-[160px] overflow-hidden rounded-t-2xl border-b border-[#f2f2f2]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Text Area */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[1.05rem] font-semibold text-[#222] mt-[-4px] mb-2 truncate">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[0.85rem] text-[#777] mb-3 line-clamp-2 h-[2.5em]">
          {description}
        </p>

        {/* Creator */}
        <div className="flex items-center gap-[6px] mb-4">
          <Avatar className="w-6 h-6">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[#555]">{creator.name}</span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#475AA4]" />
            <span className="text-[0.85rem] text-[#444] font-medium">{stats.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Music className="w-4 h-4 text-[#475AA4]" />
            <span className="text-[0.85rem] text-[#444] font-medium">{stats.itemCount}개</span>
          </div>
        </div>
      </div>
    </div>
  );
}
