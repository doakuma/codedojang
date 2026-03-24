import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 전역 상태(Global State)의 설계: Prop Drilling을 넘어서는 데이터 고속도로

**무엇인가:**
트리 깊이에 관계없이 데이터를 직접 전달하는 공유 저장소 모델. \`createContext\`로 터널을 뚫고, \`Provider\`로 값을 주입하며, \`useContext\`로 어디서든 꺼낸다.

**왜 쓰는가:**
불필요한 Props 전달(Drilling)을 막고 앱 공통 데이터를 효율적으로 관리하기 위해. 단, Context는 전파 최적화가 없으므로 잘못 설계하면 과다 리렌더링의 주범이 된다.

**언제 쓰는가:**
테마, 유저 인증, 언어 설정 등 앱 전반에 걸친 공유 데이터가 필요할 때. 자주 바뀌는 데이터는 Zustand 등 외부 상태 관리 라이브러리를 고려하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Context Selector Pattern",
    description: "부분 업데이트를 통한 불필요한 전체 리렌더링 차단. Context를 쪼개거나 useMemo로 값을 안정화하여 구독 범위를 최소화하라.",
  },
  {
    id: 2,
    title: "2관문. Multiple Providers",
    description: "도메인별로 쪼개어 관심사를 분리한 마이크로 컨텍스트. AuthContext, ThemeContext, CartContext를 각각 독립 운영하라.",
  },
  {
    id: 3,
    title: "3관문. State Colocation in Context",
    description: "전역 상태가 아닌 부분 전역(Sub-tree) 상태 관리. 앱 루트가 아닌 공통 부모 컴포넌트에 Provider를 배치하는 전략.",
  },
  {
    id: 4,
    title: "4관문. Zustand Interop",
    description: "외부 상태 저장소와 리액트 렌더링 사이클의 안전한 연결. Zustand의 선택적 구독(selector)으로 Context의 과다 리렌더링 한계를 극복하라.",
  },
  {
    id: 5,
    title: "5관문. Dependency Injection",
    description: "하위 컴포넌트에 필요한 기능을 Context로 주입하는 패턴. 구현이 아닌 인터페이스에 의존하게 만들어 테스트 가능성을 높여라.",
  },
  {
    id: 6,
    title: "6관문. Runtime Error Guard",
    description: "Provider 외부 사용 시 명확한 에러를 던지는 커스텀 래퍼. useContext 결과가 undefined일 때 의미 있는 에러 메시지를 제공하라.",
  },
  {
    id: 7,
    title: "7관문. Hydration Warning",
    description: "서버/클라이언트 초기 상태 불일치 해결 전략. Context 초기값이 서버와 클라이언트에서 달라지는 상황을 useEffect로 정규화하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="05. Context API & 전역 상태 최적화"
      badges={["React", "Context", "Global State"]}
      description="Prop Drilling을 끊어내고, 7가지 설계 패턴으로 전역 상태의 함정을 피하며 고속도로를 완성하라."
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
