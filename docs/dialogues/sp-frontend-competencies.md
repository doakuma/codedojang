# 특별대담 — 프론트엔드 개발자의 소양

> **키워드:** `frontend-competencies`
> **날짜:** 2026-03-31
> **관련 파일:** 없음 (메타 대담)

---

## 대담

**Q. React/Next.js 설계 원칙을 넘어서, 프론트엔드 개발자로서 가져야 할 소양이 뭐야?**

8개 레이어로 나눌 수 있어.

---

### 레이어 1. 브라우저를 이해한다

> "나는 React를 쓰는 게 아니라, 브라우저 위에서 React를 쓴다"

- **렌더링 파이프라인** — HTML 파싱 → CSSOM → DOM → Layout → Paint → Composite
- **이벤트 루프** — 콜스택, 마이크로태스크, 매크로태스크
- **네트워크** — HTTP 캐싱, CDN, 요청 비용
  - ✅ DNS — 도메인 → IP 변환, DNS 캐시
  - ✅ HTTP — HyperText Transfer Protocol 어원
  - ✅ 상태코드 — 2xx, 3xx, 4xx, 5xx
  - ✅ HTTP 캐시 — Cache-Control, max-age, no-cache, no-store, public, private
  - ✅ 304 Not Modified
  - ✅ 데이터 호출 방식 — fetch, axios, react-query, swr
  - ✅ ETag — 파일 변경 여부 확인하는 지문
  - ⬜ CDN — Vercel이 어떻게 캐시를 관리하는지
  - ⬜ HTTPS — HTTP와 뭐가 다른가, SSL/TLS
  - ⬜ 요청/응답 구조 — 헤더, 바디, 메서드(GET/POST/PUT/DELETE)
  - ⬜ CORS — 왜 로컬에서 API 호출하면 에러나는가
  - ⬜ 쿠키/세션/토큰 — 인증 방식
  - ⬜ WebSocket — 실시간 통신
- **Web API** — localStorage, fetch, IntersectionObserver...

React가 뭘 추상화하고 있는지 알려면 그 아래가 보여야 해.

---

### 레이어 2. JavaScript를 이해한다 (프레임워크 아니고)

> "React가 사라져도 JS는 남는다"

- 클로저, 프로토타입, 이벤트 위임
- 비동기 — Promise, async/await, 콜백의 차이
- 모듈 시스템 — ESM, CommonJS
- 메모리 관리 — 참조, 가비지 컬렉션

프레임워크는 5년마다 바뀌고, JS는 30년째 그 자리야.

---

### 레이어 3. UI를 설계한다 (컴포넌트 사고)

> "코드 짜기 전에 UI를 어떻게 쪼갤지 먼저 생각한다"

- 단일 책임 — 한 컴포넌트가 몇 가지 일을 하는지
- 합성 vs 상속 — `children`으로 풀 수 있는가
- 상태 위치 결정 — 어디서 관리할 게 가장 자연스러운가
- 재사용 vs 복제 — 추상화 비용이 재사용 이익보다 큰가

---

### 레이어 4. 데이터를 다룬다

> "UI와 데이터를 연결하는 것이 프론트엔드의 핵심 업무다"

- **호출 방식** — fetch, axios, XMLHttpRequest
- **비동기 처리** — async/await, Promise
- **상태 관리** — react-query, swr, 로딩/에러 상태
- **캐시 전략** — Cache-Control, HTTP 캐시, CDN

레이어 1~2에서 배운 것들이 실전에서 교차하는 지점.

---

### 레이어 5. 성능을 의식한다

> "동작하는 것과 빠른 것은 다르다"

- **번들 크기** — 내가 import한 게 최종 JS에 얼마나 들어가나
- **렌더링 최적화** — 불필요한 리렌더링을 막는가
- **Core Web Vitals** — LCP, CLS, INP
- **SSG/SSR/CSR 선택** — 이 페이지는 언제 렌더링되는 게 맞나

---

### 레이어 6. 사용자를 의식한다

> "화면 너머에 사람이 있다"

- **접근성(a11y)** — 스크린리더, 키보드 네비게이션
- **반응형** — 화면 크기가 달라져도 읽힌다
- **에러 상태** — 실패했을 때 사용자에게 무엇을 보여주는가
- **로딩 상태** — 기다리는 동안 사용자는 뭘 보나

---

