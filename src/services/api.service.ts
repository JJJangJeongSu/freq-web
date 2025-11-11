/**
 * API Service Layer
 *
 * APIdog에서 생성한 API 클래스들을 우리의 custom axios client와 연결합니다.
 */

import { Configuration } from '@/api/configuration';
import { apiClient } from '@/api/client';
import { API_CONFIG } from '@/api/config';

// Import all generated API classes
import { AuthenticationSignInRegisterApi } from '@/api/apis/authentication-sign-in-register-api';
import { AuthenticationTokenApi } from '@/api/apis/authentication-token-api';
import { AuthenticationUpdateInfoApi } from '@/api/apis/authentication-update-info-api';
import { CollectionsApi } from '@/api/apis/collections-api';
import { CommentsApi } from '@/api/apis/comments-api';
import { DetailPagesApi } from '@/api/apis/detail-pages-api';
import { FastAPIApi } from '@/api/apis/fast-apiapi';
import { FollowsApi } from '@/api/apis/follows-api';
import { HomeApi } from '@/api/apis/home-api';
import { NotificationsApi } from '@/api/apis/notifications-api';
import { ReviewsApi } from '@/api/apis/reviews-api';
import { SearchApi } from '@/api/apis/search-api';
import { UsersApi } from '@/api/apis/users-api';
import { UsersSocialApi } from '@/api/apis/users-social-api';
import { UtilitiesApi } from '@/api/apis/utilities-api';

/**
 * Create configuration for all APIs
 */
const configuration = new Configuration({
  basePath: API_CONFIG.baseURL,
});

/**
 * Centralized API service
 *
 * 모든 API 클래스 인스턴스를 중앙에서 관리합니다.
 * 우리의 custom apiClient (인증 토큰 인터셉터 포함)를 사용합니다.
 */
export const apiService = {
  // Authentication APIs
  auth: new AuthenticationSignInRegisterApi(configuration, API_CONFIG.baseURL, apiClient),
  authToken: new AuthenticationTokenApi(configuration, API_CONFIG.baseURL, apiClient),
  authUpdate: new AuthenticationUpdateInfoApi(configuration, API_CONFIG.baseURL, apiClient),

  // Content APIs
  collections: new CollectionsApi(configuration, API_CONFIG.baseURL, apiClient),
  comments: new CommentsApi(configuration, API_CONFIG.baseURL, apiClient),
  reviews: new ReviewsApi(configuration, API_CONFIG.baseURL, apiClient),

  // Detail Pages APIs
  detailPages: new DetailPagesApi(configuration, API_CONFIG.baseURL, apiClient),

  // Home API
  home: new HomeApi(configuration, API_CONFIG.baseURL, apiClient),

  // Search API
  search: new SearchApi(configuration, API_CONFIG.baseURL, apiClient),

  // User APIs
  users: new UsersApi(configuration, API_CONFIG.baseURL, apiClient),
  usersSocial: new UsersSocialApi(configuration, API_CONFIG.baseURL, apiClient),

  // Follow API
  follows: new FollowsApi(configuration, API_CONFIG.baseURL, apiClient),

  // Notifications API
  notifications: new NotificationsApi(configuration, API_CONFIG.baseURL, apiClient),

  // Utilities
  utilities: new UtilitiesApi(configuration, API_CONFIG.baseURL, apiClient),

  // Fast API (recommendations, etc.)
  fastAPI: new FastAPIApi(configuration, API_CONFIG.baseURL, apiClient),
} as const;

/**
 * Type helper to unwrap API responses
 *
 * APIdog responses are wrapped in: { success: boolean, data: T }
 * This helper extracts the data property
 */
export type UnwrapApiResponse<T> = T extends { data: infer D } ? D : T;

/**
 * Helper function to unwrap API responses
 */
export function unwrapResponse<T>(response: { data: T }): T {
  return response.data;
}
