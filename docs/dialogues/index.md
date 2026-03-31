# 코드도보통지 — 소스 분석 대담

> 바이브 코딩으로 만들어진 소스코드를 사후 분석하는 대담 시리즈.
> "왜 이렇게 됐지?"를 파악해서 다음 프로젝트를 주도적으로 진행하기 위한 기록.

## 대담 목록

| # | 주제 | 키워드 | 날짜 |
|---|------|--------|------|
| 01 | [Next.js App Router 선택 — generateStaticParams 분석](./01-next-js-choice.md) | `next-js-choice` | 2026-03-30 |
| 02 | [순수 RSC — React Server Components 분석](./02-rsc-server-components.md) | `next-js-choice` 2부 | 2026-03-30 |
| 03 | [layout.js 메타데이터와 SEO](./03-metadata-seo.md) | `next-js-choice` 3부 | 2026-03-30 |
| 04 | [Next.js App Router 라우팅 — 세그먼트, 슬러그, 동적 경로](./04-routing.md) | `slug-routing` | 2026-03-30 |
| sp | [프론트엔드 개발자의 소양 — 7개 레이어와 프로젝트 매핑](./sp-frontend-competencies.md) | `frontend-competencies` | 2026-03-31 |
| sp | [브라우저를 이해한다 1부 — 렌더링 파이프라인 + 이벤트 루프](./sp-browser-1.md) | `browser-rendering`, `event-loop` | 2026-03-31 |

## 남은 주제

### 기술 스택
- `sandpack-editor` — Sandpack을 코드 에디터로 사용하는 이유?
- `tailwind-shadcn` — Tailwind + shadcn/ui 조합의 필요성?
- `javascript-only` — 왜 TypeScript를 사용하지 않는가?
- `markdown-engine` — remark/react-markdown이 최선인가?

### 컴포넌트 아키텍처
- `gatepage-layout` — GatePage의 레이아웃이 최적인가?
- `codeeditor-design` — CodeEditor와 MarkdownViewer 분리가 필요한가?
- `sooryeon-structure` — SooryeonLayout/Card의 역할 분담이 명확한가?

### 라우팅과 데이터
- `slug-routing` — `[topic]/[slug]` 방식이 최선인가?
- `curriculum-single-source` — curriculum.js를 단일 소스로 유지하는 이유?

### 상태 관리
- `state-management` — Context API / Zustand를 안 쓰는 이유?
- `usetheme-hook` — useTheme 훅의 구현이 복잡하지 않나?
- `localstorage-dependency` — localStorage 의존도가 높지 않나?

### 확장성
- `curriculum-scaling` — 관문이 500개가 되면 어떻게 할 건가?
- `testing-strategy` — 테스트 전략은?
