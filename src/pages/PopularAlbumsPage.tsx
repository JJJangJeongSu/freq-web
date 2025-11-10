import { MusicListPage } from "../components/MusicListPage";
import { usePopularAlbums } from "../hooks/usePopularAlbums";

/**
 * 인기 앨범 차트 페이지
 *
 * API: GET /popular-albums
 * 상위 100개 인기 앨범을 순위와 함께 리스트로 표시
 */
export function PopularAlbumsPage() {
  const { albums, loading, error, refetch } = usePopularAlbums();

  return (
    <MusicListPage
      title="인기 앨범 차트"
      type="album"
      items={albums}
      loading={loading}
      error={error}
      onRefetch={refetch}
    />
  );
}
