import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 레퍼런스(Reference)의 철학: 렌더링 궤도를 벗어난 영속적 기억

**무엇인가:**
리렌더링을 유발하지 않으며 컴포넌트 생애주기 동안 유지되는 가변 저장소. \`useRef\`는 두 가지 얼굴을 가진다: DOM 노드 직접 접근과 렌더링 외부 가변 값 저장.

**왜 쓰는가:**
화면 갱신 없이 값만 유지하거나, 리액트의 추상화를 뚫고 직접 DOM을 제어하기 위해. 렌더링 사이클에 묶이지 않아야 하는 값에 \`useState\`를 쓰는 것은 과잉이다.

**언제 쓰는가:**
이전 값 저장, 타이머 ID 관리, 포커스/스크롤 제어 등 비반응형 데이터 관리 시. DOM 조작은 반드시 \`useEffect\` 내에서만 수행하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Instance Variables",
    description: "렌더링 사이클 외부에서 유지되는 가변 데이터 관리. setInterval ID, WebSocket 인스턴스 등을 ref에 저장하는 패턴.",
  },
  {
    id: 2,
    title: "2관문. forwardRef & useImperativeHandle",
    description: "부모에게 정제된 명령적 메서드만 노출하기. 전체 DOM 노드 대신 focus(), scrollTo() 같은 제한된 API만 공개하라.",
  },
  {
    id: 3,
    title: "3관문. Mount Timing",
    description: "ref.current의 null 체크와 조건부 렌더링 대응. 렌더링 중에는 ref.current가 null임을 항상 인지하라.",
  },
  {
    id: 4,
    title: "4관문. Portal Focus Trap",
    description: "모달 접근성을 위한 포커스 가두기 기술. Tab 키와 Shift+Tab을 감지하여 포커스를 모달 내부에 순환시켜라.",
  },
  {
    id: 5,
    title: "5관문. Previous Value Tracking",
    description: "이전 렌더링의 상태값을 기억하는 usePrevious 패턴. useEffect에서 ref.current를 업데이트하여 이전값을 저장하라.",
  },
  {
    id: 6,
    title: "6관문. Video/Canvas Control",
    description: "명령적 외부 API와 리액트의 선언적 인터페이스 융합. video.play()/pause()를 Effect로 감싸 선언적으로 제어하라.",
  },
  {
    id: 7,
    title: "7관문. Ref Cleanups",
    description: "언마운트 시 할당된 외부 인스턴스의 완벽한 메모리 해제. ref.current = null로 참조를 끊어 GC가 수거하게 하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="03. useRef & DOM: 탈출구와 명령적 제어"
      badges={["React", "Hook", "DOM"]}
      description="렌더링 궤도를 벗어난 ref의 두 얼굴을 이해하고, 7가지 패턴으로 명령적 제어를 완전히 장악하라."
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
