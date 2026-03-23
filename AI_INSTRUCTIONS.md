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

---

## 📝 오늘의 수련 템플릿 (Daily Training Template)

사용자가 "오늘의 수련"이라고 요청하면, 아래 구조를 가진 React 컴포넌트 페이지를 `src/pages/training/` 폴더 내에 생성하라. (파일명 예시: `Dojo_20260323.jsx`)

1. **수련 제목 (Title):** `h1` 태그와 `Badge` 사용.
2. **수련 목적 (Objective):** 이 수련을 통해 얻고자 하는 바.
3. **수련 일자 (Date):** 오늘 날짜.
4. **수련 결과 (Result):** 실제 구현된 코드나 결과물 노출 영역.
5. **고찰 (Reflection):** 수련 후 느낀 점이나 배운 원리 (정공법 관점).

**디자인 가이드:** `Card` 컴포넌트로 각 섹션을 정갈하게 감싸고, `Separator`로 구분하라.

---

## 📖 수련 프로세스 및 비급서 참고 (Training Process)

Gemini는 코드를 작성하거나 수정 제안을 할 때, 반드시 **`docs/TRAINING_LIST.md`** 파일을 최우선으로 참조하라.

1. **상황 인식:** 사용자가 특정 주제(예: useState, useEffect 등)에 대해 수련을 요청하면, `docs/TRAINING_LIST.md`에 정의된 '자주 발생하는 5가지 케이스'를 분석하고 해당되는 수련 목표를 설정하라.
2. **정공법 적용:** 코드를 제안할 때 위 문서에서 경고한 '실수 케이스'를 철저히 배제하고, 리액트 공식 문서 수준의 표준적이고 견고한(Robust) 해결책을 제시하라.
3. **고찰 가이드:** 수련 결과물을 생성한 후, `docs/TRAINING_LIST.md`에서 다룬 핵심 원리(불변성, 의존성, 렌더링 최적화 등)를 바탕으로 사용자가 깊이 있게 이해했는지 '고찰 포인트'를 제시하라.

**지시 예시:**

- 사용자가 "오늘의 수련: useState"라고 하면, `docs/TRAINING_LIST.md`의 1번 섹션 내용을 바탕으로 페이지 템플릿을 생성한다.
- 사용자가 코드를 작성하면, 문서에 적힌 "객체 직접 수정 금지"나 "비동기 스냅샷 주의" 등의 원칙을 위배하지 않았는지 감수한다.

## 🇰🇷 명명 규칙 (Naming Convention) - 필독!

모든 수련 페이지 및 관련 파일은 아래의 우리말 발음 표기 규칙을 따른다.

1. **접두어 변경:** 기존의 `Dojo_` 대신 **`Sooryeon_`**(수련)을 사용하라.
   - 예: `Dojo_useState.jsx` (X) -> `Sooryeon_01_useState.jsx` (O)
2. **UI 표시:** 사이드바나 대시보드에서 파일명을 파싱하여 보여줄 때도 "Dojo"가 아닌 **"수련"** 또는 **"Sooryeon"**으로 표기하라.
3. **일관성:** 코드 내의 함수명이나 주석에서도 '수련'이라는 표현을 우선적으로 사용하라. (예: `const SooryeonPage = () => ...`)

---

# 📑 수련 페이지 생성 템플릿 표준 (Sooryeon Standard v2)

모든 수련 페이지는 공통 컴포넌트를 활용한 **선언적 구조**로 작성하여 코드 중복을 최소화한다.

### 1. 필수 컴포넌트 활용

- **`SooryeonLayout`**: 페이지 전체 틀, 타이틀, 인트로 설명, 배지, 전체 초기화 기능을 담당한다.
- **`SooryeonCard`**: 개별 미션의 UI 카드, 가이드 주석, 실행 버튼, 비급(모범 답안) 모달을 담당한다.
- **경로:** 모든 공통 컴포넌트는 `@/components/shared/`에서 불러온다.

### 2. 페이지 내부 구조 (Top-Down Order)

1. **Imports:** React hooks, Lucide icons, Shared components를 순서대로 임포트한다.
2. **Solution Data (봉인):** 파일 **최하단**에 `solutionData` 상수를 선언하여 정답 코드 문자열을 분리하라. (사용자가 코딩 중 정답을 미리 보지 못하게 함)
3. **State & Handlers:** 페이지 컴포넌트 내부 상단에서 상태를 정의하고, 핸들러(`handleMission...`)는 뼈대만 작성한다.
4. **Main Rendering:** `<SooryeonLayout>` 내부에 `<SooryeonCard>`들을 배치하는 선언적 구조를 유지하라.

### 3. 미션 구성 및 주석 가이드

- **3대 관문:** 반드시 주제와 관련된 핵심 케이스 **3가지**를 미션으로 구성하라.
- **주석 필수:** 로직이 비워진 곳에는 반드시 아래 두 가지 주석을 포함하라.
  - `// TODO: [미션 내용]`
  - `// 💡 사부님의 가이드: [정공법 힌트 및 주의사항]`
- **Visual Content:** 사용자가 상태 변화를 즉시 확인할 수 있도록 `visualContent`를 직관적으로 설계하라.

### 4. 비급 전수 (Solution Modal)

- `SooryeonCard`의 `solution` prop에 하단 `solutionData`를 연결하라.
- **내용:** 모범 답안 코드는 실무 표준(Best Practice)을 따르며, 짧은 '사부님의 강론'을 포함해야 한다.
- **가독성:** 모달 내 코드는 `<pre>` 태그와 모노스페이스 폰트를 적용하여 출력하라.

---

## 🎨 UI/UX 디자인 가이드

- **Framework:** Tailwind CSS & shadcn/ui.
- **Layout:** 메인 대시보드와 사이드바는 반응형으로 작동해야 한다.
- **Consistency:** 모든 수련 페이지는 동일한 여백(`space-y-8`)과 정갈한 카드 레이아웃을 유지하라.
