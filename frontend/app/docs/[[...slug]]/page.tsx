import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Page } from '@/components/morphy';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { DocsOverview } from '@/components/docs/docs-overview';
import { DocsInstallation } from '@/components/docs/docs-installation';
import { DocsApiReference } from '@/components/docs/docs-api-reference';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPageContent(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body;
  const isOverview = !params.slug || params.slug.length === 0;
  const isInstallation = params.slug?.length === 1 && params.slug[0] === 'installation';
  const isApi = params.slug?.length === 1 && params.slug[0] === 'api-reference';

  return (
    <Page transition="slide" direction="left">
      <div className="pb-8 space-y-8">
        
        {isOverview ? (
          <DocsOverview />
        ) : isInstallation ? (
          <DocsInstallation />
        ) : isApi ? (
          <DocsApiReference />
        ) : (
          <>
            {/* Header Block for Child Docs Pages */}
            <header className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-lg morphy-card">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 h-56 w-56 rounded-full bg-[#fa5c4f]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="sticker-pill">
                    <BookOpen className="size-3 text-[#fa5c4f]" /> Documentation
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-subtle)]">
                    v1.0.0 • React & Next.js
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
                  {page.data.title}
                </h1>

                {page.data.description && (
                  <p className="max-w-2xl text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {page.data.description}
                  </p>
                )}
              </div>
            </header>

            {/* Prose Markdown Body */}
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-sm morphy-card">
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--text-main)] prose-h2:text-2xl prose-h2:tracking-tight prose-h2:border-b prose-h2:border-[var(--border-color)] prose-h2:pb-3 prose-h3:text-xl prose-p:text-[var(--text-muted)] prose-p:leading-relaxed prose-p:text-sm prose-a:text-[#fa5c4f] prose-a:no-underline hover:prose-a:text-[#e54235] hover:prose-a:no-underline prose-code:font-mono prose-code:text-xs prose-code:bg-[var(--bg-card)] prose-code:text-[var(--text-main)] prose-code:border prose-code:border-[var(--border-color)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-pre:bg-[var(--bg-card)] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:rounded-2xl prose-pre:shadow-sm prose-li:text-[var(--text-muted)] prose-li:text-sm">
                <MDX components={{ ...defaultMdxComponents }} />
              </div>
            </div>

            {/* Bottom Page Navigation Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
              <Link
                href="/docs"
                className="flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card)] transition btn-tactile w-full sm:w-auto justify-center no-underline"
              >
                <ArrowLeft className="size-4" />
                <span>Back to Overview</span>
              </Link>

              <Link
                href="/docs/transitions"
                className="flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile w-full sm:w-auto justify-center no-underline"
              >
                <span>Explore 33+ Transitions</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </>
        )}

      </div>
    </Page>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `${page.data.title} — Morphy Docs`,
    description: page.data.description,
  };
}
