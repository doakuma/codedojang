---
name: 아키텍처 문서 생성 완료
description: 공통 로직, 컴포넌트, 사용자 여정을 정리한 3개 문서 작성됨
type: project
---

## 생성된 문서들 (2026-03-29)

새로운 개발자가 프로젝트 구조를 빠르게 이해하기 위해 3개 문서 작성:

### 1. `docs/architecture.md` (880줄)
- **전체 아키텍처 상세 설명**
- 공통 로직 (`curriculum.js`, `useTheme.js`, `utils.js`)
- 공통 컴포넌트 (Layout, Content, UI)
- 라우팅 및 사용자 여정 (4단계: 홈 → 수련장 → 문파 → 관문)
- 데이터 흐름, 디자인 토큰, 제약사항
- 정적 생성 최적화

### 2. `docs/component-tree.md` (450줄)
- **시각적 컴포넌트 구조**
- 전체 컴포넌트 트리 (마크다운 다이어그램)
- 컴포넌트별 책임 매트릭스
- 데이터 흐름 다이어그램 (빌드타임 vs 런타임)
- 클라이언트 vs 서버 컴포넌트 분리 기준
- 상태 관리 철학, 성능 최적화, 라우팅 매트릭스
- 아키텍처 진화 (v0.2.1 → v0.3 → v1.0)

### 3. `docs/quick-reference.md` (350줄)
- **빠른 참조 가이드 (치트시트)**
- 프로젝트 구조 한눈에 보기
- 주요 함수 & 훅 사용법
- 일반적인 작업 패턴
- 클라이언트 vs 서버 구분 기준
- 금지 사항 (TypeScript, npm, 직접 색상값 등)
- 트러블슈팅 테이블

## 핵심 내용 요약

**공통 로직 3가지:**
1. `curriculum.js` — 단일 데이터 소스 (getTopic, getGates, getAllTopicIds)
2. `useTheme.js` — localStorage 기반 테마 관리
3. `utils.js` — cn() 유틸 (Tailwind 클래스 병합)

**공통 컴포넌트 5가지:**
1. `Header` — 전역 sticky 헤더 (테마 토글)
2. `SooryeonLayout` — 문파 페이지 레이아웃
3. `GatePage` — 관문 콘텐츠 렌더링
4. `CodeEditor` — Sandpack 래퍼
5. `MarkdownViewer` — 마크다운 렌더러

**사용자 여정:**
1. 홈 (`/`) → 7개 문파 카드
2. 수련장 (`/training`) → 7개 문파 목록
3. 문파 (`/training/[topic]`) → 7개 관문 카드
4. 관문 (`/training/[topic]/[slug]`) → 이론 + 코드 에디터

## 향후 이용

- 새로운 개발자 온보딩 시: `quick-reference.md` 먼저 읽기
- 상세한 구조 이해: `architecture.md` 참고
- 컴포넌트 확장 시: `component-tree.md`의 의존성 맵 확인
- 새로운 페이지 추가: `component-tree.md`의 "정적 생성" 섹션 참고
