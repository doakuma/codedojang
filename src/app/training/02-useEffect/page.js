import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 02. useEffect: 사이드 이펙트 제어

**무엇인가:**  
렌더링 결과가 화면에 반영된 후(Commit Phase 이후), 비동기로 실행되는 부수 효과(Side Effect)를 정의하는 Hook입니다.

**왜 사용하는가:**  
React의 순수 함수적인 렌더링 과정에서 처리할 수 없는 외부 시스템(API 호출, DOM 조작, 타이머 등)과의 동기화를 수행하기 위함입니다.

**언제 사용하는가:**  
데이터 페칭, 이벤트 리스너 등록/해제 등 **외부 세계와의 연결**이 필요할 때 사용합니다. 의존성 배열을 정확히 기입하여 무한 루프를 방지해야 합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
