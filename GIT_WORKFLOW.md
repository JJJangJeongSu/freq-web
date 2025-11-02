# Git Workflow & Version Control Strategy

## 📋 브랜치 전략

### 브랜치 구조 (GitHub Flow 기반)

```
main (프로덕션 레디)
  ├── feature/auth-integration      # 인증 관련 기능
  ├── feature/home-api             # 홈 페이지 API 통합
  ├── feature/search-api           # 검색 기능
  ├── feature/rate-record-api      # 평가 기록 API
  ├── fix/duplicate-check          # 버그 수정
  └── refactor/api-logging         # 리팩토링
```

### 브랜치 네이밍 규칙

| Prefix | 설명 | 예시 |
|--------|------|------|
| `feature/` | 새로운 기능 개발 | `feature/user-profile-api` |
| `fix/` | 버그 수정 | `fix/login-validation` |
| `refactor/` | 코드 리팩토링 (기능 변경 없음) | `refactor/api-structure` |
| `docs/` | 문서 작업만 | `docs/api-integration-guide` |
| `test/` | 테스트 추가/수정 | `test/auth-unit-tests` |
| `chore/` | 빌드, 설정, 의존성 업데이트 | `chore/update-dependencies` |
| `style/` | 코드 포맷팅, 세미콜론 등 | `style/format-components` |

### 브랜치 수명 주기

1. **생성**: 작업 시작 전 main에서 분기
2. **작업**: 해당 브랜치에서 개발 및 커밋
3. **머지**: 작업 완료 후 main에 머지
4. **삭제**: 머지 후 브랜치 삭제

---

## 💬 커밋 메시지 규칙 (Conventional Commits)

### 기본 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 종류

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat(auth): add Google OAuth login` |
| `fix` | 버그 수정 | `fix(validation): correct email regex pattern` |
| `refactor` | 리팩토링 | `refactor(api): extract duplicate API logic` |
| `docs` | 문서 수정 | `docs(readme): update API integration steps` |
| `test` | 테스트 추가/수정 | `test(auth): add login unit tests` |
| `chore` | 빌드/설정 변경 | `chore(deps): update React Query to v5` |
| `style` | 코드 스타일 변경 | `style(components): format with prettier` |
| `perf` | 성능 개선 | `perf(api): add response caching` |

### Scope (선택사항)

API 모듈이나 페이지 단위로 지정:
- `auth` - 인증 관련
- `home` - 홈페이지
- `search` - 검색
- `album` - 앨범 상세
- `user` - 사용자 프로필
- `api` - API 레이어
- `ui` - UI 컴포넌트

### Subject 규칙

- 영문 소문자로 시작
- 마침표(.) 사용 안 함
- 50자 이내로 작성
- 명령형 동사 사용 (add, fix, update, remove)

### Body (선택사항)

- 72자마다 줄바꿈
- "무엇을" 보다 "왜"와 "어떻게"를 설명
- 상세한 변경 사항 나열

### Footer

모든 커밋에 자동 추가:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 커밋 메시지 예시

#### 좋은 예시 ✅

```bash
feat(auth): implement email duplicate check with real-time validation

- Add real-time validation for email format
- Enable duplicate check button only when email is valid
- Display validation messages below input field
- Call GET /auth/check-email API endpoint

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

```bash
fix(api): resolve token refresh infinite loop

Prevent multiple concurrent 401 requests from triggering
simultaneous token refresh by implementing request queue.

- Add isRefreshing flag to prevent duplicate refresh calls
- Queue failed requests during token refresh
- Retry queued requests with new token

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

#### 나쁜 예시 ❌

```bash
update code
```

```bash
fixed bug
```

```bash
WIP - working on auth
```

---

## 🔄 작업 워크플로우

### 1. 새 작업 시작

```bash
# main 브랜치 최신화
git checkout main
git pull origin main

# 새 feature 브랜치 생성
git checkout -b feature/task-name

# 예시
git checkout -b feature/home-api-integration
```

### 2. 작업 진행 중

```bash
# 변경사항 확인
git status
git diff

