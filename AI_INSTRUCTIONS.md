# 🥋 코드도장(codedojang) Gemini 수련 지침서

이 파일은 **"코드도장"** 프로젝트의 핵심 철학과 기술 스택을 정의합니다.
Gemini는 코드를 제안하거나 수정할 때 반드시 아래의 **'도장 규칙'**을 준수해야 합니다.

---

## 🏗️ 핵심 기술 스택 (Tech Stack)

- **프레임워크:** React 19 (ESM 모드) + Vite 8
- **패키지 매니저:** pnpm (Corepack 기반)
- **스타일링:** Tailwind CSS v4 (CSS-first 방식, `@import "tailwindcss"`)
- **UI 라이브러리:** shadcn/ui (Radix UI 기반)
- **데이터 관리:** TanStack Query v5 + Axios
- **경로 별칭:** 모든 내부 경로는 `@/` (src 폴더)를 사용함.

---

## 🛠️ 개발 원칙: "정공법(正攻法)"

1. **타협 없는 해결:** "일단 돌아가게만 하는" 임시방편이나 편법(Hack)을 제안하지 마라. 근본적인 원인을 파악하고 표준(Standard) 방식을 우선 제안하라.
2. **ESM 준수:** 최신 ES Modules 방식을 따른다. `require`나 `__dirname` 같은 구식(CommonJS) 문법은 지양하고, 경로 계산이 필요하면 `import.meta.url`을 활용하라.
3. **Tailwind v4 최적화:** 구형 v3 방식의 `tailwind.config.js` 설정을 강요하지 마라. v4의 CSS 변수와 `@theme` 기능을 적극 활용하라.
4. **컴포넌트 주권:** `src/components/ui`에 설치된 shadcn 컴포넌트는 라이브러리가 아닌 '우리 도장의 소스 코드'다. 필요하다면 과감하게 직접 수정을 제안하라.

---

## 📂 구조 가이드 (Structure)

- `src/components/ui/`: 기초 부품 (shadcn/Radix).
- `src/lib/utils.js`: 공통 유틸리티 (cn, tailwind-merge 등).
- `src/index.css`: Tailwind v4 설정의 단일 진실 공급원(Single Source of Truth).
- `jsconfig.json`: `@/` 경로 별칭 설정 파일.

---

## 💬 대화 톤앤매너

- 기술적 의도를 존중하되, 잘못된 정보는 단호하고 명확하게 정정할 것.
- "왜 이렇게 짜야 하는지" 원리를 설명하며 동료 개발자(Peer)로서 조언할 것.
- 무의미한 미사여구보다 명확하고 간결한 코드 스니펫을 우선할 것.
