# 코드도보통지 — 컴포넌트 트리 & 데이터 흐름

> 시각적으로 이해하는 전체 구조

---

## 1. 전체 컴포넌트 트리

```
RootLayout (src/app/layout.js)
│
├─ Header (sticky)
│  ├─ 로고 (홈 링크)
│  ├─ 네비게이션 (수련장)
│  └─ 우측 (테마 토글 + GitHub)
│
├─ main
│  │
│  ├─ (/) Home Page
│  │  └─ 7×문파 카드 그리드
│  │     └─ Link to /training/[topic]
│  │
│  ├─ (/training) Training Index
│  │  └─ 7×문파 카드 그리드
│  │     └─ Link to /training/[topic]
│  │
│  ├─ (/training/[topic]) Topic Page
│  │  └─ SooryeonLayout
│  │     ├─ 제목 + 배지 + 설명
│  │     └─ 7×SooryeonCard (관문)
│  │        ├─ 제목 + 미션
│  │        ├─ 아코디언 (detail)
│  │        └─ "학습하기" 버튼
│  │           └─ Link to /training/[topic]/[slug]
│  │
│  └─ (/training/[topic]/[slug]) Gate Page
│     └─ GatePage
│        ├─ Breadcrumb
│        ├─ 헤더 (제목 + 미션 + 배지)
│        ├─ MarkdownViewer (이론)
│        ├─ CodeEditor (Sandpack)
│        └─ 네비게이션
│           ├─ 이전 관문
│           ├─ 목록으로
│           └─ 다음 관문
│
└─ footer
   └─ "Keep Grinding." 메시지
```

---

## 2. 컴포넌트별 책임 (Responsibility)

### 📄 페이지 컴포넌트 (Server Component)

| 페이지 | 파일 | 역할 | 데이터 소스 |
|--------|------|------|-----------|
| 홈 | `app/page.js` | 전체 소개, 7개 문파 카드 그리드 | `curriculum.getAllTopicIds()` |
| 수련장 | `app/training/page.js` | 문파 목록 페이지 | `curriculum.getAllTopicIds()` |
| 문파 | `app/training/[topic]/page.js` | 문파 이론 + 7개 관문 카드 그리드 | `curriculum.getTopic()`, `curriculum.getGates()` |
| 관문 | `app/training/[topic]/[slug]/page.js` | 관문 콘텐츠 + 이론 + 코드 에디터 | `curriculum.getTopic()`, `curriculum.getGates()` |

---

### 🎨 Shared 컴포넌트

| 컴포넌트 | 파일 | 타입 | 역할 | Props |
|---------|------|------|------|-------|
| **SooryeonLayout** | `shared/SooryeonLayout.jsx` | RSC | 토픽 페이지 레이아웃 (제목 + 배지 + 설명) | `title`, `badges`, `description`, `children` |
| **GatePage** | `shared/GatePage.jsx` | RSC | 관문 페이지 전체 렌더링 | `gate`, `topicId` |
| **CodeEditor** | `shared/CodeEditor.jsx` | RCC | Sandpack 래퍼 (코드 실행) | `initialCode` |
| **MarkdownViewer** | `shared/MarkdownViewer.jsx` | RSC | 마크다운 렌더러 | `content`, `className` |
| **SooryeonCard** | `shared/SooryeonCard.jsx` | RCC | 일반 카드 (인터랙티브) | `title`, `description`, `icon`, `solution`, `actionButton` 등 |

---

### 🏗️ 레이아웃 컴포넌트

| 컴포넌트 | 파일 | 타입 | 역할 |
|---------|------|------|------|
| **Header** | `layout/Header.jsx` | RCC | 글로벌 sticky 헤더 (테마 토글 포함) |

---

### 🎯 UI 컴포넌트 (shadcn/ui)

**위치:** `src/components/ui/`

- `Button` — 모든 CTA 및 네비게이션 버튼
- `Card` — SooryeonCard, 토픽 카드의 기본 구조
- `Badge` — 문파/관문 카테고리 라벨
- `Dialog` — 비급(solution) 모달 표시
- `Accordion` — 상세 설명 펼침/접기
- `Separator` — 시각적 구분선

---

## 3. 데이터 흐름 (Data Flow Diagram)

### 초기 로드 (정적 생성)