# 파일 스테이징
git add .
# 또는 특정 파일만
git add src/pages/HomePage.tsx

# 커밋 (Conventional Commits 형식)
git commit -m "feat(home): integrate recommendations API

- Add useHomeData hook for fetching home page data
- Replace mock data with real API calls
- Handle loading and error states

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
"
```

### 3. 작업 완료 및 머지

```bash
# main 브랜치로 전환
git checkout main

# feature 브랜치 머지
git merge feature/task-name

# 머지 후 feature 브랜치 삭제
git branch -d feature/task-name
```

### 4. 원격 저장소 사용 시 (GitHub)

```bash
# feature 브랜치 푸시
git push -u origin feature/task-name

# Pull Request 생성 (GitHub 웹에서)
# 리뷰 후 머지

# 로컬 main 업데이트
git checkout main
git pull origin main

# 로컬 feature 브랜치 삭제
git branch -d feature/task-name
```

---

## 📝 작업 단위 정의

### Feature 단위 브랜치 예시

| 브랜치명 | 작업 내용 | 완료 기준 |
|---------|----------|----------|
| `feature/home-api` | 홈페이지 API 통합 | 추천 앨범, 인기 코멘트, 최근 코멘트 API 연결 완료 |
| `feature/search-api` | 검색 기능 API 통합 | 통합 검색, 앨범 검색, 트랙 검색 API 연결 완료 |
| `feature/album-detail-api` | 앨범 상세 API 통합 | 앨범 정보, 트랙 리스트, 리뷰 API 연결 완료 |
| `feature/rate-record-api` | 평가 기록 API 통합 | 앨범/트랙 평가 저장, 평가 내역 조회 API 연결 완료 |
| `fix/duplicate-check-error` | 중복 검사 버그 수정 | Request interrupted 에러 해결 |
| `refactor/api-error-handling` | API 에러 처리 개선 | 일관된 에러 처리 로직 적용 |

### 커밋 크기 가이드

- **작은 커밋 선호**: 하나의 논리적 변경사항 = 하나의 커밋
- **최소 단위**: 파일 하나의 기능 추가/수정
- **최대 단위**: 하나의 완전한 기능 (페이지 하나 또는 API 엔드포인트 하나)

---

## 🚫 주의사항

### 하지 말아야 할 것

1. ❌ main 브랜치에서 직접 작업
2. ❌ 의미 없는 커밋 메시지 (`update`, `fix`, `WIP`)
3. ❌ 거대한 커밋 (100+ 파일 변경)
4. ❌ 여러 기능을 하나의 커밋에 포함
5. ❌ 깨진 상태로 커밋 (빌드 실패, 에러 발생)

### 해야 할 것

1. ✅ feature 브랜치에서 작업
2. ✅ 명확하고 설명적인 커밋 메시지
3. ✅ 자주 커밋 (논리적 단위마다)
4. ✅ 머지 전 테스트 확인
5. ✅ main은 항상 배포 가능한 상태 유지

---

## 🎯 현재 프로젝트 작업 계획

### Phase 1: Authentication ✅ (완료)
- [x] API 클라이언트 설정
- [x] React Query 설정
- [x] 로그인/회원가입 API 연결
- [x] 토큰 refresh 로직
- [x] 이메일/닉네임 중복 검사 + 실시간 유효성 검사

### Phase 2: Home Page API (다음 작업)
Branch: `feature/home-api-integration`
- [ ] 추천 앨범/트랙 API 연결
- [ ] 인기 코멘트 API 연결
- [ ] 최근 코멘트 API 연결

### Phase 3: Search API
Branch: `feature/search-api-integration`
- [ ] 통합 검색 API 연결
- [ ] 앨범 검색 API 연결
- [ ] 트랙 검색 API 연결

### Phase 4: Detail Pages
Branch: `feature/detail-pages-api`
- [ ] 앨범 상세 API 연결
- [ ] 트랙 상세 API 연결
- [ ] 아티스트 상세 API 연결

---

## 📚 참고 자료

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Git Branching Best Practices](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