### 레이어 7. 협업 도구로서의 코드를 쓴다

> "6개월 후의 나도 읽을 수 있는가"

- 네이밍 — `data` 말고 `curriculumTopics`
- 파일 구조 — 어디에 뭐가 있는지 예측 가능한가
- 컨벤션 — 팀이 동의한 규칙을 일관되게 따르는가
- 변경 이력 — 커밋 메시지가 왜를 설명하는가

---

### 레이어 8. 시스템을 본다

> "내 코드가 전체 흐름의 어디에 있는가"

- 빌드 파이프라인 — 내 코드가 사용자에게 도달하는 경로
- 배포 — CI/CD, 롤백 전략
- 모니터링 — 에러가 발생하면 어떻게 알 수 있는가
- 보안 — XSS, CSRF, 입력값 신뢰 여부

---

## 우리 프로젝트와의 연결

```
대담 01~04에서 다룬 것
  레이어 3 — 컴포넌트 설계 (RSC, SSG, 라우팅 구조)
  레이어 5 — 성능 (SSG로 번들 없음, CDN 배포)
  레이어 8 — 시스템 (빌드 파이프라인, Vercel 배포 흐름)
```

```
아직 못 다룬 것
  레이어 1 — 브라우저 (이벤트 루프, localStorage 의존도)
  레이어 2 — JS 순수 (클로저 — stale-closure 관문이 이게 목적!)
  레이어 3 — 상태 관리 (Context/Zustand 안 쓰는 이유)
  레이어 4 — 데이터 (fetch, react-query, 캐시 전략)
  레이어 6 — 사용자 (에러 처리, 로딩 상태)
  레이어 7 — 협업 (네이밍, 컨벤션 — CLAUDE.md가 이미 역할 중)
```

---

## 프로젝트 남은 주제와 레이어 매핑

| 레이어 | 남은 주제 | 키워드 |
|--------|-----------|--------|
| 레이어 1 — 브라우저 | localStorage 의존도 | `localstorage-dependency` |
| 레이어 1 — 브라우저 | useTheme 훅 구현 | `usetheme-hook` |
| 레이어 2 — JS 순수 | (관문 자체가 커리큘럼) | — |
| 레이어 3 — 컴포넌트 | GatePage 레이아웃 | `gatepage-layout` |
| 레이어 3 — 컴포넌트 | CodeEditor/MarkdownViewer 분리 | `codeeditor-design` |
| 레이어 3 — 컴포넌트 | SooryeonLayout/Card 역할 | `sooryeon-structure` |
| 레이어 3 — 상태 | Context/Zustand 안 쓰는 이유 | `state-management` |
| 레이어 3 — 데이터 | curriculum.js 단일 소스 | `curriculum-single-source` |
| 레이어 4 — 데이터 | fetch/axios/react-query | `data-fetching` |
| 레이어 5 — 성능 | Sandpack 선택 이유 | `sandpack-editor` |
| 레이어 5 — 성능 | 관문 500개 되면? | `curriculum-scaling` |
| 레이어 7 — 협업 | TypeScript 미사용 | `javascript-only` |
| 레이어 7 — 협업 | 테스트 전략 | `testing-strategy` |
| 레이어 8 — 시스템 | Tailwind + shadcn 조합 | `tailwind-shadcn` |
| 레이어 8 — 시스템 | remark/react-markdown | `markdown-engine` |
| 레이어 8 — 시스템 | slug-routing 최선인가 | `slug-routing` |

---

## 핵심 인사이트

1. **레이어 1~2가 기초체력** — 브라우저와 JS를 모르면 프레임워크는 마법처럼 보인다
2. **레이어 3이 일상 업무의 대부분** — 컴포넌트 설계가 프론트 개발의 핵심 판단
3. **레이어 4가 레이어 1~2의 실전 교차점** — fetch 하나를 잘 쓰려면 브라우저/JS 둘 다 알아야
4. **레이어 5~6은 의식하지 않으면 안 챙기게 됨** — "동작한다"에서 멈추기 쉬운 영역
5. **레이어 7~8은 혼자보다 팀에서 더 중요** — 코드가 도구임을 인식하는 성숙도
6. **코드도보통지 커리큘럼 자체가 레이어 2의 체득을 목표로 함** — stale-closure, batching, race-condition...

---

→ [index.md](./index.md) 에서 주제 선택
