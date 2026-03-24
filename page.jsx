import { ROADMAP } from "@/lib/roadmap";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { MarkdownViewer } from "@/components/shared/MarkdownViewer";
import { Badge } from "@/components/ui/badge";

export default function NextJsPage() {
  const data = ROADMAP.find((r) => r.id === "07-nextjs");
  const theoryContent = `
### ${data.theory.summary}

${data.theory.details.map((d) => `- ${d}`).join("\n")}
  `;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          Chapter 07
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data.title}
        </h1>
        <p className="text-xl text-muted-foreground">{data.subtitle}</p>
      </div>

      <SooryeonCard
        title="0. 이론: 서버 컴포넌트(RSC)"
        description="서버 사이드 렌더링의 패러다임 변화"
      >
        <MarkdownViewer content={theoryContent} />
      </SooryeonCard>

      {/* TODO: 실습 미션 추가 (Server Actions, Streaming 등) */}
    </div>
  );
}
