# 코드도보통지 — 프로젝트 정의

> 거의 변하지 않는 파일입니다.
> 기술 스택 교체, 방향 전환 시에만 업데이트합니다.

## 서비스 정의

- **서비스명:** 코드도보통지
- **한 줄 소개:** React 핵심 원리를 그림과 실습으로 배우는 49관문 인터랙티브 학습 플랫폼
- **핵심 문제:** 튜토리얼은 따라하지만 원리를 모르는 React 학습자가 "왜 이렇게 동작하는가"를 체득할 기회가 없다
- **타겟 사용자:** React 기초는 알지만 내부 동작 원리와 실전 패턴이 부족한 중급 입문자

## 기술 스택

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| 프레임워크 | Next.js App Router | 16.2.1 | RSC, `generateStaticParams` 정적 생성, 파일 기반 라우팅 |
| 언어 | JavaScript (JSX) | — | TypeScript 미사용 — 학습자 진입 장벽 최소화 |
| 스타일링 | Tailwind CSS v4 | ^4 | Zero-config (`@import "tailwindcss"` 한 줄), PostCSS 통합 |
| UI 컴포넌트 | shadcn/ui | — | 디자인 토큰(CSS 변수) 기반, 커스터마이징 용이 |
| 코드 에디터 | @codesandbox/sandpack-react | ^2.20.0 | iframe 격리 실행, React 19 호스트와 충돌 없음, 실시간 미리보기 |
| 마크다운 | react-markdown v9 + remark-gfm | ^9 | GFM 지원, 커스텀 컴포넌트 렌더링 |
| 패키지 관리 | pnpm | — | 빠른 설치, 디스크 효율, corepack 관리 |
| 런타임 | Node.js | v22.18.0 | NVM 관리 |

## 코드 컨벤션

### 파일 구조
- 컴포넌트: `src/components/shared/PascalCase.jsx`
- 페이지: `src/app/.../page.js`
- 라이브러리/유틸: `src/lib/camelCase.js`
- 데이터: `src/lib/curriculum.js` (단일 소스)

### 필수 규칙
- TypeScript 금지 — `.ts`, `.tsx` 파일 생성 금지
- `npm` 명령 금지 — `pnpm`만 사용
- `'use client'` 최소화 — RSC를 기본으로, 이벤트/브라우저 API 필요 시만 사용
- 커리큘럼 데이터 중복 금지 — `src/lib/curriculum.js`만 참조
- 디자인 토큰 사용 — `bg-zinc-*` 등 팔레트 직접 참조 금지

### Next.js 특이사항
- `params`는 `async/await`으로 수신 (Next.js 16 breaking change)
- `getSandpackCssText()` 서버 호출 금지 — 클라이언트 전용

## 배포 정보

- **환경:** 미정
- **URL:** 미정
- **CI/CD:** 미정

## 명시적 제외 항목 (Won't Do)

- **TypeScript 전환:** 학습 콘텐츠 중심 프로젝트이므로 타입 복잡도를 추가하지 않는다
- **사용자 인증/계정:** MVP 범위 초과. 진도는 로컬 스토리지로만 관리
- **백엔드 API / DB:** 콘텐츠는 정적 데이터(`curriculum.js`)로 관리. 서버 없음
- **모바일 앱:** 웹 전용
- **다국어(i18n):** 한국어 전용
