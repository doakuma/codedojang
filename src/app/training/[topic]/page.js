import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownViewer from '@/components/shared/MarkdownViewer';
import { SooryeonCard } from '@/components/shared/SooryeonCard';
import { SooryeonLayout } from '@/components/shared/SooryeonLayout';
import { getAllTopicIds, getTopic, getGates } from '@/lib/curriculum';

export function generateStaticParams() {
  return getAllTopicIds().map((topic) => ({ topic }));
}

export default async function Page({ params }) {
  const { topic } = await params;
  const topicData = getTopic(topic);
  if (!topicData) notFound();

  const gates = getGates(topic);

  return (
    <SooryeonLayout
      title={topicData.title}
      badges={topicData.badges}
      description={topicData.description}
    >
      <MarkdownViewer content={topicData.theoryContent} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gates.map((gate) => (
          <Link key={gate.id} href={`/training/${topic}/${gate.slug}`} className="block">
            <SooryeonCard
              title={gate.title}
              description={gate.mission}
            />
          </Link>
        ))}
      </div>
    </SooryeonLayout>
  );
}
