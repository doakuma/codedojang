import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 03. useRef: 렌더링과 무관한 저장소

**무엇인가:**  
값이 변경되어도 리렌더링을 유발하지 않는 가변 값을 저장하거나, 실제 DOM 노드에 직접 접근할 수 있게 해주는 Hook입니다.

**왜 사용하는가:**  
상태(State)로 관리하면 불필요한 렌더링이 발생하는 값을 저장하거나, 포커스 제어 같은 DOM API를 직접 사용해야 할 때 유용합니다.

**언제 사용하는가:**  
타이머 ID 저장, 이전 값(Previous value) 기억, input 요소 포커싱 등 **UI 렌더링과 관계없는 데이터**를 다룰 때 사용합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
