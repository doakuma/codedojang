# Codedojang — 기술 결정 로그 (ADR)

> 중요한 기술 결정을 내릴 때마다 즉시 기록합니다.
> "왜 이렇게 했나?"를 미래의 나와 AI에게 설명하는 파일입니다.

---

## 2026.03.25 — GSD 문서 구조 도입

**결정:** `.claude/`, `docs/`, `tasks/` 기반 GSD 방법론 문서 구조 셋업

**이유:** 컨텍스트 창이 압축될 때마다 프로젝트 상태와 결정 이유를 매번 재설명해야 하는 비효율 해소. 새 대화에서도 `docs/state.md` 하나로 현재 상태를 즉시 파악 가능하게 함

**트레이드오프:** 문서 유지보수 부담 추가. 작업 완료마다 state.md 업데이트 필요

---

## 2026.03.24 — react-markdown v9 pre/code 분리 렌더러

**결정:** `MarkdownViewer`에서 `pre` 컴포넌트 렌더러를 별도 추가. `code`는 인라인 전용, `pre`는 코드블록 전용으로 역할 분리

**이유:** react-markdown v9에서 `code` 컴포넌트의 `inline` prop이 제거됨. 제거 전 코드가 `inline` 체크 시 항상 `undefined`(falsy)로 평가되어 모든 코드를 `<pre>` 블록으로 렌더링 → `<p>` 안에 `<pre>` 중첩으로 React hydration 에러 발생

**대안:** `inline` prop이 있는 이전 버전 react-markdown 사용 → 버전 고정 부채 증가로 기각

**트레이드오프:** `pre` 내부 `code`의 인라인 스타일을 Tailwind arbitrary variant `[&_code]:bg-transparent [&_code]:p-0`으로 수동 초기화해야 함

---

## 2026.03.24 — curriculum.js 단일 소스 확립

**결정:** `src/data/roadmap.js` 삭제. 홈·수련장 인덱스·관문 상세 모두 `src/lib/curriculum.js`에서만 데이터를 읽도록 통일

**이유:** `roadmap.js`의 토픽 ID(`04-custom-hooks`, `06-performance`, `07-nextjs`)가 `curriculum.js`의 실제 ID와 불일치하여 홈에서 카드 클릭 시 404 발생. 데이터 중복 = 불일치 버그의 근원

**트레이드오프:** 없음. 데이터 변경 지점이 하나로 줄어드는 것만 긍정적

---

## 2026.03.24 — Sandpack 코드 에디터 도입

**결정:** `@codesandbox/sandpack-react` v2.20.0 도입. 기존 `<textarea>` 교체

**이유:** 수련 코드를 작성해도 실행·평가 방법이 없어 학습 효과가 없었음

**대안:**
- Monaco Editor: 실행 환경 별도 구축 필요, 복잡도 높음
- CodeMirror: 에디터만 있고 실행 환경 없음

**트레이드오프:**
- Sandpack이 클라이언트에서 자체 CSS 주입 → `getSandpackCssText()`를 RSC에서 호출 불가 (클라이언트 전용). 별도 CSS 주입 코드 불필요하므로 제거
- iframe 기반이라 번들 크기 무관하게 독립 실행

---

## 2026.03.24 — 동적 라우팅 [topic]/[slug] 통합

**결정:** `01-useState/`, `02-useEffect/` … 7개 폴더를 `[topic]/[slug]` Dynamic Route 하나로 통합

**이유:** 7개 토픽 × 2레벨 = 14개 파일이 데이터만 다르고 구조 동일. `generateStaticParams()`로 빌드 시 56개 정적 경로 생성 가능

**트레이드오프:** 없음. 파일 수 14 → 2개로 감소. 토픽 추가 시 `curriculum.js`만 수정하면 됨

---

## 2026.03.23 — Next.js App Router 마이그레이션

**결정:** Vite + React SPA에서 Next.js 16.2.1 App Router로 전환

**이유:** RSC(React Server Component)로 데이터 로직을 서버에서 처리, 정적 생성으로 SEO 대응, 파일 기반 라우팅으로 구조 명확화

**대안:** Vite 유지 → RSC 불가, 라우팅 구조 직접 관리 필요

**트레이드오프:** `params`를 `async/await`으로 받아야 하는 등 Next.js 16 breaking change 적응 필요
