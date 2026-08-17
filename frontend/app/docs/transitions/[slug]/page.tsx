import { redirect } from 'next/navigation';
import { getAllTransitionSlugs } from '@/lib/transition-catalog';

export async function generateStaticParams() {
  const slugs = getAllTransitionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DocsTransitionSlugRedirect(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  redirect(`/transition/${params.slug}`);
}
