import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 05. Context API: 전역 상태 공유

**무엇인가:**  
컴포넌트 트리를 통해 데이터를 일일이 props로 넘겨주지 않고도(Prop Drilling 방지), 트리 깊숙한 곳에 있는 컴포넌트가 값을 공유받을 수 있게 하는 기능입니다.

**왜 사용하는가:**  
테마, 로그인 사용자 정보, 언어 설정 등 앱 전반에 걸쳐 필요한 데이터를 효율적으로 전달하기 위함입니다.

**언제 사용하는가:**  
**전역적(Global)으로 간주되는 데이터**를 다룰 때 사용합니다. 다만, 컴포넌트 재사용성을 떨어뜨릴 수 있으므로 신중히 사용해야 합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
