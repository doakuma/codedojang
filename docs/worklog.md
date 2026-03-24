## 🥋 Codedojang 수련 시스템 구축 실록 (Day 2 — Next.js 정공법 체계 완성)

### 작업 요약

Vite 기반 프로젝트를 Next.js App Router로 완전 마이그레이션한 뒤,
7대 문파 × 7관문의 수련 커리큘럼 시스템 전체를 설계하고 구현했다.

---

### 1. 아키텍처 설계

#### 라우팅 구조

```
src/app/training/
  [topic]/
    page.js          ← 문파 목록 (이론 + 관문 카드 7개)
    [slug]/
      page.js        ← 관문 상세 (이론 비급 + 수련 코드 에디터)
```

초기에는 `01-useState/`, `02-useEffect/` … 7개 폴더를 개별 생성했으나,
구조가 동일하고 데이터만 다르다는 판단 하에 `[topic]/[slug]` Dynamic Route로 통합.
14개 파일 → **2개 파일**. `generateStaticParams()`로 빌드 시 56개 정적 경로 생성.

#### 데이터 계층

```
src/lib/curriculum.js
  TOPICS        ← 문파 메타데이터 (title, badges, description, theoryContent)
  CURRICULUM    ← 7 × 7 관문 데이터 (id, slug, title, mission, theory, starterCode)

  export getAllTopicIds()   → [topic] generateStaticParams
  export getTopic(id)      → 문파 메타데이터 단건 조회
  export getAllGatePaths()  → [topic]/[slug] generateStaticParams
  export getGate(id, slug) → 관문 단건 조회
  export getGates(id)      → 문파의 전체 관문 목록
```

---

### 2. 핵심 컴포넌트

| 컴포넌트 | 역할 | 비고 |
|---|---|---|
| `SooryeonLayout` | 페이지 공통 레이아웃 (제목·뱃지·설명) | RSC |
| `SooryeonCard` | 관문 카드 (다이얼로그·아코디언 지원) | RCC |
| `MarkdownViewer` | 이론 비급 렌더링 (`react-markdown`) | RSC |
| `GatePage` | 관문 상세 조립 (브레드크럼·이론·네비·에디터) | RSC |
| `CodeEditor` | 수련 코드 에디터 (Sandpack 기반) | RCC |

---

### 3. 주요 의사결정 및 시행착오

#### 코드 에디터 실행 기능

- **문제:** `CodeEditor`가 단순 `<textarea>`로 코드 실행·평가 방법이 없었다.
- **결정:** `@codesandbox/sandpack-react` 도입.
  - iframe 기반 격리 실행 → 호스트 React 19 환경과 충돌 없음
  - 에디터(좌) + 실시간 React 미리보기(우) + 콘솔 패널 + 인라인 에러 표시
  - `immer`, `zustand`, `@tanstack/react-virtual` 사전 탑재
- **시행착오:** `getSandpackCssText()`를 RSC인 `layout.js`에서 호출 시도 → 클라이언트 전용 함수 에러 발생.
  Sandpack이 클라이언트에서 자체 스타일을 주입하므로 별도 주입 코드 불필요.

#### 관문 이동 네비게이션

- **문제:** 이전/다음 링크가 모두 토픽 목록으로 향하고 있었다.
- **결정:** `getGates(topicId)`로 인접 관문을 서버에서 계산하여 실제 이전/다음 관문으로 연결.
  중간에 목록으로 버튼 추가.
  ```
  ← 1관문. Stale Closure    목록으로    3관문. Lazy Initialization →
  ```
- **추가 정리:** `TOPIC_TITLES` 하드코딩 제거 → `getTopic(topicId)` 교체 (데이터 일원화).

---

### 4. 현재 커리큘럼 규모

- **문파(Topic):** 7개
- **관문(Gate):** 49개 (7 × 7)
- **정적 생성 경로:** 7 (문파 목록) + 49 (관문 상세) = **56개 페이지**

---

### 5. 미결 항목

- [ ] 수련 진도 추적 (완료한 관문 표시)
- [ ] `layout.js` 메타데이터 (`title`, `description`) 실제 앱 정보로 업데이트
- [ ] `src/lib/routes.js` — Vite 시절 잔재, 제거 필요

---

## 🥋 Codedojang 프로젝트 설립 실록 (Day 1 — Vite 환경 구축)

> Next.js 마이그레이션 전 Vite 기반 초기 세팅 기록. 현재 스택과 무관하나 이슈 해결 과정 참고용으로 보존.

### 주요 이슈 해결 기록

#### Node.js 버전 불일치
- **현상:** `shadcn/ui` 설치 시 `node:util`의 `styleText` 에러.
- **해결:** NVM으로 Node v22.18.0 업그레이드.

#### pnpm 명령어 미인식
- **현상:** 노드 버전 변경 후 `pnpm` 먹통.
- **해결:** `corepack enable`로 노드 자체에서 pnpm 관리.

#### Tailwind v4 `init -p` 행방불명
- **현상:** `npx tailwindcss init -p` 실행 안 됨.
- **원인:** Tailwind v4는 Zero-config 지향, 수동 init 불필요.
- **해결:** `@import "tailwindcss";` 한 줄로 설정 완료.

#### ESM 환경 `__dirname` 문제
- **현상:** `vite.config.js`에서 `__dirname` 에러.
- **해결:** `import.meta.url` + `fileURLToPath`로 대체.
