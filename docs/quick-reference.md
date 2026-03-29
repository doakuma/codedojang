# 코드도보통지 — 빠른 참조

> 프로젝트 이해를 위한 한눈에 보는 치트시트

---

## 📂 프로젝트 구조

```
src/
├── app/                          # 라우트 + 페이지
│   ├── layout.js                 # 전역 레이아웃 (Header + Footer)
│   ├── page.js                   # 홈 (/)
│   ├── training/
│   │   ├── page.js               # 수련장 (/training)
│   │   └── [topic]/
│   │       ├── page.js           # 문파 (/training/[topic])
│   │       └── [slug]/
│   │           └── page.js       # 관문 (/training/[topic]/[slug])
│   └── globals.css               # 글로벌 스타일 + 테마 변수
│
├── components/
│   ├── layout/
│   │   └── Header.jsx            # 글로벌 헤더 (sticky)
│   ├── shared/
│   │   ├── GatePage.jsx          # 관문 페이지 템플릿
│   │   ├── SooryeonLayout.jsx    # 문파 페이지 레이아웃
│   │   ├── SooryeonCard.jsx      # 카드 (Dialog, Accordion)
│   │   ├── CodeEditor.jsx        # Sandpack 래퍼
│   │   └── MarkdownViewer.jsx    # 마크다운 렌더러
│   └── ui/                       # shadcn/ui 컴포넌트들
│
├── hooks/
│   └── useTheme.js               # 테마 관리 (localStorage)
│
└── lib/
    ├── curriculum.js             # 📌 단일 데이터 소스 (7×49 커리큘럼)
    └── utils.js                  # cn() 유틸
```

---

## 🎯 데이터 흐름

```
curriculum.js (마스터 소스)
    ↓
    ├─ getAllTopicIds() → ['01-useState', ...]
    ├─ getTopic(id) → { title, description, badges, ... }
    └─ getGates(id) → [{ slug, title, mission, theory, starterCode }, ...]
    ↓
모든 페이지에서 사용 (다른 곳에 중복 금지)
```

---

## 🚀 사용자 여정

| 단계 | URL | 컴포넌트 | 동작 |
|------|-----|---------|------|
| 1️⃣ 입장 | `/` | 홈 | 7개 문파 카드 그리드 |
| 2️⃣ 문파 선택 | `/training` | 수련장 | 7개 문파 목록 |
| 3️⃣ 관문 목록 | `/training/01-useState` | 문파 페이지 | 7개 관문 카드 |
| 4️⃣ 관문 학습 | `/training/01-useState/gate-1-basic` | 관문 페이지 | 이론 + 코드 에디터 |

---

## 🧩 핵심 컴포넌트

### 레이아웃 (Layouts)

| 컴포넌트 | 역할 | Props |
|---------|------|-------|
| `Header` | 전역 sticky 헤더 (테마 토글) | 없음 |
| `SooryeonLayout` | 제목 + 배지 + 설명 + 자식 | `title`, `badges`, `description`, `children` |

### 콘텐츠 (Content)

| 컴포넌트 | 역할 | Props |
|---------|------|-------|
| `GatePage` | 관문 전체 렌더링 | `gate`, `topicId` |
| `CodeEditor` | Sandpack (코드 실행) | `initialCode` |
| `MarkdownViewer` | 마크다운 렌더링 | `content`, `className` |
| `SooryeonCard` | 일반 카드 (Dialog/Accordion) | `title`, `description`, `solution`, `actionButton`, ... |

---

## 🎨 디자인 토큰

### 색상 (CSS 변수)

```jsx
className="text-foreground"            // 기본 텍스트
className="text-muted-foreground"      // 약화 텍스트
className="bg-background"              // 기본 배경
className="bg-card"                    // 카드 배경
className="bg-accent"                  // 강조
className="border-border"              // 테두리
```

### 패턴

```jsx
// ❌ 금지
className="bg-red-500"
className="text-zinc-600"

// ✅ 사용
className="bg-card text-foreground"
className={cn("p-4", isActive && "border-foreground")}
```

---

## 🔧 주요 함수 & 훅

### `curriculum.js`

```js
// 모든 문파 ID 배열
getAllTopicIds()  // → ['01-useState', '02-useEffect', ...]

// 특정 문파 메타데이터
getTopic(topicId)  // → { title, shortTitle, badges, description, theoryContent }

// 특정 문파의 7개 관문
getGates(topicId)  // → [{ id, slug, title, mission, theory, starterCode }, ...]
```

### `useTheme.js`

```js
const { theme, toggleTheme, isMounted } = useTheme();
// theme: 'light' | 'dark'
// toggleTheme: () => void (전환 + localStorage 저장)
// isMounted: boolean (hydration 에러 방지)
```

### `utils.js`

```js
cn("p-4", "p-8", { "bg-red": isActive })
// clsx + tailwind-merge로 클래스 충돌 해결
```

---

## 📋 일반적인 작업

### 커리큘럼 데이터 접근

```js
// 모든 문파의 제목과 설명 표시
import { getAllTopicIds, getTopic } from '@/lib/curriculum';

const topicIds = getAllTopicIds();
topicIds.map(id => {
  const { title, description } = getTopic(id);
  // ...
});
```

