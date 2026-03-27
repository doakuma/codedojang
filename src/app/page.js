import Link from "next/link";
import { getAllTopicIds, getTopic } from "@/lib/curriculum";

export default function Home() {
  const topicIds = getAllTopicIds();

  return (
    <div className="p-8">
      <main className="max-w-5xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            코드도보통지: React 정공법
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            React의 핵심 원리를 그림과 실습으로 배운다.
            <br />
            7대 문파 49관문을 순서대로 정복하며 기본기를 다지십시오.
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
      </main>
    </div>
  );
}
