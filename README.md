# 🥋 코드도장 (Codedojang)

> **"기본에 충실하라. 정공법(正攻法)으로 나아가라."**

이 프로젝트는 최신 웹 기술 표준과 모범 사례(Best Practices)를 준수하는 React 프론트엔드 수련장입니다.
React 19, Vite 8, Tailwind CSS v4 등 최신 기술 스택을 기반으로 **"제대로 된"** 개발 환경을 구축하는 것을 목표로 합니다.

## 🏗️ 기술 스택 (Tech Stack)

이 도장은 다음의 **최신 기술**을 기반으로 운영됩니다:

- **Framework:** React 19 (ESM 모드)
- **Build Tool:** Vite 8
- **Package Manager:** pnpm (Corepack 기반)
- **Styling:** Tailwind CSS v4 (CSS-first, `@theme` 활용)
- **UI Component:** shadcn/ui (Radix UI 기반)
- **State Management:** TanStack Query v5 (Server) + Context API (Client)

## 🛠️ 개발 원칙: "정공법(正攻法)"

우리는 편법(Hack)보다 **표준(Standard)**을 지향합니다.

1. **ESM 준수:** `require` 대신 `import`를, `__dirname` 대신 `import.meta.url`을 사용합니다.
2. **Tailwind v4 최적화:** 구형 설정 파일(`tailwind.config.js`)에 의존하지 않고, CSS 변수와 `@import "tailwindcss"`를 활용합니다.
3. **컴포넌트 주권:** `src/components/ui`는 외부 라이브러리가 아닌 **우리가 관리하는 소스 코드**입니다.

## 📂 폴더 구조 (Structure)

도장의 정리는 마음의 정리입니다. 우리는 다음과 같은 구조를 따릅니다.

- **`src/components/ui/`**: shadcn/ui 기반의 기초 UI 컴포넌트들이 위치합니다. (외부 라이브러리가 아닌 내부 코드로 관리)
- **`src/lib/utils.js`**: `cn`(className 병합) 등 스타일링 관련 유틸리티 함수가 위치합니다.
- **`src/index.css`**: Tailwind CSS v4의 설정과 커스텀 테마가 정의된 단일 진실 공급원(Single Source of Truth)입니다.
- **`jsconfig.json`**: `@/` 경로 별칭(Alias) 설정을 담당합니다.

## 🚀 시작하기 (Getting Started)

이 프로젝트는 `pnpm`을 패키지 매니저로 사용합니다.

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

---

_Code written by Gemini Code Assist, following the Way of the Codedojang._
