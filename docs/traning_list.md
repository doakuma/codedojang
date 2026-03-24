# 🥋 리액트 & Next.js 정공법 수련 대백과 (7x8 Master Roadmap)

이 문서는 단순한 리스트를 넘어, 프론트엔드 아키텍트가 되기 위한 **[근본 원리]**와 **[실무 패턴]**을 집대성한 수련 지도이다.

---

## 1. useState: 상태의 본질과 렌더링 엔진

- **0. 상태(State)란 무엇인가: UI와 데이터의 선언적 연결**
  - **무엇인가:** 컴포넌트 내부에서 유지되는 동적인 데이터이자, 리액트가 화면을 다시 그리게 만드는 핵심 트리거.
  - **왜 쓰는가:** 직접적인 DOM 조작 없이 "데이터 변화 = 화면 변화"라는 선언적 UI를 실현하기 위해.
  - **언제 쓰는가:** 사용자 입력, 서버 응답 등 화면에 즉각 반영되어야 하는 가변 데이터가 있을 때.
- **1. Stale Closure:** 클로저 함정에 빠져 이전 상태를 참조하는 현상 해결.
- **2. Batching Mechanism:** 리액트 18의 자동 배칭과 `flushSync` 제어.
- **3. Lazy Initialization:** 초기값 계산 비용 절감을 위한 함수형 초기화.
- **4. Derived State:** Props를 State로 복제하지 않는 단일 진실 공급원(SSOT) 설계.
- **5. Object Identity:** 중첩 객체 업데이트와 참조 무결성(Immer 패턴).
- **6. State Colocation:** 상태를 올리기보다 내리기를 먼저 고민하는 최적 배치.
- **7. Transition API:** `startTransition`을 이용한 비긴급 업데이트 분리.

---

## 2. useEffect: 사이드 이펙트와 선언적 동기화

- **0. 사이드 이펙트(Side Effect)의 관리: 리액트 외부 세계와의 통신**
  - **무엇인가:** 순수 함수적 렌더링을 벗어나 외부 시스템(API, DOM, 타이머)과 상호작용하는 모든 행위.
  - **왜 쓰는가:** 리액트 외부의 상태와 컴포넌트의 내부 상태를 안전하고 일관되게 동기화하기 위해.
  - **언제 쓰는가:** 데이터 패칭, 이벤트 구독, 수동 DOM 조작, 외부 라이브러리 인스턴스화 시점.
- **1. Synchronization, not Lifecycle:** 라이프사이클이 아닌 '동기화' 관점의 접근.
- **2. Race Condition:** 비동기 응답 순서 꼬임을 방지하는 `ignore` 플래그 패턴.
- **3. AbortController:** 언마운트 시 진행 중인 네트워크 요청을 실제 중단시키는 비기.
- **4. Primitive Dependencies:** 객체 대신 원시값을 의존성에 넣어 불필요한 실행 차단.
- **5. Effect Event (Experimental):** 반응형 로직과 비반응형 로직의 경계 분리.
- **6. Idempotency (멱등성):** 여러 번 실행되어도 동일한 결과를 보장하는 로직 설계.
- **7. Ref-based Effect:** `ResizeObserver` 등 DOM 관측 API와의 정교한 결합.

---

## 3. useRef & DOM: 리액트의 탈출구와 명령적 제어

- **0. 레퍼런스(Reference)의 철학: 렌더링 궤도를 벗어난 영속적 기억**
  - **무엇인가:** 리렌더링을 유발하지 않으며 컴포넌트 생애주기 동안 유지되는 가변 저장소.
  - **왜 쓰는가:** 화면 갱신 없이 값만 유지하거나, 리액트의 추상화를 뚫고 직접 DOM을 제어하기 위해.
  - **언제 쓰는가:** 이전 값 저장, 타이머 ID 관리, 포커스/스크롤 제어 등 비반응형 데이터 관리 시.
- **1. Instance Variables:** 렌더링 사이클 외부에서 유지되는 가변 데이터 관리.
- **2. forwardRef & useImperativeHandle:** 부모에게 정제된 명령적 메서드만 노출하기.
- **3. Mount Timing:** `ref.current`의 null 체크와 조건부 렌더링 대응.
- **4. Portal Focus Trap:** 모달 접근성을 위한 포커스 가두기 기술.
- **5. Previous Value Tracking:** 이전 렌더링의 상태값을 기억하는 `usePrevious` 패턴.
- **6. Video/Canvas Control:** 명령적 외부 API와 리액트의 선언적 인터페이스 융합.
- **7. Ref Cleanups:** 언마운트 시 할당된 외부 인스턴스의 완벽한 메모리 해제.

---

## 4. Custom Hooks: 로직의 추상화와 재사용성

- **0. 커스텀 훅(Custom Hooks)의 존재 이유: 비즈니스 로직의 독립 선언**
  - **무엇인가:** 리액트 기본 훅들을 조합하여 특정 기능을 수행하도록 만든 사용자 정의 로직.
  - **왜 쓰는가:** UI와 로직을 분리하여 코드 가독성, 테스트 가능성, 재사용성을 극대화하기 위해.
  - **언제 쓰는가:** 두 개 이상의 컴포넌트에서 상태 로직이 중복되거나 컴포넌트가 너무 비대해질 때.
