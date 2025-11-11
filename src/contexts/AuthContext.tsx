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
  email: string;
  profileImage?: string;
  nickname?: string;
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

    // 토큰이 없으면 로그인하지 않은 상태
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // GET /users/me API 호출
      const response = await apiService.users.getUsersMe();
      const userData = (response.data as any)?.data;

      if (userData) {
        setUser({
          userId: userData.userId,
          username: userData.username,
          email: userData.email,
          profileImage: userData.profileImage,
          nickname: userData.nickname,
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
