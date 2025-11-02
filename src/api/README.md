# API Integration Directory

이 디렉토리는 APIdog에서 생성한 API 코드를 배치하는 곳입니다.

## 📂 디렉토리 구조

```
src/api/
├── README.md              (이 파일)
├── client.ts              ✅ 이미 생성됨 - Axios 클라이언트 설정
├── config.ts              ✅ 이미 생성됨 - API 환경 설정
│
├── types.ts               ⚠️ APIdog에서 생성 필요 - 모든 타입 정의
│
├── homeApi.ts             ⚠️ APIdog에서 생성 필요 - 홈페이지 API
├── searchApi.ts           ⚠️ APIdog에서 생성 필요 - 검색 API
├── albumApi.ts            ⚠️ APIdog에서 생성 필요 - 앨범 API
├── trackApi.ts            ⚠️ APIdog에서 생성 필요 - 트랙 API
├── artistApi.ts           ⚠️ APIdog에서 생성 필요 - 아티스트 API
├── collectionApi.ts       ⚠️ APIdog에서 생성 필요 - 컬렉션 API
├── commentApi.ts          ⚠️ APIdog에서 생성 필요 - 댓글 API
├── reviewApi.ts           ⚠️ APIdog에서 생성 필요 - 리뷰 API
├── userApi.ts             ⚠️ APIdog에서 생성 필요 - 사용자 API
└── authApi.ts             ⚠️ APIdog에서 생성 필요 - 인증 API
```

## 🔧 APIdog 코드 생성 설정

### 1. HTTP Client 선택
- **선택:** Axios
- **이유:** 이미 `client.ts`에 Axios 인스턴스가 설정되어 있음

### 2. Language 선택
- **선택:** TypeScript
- **이유:** 프로젝트가 TypeScript로 작성됨

### 3. 파일 구조
- **선택:** 여러 파일 (Multiple files)
- **endpoint별로 분리된 파일 생성**

### 4. Import 설정
APIdog에서 생성된 코드가 다음과 같이 import하도록 설정:

```typescript
import apiClient from './client';
// 또는
import { apiClient } from './client';
```

## 📝 APIdog에서 생성해야 할 파일

### 1. types.ts
**모든 Request/Response 타입 정의**
```typescript
// 예시
export interface HomePageData {
  collections: Collection[];
  popularComments: Comment[];
  recentComments: Comment[];
}

export interface Collection {
  id: string;
  title: string;
  // ... APIdog response 기준으로 정의
}
```

### 2. 각 API 파일들 (*Api.ts)
각 endpoint별로 함수 생성:

**homeApi.ts 예시:**
```typescript
import apiClient from './client';
import { HomePageData } from './types';

export const getHomeData = async (): Promise<HomePageData> => {
  const response = await apiClient.get<HomePageData>('/home');
  return response.data;
};
```

## 🎯 생성할 API 파일 목록

### homeApi.ts
- `GET /api/home` - 홈페이지 전체 데이터
- `GET /api/collections/recommended` - 추천 컬렉션
- `GET /api/comments/popular` - 인기 댓글
- `GET /api/comments/recent` - 최근 댓글

### searchApi.ts
- `GET /api/search` - 통합 검색
- `GET /api/search/albums` - 앨범 검색
- `GET /api/search/tracks` - 트랙 검색
- `GET /api/search/artists` - 아티스트 검색

### albumApi.ts
- `GET /api/albums` - 앨범 목록
- `GET /api/albums/:id` - 앨범 상세
- `GET /api/albums/rated` - 평점 매긴 앨범
- `POST /api/albums/:id/rate` - 앨범 평점 등록

### trackApi.ts
- `GET /api/tracks` - 트랙 목록
- `GET /api/tracks/:id` - 트랙 상세
- `GET /api/tracks/rated` - 평점 매긴 트랙
- `POST /api/tracks/:id/rate` - 트랙 평점 등록

### artistApi.ts
- `GET /api/artists` - 아티스트 목록
- `GET /api/artists/:id` - 아티스트 상세
- `GET /api/artists/liked` - 좋아요한 아티스트
- `POST /api/artists/:id/like` - 아티스트 좋아요

### collectionApi.ts
- `GET /api/collections` - 모든 컬렉션
- `GET /api/collections/:id` - 컬렉션 상세
- `GET /api/collections/my` - 내 컬렉션
- `GET /api/collections/liked` - 좋아요한 컬렉션
- `POST /api/collections` - 컬렉션 생성
- `PUT /api/collections/:id` - 컬렉션 수정
- `DELETE /api/collections/:id` - 컬렉션 삭제
- `POST /api/collections/:id/like` - 컬렉션 좋아요

### commentApi.ts
- `GET /api/comments` - 댓글 목록
- `GET /api/comments/:id` - 댓글 상세
- `POST /api/comments` - 댓글 작성
- `PUT /api/comments/:id` - 댓글 수정
- `DELETE /api/comments/:id` - 댓글 삭제
- `POST /api/comments/:id/like` - 댓글 좋아요

### reviewApi.ts
- `GET /api/reviews` - 리뷰 목록
- `GET /api/reviews/:id` - 리뷰 상세
- `GET /api/reviews/my` - 내 리뷰
- `POST /api/reviews` - 리뷰 작성
- `PUT /api/reviews/:id` - 리뷰 수정
- `DELETE /api/reviews/:id` - 리뷰 삭제

### userApi.ts
- `GET /api/user/profile` - 내 프로필
- `GET /api/user/:id` - 사용자 상세
- `PUT /api/user/profile` - 프로필 수정

### authApi.ts
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보

## ⚠️ 중요 사항

### 1. Field명 우선순위
- **APIdog의 Response field명이 절대 우선입니다**
- 기존 `src/types/api.ts`의 타입과 다를 수 있음
- APIdog `types.ts`의 field명을 따르고, 컴포넌트 코드를 수정해야 함

### 2. Import 경로
APIdog 생성 코드에서 client import:
```typescript
import apiClient from './client';  // ✅ 올바른 import
```

### 3. Base URL
- `client.ts`에 이미 설정됨
- APIdog 코드에서는 상대 경로만 사용: `/home`, `/albums/:id` 등

### 4. 인증 토큰
- `client.ts`의 request interceptor가 자동으로 처리
- APIdog 코드에서 별도로 토큰 처리 불필요

## 🚀 다음 단계

1. ✅ Axios 설치 완료
2. ✅ API client 설정 완료
3. ⚠️ APIdog에서 위 API 파일들 생성
4. ⚠️ 생성된 파일들을 `src/api/` 디렉토리에 배치
5. ⚠️ Custom hooks 작성 (`src/hooks/`)
6. ⚠️ 페이지 컴포넌트에서 mock data 제거 및 API 호출 적용

## 📞 문의

API 통합 관련 질문이나 문제가 있으면 개발팀에 문의하세요.
