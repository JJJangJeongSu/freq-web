import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home, Search } from 'lucide-react';

/**
 * NotFoundPage Component
 *
 * 404 에러 페이지
 * 존재하지 않는 경로에 접근했을 때 표시됩니다.
 */
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="text-center space-y-6 max-w-md">
        {/* 404 Icon */}
        <div
          className="w-32 h-32 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: 'var(--error-container)' }}
        >
          <span
            className="text-6xl font-bold"
            style={{ color: 'var(--on-error-container)' }}
          >
            404
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-headline-large"
          style={{ color: 'var(--on-surface)' }}
        >
          페이지를 찾을 수 없습니다
        </h1>

        {/* Description */}
        <p
          className="text-body-large leading-relaxed"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={() => navigate('/home')}
            className="h-12 px-6 rounded-full flex-1"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)'
            }}
          >
            <Home className="w-5 h-5 mr-2" />
            홈으로 가기
          </Button>
          <Button
            onClick={() => navigate('/search')}
            variant="outline"
            className="h-12 px-6 rounded-full flex-1 border-2"
            style={{
              borderColor: 'var(--outline)',
              color: 'var(--primary)'
            }}
          >
            <Search className="w-5 h-5 mr-2" />
            검색하기
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-label-large underline"
            style={{ color: 'var(--primary)' }}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
