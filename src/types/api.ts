// HomePage API 데이터 타입 정의

// ============================================
// 컬렉션 관련 타입
// ============================================

export type CollectionType = 'mixed' | 'tracks' | 'albums';

export interface CollectionCreator {
  name: string;
  avatar: string;
  isVerified: boolean;
  isOfficial?: boolean; // 공식 계정 여부 (예: 한국대중음악상)
}

export interface CollectionStats {
  likes: number;
  comments: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  type: CollectionType;
  creator: CollectionCreator;
  imageUrl: string;
  tags: string[];
  stats: CollectionStats;
}

// ============================================
// 댓글 관련 타입
// ============================================

export interface CommentUser {
  name: string;
  avatar: string;
}

export interface CommentAlbum {
  title: string;
  artist: string;
  id: string;
  imageUrl: string;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  album: CommentAlbum;
  rating: number; // 1-5 별점
  likes?: number; // 인기 댓글용
  timeAgo?: string; // 최근 댓글용
}

// ============================================
// HomePage API 응답 타입
// ============================================

export interface HomePageData {
  collections: Collection[];
  popularComments: Comment[];
  recentComments: Comment[];
}

// ============================================
// API 엔드포인트 정의
// ============================================

/**
 * GET /api/home
 * 
 * Response: HomePageData
 * {
 *   collections: Collection[],
 *   popularComments: Comment[],
 *   recentComments: Comment[]
 * }
 */

// ============================================
// 개별 엔드포인트 (선택사항)
// ============================================

/**
 * GET /api/collections/recommended
 * 
 * Response: Collection[]
 * 추천 컬렉션 목록 반환
 */

/**
 * GET /api/comments/popular
 * 
 * Response: Comment[]
 * 인기 댓글 목록 반환 (likes 기준 정렬)
 */

/**
 * GET /api/comments/recent
 * 
 * Response: Comment[]
 * 최근 댓글 목록 반환 (작성 시간 기준 정렬)
 */
