export const ROADMAP = [
  {
    id: "01-useState",
    title: "1. useState",
    subtitle: "상태의 본질과 렌더링 엔진",
    description:
      "컴포넌트 내부에서 유지되는 동적인 데이터이자, 리액트가 화면을 다시 그리게 만드는 핵심 트리거.",
    theory: {
      summary: "UI와 데이터의 선언적 연결",
      details: [
        "**무엇인가:** 컴포넌트 내부에서 유지되는 동적인 데이터.",
        "**왜 쓰는가:** 직접적인 DOM 조작 없이 '데이터 변화 = 화면 변화'라는 선언적 UI 실현.",
        "**언제 쓰는가:** 사용자 입력, 서버 응답 등 화면에 즉각 반영되어야 하는 가변 데이터.",
      ],
    },
    items: [
      "Stale Closure",
      "Batching Mechanism",
      "Lazy Initialization",
      "Derived State",
      "Object Identity",
      "State Colocation",
      "Transition API",
    ],
  },
  {
    id: "02-useEffect",
    title: "2. useEffect",
    subtitle: "사이드 이펙트와 선언적 동기화",
    description:
      "순수 함수적 렌더링을 벗어나 외부 시스템(API, DOM, 타이머)과 상호작용하는 모든 행위.",
    theory: {
      summary: "사이드 이펙트(Side Effect)의 관리",
      details: [
        "**무엇인가:** 외부 시스템과의 상호작용.",
        "**왜 쓰는가:** 리액트 외부 상태와 내부 상태의 안전한 동기화.",
        "**언제 쓰는가:** 데이터 패칭, 구독, 수동 DOM 조작 등.",
      ],
    },
    items: [
      "Synchronization",
      "Race Condition",
      "AbortController",
      "Primitive Dependencies",
      "Effect Event",
      "Idempotency",
      "Ref-based Effect",
    ],
  },
  {
    id: "03-useRef",
    title: "3. useRef & DOM",
    subtitle: "리액트의 탈출구와 명령적 제어",
    description:
      "리렌더링을 유발하지 않으며 컴포넌트 생애주기 동안 유지되는 가변 저장소.",
    theory: {
      summary: "레퍼런스(Reference)의 철학",
      details: [
        "**무엇인가:** 렌더링과 무관한 영속적 저장소.",
        "**왜 쓰는가:** 화면 갱신 없이 값을 유지하거나 직접 DOM 제어.",
        "**언제 쓰는가:** 타이머 ID, 포커스 제어, 비반응형 데이터.",
      ],
    },
    items: [
      "Instance Variables",
      "forwardRef",
      "Mount Timing",
      "Portal Focus Trap",
      "Previous Value",
      "Video/Canvas Control",
      "Ref Cleanups",
    ],
  },
  {
    id: "04-custom-hooks",
    title: "4. Custom Hooks",
    subtitle: "로직의 추상화와 재사용성",
    description:
      "UI와 로직을 분리하여 코드 가독성, 테스트 가능성, 재사용성을 극대화하는 기술.",
    theory: {
      summary: "비즈니스 로직의 독립 선언",
      details: [
        "**무엇인가:** 리액트 훅을 조합한 사용자 정의 로직.",
        "**왜 쓰는가:** 관심사의 분리(Separation of Concerns).",
        "**언제 쓰는가:** 로직 중복 발생 시.",
      ],
    },
    items: [
      "Headless UI",
      "useFetch",
      "useLocalStorage",
      "Hook Composition",
      "Debounce/Throttle",
      "useIsMounted",
      "Testing",
    ],
  },
  {
    id: "05-context",
    title: "5. Context API",
    subtitle: "전역 상태 최적화",
    description:
      "트리 깊이에 관계없이 데이터를 직접 전달하는 공유 저장소 모델.",
    theory: {
      summary: "Prop Drilling을 넘어서는 데이터 고속도로",
      details: [
        "**무엇인가:** 컴포넌트 트리 전반에 데이터를 공급하는 메커니즘.",
        "**왜 쓰는가:** 효율적인 데이터 공유.",
        "**언제 쓰는가:** 테마, 인증, 언어 설정 등.",
      ],
    },
    items: [
      "Context Selector",
      "Multiple Providers",
      "State Colocation",
      "Zustand Interop",
      "Dependency Injection",
      "Runtime Error Guard",
      "Hydration Warning",
    ],
  },
  {
    id: "06-performance",
    title: "6. Performance",
    subtitle: "성능 최적화 (Memoization)",
    description:
      "불필요한 계산과 렌더링 비용을 절감하여 사용자 경험을 극대화하는 기술.",
    theory: {
      summary: "메모이제이션의 본질",
      details: [
        "**무엇인가:** 이전 결과를 재사용하는 최적화.",
        "**왜 쓰는가:** 리렌더링 비용 절감.",
        "**언제 쓰는가:** 무거운 연산, 참조 불안정성 해결 시.",
      ],
    },
    items: [
      "Referential Integrity",
      "React.memo",
      "Virtualization",
      "Expensive Computation",
      "Component Inversion",
      "Profiler API",
      "Code Splitting",
    ],
  },
  {
    id: "07-nextjs",
    title: "7. Next.js & RSC",
    subtitle: "서버 컴포넌트 문파",
    description:
      "브라우저의 짐을 서버로 옮겨 초기 로딩과 검색 엔진 최적화를 달성하는 아키텍처.",
    theory: {
      summary: "SSR과 RSC: 렌더링의 주권 이동",
      details: [
        "**무엇인가:** 서버에서 미리 HTML을 생성하거나 컴포넌트 실행.",
        "**왜 쓰는가:** LCP 향상, SEO, 번들 사이즈 감소.",
        "**언제 쓰는가:** 대규모 서비스, SEO 필수 페이지.",
      ],
    },
    items: [
      "Server-Client Composition",
      "Server Actions",
      "Streaming",
      "Request Memoization",
      "PPR",
      "Metadata API",
      "Hydration Mismatch",
    ],
  },
];
