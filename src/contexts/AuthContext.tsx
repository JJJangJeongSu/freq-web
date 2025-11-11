/**
 * AuthContext
 *
 * 전역 사용자 인증 및 사용자 정보 관리를 위한 Context
 */

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/api.service';

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

  const fetchUser = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // GET /users/me/activity API 호출로 변경
      const response = await apiService.users.getMyActivity();
      const userData = (response.data as any)?.data;

      if (userData) {
        setUser({
          userId: userData.userId,
          username: userData.username,
          profileImage: userData.profileImageUrl,
          nickname: userData.nickname, // API 응답에 nickname이 있다면 사용
          followInfo: userData.followInfo,
          bio: userData.bio,
        });
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch current user:', err);

      const errorMessage = err.response?.data?.error?.message
        || err.message
        || '사용자 정보를 불러오는 중 오류가 발생했습니다.';

      setError(new Error(errorMessage));
      setUser(null);
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
