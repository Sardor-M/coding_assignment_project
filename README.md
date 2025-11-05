# OpenPlan Frontend Assignment (Monorepo)

안녕하세요. 본 저장소는 오픈플랜 프론트엔드 코딩 과제 결과물입니다. 제출 마감 기한 내에 요구사항을 모두 구현하려고 집중했으며, 일부 성능/최적화 항목은 시간 제약으로 기본 수준으로 두었습니다. 따라서 최초 로딩이나 이미지 처리 시 약간의 지연이 있을 수 있습니다. (추후 최적화 여지 상세는 아래 참고)

## 링크
- GitHub: (제출 시 링크 기입)
- Vercel 배포(Web): (제출 시 링크 기입)

## 기술 스택
- Monorepo: Turborepo + pnpm
- Framework: Next.js (App Router)
- UI: Tailwind CSS (Web은 v3, Storybook 개발 편의상 v4 플러그인 사용)
- 상태 관리: Zustand
- 서버 상태: TanStack Query (React Query)
- 품질: ESLint, Prettier, TypeScript
- 문서/디자인: Storybook

## 워크스페이스 구조
```
apps/
  web/         # 메인 과제 앱 (Next.js)
  docs/        # 템플릿 예제 앱 (Next.js) - 과제 필수 대상 아님
  storybook/   # UI 개발 & 문서 환경 (Next.js 기반)
packages/
  ui/          # 공용 UI 라이브러리 (Button, Loading, InfoCard 등)
  eslint-config/
  typescript-config/
```

## 요구사항 매핑
- [x] 터보레포 설치 및 pnpm 사용: monorepo 구성 완료
- [x] 워크스페이스 2개(web, storybook): `apps/web`, `apps/storybook`
- [x] Figma 참고 UI 구현: 모바일/태블릿/데스크탑 반응형 레이아웃 구현
- [x] `packages/ui`에 버튼 컴포넌트 생성: 변형(variant), 크기(size), 로딩 상태 지원
- [x] 버튼 스토리북 작성: 상태별(Primary/Secondary/Loading/Disabled/Size) 스토리 제공
- [x] web에서 공용 버튼 사용: `@repo/ui` 의 Button 사용
- [x] CSS 방식 자유: Tailwind CSS 사용 (컴포넌트 레벨 유틸리티 + 약간의 커스텀)
- [x] 라우팅: 조회 전 `/`, 조회 후 `/result`
- [x] API: `https://picsum.photos/id/0/info` (임의 id로 조회) 사용
- [x] API 통신 후 `/result`로 데이터 전달: Zustand + Query 조합으로 처리
- [x] GitHub Public 업로드: (제출 시 링크)
- [x] Vercel 배포: web 워크스페이스만 배포 (제출 시 링크)

### 추가 사항(선택 구현)
- [x] TanStack Query로 서버 상태 관리
- [x] Zustand로 사진 데이터 전역 관리 + `persist`로 새로고침 유지
- [x] 버튼 디바운스 + 로딩 애니메이션
- [x] 한번이라도 조회 이력 있으면 자동으로 `/result` 이동
- [x] `/result` 직접 접근 시 1초 후 메인으로 리다이렉션
- [x] 조회 페이지 정보 영역 Skeleton(간이 LoadingWrapper로 대체)
- [x] 배경을 조회한 사진으로 생성
- [x] 404 페이지 구현 (`app/not-found.tsx`)
- [x] ESLint, Prettier 설정 및 적용

## 주요 기능 설명
- 홈(`/`)
  - TanStack Query로 사진 정보 요청
  - 버튼 클릭 시 디바운스(중복 클릭 방지) + 스피너 노출 후 `/result`로 이동
  - 반응형 타이포그래피/레이아웃(Figma 참고)
- 결과(`/result`)
  - 조회한 사진이 없거나(`photo` 없음) 조회 이력이 없으면 1초 후 메인으로 이동
  - 사진/메타정보 카드/이전 버튼 레이아웃(모바일/태블릿/데스크탑 차등 구성)
  - 이전 버튼 클릭 시 작은 로딩 오버레이 노출 후 메인으로 이동
- 전역 상태(Zustand)
  - `photo`, `blobUrl`, `hasViewedPhoto` 및 관련 setter 제공
  - `persist`로 새로고침 시에도 유지

## 실행 방법
사전 요구사항: Node.js ≥ 18, pnpm ≥ 9

1) 의존성 설치
```bash
pnpm i
```

2) 개발 서버
```bash
# 전체
pnpm dev
# 또는 특정 워크스페이스만
pnpm -F web dev
pnpm -F storybook storybook
```

3) 빌드
```bash
pnpm build
# 또는 개별
pnpm -F web build
pnpm -F storybook build
```

4) 린트/포맷
```bash
pnpm lint
pnpm format
```

## 패키지/설정 메모
- Web(Tailwind v3)
  - `apps/web/tailwind.config.js` + `@tailwind base; components; utilities;`
  - Next 이미지 원격 도메인 허용 및 `transpilePackages: ['@repo/ui']`
- Storybook
  - Next.js 기반 프리뷰에 Tailwind v4 플러그인(`@tailwindcss/postcss`) 구성
  - `@repo/ui` 워크스페이스 경로를 Vite alias로 해석하도록 설정
- UI 패키지(`packages/ui`)
  - `Button`, `Loading`, `LoadingWrapper`, `InfoCard` 등 제공
  - 스토리북에서 상태별 문서화

## 성능/한계 및 개선 여지
- 제출 기한 내 구현 집중으로, 첫 로딩 및 이미지 관련 처리에서 약간의 지연이 있을 수 있습니다.
- 향후 개선 아이디어
  - 이미지 프리로드/리사이즈 적용, 캐시 전략 고도화
  - React Query 캐시 TTL/GC 최적화 및 Prefetch
  - 라이트하우스/CLS 최적화(폰트/이미지 로딩 최적화)
  - 컴포넌트 단위 코드 스플리팅 정교화

## 테스트 방법(핵심 플로우)
1) `/` 접속 → “다음” 버튼 클릭 → 디바운스 로딩 → `/result` 이동
2) `/result` 새로고침 또는 직접 접근 → 1초 후 `/`로 자동 이동
3) 조회 이력 존재 시 `/` 접근 → 자동으로 `/result` 이동

## 스크립트
- `pnpm dev` 전체 개발 서버
- `pnpm build` 전체 빌드
- `pnpm -F web dev|build|start` Web 전용 실행
- `pnpm -F storybook storybook|build` Storybook 전용 실행

## 문의
과제 관련 문의나 추가 요청이 있으시면 언제든지 편하게 말씀해 주세요. 좋은 결과로 이어질 수 있도록 최선을 다하겠습니다.
