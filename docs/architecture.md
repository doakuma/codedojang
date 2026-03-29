# 코드도보통지 — 아키텍처 개요

> 공통 로직, 공통 컴포넌트, 사용자 여정을 한눈에 파악할 수 있는 문서

---

## 1. 공통 로직 (Common Logic)

### `src/lib/curriculum.js` — 커리큘럼 데이터 (단일 소스)

**역할:**
- 7대 문파 × 49관문의 모든 콘텐츠를 관리
- 모든 페이지에서 이 파일만 참조 — 다른 곳에 데이터 중복 금지

**주요 함수:**
- `getAllTopicIds()` — 모든 문파 ID 배열 반환 (예: `['01-useState', '02-useEffect', ...]`)
- `getTopic(topicId)` — 특정 문파의 메타데이터 반환
  - `title`: 문파명 (예: "01. useState: 상태의 본질과 렌더링 엔진")
  - `shortTitle`: 약자 (예: "useState")
  - `badges`: 카테고리 배열 (예: `['React', 'Hook', 'State']`)
  - `description`: 문파 설명
  - `theoryContent`: 문파 전체 이론 (마크다운)
- `getGates(topicId)` — 특정 문파의 7개 관문 배열 반환
  - 각 관문: `{ id, slug, title, mission, theory, starterCode }`

**사용 예시:**
```js
// 홈페이지: 7개 문파 카드 렌더링
const topicIds = getAllTopicIds();
topicIds.map(id => {
  const topic = getTopic(id);
  // topic.title, topic.description, topic.badges 사용
});

// 관문 페이지: 특정 관문 콘텐츠 로드
const gates = getGates(topicId);
const gate = gates.find(g => g.slug === slug);
```

---

### `src/lib/utils.js` — 유틸리티

**함수:**
- `cn(...inputs)` — clsx + tailwind-merge로 className 충돌 해결
  - Tailwind 클래스 병합 시 사용 (예: `cn("p-4", "p-8")` → `"p-8"`)

---

### `src/hooks/useTheme.js` — 테마 관리 (클라이언트 전용)

**역할:**
- 다크/라이트 모드 전환
- localStorage 기반 상태 저장
- 시스템 설정 자동 감지

**반환값:**
```js
const { theme, toggleTheme, isMounted } = useTheme();
// theme: 'light' | 'dark'
// toggleTheme: () => void (테마 전환 + 저장)
// isMounted: boolean (hydration 에러 방지용)
```

**구현:**
- 초기화: localStorage에서 저장된 테마 읽기 → 없으면 시스템 설정 사용
- 적용: `document.documentElement.setAttribute('data-theme', 'dark')`
- 저장: localStorage 키: `'codedobo-theme'`

---

## 2. 공통 컴포넌트 (Shared Components)

### 레이아웃 컴포넌트

#### `src/components/layout/Header.jsx` — 전역 헤더

**위치:** 모든 페이지 상단 (sticky)

**구성:**
- **로고:** "코드도보통지" (홈 링크)
- **네비:** 수련장 링크 (Sword 아이콘)
- **우측:**
  - 테마 토글 버튼 (Moon/Sun 아이콘, `useTheme()` 사용)
  - GitHub 링크

**Props:** 없음 (자체적으로 상태 관리)

**Key Features:**
- `'use client'` 지시어 (테마 토글 필요)
- Sticky + backdrop-blur 디자인
- 반응형 레이아웃

---

#### `src/components/shared/SooryeonLayout.jsx` — 토픽/문파 페이지 레이아웃

**사용처:**
- `/training/[topic]` 페이지 (문파 이론 + 관문 카드 그리드)

**Props:**
```js
<SooryeonLayout
  title="01. useState: 상태의 본질과 렌더링 엔진"
  badges={['React', 'Hook', 'State']}
  description="리액트 상태 관리의 근본 원리를 체득하고..."
>
  {/* 자식 요소: 보통 SooryeonCard 그리드 */}
</SooryeonLayout>
```

**렌더링:**
- 제목 + 배지 + 설명
- 자식 요소 (보통 관문 카드 그리드)

---

### 콘텐츠 컴포넌트

#### `src/components/shared/GatePage.jsx` — 관문 상세 페이지

**사용처:**
- `/training/[topic]/[slug]` 페이지

**Props:**
```js
<GatePage
  gate={{ id, slug, title, mission, theory, starterCode }}
  topicId="01-useState"
/>
```

**렌더링 구조:**
1. **Breadcrumb:** 수련장 > 문파 > 관문
2. **헤더:** 관문 제목 + 미션 설명 + 배지 (관문 N/7)
3. **이론 섹션 (RSC):** `<MarkdownViewer>`로 마크다운 이론 렌더링
4. **코드 에디터 (RCC):** `<CodeEditor>`로 실시간 실행 환경
5. **네비게이션:** 이전 관문 / 목록으로 / 다음 관문

