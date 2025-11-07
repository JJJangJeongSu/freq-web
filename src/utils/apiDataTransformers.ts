import type {
  RatingDistribution,
  CollectionPreview,
  GetMyActivity200ResponseAllOfDataUserPreferencesInner,
  RatedAlbum,
  RatedTrack
} from '../api/models';

/**
 * API RatingDistribution 객체를 페이지 컴포넌트용 배열로 변환
 * @param distribution API에서 받은 별점 분포 객체
 * @returns 별점, 개수, 백분율을 포함한 배열
 */
export function transformRatingDistribution(
  distribution?: RatingDistribution | null
): Array<{ rating: number; count: number; percentage: number }> {
  // null/undefined 체크
  if (!distribution) {
    return [];
  }

  // 모든 별점의 총 개수 계산
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return [];
  }

  // 5점부터 0.5점까지 역순으로 정렬된 배열 생성
  const ratings = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5];

  return ratings
    .map(rating => {
      const key = rating.toFixed(1) as keyof RatingDistribution;
      const count = distribution[key] || 0;
      const percentage = Math.round((count / total) * 100);

      return {
        rating,
        count,
        percentage
      };
    })
    .filter(item => item.count > 0); // 0개인 별점은 제외
}

/**
 * API CollectionPreview를 페이지 컴포넌트용 형식으로 변환
 */
export function transformCollection(collection: CollectionPreview) {
  return {
    id: String(collection.collectionId),
    title: collection.title,
    description: collection.description,
    itemCount: collection.itemCount,
    coverImages: [collection.coverImageUrl],
    creator: collection.author.username,
    likes: collection.likeCount,
    visibility: collection.visibility
  };
}

/**
 * API userPreferences를 페이지 컴포넌트용 장르 키워드로 변환
 * @param preferences API에서 받은 장르 선호도 배열 (value: 0-1)
 * @returns 장르명, 가중치(0-100), 색상을 포함한 배열
 */
export function transformGenreKeywords(
  preferences: GetMyActivity200ResponseAllOfDataUserPreferencesInner[]
): Array<{ name: string; weight: number; color: string }> {
  // 색상 팔레트 정의
  const colors = [
    'bg-red-100 text-red-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
    'bg-orange-100 text-orange-800',
    'bg-pink-100 text-pink-800',
    'bg-cyan-100 text-cyan-800',
    'bg-lime-100 text-lime-800'
  ];

  return preferences
    .map((pref, index) => ({
      name: pref.genre,
      weight: Math.round(pref.value * 100), // 0-1을 0-100으로 변환
      color: colors[index % colors.length] // 색상 순환
    }))
    .sort((a, b) => b.weight - a.weight); // 가중치 내림차순 정렬
}

/**
 * 아티스트 배열을 문자열로 변환
 * @param artists 아티스트 배열
 * @returns 첫 번째 아티스트 또는 쉼표로 연결된 문자열
 */
export function getArtistString(artists: string[]): string {
  if (artists.length === 0) return 'Unknown Artist';
  if (artists.length === 1) return artists[0];
  return artists.join(', ');
}

/**
 * API RatedAlbum을 페이지 컴포넌트용 형식으로 변환
 */
export function transformRatedAlbum(album: RatedAlbum) {
  return {
    id: album.id,
    title: album.title,
    artist: getArtistString(album.artists),
    artists: album.artists,
    imageUrl: album.imageUrl,
    rating: album.rating,
    ratedDate: album.ratedDate,
    releaseDate: album.releaseDate
  };
}

/**
 * API RatedTrack을 페이지 컴포넌트용 형식으로 변환
 */
export function transformRatedTrack(track: RatedTrack) {
  return {
    id: track.id,
    title: track.title,
    artist: getArtistString(track.artists),
    artists: track.artists,
    imageUrl: track.imageUrl || '',
    rating: track.rating,
    ratedDate: track.ratedDate,
    releaseDate: track.releaseDate
  };
}
