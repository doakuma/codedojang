## 🥋 Codedojang 수련 시스템 구축 실록 (Day 2 — Next.js 정공법 체계 완성)

### 작업 요약

Vite 기반 프로젝트를 Next.js App Router로 완전 마이그레이션한 뒤,
7대 문파 × 7관문의 수련 커리큘럼 시스템 전체를 설계하고 구현했다.

---

### 1. 아키텍처 설계

#### 라우팅 구조 (최종)

```
src/app/training/
  [topic]/
    page.js          ← 문파 목록 (이론 + 관문 카드 7개)
    [slug]/
      page.js        ← 관문 상세 (이론 비급 + 수련 코드 에디터)
```

초기에는 `01-useState/`, `02-useEffect/` … 7개 폴더를 개별 생성했으나,
구조가 동일하고 데이터만 다르다는 판단 하에 `[topic]/[slug]` Dynamic Route로 통합했다.
14개 파일 → **2개 파일**로 압축.

#### 데이터 계층 설계

```
src/lib/curriculum.js
  TOPICS        ← 문파 메타데이터 (title, badges, description, theoryContent)
  CURRICULUM    ← 7 × 7 관문 데이터 (id, slug, title, mission, theory, starterCode)

  export getAllTopicIds()   → Static Params 생성용
  export getTopic(id)      → [topic]/page.js에서 사용
  export getAllGatePaths()  → [topic]/[slug]/page.js에서 Static Params 생성
  export getGate(id, slug) → 관문 단건 조회
  export getGates(id)      → 문파의 전체 관문 목록
```

---

### 2. 핵심 컴포넌트

| 컴포넌트 | 역할 | 비고 |
|---|---|---|
| `SooryeonLayout` | 페이지 공통 레이아웃 (제목·뱃지·설명) | RSC |
| `SooryeonCard` | 관문 카드 (다이얼로그·아코디언 지원) | RCC (`'use client'`) |
| `MarkdownViewer` | 이론 비급 렌더링 (`react-markdown`) | RSC |
| `GatePage` | 관문 상세 조립 (브레드크럼·이론·에디터) | RSC |
| `CodeEditor` | 수련 코드 에디터 (Sandpack 기반) | RCC (`'use client'`) |

---

### 3. 주요 의사결정 기록

#### ⚔️ 관문 1: 하드코딩된 카드 배열의 중복

- **문제:** 각 문파 `page.js`가 동일한 카드 배열 구조를 중복 정의하고 있었다.
- **결정:** `getGates(topicId)`로 curriculum.js에서 직접 읽도록 변경.
  카드 링크(`href`) 추가와 데이터 중복 제거를 동시에 해결.

#### ⚔️ 관문 2: 코드 에디터의 실행 불가 문제

- **문제:** 초기 `CodeEditor`는 단순 `<textarea>`로, 코드를 작성해도 평가할 방법이 없었다.
- **결정:** `@codesandbox/sandpack-react` 도입.
  - iframe 기반 격리 실행 → 호스트 React 19 환경과 충돌 없음
  - 실시간 미리보기 + 콘솔 패널 + 인라인 에러 표시
  - `immer`, `zustand`, `@tanstack/react-virtual` 사전 탑재 (관문 코드 요구사항 대응)
- **추가:** `getSandpackCssText()`를 `layout.js`에 주입하여 SSR 스타일 깜빡임 방지.

#### ⚔️ 관문 3: Dynamic Route vs Static Folders

- **문제:** 7개 문파 폴더 × 2 레벨 = 14개 동일 구조 파일 관리 부담.
- **결정:** `[topic]/page.js` + `[topic]/[slug]/page.js` 2개로 통합.
  `generateStaticParams()`로 빌드 시 모든 경로를 정적 생성하여 성능 손실 없음.

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

## 🥋 Codedojang 프로젝트 설립 실록 (Day 1)

### 1. 프로젝트 기본 설계 (Tech Stack)

- **패키지 매니저:** `pnpm` (효율성 및 속도 중심)
- **프레임워크:** `Vite` + `React` (v19)
- **스타일링:** `Tailwind CSS v4` + `shadcn/ui` (Radix UI 기반)
- **상태 관리:** `React Context API` (전역) + `TanStack Query v5` (서버 데이터)
- **언어:** `JavaScript` (ESM 방식)

---

### 2. 주요 도장 깨기 (Issue Log)

#### ⚔️ 제1관문: Node.js 버전 불일치

- **현상:** `shadcn/ui` 설치 시 `node:util`의 `styleText`를 찾을 수 없다는 에러 발생.
- **원인:** 사용 중인 Node v21.6.0에 해당 최신 API가 없었음. (v21.7.0 이상 필요)
- **해결:** **NVM**을 사용하여 **Node v22.18.0**으로 업그레이드.

#### ⚔️ 제2관문: pnpm 명령어 미인식

- **현상:** 노드 버전을 바꾸자 `pnpm` 명령어가 먹통이 됨.
- **원인:** `pnpm`은 노드 버전별로 독립적으로 설치되기 때문에 새 집에 가구가 없는 상태.
- **해결:** **`corepack enable`**을 사용하여 노드 자체에서 `pnpm`을 관리하도록 활성화.

#### ⚔️ 제3관문: Tailwind v4와 `init -p`의 행방불명

- **현상:** `npx tailwindcss init -p` 명령어가 실행되지 않음.
- **원인:** **Tailwind v4**는 'Zero-config'를 지향하여 수동 설정 파일(`init`)이 필수가 아니게 됨.
- **해결:** `@import "tailwindcss";` 한 줄로 설정을 끝내는 v4 방식 채택 및 `shadcn` 설정 연동.

#### ⚔️ 제4관문: ESM 환경에서의 경로 문제 (`__dirname`)

- **현상:** `vite.config.js`에서 별칭(`@`) 설정을 위해 `__dirname`을 썼으나 에러 발생.
- **원인:** `package.json`의 `"type": "module"` 환경에서는 구식인 `__dirname`을 기본 제공하지 않음.
- **해결:** `import.meta.url`과 `fileURLToPath`를 이용해 현대적인 방식으로 경로 변수 직접 정의.

---

### 3. 최종 설정 상태 (Best Practice)

#### 📂 `jsconfig.json` (JS 프로젝트의 별칭 약속)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

#### ⚙️ `vite.config.js` (경로 별칭 정의)

```javascript
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

---

### 🚀 다음 미션 (Next Step)

이제 도장 부지는 다 닦았고, 기둥(설정)도 다 세웠어! 이제 진짜 **무기(컴포넌트)**를 들여올 차례야.

"악가야, 이 문서 보면서 뿌듯해해도 좋아! ㅋ 이제 다시 터미널 열고 **`pnpm dlx shadcn@latest init`** 마무리하고, **`pnpm dlx shadcn@latest add button`**으로 첫 단추를 끼워볼까? 😉✨"

**준비되면 말해줘! 이제부턴 에러보다 코딩의 재미가 더 클 거야!**
