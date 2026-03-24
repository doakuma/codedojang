import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import MarkdownViewer from '@/components/shared/MarkdownViewer';
import { CodeEditor } from '@/components/shared/CodeEditor';

const TOPIC_TITLES = {
  '01-useState': 'useState',
  '02-useEffect': 'useEffect',
  '03-useRef': 'useRef',
  '04-customHooks': 'Custom Hooks',
  '05-context': 'Context API',
  '06-optimization': 'Optimization',
  '07-nextjs-rsc': 'Next.js & RSC',
};

export function GatePage({ gate, topicId }) {
  const topicTitle = TOPIC_TITLES[topicId] ?? topicId;

  return (
    <div className="container mx-auto max-w-5xl space-y-8 pb-10">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/training" className="hover:text-foreground transition-colors">
          수련장
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/training/${topicId}`}
          className="hover:text-foreground transition-colors"
        >
          {topicTitle}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{gate.title}</span>
      </nav>

      {/* 헤더 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{gate.title}</h1>
          <Badge variant="secondary">관문 {gate.id} / 7</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">{gate.mission}</p>
      </div>

      {/* 이론 비급 (RSC) */}
      <section className="rounded-lg border bg-card p-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          📖 이론 비급
        </h2>
        <MarkdownViewer content={gate.theory} />
      </section>

      {/* 수련 코드 에디터 (RCC) */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          ⚔️ 수련 코드
        </h2>
        <CodeEditor initialCode={gate.starterCode} />
      </section>

      {/* 관문 이동 */}
      <nav className="flex justify-between text-sm">
        {gate.id > 1 ? (
          <Link
            href={`/training/${topicId}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 목록으로
          </Link>
        ) : (
          <span />
        )}
        <Link
          href={`/training/${topicId}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          목록으로 →
        </Link>
      </nav>
    </div>
  );
}
