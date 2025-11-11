/**
 * User Cache Utility
 *
 * localStorage 기반 사용자 정보 캐싱
 * TTL(Time To Live) 5분으로 설정
 */

interface User {
  userId: number;
  username: string;
  email?: string;
  profileImage?: string;
  nickname?: string;
  followInfo?: {
    followerCount: number;
    followingCount: number;
  };
  bio?: string;
}

interface CachedUser {
  data: User;
  timestamp: number;
}

const CACHE_KEY = 'musicrate_cached_user';
const CACHE_TTL = 5 * 60 * 1000; // 5분

export const userCache = {
  /**
   * 캐시에서 사용자 정보 가져오기
   * TTL이 만료되면 null 반환
   */
  get: (): User | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed: CachedUser = JSON.parse(cached);
      const now = Date.now();

      // TTL 만료 체크
      if (now - parsed.timestamp > CACHE_TTL) {
        console.log('🗑️ User cache expired, clearing...');
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      console.log('✅ User cache hit');
      return parsed.data;
    } catch (error) {
      console.error('❌ Failed to read user cache:', error);
      return null;
    }
  },

  /**
   * 캐시에 사용자 정보 저장
   */
  set: (user: User): void => {
    try {
      const cached: CachedUser = {
        data: user,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
      console.log('💾 User cached:', user.username);
    } catch (error) {
      console.error('❌ Failed to cache user:', error);
    }
  },

  /**
   * 캐시 삭제
   */
  clear: (): void => {
    try {
      localStorage.removeItem(CACHE_KEY);
      console.log('🗑️ User cache cleared');
    } catch (error) {
      console.error('❌ Failed to clear user cache:', error);
    }
  },

  /**
   * 캐시 존재 여부 확인
   */
  has: (): boolean => {
    return !!localStorage.getItem(CACHE_KEY);
  }
};
