/**
 * AuthContext
 *
 * 전역 사용자 인증 및 사용자 정보 관리를 위한 Context
 * localStorage 캐싱 적용 (TTL: 5분)
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/api/client';
import { userCache } from '@/utils/userCache';

interface User {
  userId: number;
  username: string;
  email?: string; // 이메일은 더 이상 필수가 아님
  profileImage?: string;
  nickname?: string;
  followInfo?: {
    followerCount: number;
    followingCount: number;
  };
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async (forceRefresh = false) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setUser(null);
      setLoading(false);
      userCache.clear();
      return;
    }

    // 캐시 확인 (강제 새로고침이 아닌 경우)
    if (!forceRefresh) {
      const cachedUser = userCache.get();
      if (cachedUser) {
        setUser(cachedUser);
        setLoading(false);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching user profile from API...');

      // GET /users/me/profile API 호출
      // APIdog에서 아직 생성되지 않은 엔드포인트이므로 직접 호출
      const response = await apiClient.get('/users/me/profile');
      const userData = response.data?.data;

      if (userData) {
        const user: User = {
          userId: userData.userId,
          username: userData.username,
          profileImage: userData.profileImageUrl,
          bio: userData.bio,
        };

        setUser(user);
        userCache.set(user); // 캐시에 저장
        console.log('✅ User profile fetched and cached');
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch current user:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '사용자 정보를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setUser(null);
      userCache.clear();
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    fetchUser();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    refetchUser: fetchUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
