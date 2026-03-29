# 코드도보통지 — 현재 상태

> Phase 완료마다, 중요한 작업 전후로 업데이트합니다.
> 새 대화(서브 에이전트)를 시작할 때 이 파일 하나로 현재 상태를 파악할 수 있어야 합니다.

## 메타

- **마지막 업데이트:** 2026.03.27
- **현재 버전:** v0.2.1
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

### v0.2.1 — UI/UX 개선 + 단청 색상 + 다크모드

- 프로젝트명: 코드도장 → **코드도보통지** (武藝圖譜通志)
- UI/UX 점검 보고서 작성 (`docs/ui-ux-review.md`)
- 단청 색상 팔레트 (v1: 우아한 한옥) 적용
  - Light: #fffef4 (한지) + 오방색 (적/청/황/흑)
  - Dark: #0f0c0a (밤하늘) + 밝은 전통색
- 다크/라이트 모드 토글 구현
  - `src/hooks/useTheme.js` — localStorage + 시스템 설정
  - Header에 Moon/Sun 아이콘 버튼 추가
  - `globals.css` 최적화 (data-theme 속성 기반)
- 불필요한 이모지 제거 (🏯 일본 가옥)

## 현재 진행 중

### 심층 분석 완료 (2026-03-29)

**내용:**
- 49개 관문의 학습 경험 분석
- 실무 적응성 평가
- 부족한 부분 (Gap Analysis) 문서화
- 향후 로드맵 수립

**산출물:**
- [docs/analysis-gaps.md](analysis-gaps.md) — 심층 분석 보고서
- [docs/roadmap-v1.md](roadmap-v1.md) — 실행 로드맵 (v0.3-v1.0)
- [docs/requirements.md](requirements.md) 업데이트 — 우선순위 재정렬

**주요 발견:**
- 기술 아키텍처: 9/10 ✅
- 학습 경험: 4.3/10 ❌ (검증 부재)
- 실무 적응성: 3.5/10 🔴 (배운 것의 40-53%만 직접 적용)
- 라이브러리 연결: 2/10 ❌ (TanStack Query, Zustand 등 미포함)

## 즉시 실행 가능한 것

- [ ] **v0.2.x: 수련 진도 추적** — localStorage 기반 완료 상태 저장
  - `useProgress` 훅 생성
  - GatePage에 "관문 완료" 버튼
  - SooryeonCard에 완료 배지 (초록색)
  - 문파별 진도율 표시
- [ ] 스타일 관련 미완료 작업 (따로 추적)
- [ ] `src/lib/routes.js` 삭제 — Vite 시절 잔재, 미사용 파일

## 블로커

없음.

## 알려진 이슈

| # | 내용 | 우선순위 |
|---|------|----------|
| 1 | `src/lib/routes.js` — Vite 잔재 파일, 미사용 | 낮음 |

## 최근 주요 결정사항

- **2026.03.27** 프로젝트명: 코드도장 → 코드도보통지 (武藝圖譜通志)
- **2026.03.27** 단청 색상 팔레트 (v1: 우아한 한옥) 확정
- **2026.03.27** 다크/라이트 모드 토글: localStorage 기반 + 시스템 설정 fallback
- **2026.03.25** GSD 방법론 기반 문서 구조 도입 (`docs/`, `.claude/`, `tasks/`)
- **2026.03.24** react-markdown v9 `pre`/`code` 분리 렌더러로 hydration 에러 해결
- 자세한 내역 → `docs/decisions.md`
