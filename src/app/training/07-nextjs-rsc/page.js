import MarkdownViewer from "@/components/shared/MarkdownViewer";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

const theoryContent = `
## 서버 사이드 렌더링(SSR)과 RSC: 브라우저의 짐을 서버로 옮기기

**무엇인가:**
서버에서 컴포넌트를 미리 실행하여 HTML을 생성하거나 데이터를 직렬화해 전달하는 방식. RSC(React Server Components)는 번들에 포함되지 않아 클라이언트에 JS가 전송되지 않는다.

**왜 쓰는가:**
초기 로딩(LCP) 향상, SEO 최적화, 클라이언트 번들 크기 획기적 감축을 위해. 데이터베이스나 파일 시스템에 서버에서 직접 접근하여 waterfall 없이 데이터를 가져온다.

**언제 쓰는가:**
보안이 중요한 데이터 호출, 초기 로딩 속도가 핵심인 서비스, 대규모 동적 페이지. \`'use client'\`는 상태·이벤트·브라우저 API가 필요한 최소 단위에만 선언하라.
`;

const cards = [
  {
    id: 1,
    title: "1관문. Server-Client Composition",
    description: "서버 컴포넌트 안에 클라이언트를 주입하는 고급 패턴. children prop으로 RSC가 RCC를 감싸 서버 데이터를 클라이언트 경계 아래로 흘려보내라.",
  },
  {
    id: 2,
    title: "2관문. Server Actions & Optimistic UI",
    description: "낙관적 업데이트를 통한 0ms 체감 속도 구현. useOptimistic으로 서버 응답 전에 UI를 먼저 갱신하고, Action 완료 후 정합성을 맞춰라.",
  },
  {
    id: 3,
    title: "3관문. Streaming & Suspense",
    description: "준비된 데이터부터 순차적으로 보여주는 점진적 UX. loading.js와 <Suspense> 경계를 전략적으로 배치하여 TTFB를 체감 성능으로 전환하라.",
  },
  {
    id: 4,
    title: "4관문. Request Memoization",
    description: "동일 요청 사이클 내 중복 fetch 자동 제거 원리. Next.js가 동일 URL의 fetch를 자동으로 중복 제거(deduplicate)하는 내부 메커니즘을 이해하라.",
  },
  {
    id: 5,
    title: "5관문. PPR (Partial Prerendering)",
    description: "정적 레이아웃과 동적 컨텐츠의 차세대 공존 모델. 정적 껍데기를 즉시 내보내고 동적 구멍(Hole)을 Streaming으로 채우는 hybrid 전략.",
  },
  {
    id: 6,
    title: "6관문. SEO & Metadata API",
    description: "동적 경로에서도 검색 엔진을 사로잡는 메타데이터 관리. generateMetadata 함수로 params를 기반으로 동적 title/og:image를 생성하라.",
  },
  {
    id: 7,
    title: "7관문. Hydration Mismatch",
    description: "서버와 클라이언트 불일치를 해결하는 정공법 디버깅. suppressHydrationWarning은 최후 수단. useEffect + mounted state로 CSR 전환을 명시하라.",
  },
];

export default function Page() {
  return (
    <SooryeonLayout
      title="07. Next.js & RSC: 서버 컴포넌트 문파"
      badges={["Next.js", "RSC", "SSR"]}
      description="브라우저의 짐을 서버로 옮기고, 7가지 핵심 패턴으로 풀스택 리액트의 정점을 정복하라."
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
