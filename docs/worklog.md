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
