import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 04. Custom Hooks: 로직의 재사용

**무엇인가:**  
이름이 \`use\`로 시작하는 자바스크립트 함수로, 내부에서 다른 Hook을 호출하여 상태 로직을 재사용 가능한 형태로 추출한 것입니다.

**왜 사용하는가:**  
컴포넌트 간에 중복되는 상태 관리 로직을 분리하여 코드의 재사용성을 높이고, 컴포넌트 뷰와 비즈니스 로직을 분리하기 위함입니다.

**언제 사용하는가:**  
폼(Form) 핸들링, API 요청, 이벤트 리스너 부착 등 **여러 컴포넌트에서 공통적으로 발생하는 로직**이 발견될 때 추출합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
