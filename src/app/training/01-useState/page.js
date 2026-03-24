import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 01. useState: 상태 관리의 정석

**무엇인가:**  
컴포넌트 내에서 관리되는 독립적인 메모리 공간(State)을 선언하고 관리하는 Hook입니다.

**왜 사용하는가:**  
일반 변수와 달리, State가 변경되면 React는 해당 컴포넌트를 리렌더링하여 UI를 최신 상태로 갱신합니다.

**언제 사용하는가:**  
사용자 입력, UI 상호작용 결과 등 시간이 지남에 따라 변하는 데이터를 화면에 반영해야 할 때 사용합니다. **불변성(Immutability)**을 유지하는 것이 핵심입니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