```
Build Time:
-----------
curriculum.js (마스터 데이터)
    ↓
next build
    ↓
generateStaticParams()
    ├─ getAllTopicIds() → ['01-useState', '02-useEffect', ...]
    └─ getAllGates() → 56개 경로 동적 생성
    ↓
./out/ (정적 HTML)
    ├─ / (홈)
    ├─ /training
    ├─ /training/01-useState
    ├─ /training/01-useState/gate-1-basic
    └─ ... (56개 관문)

Runtime:
--------
브라우저
    ↓ (정적 HTML 로드)
    ↓
JavaScript (하이드레이션)
    ├─ Header (클라이언트 인터랙션: 테마 토글)
    ├─ CodeEditor (Sandpack 초기화)
    └─ SooryeonCard (Dialog, Accordion 초기화)
```

### 페이지별 데이터 로드

```
홈 (/)
─────
curriculum.getAllTopicIds()
    ↓ (7개 ID)
curriculum.getTopic(id)
    ↓ (각 문파의 title, description, badges)
렌더링: 7개 카드 그리드


수련장 (/training)
──────────────────
curriculum.getAllTopicIds()
    ↓
curriculum.getTopic(id)
    ↓
렌더링: 7개 카드 그리드 (홈과 동일)


문파 (/training/[topic])
────────────────────────
curriculum.getTopic(topicId)
    ↓ (문파 제목, 배지, 설명)
curriculum.getGates(topicId)
    ↓ (7개 관문: title, mission, slug)
렌더링: SooryeonLayout + 7×SooryeonCard


관문 (/training/[topic]/[slug])
───────────────────────────────
curriculum.getTopic(topicId)
curriculum.getGates(topicId)
    ↓
gate = gates.find(g => g.slug === slug)
    ↓
렌더링:
  ├─ GatePage (게이트 제목, 미션)
  ├─ MarkdownViewer (gate.theory)
  ├─ CodeEditor (gate.starterCode)
  └─ 네비게이션 (prevGate, nextGate)
```

---

## 4. 클라이언트 vs 서버 컴포넌트 분리

### 🟢 Server Component (기본)

- 렌더링: 서버에서만
- 번들 크기: 0 (클라이언트로 전송 안 됨)
- 사용처:
  - 모든 페이지 컴포넌트 (`app/**/page.js`)
  - `SooryeonLayout` (정적 레이아웃)
  - `GatePage` (콘텐츠 렌더링)
  - `MarkdownViewer` (마크다운 렌더링)

### 🔵 Client Component (`'use client'`)

- 렌더링: 브라우저에서
- 번들 크기: 포함됨
- 필요한 이유:
  - **Header** → 테마 토글 (useState, localStorage)
  - **CodeEditor** → Sandpack 초기화 (복잡한 iframe 관리)
  - **SooryeonCard** → Dialog, Accordion, onClick 핸들러
- **useTheme** 훅 → localStorage 접근 (클라이언트 전용)

---

## 5. 컴포넌트 의존성 맵

```
GatePage
├─ curriculum.getTopic()
├─ curriculum.getGates()
├─ MarkdownViewer
│  └─ react-markdown
│     └─ remark-gfm
├─ CodeEditor
│  └─ Sandpack
│     └─ React (iframe)
└─ Link (Next.js)

SooryeonLayout
├─ Badge (UI)
└─ children (보통 SooryeonCard)

SooryeonCard
├─ Card, CardHeader, CardTitle (shadcn/ui)
├─ Button (shadcn/ui)
├─ Badge (shadcn/ui)
├─ Dialog (shadcn/ui)
├─ Accordion (shadcn/ui)
├─ MarkdownViewer
└─ useState, onClick 등 (RCC)

CodeEditor
└─ Sandpack
   ├─ React 18
   ├─ Immer
   ├─ Zustand
   └─ @tanstack/react-virtual

Header
├─ useTheme() (RCC)
├─ Link (Next.js)
├─ Button (shadcn/ui)
├─ lucide-react (아이콘)
└─ localStorage 접근

MarkdownViewer
├─ ReactMarkdown
├─ remark-gfm
├─ cn() util
└─ Tailwind 클래스
```

---

## 6. 상태 관리 (State Management)

**철학:** 최소한의 클라이언트 상태 관리

### 저장되는 상태

| 상태 | 위치 | 저장소 | 목적 |
|------|------|--------|------|
| 테마 (light/dark) | `useTheme()` | localStorage (`codedobo-theme`) | 사용자 선호도 유지 |
| 코드 에디터 | Sandpack 내부 | 메모리 | 세션 중 코드 유지 |

