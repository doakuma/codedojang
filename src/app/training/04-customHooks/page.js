import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 커스텀 훅(Custom Hooks)의 존재 이유: 비즈니스 로직의 독립 선언

**무엇인가:**
리액트 기본 훅들을 조합하여 특정 기능을 수행하도록 만든 사용자 정의 로직. \`use\`로 시작하는 이름 규칙을 따르며, 훅의 규칙이 동일하게 적용된다.

**왜 쓰는가:**
UI와 로직을 분리하여 코드 가독성, 테스트 가능성, 재사용성을 극대화하기 위해. 컴포넌트는 '무엇을 보여줄 것인가'에만 집중하게 된다.

**언제 쓰는가:**
두 개 이상의 컴포넌트에서 상태 로직이 중복되거나 컴포넌트가 너무 비대해질 때. 단, 단일 컴포넌트에서만 쓰이는 로직 추출은 과설계(Over-engineering)일 수 있다.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Headless UI Pattern",
    description: "UI 없이 기능만 제공하여 디자인 자유도를 높이는 설계. useToggle, useCounter 등 순수 로직 훅이 그 전형이다.",
  },
  {
    id: 2,
    title: "2관문. useFetch with Cache",
    description: "로딩/에러 처리와 간단한 결과 캐싱을 포함한 데이터 훅. useRef로 캐시 맵을 유지하고 URL 키로 중복 요청을 차단하라.",
  },
  {
    id: 3,
    title: "3관문. useLocalStorage",
    description: "상태 변경 시 스토리지와 자동 동기화되는 영속 상태 훅. JSON 직렬화와 초기화 시 Hydration 불일치를 반드시 방어하라.",
  },
  {
    id: 4,
    title: "4관문. Hook Composition",
    description: "작은 훅들을 조립해 거대한 비즈니스 로직 완성하기. useFetch + useDebounce + useLocalStorage를 결합한 useSearchHistory.",
  },
  {
    id: 5,
    title: "5관문. Debounce & Throttle Hooks",
    description: "성능 최적화를 위한 이벤트 제어 훅. useDebounce는 값을, useThrottle은 함수를 제어하며 타이머 cleanup을 잊지 마라.",
  },
  {
    id: 6,
    title: "6관문. useIsMounted",
    description: "언마운트 후 상태 업데이트 방지로 메모리 누수 경고 방어. isMounted ref를 통해 비동기 완료 시점의 컴포넌트 생존을 확인하라.",
  },
  {
    id: 7,
    title: "7관문. Testing with RenderHook",
    description: "UI 없이 훅 로직만 독립적으로 검증하는 테스트 기법. @testing-library/react의 renderHook과 act로 상태 변화를 추적하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="04. Custom Hooks: 로직의 추상화와 재사용성"
      badges={["React", "Hook", "Abstraction"]}
      description="비즈니스 로직을 독립 선언하고, 7가지 실전 패턴으로 컴포넌트를 날렵하게 만들어라."
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
