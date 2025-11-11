/**
 * Infinite Scroll Trigger Component
 *
 * Intersection Observer를 사용한 무한 스크롤 트리거
 * 화면 하단에 도달하면 자동으로 다음 페이지 로드
 */

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  /**
   * 다음 페이지 로드 콜백
   */
  onLoadMore: () => void;

  /**
   * 로딩 중 상태
   */
  loading: boolean;

  /**
   * 더 불러올 데이터가 있는지 여부
   */
  hasMore: boolean;

  /**
   * 화면 하단으로부터 몇 px에서 트리거할지 (default: 200)
   */
  threshold?: number;

  /**
   * 로딩 메시지 (optional)
   */
  loadingMessage?: string;
}

/**
 * Infinite Scroll 트리거 컴포넌트
 *
 * @example
 * ```tsx
 * <InfiniteScrollTrigger
 *   onLoadMore={loadMore}
 *   loading={loading}
 *   hasMore={hasMore}
 *   threshold={200}
 * />
 * ```
 */
export function InfiniteScrollTrigger({
  onLoadMore,
  loading,
  hasMore,
  threshold = 200,
  loadingMessage = '로딩 중...'
}: InfiniteScrollTriggerProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 더 불러올 데이터가 없거나 로딩 중이면 observer 설정 안 함
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 보이면 다음 페이지 로드
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        // threshold px 만큼 미리 트리거
        rootMargin: `${threshold}px`,
        threshold: 0
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loading, onLoadMore, threshold]);

  // 더 불러올 데이터가 없으면 렌더링 안 함
  if (!hasMore) return null;

  return (
    <div
      ref={observerRef}
      className="flex justify-center py-8"
      data-testid="infinite-scroll-trigger"
    >
      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">{loadingMessage}</span>
        </div>
      )}
    </div>
  );
}