- **1. Headless UI Pattern:** UI 없이 기능만 제공하여 디자인 자유도를 높이는 설계.
- **2. useFetch with Cache:** 로딩/에러 처리와 간단한 결과 캐싱을 포함한 데이터 훅.
- **3. useLocalStorage:** 상태 변경 시 스토리지와 자동 동기화되는 영속 상태 훅.
- **4. Hook Composition:** 작은 훅들을 조립해 거대한 비즈니스 로직 완성하기.
- **5. Debounce & Throttle Hooks:** 성능 최적화를 위한 이벤트 제어 훅.
- **6. useIsMounted:** 언마운트 후 상태 업데이트 방지로 메모리 누수 경고 방어.
- **7. Testing with RenderHook:** UI 없이 훅 로직만 독립적으로 검증하는 테스트 기법.

---

## 5. Context API & 전역 상태 최적화

- **0. 전역 상태(Global State)의 설계: Prop Drilling을 넘어서는 데이터 고속도로**
  - **무엇인가:** 트리 깊이에 관계없이 데이터를 직접 전달하는 공유 저장소 모델.
  - **왜 쓰는가:** 불필요한 Props 전달(Drilling)을 막고 앱 공통 데이터를 효율적으로 관리하기 위해.
  - **언제 쓰는가:** 테마, 유저 인증, 언어 설정 등 앱 전반에 걸친 공유 데이터가 필요할 때.
- **1. Context Selector Pattern:** 부분 업데이트를 통한 불필요한 전체 리렌더링 차단.
- **2. Multiple Providers:** 도메인별로 쪼개어 관심사를 분리한 마이크로 컨텍스트.
- **3. State Colocation in Context:** 전역 상태가 아닌 부분 전역(Sub-tree) 상태 관리.
- **4. Zustand Interop:** 외부 상태 저장소와 리액트 렌더링 사이클의 안전한 연결.
- **5. Dependency Injection:** 하위 컴포넌트에 필요한 기능을 Context로 주입하는 패턴.
- **6. Runtime Error Guard:** Provider 외부 사용 시 명확한 에러를 던지는 커스텀 래퍼.
- **7. Hydration Warning:** 서버/클라이언트 초기 상태 불일치 해결 전략.

---

## 6. 성능 최적화 (Memoization)

- **0. 메모이제이션(Memoization)의 본질: 불필요한 계산과 렌더링 비용 절감**
  - **무엇인가:** 이전 계산 결과나 참조값을 저장해두고 입력이 같으면 재사용하는 최적화 기술.
  - **왜 쓰는가:** 리액트의 기본 리렌더링 특성으로 인한 불필요한 CPU 및 메모리 낭비를 줄이기 위해.
  - **언제 쓰는가:** 연산이 무겁거나, 자식에게 넘기는 참조값이 변해 불필요한 리렌더링이 전파될 때.
- **1. Referential Integrity:** `useCallback/useMemo`를 써야 하는 진짜 이유(참조 동일성).
- **2. React.memo with Comparator:** 커스텀 비교 함수를 통한 정교한 렌더링 방어막.
- **3. Virtualization (Windowing):** 대량 리스트에서 보이는 부분만 그리는 렌더링 기법.
- **4. Expensive Computation:** 무거운 가공 로직을 분리하여 메인 스레드 점유율 최적화.
- **5. Component Inversion:** `children` 활용으로 리렌더링 전파를 물리적으로 차단.
- **6. Profiler API:** 진짜 병목 지점을 찾아내기 위한 리액트 프로파일러 분석.
- **7. Code Splitting:** `React.lazy`와 `Suspense`를 통한 초기 번들 크기 최적화.

---

## 7. Next.js & RSC (서버 컴포넌트 문파)

- **0. 서버 사이드 렌더링(SSR)과 RSC: 브라우저의 짐을 서버로 옮기기**
  - **무엇인가:** 서버에서 컴포넌트를 미리 실행하여 HTML을 생성하거나 데이터를 직렬화해 전달하는 방식.
  - **왜 쓰는가:** 초기 로딩(LCP) 향상, SEO 최적화, 클라이언트 번들 크기 획기적 감축을 위해.
  - **언제 쓰는가:** 보안이 중요한 데이터 호출, 초기 로딩 속도가 핵심인 서비스, 대규모 동적 페이지.
- **1. Server-Client Composition:** 서버 컴포넌트 안에 클라이언트를 주입하는 고급 패턴.
- **2. Server Actions & Optimistic UI:** 낙관적 업데이트를 통한 0ms 체감 속도 구현.
- **3. Streaming & Suspense:** 준비된 데이터부터 순차적으로 보여주는 점진적 UX.
- **4. Request Memoization:** 동일 요청 사이클 내 중복 `fetch` 자동 제거 원리.
- **5. PPR (Partial Prerendering):** 정적 레이아웃과 동적 컨텐츠의 차세대 공존 모델.
- **6. SEO & Metadata API:** 동적 경로에서도 검색 엔진을 사로잡는 메타데이터 관리.
- **7. Hydration Mismatch:** 서버와 클라이언트 불일치를 해결하는 정공법 디버깅.
