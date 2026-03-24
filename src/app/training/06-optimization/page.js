import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 메모이제이션(Memoization)의 본질: 불필요한 계산과 렌더링 비용 절감

**무엇인가:**
이전 계산 결과나 참조값을 저장해두고 입력이 같으면 재사용하는 최적화 기술. \`React.memo\`, \`useMemo\`, \`useCallback\`이 이 삼위일체를 이룬다.

**왜 쓰는가:**
리액트의 기본 리렌더링 특성으로 인한 불필요한 CPU 및 메모리 낭비를 줄이기 위해. 단, 메모이제이션 자체도 비용이므로, 측정 없는 최적화는 오히려 독이다.

**언제 쓰는가:**
연산이 무겁거나, 자식에게 넘기는 참조값이 변해 불필요한 리렌더링이 전파될 때. React Profiler로 병목을 확인한 후 적용하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Referential Integrity",
    description: "useCallback/useMemo를 써야 하는 진짜 이유(참조 동일성). 함수나 객체가 매 렌더마다 새로 생성되어 자식의 memo를 무력화하는 패턴 방어.",
  },
  {
    id: 2,
    title: "2관문. React.memo with Comparator",
    description: "커스텀 비교 함수를 통한 정교한 렌더링 방어막. 기본 얕은 비교가 부족할 때 두 번째 인자로 arePropsEqual 함수를 작성하라.",
  },
  {
    id: 3,
    title: "3관문. Virtualization (Windowing)",
    description: "대량 리스트에서 보이는 부분만 그리는 렌더링 기법. react-window나 @tanstack/virtual로 수천 개 행을 O(1) 수준으로 처리하라.",
  },
  {
    id: 4,
    title: "4관문. Expensive Computation",
    description: "무거운 가공 로직을 분리하여 메인 스레드 점유율 최적화. useMemo로 감싸되 의존성이 정말 바뀔 때만 재계산되는지 검증하라.",
  },
  {
    id: 5,
    title: "5관문. Component Inversion",
    description: "children 활용으로 리렌더링 전파를 물리적으로 차단. 부모가 리렌더되어도 children으로 받은 컴포넌트는 재실행되지 않는 원리.",
  },
  {
    id: 6,
    title: "6관문. Profiler API",
    description: "진짜 병목 지점을 찾아내기 위한 리액트 프로파일러 분석. <Profiler onRender={callback}>으로 커밋 시간을 측정하고 데이터로 결정하라.",
  },
  {
    id: 7,
    title: "7관문. Code Splitting",
    description: "React.lazy와 Suspense를 통한 초기 번들 크기 최적화. 라우트 단위, 무거운 라이브러리 단위로 청크를 분리하여 LCP를 개선하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="06. 성능 최적화: 메모이제이션의 정공법"
      badges={["React", "Performance", "Memoization"]}
      description="측정 없는 최적화는 금물. 7가지 기법으로 진짜 병목을 타격하고 렌더링 비용을 정복하라."
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
