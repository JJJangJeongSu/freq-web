import { Heart, Music } from "lucide-react";
import type { CollectionPreview } from "@/api/models";

interface HomeCollectionCardProps {
  collection: CollectionPreview;
  onClick: () => void;
}

export function HomeCollectionCard({ collection, onClick }: HomeCollectionCardProps) {
  const { title, coverImageUrl, tags, likeCount } = collection;

  return (
    <button
      type="button"
      className="flex-shrink-0 w-full cursor-pointer transition-all rounded-xl border overflow-hidden hover:shadow-md text-left"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--outline)'
      }}
      onClick={onClick}
      aria-label={`${title} 컬렉션 보기`}
    >
      {/* 이미지 + 태그 오버레이 */}
      {/* 이 div가 relative를 가지고 있으므로, 내부 absolute 요소가 이 div를 기준으로 배치됩니다. */}
      <div className="relative">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div
            className="w-full aspect-square flex items-center justify-center"
            style={{ backgroundColor: 'var(--muted)' }}
            role="img"
            aria-label={title}
          >
            <Music className="w-16 h-16" style={{ color: 'var(--muted-foreground)' }} aria-hidden="true" />
          </div>
        )}

        {/* 태그 오버레이 */}
        {/* [수정] right-2.5 제거하여 좌측 정렬 유지 */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 flex-wrap z-10"> {/* z-10 추가: 혹시 모를 겹침 방지 */}
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)', // 어두운 배경
                  color: 'white' // 밝은 글씨
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 제목 + 좋아요 */}
      {/* 제목(`h3`)의 `line-clamp-2` 덕분에 텍스트 겹침은 이미 방지됩니다. */}
      <div className="p-2.5 space-y-1">
        <h3
          className="text-sm font-semibold line-clamp-2 leading-tight" // line-clamp-2가 글자 겹침을 방지
          style={{ color: 'var(--on-surface)' }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5" style={{ color: 'var(--on-surface-variant)' }} aria-hidden="true" />
          <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
            <span className="sr-only">좋아요</span> {likeCount}
          </span>
        </div>
      </div>
    </button>
  );
}