### 저장되지 않는 것 (SSR/정적 생성으로 처리)

- 관문 콘텐츠 (theory, starterCode) → curriculum.js에서 정적 생성
- 라우팅 상태 → Next.js 라우터가 관리
- UI 상태 (Dialog, Accordion) → 각 컴포넌트의 내부 상태

---

## 7. 성능 최적화

### ✅ 적용된 기법

| 기법 | 구현 | 효과 |
|------|------|------|
| **정적 생성** | `generateStaticParams()` 56개 경로 | ~50-100ms (1차 로드) |
| **SSR 없음** | 모든 페이지 정적 HTML | 서버 부하 0 |
| **Code Splitting** | `'use client'` 필요한 곳만 적용 | 불필요한 JS 제외 |
| **이미지 최적화** | 아직 미적용 | — |
| **번들 분석** | 아직 미적용 | — |

### ⏳ 향후 개선 기회

- [ ] Sandpack 레이지 로딩 (CodeEditor)
- [ ] Dialog/Accordion 콘텐츠 지연 로드
- [ ] 이미지 최적화 (next/image)
- [ ] 번들 분석 및 축소

---

## 8. 라우팅 매트릭스

### 동적 라우트 패턴

```
정적:
  /                    → src/app/page.js
  /training            → src/app/training/page.js

동적 (generateStaticParams):
  /training/[topic]                → src/app/training/[topic]/page.js
  /training/[topic]/[slug]         → src/app/training/[topic]/[slug]/page.js
```

### URL 예시

```
/                                    홈
/training                            수련장 (전체 문파 목록)
/training/01-useState                useState 문파 페이지
/training/01-useState/gate-1-basic   useState 1관문 (상태 선언과 업데이트)
/training/02-useEffect/gate-2-fetch  useEffect 2관문 (데이터 페칭)
```

---

## 9. CSS 클래스 사용 패턴

### Tailwind + CSS 변수 조화

```jsx
// ❌ 직접 색상값
className="bg-red-500 text-white"

// ✅ 토큰 사용
className="bg-card text-card-foreground"

// ✅ 토큰 + 유틸 메서드
className={cn("p-4 rounded-lg", isActive && "border-foreground")}
```

### 자주 쓰이는 패턴

```jsx
// 헤더
className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md"

// 컨테이너
className="container mx-auto max-w-5xl px-4"

// 카드
className="rounded-lg border bg-card p-6"

// 텍스트
className="text-foreground" // 기본
className="text-muted-foreground" // 약화
className="text-primary" // 강조
```

---

## 10. 확장 포인트 (Extension Points)

### 추가할 수 있는 기능들

1. **진도 추적**
   - `useProgress()` 훅 (localStorage)
   - SooryeonCard에 "완료" 배지
   - 문파별 진도율 표시

2. **검색 기능**
   - /training 페이지에 검색 입력
   - curriculum.js 전체 검색

3. **북마크**
   - localStorage에 즐겨찾기 관문 저장
   - 홈에 "마지막으로 학습한 관문" 표시

4. **소셜 공유**
   - 관문 공유 버튼
   - 진도 현황 이미지 생성

5. **오프라인 지원**
   - Service Worker
   - 관문 콘텐츠 캐싱

---

## 11. 아키텍처 진화

### v0.2.1 (현재)

```
curriculum.js (단일 소스)
  ↓
    정적 생성 (56개 경로)
  ↓
    렌더링 (React RSC)
  ↓
    클라이언트 하이드레이션
      └─ Header (테마)
      └─ CodeEditor (Sandpack)
      └─ SooryeonCard (Dialog)
```

### v0.3 (진도 추적 추가)

```
curriculum.js + localStorage (진도)
  ↓
    정적 생성
  ↓
    렌더링 (진도 상태 표시)
  ↓
    클라이언트 하이드레이션
      ├─ Header (테마)
      ├─ CodeEditor (Sandpack)
      ├─ SooryeonCard (Dialog + 완료 버튼)
      └─ useProgress (진도 관리)
```

### v1.0 (커뮤니티 기능)

```
curriculum.js + localStorage + API
  ↓
    정적 생성
  ↓
    렌더링
  ↓
    클라이언트
      ├─ 로그인/인증
      ├─ 진도 동기화 (API)
      ├─ 댓글/토론
      └─ 배지/점수 시스템
```
