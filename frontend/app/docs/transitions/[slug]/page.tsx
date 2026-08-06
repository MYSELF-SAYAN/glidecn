import { notFound } from 'next/navigation';
import { defaultRegistry } from '@/components/morphy/core/registry';
import { TransitionDocsShell } from '@/components/docs/transition-docs-shell';
import {
  TRANSITION_CATALOG,
  getCatalogEntry,
  getAllTransitionSlugs,
} from '@/lib/transition-catalog';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Clock, Rocket, Bell, CheckCircle2 } from 'lucide-react';
import { Page } from '@/components/morphy';

// Ensure all transitions are registered
import '@/components/morphy/transitions';

// Ensure all transitions are registered

export async function generateStaticParams() {
  const slugs = getAllTransitionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const entry = getCatalogEntry(params.slug);
  if (!entry) return { title: 'Transition — Morphy' };

  return {
    title: `${entry.displayName} Transition — Morphy Docs`,
    description: entry.description,
  };
}

export default async function TransitionDocsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const transition = defaultRegistry.get(params.slug);
  const catalogEntry = getCatalogEntry(params.slug);

  if (!catalogEntry) notFound();

  // If transition is fully implemented and registered
  if (transition) {
    return (
      <TransitionDocsShell
        transition={transition.metadata.name}
        tagline={transition.metadata.description}
      />
    );
  }

  // Coming soon state
  return (
    <Page transition="fade">
      <div className="space-y-8 pb-20 max-w-4xl mx-auto">
        <Link
          href="/docs/transitions"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[#fa5c4f] transition group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Gallery</span>
        </Link>

        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 sm:p-16 shadow-2xl group text-center flex flex-col items-center">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
          <div className="absolute -inset-4 bg-gradient-to-br from-[#fa5c4f]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-lg">
            <div className="text-6xl sm:text-7xl p-6 rounded-3xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-xl">
              {catalogEntry.emoji}
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fa5c4f]/20 bg-[#fa5c4f]/10 text-[#fa5c4f] text-[10px] uppercase font-bold tracking-widest shadow-sm">
              <Clock className="size-3.5" />
              <span>In Roadmap • Coming Soon</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tighter text-[var(--text-main)] font-display">
              {catalogEntry.displayName}
            </h1>
            
            <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed">
              {catalogEntry.description}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent my-4" />

            <div className="flex items-start gap-3 text-left p-5 rounded-2xl bg-black/20 border border-white/5">
              <Sparkles className="size-5 text-[#fa5c4f] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">Shader Recipe in Development</h3>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  Our WebGL shader team is fine-tuning easing curves, GPU viewport masks, and zero-jank frame synchronization for this transition.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <Link
                href="/docs/transitions"
                className="w-full sm:w-auto flex-1 flex justify-center items-center gap-2 rounded-full bg-[#fa5c4f] hover:bg-[#e54235] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#fa5c4f]/25 transition-all hover:-translate-y-0.5"
              >
                Explore 33+ Available
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
