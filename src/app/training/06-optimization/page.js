import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 06. Optimization: 최적화의 정공법

**무엇인가:**  
\`memo\`, \`useMemo\`, \`useCallback\` 등을 사용하여 불필요한 렌더링과 고비용 연산을 방지하는 기법입니다.

**왜 사용하는가:**  
React 앱의 성능 저하 원인인 불필요한 리렌더링을 막고, 사용자 경험(UX)을 쾌적하게 유지하기 위함입니다.

**언제 사용하는가:**  
**실제 성능 저하가 관측되거나**, 렌더링 비용이 비싼 하위 컴포넌트가 존재할 때 적용합니다. 섣부른 최적화(Premature Optimization)는 지양해야 합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
