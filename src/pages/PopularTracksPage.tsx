import { MusicListPage } from "../components/MusicListPage";
import { usePopularTracks } from "../hooks/usePopularTracks";

/**
 * 인기 트랙 차트 페이지
 *
 * API: GET /popular-tracks
 * 상위 100개 인기 트랙을 순위와 함께 리스트로 표시
 */
export function PopularTracksPage() {
  const { tracks, loading, error, refetch } = usePopularTracks();

  return (
    <MusicListPage
      title="인기 트랙 차트"
      type="track"
      items={tracks}
      loading={loading}
      error={error}
      onRefetch={refetch}
    />
  );
}
