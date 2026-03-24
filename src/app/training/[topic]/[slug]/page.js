import { notFound } from 'next/navigation';
import { GatePage } from '@/components/shared/GatePage';
import { getAllGatePaths, getGate } from '@/lib/curriculum';

export function generateStaticParams() {
  return getAllGatePaths().map(({ topic, slug }) => ({ topic, slug }));
}

export default async function Page({ params }) {
  const { topic, slug } = await params;
  const gate = getGate(topic, slug);
  if (!gate) notFound();
  return <GatePage gate={gate} topicId={topic} />;
}