**내부 로직:**
- `getTopic(topicId)` 호출로 문파 메타데이터 로드
- `getGates(topicId)` 호출로 이전/다음 관문 탐색

---

#### `src/components/shared/CodeEditor.jsx` — 코드 실행 환경 (클라이언트)

**역할:**
- Sandpack을 감싸서 React 코드 실시간 실행

**Props:**
```js
<CodeEditor initialCode={`export default function App() {
  return <h1>Hello</h1>;
}`} />
```

**설정:**
- `template="react"` — React 환경
- `theme="dark"` — 다크 테마
- `editorHeight: 480` — 고정 높이
- `resizablePanels: true` — 패널 크기 조절 가능
- `showConsole: true`, `showLineNumbers: true` 등

**의존성:**
- `immer`, `zustand`, `@tanstack/react-virtual` (미리 로드)

---

#### `src/components/shared/MarkdownViewer.jsx` — 마크다운 렌더러

**역할:**
- react-markdown v9로 마크다운을 HTML 렌더링
- 커스텀 스타일 적용 (Tailwind)

**Props:**
```js
<MarkdownViewer
  content="## 제목\n\n본문 텍스트"
  className="custom-class" // 선택사항
/>
```

**커스텀 렌더러:**
- `h1/h2/h3`: 기본 크기 + 색상 (`text-foreground`)
- `p`: 마진 조정 + 줄 높이
- `ul/ol`: 목록 스타일 + 간격
- `pre`: 배경 + 스크롤 가능
- `code`: 인라인 코드 스타일

---

#### `src/components/shared/SooryeonCard.jsx` — 카드 UI (클라이언트)

**사용처:**
- 관문 카드 (문파 페이지)
- 일반 콘텐츠 카드

**Props:**
```js
<SooryeonCard
  title="관문 1: useState 기초"
  description="상태 선언과 업데이트"
  icon={BookOpen} // lucide-react 아이콘
  iconClassName="text-red-500"
  guideText="💡 다음을 고려하세요..."
  isApproved={false} // 완료 배지 표시 여부
  detail="더 자세한 비급..." // 아코디언 확장 가능
  solution={{
    title: "비급",
    description: "정해진 풀이",
    code: "...",
    review: "사부님의 평가..."
  }}
  actionButton={{
    label: "진도 완료",
    variant: "default",
    onClick: () => {}
  }}
>
  {/* 자식 요소 */}
</SooryeonCard>
```

**주요 기능:**
- 아코디언 (`detail` 펼침/접음)
- Dialog 모달 (solution 보기)
- 완료 배지 + 초록색 테두리 (`isApproved=true`)
- 인터랙티브 버튼 (actionButton)

---

### UI 컴포넌트 (shadcn/ui)

**위치:** `src/components/ui/`