### 이전/다음 관문 네비게이션

```js
import { getGates } from '@/lib/curriculum';

const gates = getGates(topicId);
const prevGate = gates.find(g => g.id === gateId - 1);
const nextGate = gates.find(g => g.id === gateId + 1);
```

### 마크다운 렌더링

```jsx
import MarkdownViewer from '@/components/shared/MarkdownViewer';

<MarkdownViewer content="# 제목\n\n본문" />
```

### 코드 에디터 삽입

```jsx
import { CodeEditor } from '@/components/shared/CodeEditor';

<CodeEditor initialCode="export default function App() { return <h1>Hello</h1>; }" />
```

### 테마 토글

```jsx
'use client';
import { useTheme } from '@/hooks/useTheme';

export function ThemeButton() {
  const { theme, toggleTheme, isMounted } = useTheme();

  return (
    isMounted && (
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    )
  );
}
```

---

## 📱 클라이언트 vs 서버

### 🟢 Server Component (기본)

```jsx
// 서버에서만 렌더링, 번들 크기 0
import { getTopic } from '@/lib/curriculum';

export default function TopicPage({ params }) {
  const topic = getTopic(params.topic);
  return <h1>{topic.title}</h1>;
}
```

### 🔵 Client Component

```jsx
'use client';  // ← 반드시 최상단

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**언제 사용?**
- ✅ `'use client'` 필요:
  - Event handlers (`onClick`, `onChange`)
  - Hooks (`useState`, `useEffect`, `useContext`)
  - Browser APIs (`localStorage`, `window`)
- ❌ `'use client'` 불필요:
  - 데이터 페칭 (async/await)
  - 마크다운 렌더링
  - 정적 콘텐츠

---

## ⚡ 성능 팁

1. **정적 생성 활용**
   - 모든 페이지는 빌드 시 정적 HTML로 생성됨
   - 런타임 데이터 페칭 불필요

2. **RSC 우선**
   - 가능하면 Server Component 사용
   - `'use client'`는 필수한 경우만

3. **코드 에디터는 지연 로드 가능**
   - Sandpack은 무거움 → `dynamic()` 고려

---

## 🚨 금지 사항 (Constraints)

| 금지 | 이유 | 대안 |
|------|------|------|
| TypeScript (`.ts`, `.tsx`) | 학습자 진입 장벽 | JavaScript (`.js`, `.jsx`) |
| npm 명령 | 성능 저하 | pnpm만 사용 |
| 직접 색상값 (`bg-red-500`) | 다크모드 미지원 | CSS 변수 (`bg-card`) |
| 데이터 중복 (curriculum 외 다른 곳) | 일관성 깨짐 | curriculum.js만 사용 |
| `useRouter` 대신 `<Link>` | 서버 최적화 | Next.js `<Link>` 컴포넌트 |

---

## 📚 주요 문서

| 문서 | 용도 |
|------|------|
| `docs/project.md` | 프로젝트 비전 + 기술 결정 |
| `docs/state.md` | 현재 진행 상황 (Phase 별) |
| `docs/requirements.md` | 기능 요구사항 (MoSCoW) |
| `docs/architecture.md` | **이 문서 — 구조 & 컴포넌트** |
| `docs/component-tree.md` | **시각적 컴포넌트 맵** |
| `docs/decisions.md` | 기술 결정 로그 (ADR) |

---

## 🔗 중요 파일 위치

- 커리큘럼 데이터: `src/lib/curriculum.js`
- 글로벌 헤더: `src/components/layout/Header.jsx`
- 테마 설정: `src/hooks/useTheme.js`
- 글로벌 스타일: `src/app/globals.css`
- 라우트 정의: `src/app/` (파일 기반)

---

## 💡 팁

- **IDE에서 파일 검색:** Cmd+P (VS Code) → 파일명 입력
- **컴포넌트 위치:** `src/components/` 내에서만 검색
- **링크 추가:** `<Link href="/training/[topic]">` (따옴표 주의)
- **스타일 문제:** CSS 변수 확인 먼저 → `globals.css` 참고
- **테마 문제:** `useTheme.js` + `Header.jsx` + `globals.css` 확인

---

## 🎓 학습 경로

1. `docs/architecture.md` 읽기 (이 문서)
2. `src/lib/curriculum.js` 열어서 데이터 구조 확인
3. `src/app/page.js` → `src/app/training/[topic]/page.js` → 동적 라우팅 이해
4. `src/components/shared/GatePage.jsx` 분석 (메인 렌더링 로직)
5. 새로운 기능 추가할 때는 위 문서들 참고

---

## 🆘 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| "curriculum not defined" | import 누락 | `import { getTopic } from '@/lib/curriculum'` |
| 색상이 다크모드에서 안 보임 | 직접 색상값 사용 | `bg-card`, `text-foreground` 사용 |
| 페이지 빌드 실패 | generateStaticParams 오류 | URL params 확인 |
| 테마 토글 작동 안 함 | `'use client'` 누락 | Header에 추가 |
| Sandpack 오류 | React 버전 충돌 | `immer`, `zustand` 버전 확인 |

---

**Last Updated:** 2026-03-29
**Version:** v0.2.1
