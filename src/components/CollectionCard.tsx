import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, Music } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CollectionCardProps {
  collectionId: number;
  title: string;
  description: string;
  author: {
    id: number;
    username: string;
    imageUrl: string | null;
  };
  itemCount: number;
  likeCount: number;
  coverImageUrl: string | null;
  tags?: string[] | null;
  variant?: "grid" | "scroll";
  onClick: () => void;
  onAuthorClick?: (authorId: number) => void;
}

export function CollectionCard({
  collectionId,
  title,
  description,
  author,
  itemCount,
  likeCount,
  coverImageUrl,
  tags,
  variant = "grid",
  onClick,
  onAuthorClick,
}: CollectionCardProps) {
  return (
    <div
      className="cursor-pointer transition-all rounded-xl overflow-hidden border hover:shadow-md"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--outline)' }}
      onClick={onClick}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={coverImageUrl || ''}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-2">
            {tags?.slice(0, 2).map((tag) => (
              <div
                key={tag}
                className="px-3 py-1 rounded-full text-label-small"
                style={{
                  backgroundColor: 'var(--surface-container)',
                  color: 'var(--on-surface)'
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        {/* 제목 */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-title-medium line-clamp-1 flex-1" style={{ color: 'var(--on-surface)' }}>
            {title}
          </h3>
        </div>

        {/* 설명 */}
        <p className="text-body-medium line-clamp-2 mb-4" style={{ color: 'var(--on-surface-variant)' }}>
          {description}
        </p>

        {/* 크리에이터 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              className="w-6 h-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onAuthorClick?.(author.id);
              }}
            >
              <AvatarImage src={author.imageUrl || undefined} />
              <AvatarFallback className="text-label-small">{author.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span
              className="text-label-medium cursor-pointer hover:underline"
              style={{ color: 'var(--on-surface-variant)' }}
              onClick={(e) => {
                e.stopPropagation();
                onAuthorClick?.(author.id);
              }}
            >
              {author.username}
            </span>
          </div>
        </div>

        {/* 통계 */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
            <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
              {likeCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
            <span className="text-label-medium" style={{ color: 'var(--on-surface-variant)' }}>
              {itemCount}곡
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
