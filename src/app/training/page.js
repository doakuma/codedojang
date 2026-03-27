import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllTopicIds, getTopic } from "@/lib/curriculum";

export const metadata = {
  title: "수련장 | 코드도보통지",
  description: "7대 문파 목록",
};

export default function TrainingIndexPage() {
  const topicIds = getAllTopicIds();

  return (
    <div className="container mx-auto max-w-5xl pt-8 pb-10 space-y-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">수련장</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">수련장</h1>
        <p className="text-muted-foreground text-lg">
          7대 문파 · 49관문. 원하는 문파를 선택하여 수련을 시작하라.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicIds.map((id) => {
          const topic = getTopic(id);
          return (
            <Link
              key={id}
              href={`/training/${id}`}
              className="group block p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all hover:border-foreground/30"
            >
              <div className="flex flex-col h-full gap-3">
                <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {topic.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {topic.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
