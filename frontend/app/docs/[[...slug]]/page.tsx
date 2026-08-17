import { TRANSITION_CATALOG } from '@/lib/transition-catalog';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Page } from '@/components/glidecn';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, ChevronRight, Code2 } from 'lucide-react';
import { DocsOverview } from '@/components/docs/docs-overview';
import { DocsInstallation } from '@/components/docs/docs-installation';
import { DocsApiReference } from '@/components/docs/docs-api-reference';
import { TransitionCount } from '@/components/docs/transition-count';

// Dedicated Bespoke Views
import { DocsProviderView } from '@/components/docs/api-views/provider-view';
import { DocsGlidecnView } from '@/components/docs/api-views/glidecn-view';
import { DocsPageView } from '@/components/docs/api-views/page-view';
import { DocsUseGlideView } from '@/components/docs/api-views/use-glide-view';
import { DocsUseTransitionConfigView } from '@/components/docs/api-views/use-transition-config-view';
import { DocsUseAnimationStateView } from '@/components/docs/api-views/use-animation-state-view';
import { DocsRegistryView } from '@/components/docs/api-views/registry-view';
import { DocsAnimationEngineView } from '@/components/docs/api-views/animation-engine-view';
import { DocsTypesView } from '@/components/docs/api-views/types-view';
import { DocsCliView } from '@/components/docs/api-views/cli-view';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPageContent(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = (page.data as any).body;
  const slugJoined = params.slug?.join('/') ?? '';

  return (
    <Page transition="liquid-morph" direction="left">
      <div className="pb-8">
        
        {/* Top-Level Foundation & Dedicated Pages */}
        {!params.slug || params.slug.length === 0 ? (
          <DocsOverview />
        ) : slugJoined === 'installation' ? (
          <DocsInstallation />
        ) : slugJoined === 'cli' || slugJoined === 'api/cli' ? (
          <DocsCliView />
        ) : slugJoined === 'api-reference' ? (
          <DocsApiReference />
        ) : slugJoined === 'api/provider' ? (
          <DocsProviderView />
        ) : slugJoined === 'api/glidecn' ? (
          <DocsGlidecnView />
        ) : slugJoined === 'api/page' ? (
          <DocsPageView />
        ) : slugJoined === 'api/hooks/use-glide' ? (
          <DocsUseGlideView />
        ) : slugJoined === 'api/hooks/use-transition-config' ? (
          <DocsUseTransitionConfigView />
        ) : slugJoined === 'api/hooks/use-animation-state' ? (
          <DocsUseAnimationStateView />
        ) : slugJoined === 'api/registry' ? (
          <DocsRegistryView />
        ) : slugJoined === 'api/animation-engine' ? (
          <DocsAnimationEngineView />
        ) : slugJoined === 'api/types' ? (
          <DocsTypesView />
        ) : (
          /* Transition detail & general fallback pages */
          <div className="space-y-8">
            <header className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-lg glidecn-card">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-subtle)] flex-wrap">
                  <Link href="/docs" className="hover:text-[var(--text-main)] transition-colors no-underline">
                    Docs
                  </Link>
                  <ChevronRight className="size-3 opacity-40" />
                  <span>Transitions</span>
                  <ChevronRight className="size-3 opacity-40" />
                  <span className="text-[#fa5c4f] font-medium">{page.data.title}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="sticker-pill">
                    <Sparkles className="size-3 text-[#fa5c4f]" /> Transition
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-subtle)]">
                    Framer Motion Transition
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

            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-sm glidecn-card">
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--text-main)] prose-h2:text-2xl prose-h2:tracking-tight prose-h2:border-b prose-h2:border-[var(--border-color)] prose-h2:pb-3 prose-h3:text-xl prose-p:text-[var(--text-muted)] prose-p:leading-relaxed prose-p:text-sm prose-a:text-[#fa5c4f] prose-a:no-underline hover:prose-a:text-[#e54235] hover:prose-a:no-underline prose-code:font-mono prose-code:text-xs prose-code:bg-[var(--bg-card)] prose-code:text-[var(--text-main)] prose-code:border prose-code:border-[var(--border-color)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-pre:bg-[var(--bg-card)] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:rounded-2xl prose-pre:shadow-sm prose-li:text-[var(--text-muted)] prose-li:text-sm">
                <MDX components={{ ...defaultMdxComponents, TransitionCount }} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
              <Link
                href="/transition"
                className="flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card)] transition btn-tactile w-full sm:w-auto justify-center no-underline"
              >
                <ArrowLeft className="size-4" />
                <span>All Transitions</span>
              </Link>

              <Link
                href="/docs/api-reference"
                className="flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile w-full sm:w-auto justify-center no-underline"
              >
                <span>API Reference Hub</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
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
    title: `${page.data.title} — GlideCN Docs`,
    description: page.data.description,
  };
}
