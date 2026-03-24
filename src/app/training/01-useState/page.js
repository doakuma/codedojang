import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 상태(State)란 무엇인가: UI와 데이터의 선언적 연결

**무엇인가:**
컴포넌트 내부에서 유지되는 동적인 데이터이자, 리액트가 화면을 다시 그리게 만드는 핵심 트리거. 일반 변수와 달리 \`useState\`로 선언된 값은 변경 시 해당 컴포넌트의 리렌더링을 보장한다.

**왜 쓰는가:**
직접적인 DOM 조작 없이 "데이터 변화 = 화면 변화"라는 선언적 UI를 실현하기 위해. 리액트는 상태를 스냅샷으로 다루며, 불변성(Immutability)을 지킨 업데이트만이 올바른 리렌더링을 보장한다.

**언제 쓰는가:**
사용자 입력, 서버 응답 등 화면에 즉각 반영되어야 하는 가변 데이터가 있을 때. 단, 렌더링에 영향을 주지 않는 값은 \`useRef\`를 고려하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Stale Closure",
    description: "클로저 함정에 빠져 이전 상태를 참조하는 현상 해결. 함수형 업데이트(prev => prev + 1)로 최신 상태를 보장하라.",
  },
  {
    id: 2,
    title: "2관문. Batching Mechanism",
    description: "리액트 18의 자동 배칭과 flushSync 제어. 여러 setState가 한 번의 렌더링으로 묶이는 원리를 파악하라.",
  },
  {
    id: 3,
    title: "3관문. Lazy Initialization",
    description: "초기값 계산 비용 절감을 위한 함수형 초기화. useState(() => expensiveCalc())와 useState(expensiveCalc())의 차이.",
  },
  {
    id: 4,
    title: "4관문. Derived State",
    description: "Props를 State로 복제하지 않는 단일 진실 공급원(SSOT) 설계. 파생 데이터는 렌더링 중 계산하라.",
  },
  {
    id: 5,
    title: "5관문. Object Identity",
    description: "중첩 객체 업데이트와 참조 무결성(Immer 패턴). 스프레드 연산자와 immer produce()의 실전 활용.",
  },
  {
    id: 6,
    title: "6관문. State Colocation",
    description: "상태를 올리기보다 내리기를 먼저 고민하는 최적 배치. 가장 가까운 공통 조상에만 상태를 두어라.",
  },
  {
    id: 7,
    title: "7관문. Transition API",
    description: "startTransition을 이용한 비긴급 업데이트 분리. UI 응답성을 유지하며 무거운 상태 전환을 처리하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="01. useState: 상태의 본질과 렌더링 엔진"
      badges={["React", "Hook", "State"]}
      description="리액트 상태 관리의 근본 원리를 체득하고, 7가지 실무 패턴으로 렌더링 엔진을 완전히 지배하라."
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
