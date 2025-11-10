import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, Music } from "lucide-react";

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
      className={`cursor-pointer transition-all rounded-xl border overflow-hidden hover:shadow-md ${
        variant === "scroll" ? "flex-shrink-0 w-80" : "w-full"
      }`}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--outline)",
        height: variant === "grid" ? "auto" : "388px",
      }}
      onClick={onClick}
    >
      {/* 이미지 */}
      <div className="relative">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={title}
            className={`w-full object-cover ${
              variant === "grid" ? "aspect-square" : "h-48"
            }`}
          />
        ) : (
          <div
            className={`w-full flex items-center justify-center ${
              variant === "grid" ? "aspect-square" : "h-48"
            }`}
            style={{ backgroundColor: "var(--muted)" }}
          >
            <Music
              className="w-12 h-12"
              style={{ color: "var(--muted-foreground)" }}
            />
          </div>
        )}

        {/* 태그 */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full backdrop-blur-sm text-label-small"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "var(--on-surface)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="px-3 pt-3 pb-1.5 space-y-1.5">
        <h3
          className="text-title-medium line-clamp-2"
          style={{ color: "var(--on-surface)" }}
        >
          {title}
        </h3>
        <p
          className="text-body-small line-clamp-2"
          style={{ color: "var(--on-surface-variant)" }}
        >
          {description}
        </p>

        {/* 하단 영역 */}
        <div className="flex items-center justify-between pt-1.5">
          {/* 작성자 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAuthorClick?.(author.id);
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={author.imageUrl || undefined} />
              <AvatarFallback className="text-xs">
                {author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span
              className="text-label-medium"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {author.username}
            </span>
          </button>

          {/* 통계 */}
          <div className="flex items-center gap-3 text-label-medium text-[var(--on-surface-variant)]">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              <span>{itemCount}곡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
