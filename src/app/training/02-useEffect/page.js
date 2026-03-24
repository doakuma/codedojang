import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 사이드 이펙트(Side Effect)의 관리: 리액트 외부 세계와의 통신

**무엇인가:**
순수 함수적 렌더링을 벗어나 외부 시스템(API, DOM, 타이머)과 상호작용하는 모든 행위. \`useEffect\`는 이 비순수한 작업들을 렌더링 이후 안전하게 실행하는 격리 공간이다.

**왜 쓰는가:**
리액트 외부의 상태와 컴포넌트의 내부 상태를 안전하고 일관되게 동기화하기 위해. 의존성 배열이 이 동기화의 조건을 선언한다.

**언제 쓰는가:**
데이터 패칭, 이벤트 구독, 수동 DOM 조작, 외부 라이브러리 인스턴스화 시점. 단, 서버 컴포넌트(RSC) 환경에서는 \`useEffect\` 없이 직접 \`await fetch()\`를 사용하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Synchronization, not Lifecycle",
    description: "라이프사이클이 아닌 '동기화' 관점의 접근. componentDidMount/Update 사고방식을 버리고 '이 외부 시스템을 이 props/state에 맞게 동기화한다'로 사고하라.",
  },
  {
    id: 2,
    title: "2관문. Race Condition",
    description: "비동기 응답 순서 꼬임을 방지하는 ignore 플래그 패턴. let ignore = false; cleanup에서 ignore = true로 설정하라.",
  },
  {
    id: 3,
    title: "3관문. AbortController",
    description: "언마운트 시 진행 중인 네트워크 요청을 실제 중단시키는 비기. cleanup 함수에서 controller.abort()를 호출하라.",
  },
  {
    id: 4,
    title: "4관문. Primitive Dependencies",
    description: "객체 대신 원시값을 의존성에 넣어 불필요한 실행 차단. user 객체 대신 user.id를 의존성으로 선언하라.",
  },
  {
    id: 5,
    title: "5관문. Effect Event (Experimental)",
    description: "반응형 로직과 비반응형 로직의 경계 분리. useEffectEvent로 최신 값을 참조하되 재실행 트리거는 막는다.",
  },
  {
    id: 6,
    title: "6관문. Idempotency (멱등성)",
    description: "여러 번 실행되어도 동일한 결과를 보장하는 로직 설계. Strict Mode의 이중 실행에서 살아남는 Effect를 작성하라.",
  },
  {
    id: 7,
    title: "7관문. Ref-based Effect",
    description: "ResizeObserver 등 DOM 관측 API와의 정교한 결합. ref.current를 Effect 내에서 지역 변수로 캡처하여 cleanup에서 안전하게 사용하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="02. useEffect: 사이드 이펙트와 선언적 동기화"
      badges={["React", "Hook", "Side Effect"]}
      description="외부 세계와의 통신을 '동기화' 관점으로 재정의하고, 7가지 실무 패턴으로 Effect를 완전히 통제하라."
    >
      <MarkdownViewer content={theoryContent} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <SooryeonCard
            key={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </SooryeonLayout>
  );
}
