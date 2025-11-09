# API Integration Guide

뮤직레이트 웹 애플리케이션에 APIdog 생성 코드를 통합하는 가이드입니다.

## 📋 현재 상태

### ✅ 완료된 작업
- [x] Axios 설치 완료
- [x] API 클라이언트 설정 (`src/api/client.ts`)
- [x] API 환경 설정 (`src/api/config.ts`)
- [x] 환경 변수 파일 (`.env`)
- [x] API 디렉토리 구조 생성 (`src/api/`)
- [x] Hooks 디렉토리 구조 생성 (`src/hooks/`)

### ⚠️ APIdog 코드 필요
다음 파일들을 APIdog에서 생성하여 배치해야 합니다:

## 🎯 APIdog 코드 생성 가이드

### Step 1: APIdog 설정

APIdog에서 코드를 생성할 때 다음과 같이 설정하세요:

| 설정 항목 | 선택 값 | 이유 |
|---------|---------|------|
| **HTTP Client** | **Axios** | 프로젝트에 이미 Axios 설치 및 설정 완료 |
| **Language** | **TypeScript** | 프로젝트가 TypeScript 기반 |
| **파일 구조** | **여러 파일 (Multiple Files)** | endpoint별로 파일 분리 |
| **Base URL** | `import`에서 가져오기 | `client.ts`에 이미 설정됨 |

### Step 2: 생성할 API 파일 목록

다음 파일들을 생성하세요:

#### 1. types.ts ⭐ 최우선
**모든 Request/Response 타입 정의**
- 모든 API endpoint의 요청/응답 타입
- ⚠️ **Field명은 APIdog이 절대 우선**
- 기존 `src/types/api.ts`는 무시

#### 2. API 서비스 파일들

| 파일명 | 주요 Endpoint | 설명 |
|--------|--------------|------|
| `homeApi.ts` | `GET /api/home`<br>`GET /api/collections/recommended`<br>`GET /api/comments/popular`<br>`GET /api/comments/recent` | 홈페이지 데이터 |
| `searchApi.ts` | `GET /api/search` | 통합 검색 |
| `albumApi.ts` | `GET /api/albums`<br>`GET /api/albums/:id`<br>`GET /api/albums/rated`<br>`POST /api/albums/:id/rate` | 앨범 관련 |
| `trackApi.ts` | `GET /api/tracks`<br>`GET /api/tracks/:id`<br>`GET /api/tracks/rated`<br>`POST /api/tracks/:id/rate` | 트랙 관련 |
| `artistApi.ts` | `GET /api/artists`<br>`GET /api/artists/:id`<br>`GET /api/artists/liked`<br>`POST /api/artists/:id/like` | 아티스트 관련 |
| `collectionApi.ts` | `GET /api/collections`<br>`POST /api/collections`<br>`PUT /api/collections/:id`<br>`DELETE /api/collections/:id` | 컬렉션 CRUD |
| `commentApi.ts` | `GET /api/comments`<br>`POST /api/comments`<br>`PUT /api/comments/:id`<br>`DELETE /api/comments/:id` | 댓글 CRUD |
| `reviewApi.ts` | `GET /api/reviews`<br>`GET /api/reviews/my`<br>`POST /api/reviews`<br>`PUT /api/reviews/:id` | 리뷰 CRUD |
| `userApi.ts` | `GET /api/user/profile`<br>`GET /api/user/:id`<br>`PUT /api/user/profile` | 사용자 프로필 |
| `authApi.ts` | `POST /api/auth/login`<br>`POST /api/auth/register`<br>`POST /api/auth/logout`<br>`GET /api/auth/me` | 인증 |

### Step 3: Import 설정

APIdog에서 생성된 각 API 파일은 다음과 같이 import해야 합니다:

```typescript
// 모든 *Api.ts 파일 상단에 추가
import apiClient from './client';

// 타입은 types.ts에서 import
import { HomePageData, Collection, Comment } from './types';
```

**예시 코드 구조:**
```typescript
// homeApi.ts
import apiClient from './client';
import { HomePageData } from './types';

export const getHomeData = async (): Promise<HomePageData> => {
  const response = await apiClient.get<HomePageData>('/home');
  return response.data;
};

export const getRecommendedCollections = async (limit?: number): Promise<Collection[]> => {
  const response = await apiClient.get<{ collections: Collection[] }>(
    '/collections/recommended',
    { params: { limit } }
  );
  return response.data.collections;
};
```

### Step 4: 코드 배치

생성된 파일들을 다음 위치에 배치:

