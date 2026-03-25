# Codedojang — Claude 지침

> Claude Code가 모든 작업 전에 읽는 핵심 지침.
> 프로젝트의 변하지 않는 결정사항과 컨텍스트를 담는다.

## 프로젝트 개요

React 핵심 원리를 7대 문파 × 49관문 체계로 수련하는 인터랙티브 학습 플랫폼.
정공법(正攻法)으로 useState부터 Next.js RSC까지 단계적으로 체득한다.
학습자가 이론을 읽고, 코드를 직접 실행하며, 관문을 순서대로 정복하는 구조.

## 기술 스택 결정사항

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| 프레임워크 | Next.js App Router | 16.2.1 | RSC, 정적 생성(`generateStaticParams`), 파일 기반 라우팅 |
| 언어 | JavaScript (JSX) | — | TypeScript 미사용 — 학습자 진입 장벽 최소화 |
| 스타일링 | Tailwind v4 + shadcn/ui | ^4 | Zero-config, CSS 변수 기반 디자인 토큰 |
| 코드 에디터 | @codesandbox/sandpack-react | ^2.20.0 | iframe 격리 실행 → React 19 호스트와 충돌 없음 |
| 마크다운 | react-markdown v9 + remark-gfm | ^9 | |
| 패키지 관리 | pnpm | — | 빠른 설치, 디스크 효율 |

## 코드 컨벤션 (반드시 지킬 것)

- **언어:** `.ts`, `.tsx` 파일 생성 금지. JavaScript(`.js`, `.jsx`)만 사용
- **패키지:** `npm` 명령 금지 — `pnpm`만 사용
- **RSC 우선:** `'use client'`는 이벤트 핸들러·브라우저 API·Sandpack 등 반드시 필요한 경우에만
- **데이터 단일 소스:** 커리큘럼 데이터는 `src/lib/curriculum.js`에서만 읽는다. 다른 곳에 토픽/관문 데이터 중복 금지
- **디자인 토큰:** `bg-zinc-*` 등 팔레트 직접 참조 금지 → `bg-background`, `text-foreground`, `bg-card`, `border-border` 등 CSS 변수 사용
- **파일명:** 컴포넌트 `PascalCase.jsx`, 라이브러리·유틸 `camelCase.js`, 라우트 `page.js`

## 프로젝트 경로

`C:\PrivateSpace\02 dojo\codedojang`

## 문서 구조

| 파일 | 용도 | 업데이트 빈도 |
|------|------|--------------|
| `docs/project.md` | 비전, 기술 결정, 컨벤션 | 방향 전환 시만 |
| `docs/requirements.md` | 기능 요구사항 (MoSCoW) | 기능 추가/변경 시 |
| `docs/state.md` | 현재 상태 스냅샷 | Phase 완료마다 |
| `docs/decisions.md` | 기술 결정 로그 (ADR) | 결정 시 즉시 |
| `docs/traning_list.md` | 전체 커리큘럼 명세 | 수정 금지 (마스터 소스) |
| `tasks/active/` | 현재 실행 중인 태스크 | — |
| `tasks/completed/` | 완료된 태스크 | — |
| `tasks/backlog/` | 예정 태스크 | — |

## 작업 시작 전 체크리스트

1. `docs/state.md` 읽어서 현재 상태 파악
2. `tasks/active/` 폴더에 실행 중인 계획서 있는지 확인
3. 계획서 없으면 `/plan` 커맨드로 계획 먼저 수립하고 승인받기
