import MarkdownViewer from "@/components/shared/MarkdownViewer";

const content = `
# 07. Next.js RSC: 서버와 클라이언트의 조화

**무엇인가:**  
서버에서 렌더링되는 Server Components(RSC)와 브라우저에서 상호작용하는 Client Components를 구분하여 사용하는 Next.js의 패러다임입니다.

**왜 사용하는가:**  
전송되는 번들 사이즈를 줄이고(Zero Bundle Size), 서버 리소스(DB 등)에 직접 접근하여 성능과 보안을 모두 잡기 위함입니다.

**언제 사용하는가:**  
데이터 페칭이나 정적 콘텐츠는 **서버 컴포넌트**로, 클릭 이벤트나 상태 관리가 필요한 부분은 **클라이언트 컴포넌트**(\`"use client"\`)로 분리하여 구현합니다.
`;

export default function Page() {
  return <MarkdownViewer content={content} />;
}
