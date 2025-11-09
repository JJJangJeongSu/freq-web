import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../api/client';

interface ProtectedRouteProps {
  redirectPath?: string;
}

/**
 * ProtectedRoute Component
 *
 * 인증된 사용자만 접근 가능한 라우트를 보호합니다.
 * 토큰이 없으면 /auth로 리다이렉트합니다.
 */
export function ProtectedRoute({ redirectPath = '/auth' }: ProtectedRouteProps) {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
