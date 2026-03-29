# 소스 코드 분석 대담 — 컨텍스트

> **시작일:** 2026-03-29
> **목적:** 현재 소스코드의 기술 선택과 구현 방식이 왜 이렇게 됐는지 분석
> **포맷:** 상호작용형 대담 (구체적인 코드 포함)

---

## 오늘 나눈 대담 내용

### 문제 인식

사용자의 초기 목표:
- **"특정 상황에 닥쳤을 때 문제를 해결할 수 있을까"** — 실무 중심 학습

현재 상황:
- 프로젝트가 "바이브 코딩"을 하고 있음
- 기술 스택 선택에 **근거가 없음**
  - Next.js? Sandpack? Tailwind? 왜?
- 컴포넌트 설계에 **로직이 없음**
  - 49개 관문? 왜 49개?
  - 슬러그 라우팅? 다른 방법은 없나?
- 데이터 구조가 **고민 없이 진행됨**
  - curriculum.js가 단일 소스? 왜 이게 최선?

### 사용자의 실제 의도

**"장대한 철학이 아니라, 순전히 개발된 소스의 철학을 궁금해함"**

즉:
- CLAUDE.md의 추상적 가이드 ❌
- 실제 코드가 왜 이렇게 짜여 있는가? ✅

---

## 물어볼 수 있는 주제 (확장 가능)

### 기술 스택
- **next-js-choice** — Next.js App Router를 선택한 이유? (vs Vite, Remix 등)
- **sandpack-editor** — Sandpack을 코드 에디터로 사용하는 이유?
- **tailwind-shadcn** — Tailwind + shadcn/ui 조합의 필요성?
- **javascript-only** — 왜 TypeScript를 사용하지 않는가?
- **markdown-engine** — remark/react-markdown이 최선인가?
- **package-manager** — pnpm 선택 이유?

### 컴포넌트 아키텍처
- **gatepage-layout** — GatePage의 레이아웃이 최적인가?
- **codeeditor-design** — CodeEditor와 MarkdownViewer 분리가 필요한가?
- **sooryeon-structure** — SooryeonLayout/Card의 역할 분담이 명확한가?
- **component-reusability** — 재사용 가능한 컴포넌트를 더 뺄 수 있나?
- **props-drilling** — Props drilling이 과도하지 않나?

### 라우팅과 데이터
- **slug-routing** — `[topic]/[slug]` 방식이 최선인가?
- **curriculum-single-source** — curriculum.js를 단일 소스로 유지하는 이유?
- **static-generation** — `generateStaticParams()`의 성능은?
- **dynamic-vs-static** — 동적 경로 vs 정적 생성의 트레이드오프?

### 상태 관리
- **state-management** — Context API / Zustand를 안 쓰는 이유?
- **usetheme-hook** — useTheme 훅의 구현이 복잡하지 않나?
- **useprogress-hook** — useProgress 훅의 향후 스케일 가능성?
- **localstorage-dependency** — localStorage 의존도가 높지 않나?

### 성능 최적화
- **sandpack-bundle** — Sandpack 번들 크기는?
- **data-loading** — 49개 관문을 한 번에 로드하는가?
- **asset-optimization** — 이미지/에셋 최적화는?
- **seo-strategy** — SSG가 정말 필요한가?

### 확장성과 유지보수
- **curriculum-scaling** — 관문이 500개가 되면 어떻게 할 건가?
- **content-management** — 콘텐츠 추가/수정 프로세스?
- **testing-strategy** — 테스트 구조를 어떻게 할 계획?
- **version-management** — v0.3, v0.4... 버전 관리 전략?

### 사용자 경험
- **mobile-optimization** — 모바일 최적화는?
- **dark-mode-complete** — 다크모드 구현이 완전한가?
- **accessibility** — 접근성(a11y)은 고려했나?
- **loading-performance** — 로딩 시간은 체감되지 않나?

---

## 대담 흐름

1. **사용자가 키워드 지정** (위의 태그 사용)
   - 예: `/dialogue sandpack-editor`
   - 예: `/dialogue curriculum-scaling`

2. **Claude가 해당 부분 파악**
   - 관련 파일 열기
   - 구체적 라인 코드 분석

3. **상호작용**
   - "왜 이렇게 설계했나?"
   - "대안은 무엇인가?"
   - "장점/단점은?"

4. **계속 탐구**
   - 관련 파일 비교
   - 다른 구현 방식 검토

---

## 이전 대화 기록

**2026-03-29:**
- 사용자: 프로젝트를 통해 대담을 원함
- 확인: 현재 v0.2.1 상태, v0.3 계획 대기 중
- 문제: 기술 스택과 로직의 근거가 불명확
- 해결 방향: 현재 소스코드의 각 부분이 왜 이렇게 됐는지 분석
- **약속:** 내일(2026-03-30) 소스 기반 대담 진행

---

## 다음 대담 시작 가이드

### 같은 PC에서
```bash
# 이 파일 열기
cat .claude/dialogue-notes.md

# 대담 시작 (키워드 사용)
대담을 시작하고 싶은데, [키워드] 부분부터 시작해줄래?
```

### 다른 PC에서
```bash
# 컨텍스트 확인
.claude/dialogue-notes.md 읽어줘

# 대담 진행
위에 나열된 주제 중 [키워드] 부분을 분석해줄래?
```

---

**마지막 업데이트:** 2026-03-29 저녁
**다음 업데이트:** 대담 진행 후 실시간 기록
