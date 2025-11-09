import { Home, Search, Star, User, Bell } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'search', icon: Search, label: '검색' },
    { id: 'rate-record', icon: Star, label: '평가 기록' },
    { id: 'notifications', icon: Bell, label: '알림' },
    { id: 'user', icon: User, label: '프로필' },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{ 
        backgroundColor: 'var(--surface)', 
        borderColor: 'var(--outline)' 
      }}
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all duration-300 min-w-0 relative state-layer-hover ${
                isActive ? 'scale-105' : ''
              }`}
              style={{
                color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                backgroundColor: isActive ? 'var(--secondary-container)' : 'transparent'
              }}
            >
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
            </button>
          );
        })}
      </div>
    </div>
  );
}