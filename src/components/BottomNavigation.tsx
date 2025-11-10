import { NavLink } from 'react-router-dom';
import { Home, Search, Star, Settings, Bell } from "lucide-react";

/**
 * BottomNavigation Component
 *
 * React Router의 NavLink를 사용하는 하단 네비게이션 바
 * Material Design 3 스타일 적용
 */
export function BottomNavigation() {
  const tabs = [
    { path: '/home', icon: Home, label: '홈' },
    { path: '/search', icon: Search, label: '검색' },
    { path: '/rate-record', icon: Star, label: '평가 기록' },
    { path: '/notifications', icon: Bell, label: '알림' },
    { path: '/user', icon: Settings, label: '설정' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t z-50"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--outline)'
      }}
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all duration-300 min-w-0 relative state-layer-hover ${
                  isActive ? 'scale-105' : ''
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                backgroundColor: isActive ? 'var(--secondary-container)' : 'transparent'
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Material 3 Navigation Badge */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundColor: 'var(--secondary-container)',
                      }}
                    />
                  )}

                  {/* Icon Container */}
                  <div className="relative z-10">
                    <Icon
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive ? 'scale-110' : ''
                      }`}
                      style={{
                        color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-label-medium relative z-10 transition-all duration-300 ${
                      isActive ? 'font-medium' : 'font-normal'
                    }`}
                    style={{
                      color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
                    }}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}