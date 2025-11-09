import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

/**
 * Layout Component
 *
 * BottomNavigation을 조건부로 렌더링하는 레이아웃 컴포넌트
 * Detail, List, Action 페이지에서는 BottomNavigation을 숨깁니다.
 */
export function Layout() {
  const location = useLocation();

  // BottomNavigation을 숨길 페이지 경로들
  const hideBottomNavPaths = [
    '/albums/',
    '/tracks/',
    '/artists/',
    '/reviews/',
    '/collections/',
    '/users/',
    '/rated-albums',
    '/rated-tracks',
    '/liked-artists',
    '/my-collections',
    '/liked-collections',
    '/my-reviews',
    '/write-review',
  ];

  // 현재 경로가 숨김 대상인지 확인
  const shouldHideBottomNav = hideBottomNavPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="size-full relative">
      <Outlet />
      {!shouldHideBottomNav && <BottomNavigation />}
    </div>
  );
}
