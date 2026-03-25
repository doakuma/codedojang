# Codedojang — 현재 상태

> Phase 완료마다, 중요한 작업 전후로 업데이트합니다.
> 새 대화(서브 에이전트)를 시작할 때 이 파일 하나로 현재 상태를 파악할 수 있어야 합니다.

## 메타

- **마지막 업데이트:** 2026.03.25
- **현재 버전:** v0.2
- **배포 URL:** 미정 (로컬 개발 중)

## 완료된 것

### v0.1 — 기초 수련 시스템 구축

- Next.js 16.2.1 App Router 마이그레이션 (Vite → Next.js)
- `src/lib/curriculum.js` — 7 topics × 7 gates = 49관문 전체 데이터
- 동적 라우팅 `[topic]/[slug]` + `generateStaticParams()` (56개 정적 경로)
- `GatePage` — 이론 비급 + 코드 에디터 + 이전/다음/목록 네비게이션
- `SooryeonLayout` — 문파 이론 + 관문 카드 그리드
- `CodeEditor` — Sandpack 기반 실시간 React 실행
- `MarkdownViewer` — react-markdown v9, 코드블록/인라인 코드 분리 렌더링
- `/training` 인덱스 페이지 생성
- 홈 페이지 curriculum.js 단일 소스 전환 (`roadmap.js` 삭제)
- 전체 디자인 시스템 통일 (CSS 변수 기반)
- hydration 에러 수정 (`<p><pre>` 중첩 문제)

### v0.2 — 클린업 및 글로벌 레이아웃

- `src/lib/routes.js` 삭제 — Vite `import.meta.glob` 사용, Next.js 런타임 에러 유발
- `src/components/layout/MainLayout.jsx` 삭제 — `react-router-dom` 의존, 미사용
- `src/components/layout/Header.jsx` 생성 — 글로벌 헤더 (로고, 수련장 링크, GitHub)
- `src/app/layout.js` 업데이트 — Header + Footer 글로벌 셸 적용

### v0.2 — GSD 문서 구조 셋업

- `.claude/CLAUDE.md` — 오케스트레이터 지침
- `.claude/commands/` — plan / execute / verify / status 커맨드
- `docs/project.md` — 프로젝트 정의 (변하지 않는 것)
- `docs/requirements.md` — 기능 요구사항 (MoSCoW)
- `docs/state.md` — 현재 상태 (이 파일)
- `docs/decisions.md` — 기술 결정 로그 (ADR)
- `tasks/` 폴더 구조 생성

## 현재 진행 중

없음.

## 즉시 실행 가능한 것

- [ ] 수련 진도 추적 기능 구현 (`tasks/backlog/progress-tracking.md` 참조)
- [ ] `src/lib/routes.js` 삭제 — Vite 시절 잔재, 미사용 파일

## 블로커

없음.

## 알려진 이슈

| # | 내용 | 우선순위 |
|---|------|----------|
| 1 | `src/lib/routes.js` — Vite 잔재 파일, 미사용 | 낮음 |

## 최근 주요 결정사항

- **2026.03.25** GSD 방법론 기반 문서 구조 도입 (`docs/`, `.claude/`, `tasks/`)
- **2026.03.24** react-markdown v9 `pre`/`code` 분리 렌더러로 hydration 에러 해결
- **2026.03.24** curriculum.js 단일 소스 확립, roadmap.js 폐기
- **2026.03.24** Sandpack 도입으로 코드 에디터 실행 가능하게 전환
- 자세한 내역 → `docs/decisions.md`