**사용 중인 컴포넌트:**
- `Button` — CTA 및 네비게이션
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` — 카드 레이아웃
- `Badge` — 라벨 (문파, 관문)
- `Dialog`, `DialogTrigger`, `DialogContent` — 모달
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — 펼침/접기

---

## 3. 라우팅 및 사용자 여정 (User Journey)

### 라우팅 구조

```
src/app/
├── layout.js (전역 레이아웃: Header + Footer)
├── globals.css (테마 변수, 글로벌 스타일)
├── page.js (홈 "/")
├── training/
│   ├── page.js (수련장 "/training")
│   └── [topic]/
│       ├── page.js (문파 "/training/[topic]")
│       └── [slug]/
│           └── page.js (관문 "/training/[topic]/[slug]")
```

---

### 사용자 여정 흐름

#### 1️⃣ **홈페이지** (`/`)

**URL:** `/`

**컴포넌트:** `src/app/page.js`

**렌더링:**
- 히어로 섹션 (제목 + 설명)
- 7개 문파 카드 그리드 (반응형: 1열 / 2열 / 3열)
- 각 카드: 제목 + 설명 + 배지

**데이터 소스:**
```js
const topicIds = getAllTopicIds();
topicIds.map(id => getTopic(id));
```

**액션:**
- 카드 클릭 → `/training/[topic]`로 이동

---

#### 2️⃣ **수련장** (`/training`)

**URL:** `/training`

**컴포넌트:** `src/app/training/page.js`

**렌더링:**
- Breadcrumb (홈 > 수련장)
- 제목 + 설명
- 7개 문파 카드 그리드 (홈과 동일)

**액션:**
- 카드 클릭 → `/training/[topic]`로 이동

---

#### 3️⃣ **문파 (토픽)** (`/training/[topic]`)

**URL:** `/training/01-useState`

**컴포넌트:**
- `src/app/training/[topic]/page.js` (동적 라우트)
- `<SooryeonLayout>` 레이아웃
- `<SooryeonCard>` × 7개 (관문 카드)

**데이터 로드:**
```js
const topic = getTopic(topicId);
const gates = getGates(topicId); // 7개 관문
```

**렌더링:**
- 문파 제목 + 배지 + 설명
- 7개 관문 카드 그리드

**각 카드:**
- 관문 제목 + 미션
- "학습하기" 버튼 → 관문 페이지로 이동

**액션:**
- 카드 클릭 또는 "학습하기" → `/training/[topic]/[slug]`로 이동

---

#### 4️⃣ **관문 (게이트)** (`/training/[topic]/[slug]`)

**URL:** `/training/01-useState/gate-1-basic`

**컴포넌트:**
- `src/app/training/[topic]/[slug]/page.js` (동적 라우트)
- `<GatePage>` (콘텐츠 컴포넌트)

**데이터 로드:**
```js
const topic = getTopic(topicId);
const gates = getGates(topicId);
const gate = gates.find(g => g.slug === slug);
```

**렌더링:**
1. **Breadcrumb:** 수련장 > 문파 > 관문
2. **헤더:** 관문 제목 + 미션 + 배지 (N/7)
3. **이론 섹션:**
   - `<MarkdownViewer content={gate.theory} />`
   - 이론 이미지 / 코드 예제 포함
4. **코드 에디터:**
   - `<CodeEditor initialCode={gate.starterCode} />`
   - 실시간 실행 + 콘솔 표시
5. **네비게이션:**
   - 이전 관문 (← 관문 1)
   - 목록으로 (중앙)
   - 다음 관문 (관문 3 →)

**액션:**
- 이전/다음 관문 클릭 → 다른 관문 페이지로 이동
- 목록으로 클릭 → 문파 페이지로 이동

---

### 정적 생성 (Static Generation)

**Next.js 최적화:**
```js
// [topic]/[slug]/page.js
export async function generateStaticParams() {
  return getAllGates().map(({ topic, slug }) => ({
    topic,
    slug,
  }));
}
```

**결과:**
- 빌드 시점에 56개 경로 모두 정적 HTML 생성
- 런타임 데이터 페칭 없음 → 초고속 로딩

---

## 4. 데이터 흐름 (Data Flow)

```
curriculum.js (단일 소스)
    ↓
    ├─→ home (getAllTopicIds, getTopic)
    ├─→ /training (getAllTopicIds, getTopic)
    ├─→ /training/[topic] (getTopic, getGates)
    └─→ /training/[topic]/[slug] (getTopic, getGates)
```

**핵심:**
- 모든 데이터는 `curriculum.js`에서만 읽음
- 컴포넌트는 상태를 관리하지 않음 (RSC 우선)
- 클라이언트 상호작용 필요한 경우만 `'use client'` (Header, CodeEditor, useTheme)

---

## 5. 디자인 토큰 (Design System)

**색상 팔레트:**
- Light: `#fffef4` (한지) + 오방색 (적/청/황/흑)
- Dark: `#0f0c0a` (밤하늘) + 밝은 전통색

**CSS 변수:**
- `bg-background`, `text-foreground` (기본)
- `bg-card`, `text-card-foreground` (카드)
- `bg-muted`, `text-muted-foreground` (약화)
- `border-border` (테두리)
- `bg-accent` (강조)

**적용:**
```jsx
// ❌ 직접 팔레트 사용 금지
className="bg-zinc-100"

// ✅ 토큰 사용
className="bg-background text-foreground"
```

---

## 6. 주요 제약사항 (Constraints)

| 제약 | 이유 | 영향 |
|------|------|------|
| JS/JSX만 사용 (TS/TSX 금지) | 학습자 진입 장벽 최소화 | 타입 안전성 제약 |
| pnpm만 사용 | 빠른 설치, 디스크 효율 | npm 사용 불가 |
| `curriculum.js` 단일 소스 | 데이터 일관성 보장 | 다른 파일에 데이터 중복 금지 |
| RSC 우선 | 번들 크기 최소화 | 클라이언트 기능 추가 시 신중함 |
| CSS 변수 사용 | 다크모드 지원 | 직접 색상값 금지 |

---

## 7. 현재 상태 (v0.2.1)

✅ **완료:**
- 기본 구조 (라우팅, 컴포넌트, 데이터)
- 7대 문파 × 49관문 콘텐츠
- 다크/라이트 모드 토글
- 단청 색상 팔레트
- 글로벌 헤더 + 푸터

⏳ **진행 중:**
- 수련 진도 추적 (완료 배지, 진도율 표시)
- UI/UX 개선 (조사 완료, 로드맵 수립)

---

## 8. 즉시 실행 가능한 개선사항

- [ ] **진도 추적:** `useProgress` 훅 + localStorage
  - GatePage에 "관문 완료" 버튼
  - SooryeonCard에 완료 배지
  - 문파별 진도율 표시
- [ ] **스타일 관련:** 세부 미완료 작업 (아이콘 크기, 간격 등)
