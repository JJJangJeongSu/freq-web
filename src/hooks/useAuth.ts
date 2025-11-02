/**
 * Authentication Hooks
 *
 * 로그인, 회원가입, 로그아웃 등 인증 관련 hooks
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api.service';
import { setAuthToken, clearAuthToken } from '@/api/client';
import { queryClient, queryKeys } from '@/config/queryClient';
import type {
  LoginRequest,
  SignupRequest,
  GoogleLoginRequest,
  KakaoLoginRequest,
  NaverLoginRequest,
  AuthResponse,
} from '@/api/models';

/**
 * 로그인 Hook
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (request: LoginRequest) => {
      const response = await apiService.auth.login(request);
      return response.data.data as unknown as AuthResponse;
    },
    onSuccess: (data: AuthResponse) => {
      // Save access token to localStorage
      setAuthToken(data.accessToken);

      // Also save refresh token (optional)
      localStorage.setItem('refreshToken', data.refreshToken);

      // Save user info
      localStorage.setItem('userId', String(data.userId));
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userNickname', data.nickname);

      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });

      console.log('✅ Login successful:', data.nickname);
    },
    onError: (error) => {
      console.error('❌ Login failed:', error);
    },
  });
};

/**
 * 회원가입 Hook
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: async (request: SignupRequest) => {
      const response = await apiService.auth.signup(request);
      return response.data.data;
    },
    onSuccess: (data) => {
      console.log('✅ Signup successful:', data);
    },
    onError: (error) => {
      console.error('❌ Signup failed:', error);
    },
  });
};

/**
 * 로그아웃 Hook
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiService.auth.logout();
      return response.data;
    },
    onSuccess: () => {
      // Clear tokens and user info
      clearAuthToken();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNickname');

      // Clear all queries
      queryClient.clear();

      console.log('✅ Logout successful');
    },
    onError: (error) => {
      console.error('❌ Logout failed:', error);
      // Even if logout fails, clear local data
      clearAuthToken();
      localStorage.clear();
      queryClient.clear();
    },
  });
};

/**
 * Google 로그인 Hook
 */
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async (request: GoogleLoginRequest) => {
      const response = await apiService.auth.googleLogin(request);
      return response.data.data as unknown as AuthResponse;
    },
    onSuccess: (data: AuthResponse) => {
      setAuthToken(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', String(data.userId));
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userNickname', data.nickname);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      console.log('✅ Google login successful:', data.nickname);
    },
  });
};

/**
 * Kakao 로그인 Hook
 */
export const useKakaoLogin = () => {
  return useMutation({
    mutationFn: async (request: KakaoLoginRequest) => {
      const response = await apiService.auth.kakaoLogin(request);
      return response.data.data as unknown as AuthResponse;
    },
    onSuccess: (data: AuthResponse) => {
      setAuthToken(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', String(data.userId));
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userNickname', data.nickname);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      console.log('✅ Kakao login successful:', data.nickname);
    },
  });
};

/**
 * Naver 로그인 Hook
 */
export const useNaverLogin = () => {
  return useMutation({
    mutationFn: async (request: NaverLoginRequest) => {
      const response = await apiService.auth.naverLogin(request);
      return response.data.data as unknown as AuthResponse;
    },
    onSuccess: (data: AuthResponse) => {
      setAuthToken(data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', String(data.userId));
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userNickname', data.nickname);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      console.log('✅ Naver login successful:', data.nickname);
    },
  });
};

/**
 * 이메일 중복 확인 Hook
 */
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiService.auth.checkEmail(email);
      return response.data.data;
    },
  });
};

/**
 * 닉네임 중복 확인 Hook
 */
export const useCheckNickname = () => {
  return useMutation({
    mutationFn: async (nickname: string) => {
      const response = await apiService.auth.checkNickname(nickname);
      return response.data.data;
    },
  });
};

/**
 * 현재 로그인 상태 확인 Hook
 */
export const useIsLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * 현재 사용자 정보 가져오기
 */
export const useCurrentUser = () => {
  return {
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('userEmail'),
    nickname: localStorage.getItem('userNickname'),
  };
};
