import Link from "next/link";
import { ROADMAP } from "@/data/roadmap";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 font-sans">
      <main className="max-w-5xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            🥋 코드도장: React 56강 마스터 로드맵
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            "정공법(正攻法)"으로 익히는 리액트의 핵심 원리와 실전 기술.
            <br />
            아래의 주제를 순서대로 수련하며 기본기를 다지십시오.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAP.map((t) => (
            <Link
              key={t.id}
              href={`/training/${t.id}`}
              className="group block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:shadow-lg transition-all hover:border-zinc-400 dark:hover:border-zinc-600"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.title}
                </h2>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {t.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