```
src/api/
├── client.ts           ✅ 이미 존재 (수정 금지)
├── config.ts           ✅ 이미 존재 (수정 금지)
├── types.ts            ⬅️ APIdog에서 생성하여 여기에 배치
├── homeApi.ts          ⬅️ APIdog에서 생성하여 여기에 배치
├── searchApi.ts        ⬅️ APIdog에서 생성하여 여기에 배치
├── albumApi.ts         ⬅️ APIdog에서 생성하여 여기에 배치
├── trackApi.ts         ⬅️ APIdog에서 생성하여 여기에 배치
├── artistApi.ts        ⬅️ APIdog에서 생성하여 여기에 배치
├── collectionApi.ts    ⬅️ APIdog에서 생성하여 여기에 배치
├── commentApi.ts       ⬅️ APIdog에서 생성하여 여기에 배치
├── reviewApi.ts        ⬅️ APIdog에서 생성하여 여기에 배치
├── userApi.ts          ⬅️ APIdog에서 생성하여 여기에 배치
└── authApi.ts          ⬅️ APIdog에서 생성하여 여기에 배치
```

## 📝 APIdog 코드 생성 후 할 일

### Step 1: 타입 확인
1. `src/api/types.ts`의 field명 확인
2. 기존 `src/types/api.ts`와 비교
3. **차이가 있다면 APIdog types.ts를 따름**

### Step 2: Custom Hooks 작성
`src/hooks/` 디렉토리에 각 페이지별 hook 작성

**예시: `src/hooks/useHomeData.ts`**
```typescript
import { useState, useEffect } from 'react';
import { getHomeData } from '@/api/homeApi';
import { HomePageData } from '@/api/types';

export const useHomeData = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getHomeData();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
```

### Step 3: 페이지 컴포넌트 수정

각 페이지에서 mock data를 제거하고 hook 사용:

**Before (mock data):**
```typescript
export function HomePage({ onNavigate }: Props) {
  const [collections] = useState([
    { id: '1', title: '새벽에 듣는 음악', ... },
    // hardcoded data...
  ]);

  return (
    <div>
      {collections.map(collection => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
}
```

**After (API integration):**
```typescript
import { useHomeData } from '@/hooks/useHomeData';

export function HomePage({ onNavigate }: Props) {
  const { data, loading, error } = useHomeData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.collections.map(collection => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
}
```

## 🔧 환경 설정

### API Base URL
`.env` 파일에서 API 서버 URL 설정:

```env

VITE_ENV=development
```

프로덕션 배포 시 `.env.production` 생성:
```env
```

### 인증 토큰
`client.ts`의 interceptor가 자동으로 처리:
- localStorage에서 `authToken` 읽어서 `Authorization` 헤더에 추가
- 401 에러 시 자동으로 토큰 제거 및 `auth:unauthorized` 이벤트 발생

## ⚠️ 중요 사항

### 1. Field명 우선순위
- ✅ APIdog `types.ts`의 field명이 **절대 우선**
- ❌ 기존 코드를 APIdog 타입에 맞춰 수정

**예시:**
- APIdog: `{ albumTitle: string }`
- 기존 코드: `{ title: string }`
- → 컴포넌트 코드를 `albumTitle`로 수정

### 2. Base URL 설정
- `client.ts`에 이미 설정됨
- API 함수에서는 상대 경로만 사용
- ✅ `/home`
- ❌ `http://localhost:8000/api/home`

### 3. 에러 처리
모든 API 호출은 try-catch로 감싸기:
```typescript
try {
  const data = await getHomeData();
  // success
} catch (error) {
  // error handling
  console.error('API Error:', error);
}
```

## 📞 다음 단계

1. ⚠️ **APIdog에서 위 설정대로 코드 생성**
2. ⚠️ **생성된 파일들을 `src/api/`에 배치**
3. ⚠️ **Custom hooks 작성 (`src/hooks/`)**
4. ⚠️ **페이지 컴포넌트 수정 (21개 파일)**
5. ⚠️ **기존 `src/types/api.ts` 삭제 또는 deprecated 처리**
6. ⚠️ **테스트 및 디버깅**

## 📚 참고 문서

- `src/api/README.md` - API 디렉토리 상세 가이드
- `src/hooks/README.md` - Custom hooks 작성 가이드
- `src/api-examples/API-SPEC.md` - API 명세서
- `CLAUDE.md` - 프로젝트 전체 가이드

---

**질문이나 문제가 있으면 개발팀에 문의하세요.**
