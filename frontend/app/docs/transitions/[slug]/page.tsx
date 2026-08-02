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
import '@/components/morphy/transitions/shatter';
import '@/components/morphy/transitions/tornado';
import '@/components/morphy/transitions/swirl';
import '@/components/morphy/transitions/twirl';
import '@/components/morphy/transitions/kaleidoscope';
import '@/components/morphy/transitions/mosaic';
import '@/components/morphy/transitions/prism';
import '@/components/morphy/transitions/laser';
import '@/components/morphy/transitions/hologram';
import '@/components/morphy/transitions/smoke';
import '@/components/morphy/transitions/fire';
import '@/components/morphy/transitions/ice';
import '@/components/morphy/transitions/water';
import '@/components/morphy/transitions/earth';
import '@/components/morphy/transitions/wind';
import '@/components/morphy/transitions/lightning';
import '@/components/morphy/transitions/spark';
import '@/components/morphy/transitions/star';
import '@/components/morphy/transitions/planet';
import '@/components/morphy/transitions/galaxy';
import '@/components/morphy/transitions/universe';
import '@/components/morphy/transitions/blackhole';
import '@/components/morphy/transitions/wormhole2';
import '@/components/morphy/transitions/time';
import '@/components/morphy/transitions/space';
import '@/components/morphy/transitions/dimension';
import '@/components/morphy/transitions/reality';
import '@/components/morphy/transitions/dream';
import '@/components/morphy/transitions/nightmare';
import '@/components/morphy/transitions/illusion';
import '@/components/morphy/transitions/fade';
import '@/components/morphy/transitions/slide';
import '@/components/morphy/transitions/scale';
import '@/components/morphy/transitions/circular-portal';
import '@/components/morphy/transitions/page-curl';
import '@/components/morphy/transitions/cube';
import '@/components/morphy/transitions/slash';
import '@/components/morphy/transitions/wormhole';
import '@/components/morphy/transitions/ink-spread';
import '@/components/morphy/transitions/liquid-morph';
import '@/components/morphy/transitions/dissolve';
import '@/components/morphy/transitions/swipe';
import '@/components/morphy/transitions/flip';
import '@/components/morphy/transitions/spin';
import '@/components/morphy/transitions/zoom';
import '@/components/morphy/transitions/bounce';
import '@/components/morphy/transitions/wobble';
import '@/components/morphy/transitions/stretch';
import '@/components/morphy/transitions/squeeze';
import '@/components/morphy/transitions/ripple';
import '@/components/morphy/transitions/glass';
import '@/components/morphy/transitions/ghost';
import '@/components/morphy/transitions/shadow';
import '@/components/morphy/transitions/neon';
import '@/components/morphy/transitions/glitch';
import '@/components/morphy/transitions/fold';
import '@/components/morphy/transitions/wave';
import '@/components/morphy/transitions/pixel';
import '@/components/morphy/transitions/mirror';
import '@/components/morphy/transitions/vortex';
import '@/components/morphy/transitions/tv-turn-off';
import '@/components/morphy/transitions/shutter-iris';
import '@/components/morphy/transitions/origami-unfold';
import '@/components/morphy/transitions/crystal';
import '@/components/morphy/transitions/paint-drip';
import '@/components/morphy/transitions/blueprint';
import '@/components/morphy/transitions/lens-flare';
import '@/components/morphy/transitions/origami-crush';

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
      <div className="space-y-8 pb-20 max-w-4xl">

        {/* Back Link */}
        <Link
          href="/docs/transitions"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#fa5c4f] hover:text-[#e54235] no-underline transition group cursor-pointer"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition" />
          <span>Back to Transition Gallery</span>
        </Link>

        {/* Coming Soon Showcase Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[var(--bg-surface)] p-8 sm:p-12 shadow-xl morphy-card text-center space-y-6">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Emoji & Badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-6xl sm:text-7xl p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md inline-block">
              {catalogEntry.emoji}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Clock className="size-3.5" />
              <span>In Roadmap • Coming Soon in v1.1</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
              {catalogEntry.displayName}
            </h1>
            <p className="max-w-xl mx-auto text-sm text-[var(--text-muted)] leading-relaxed">
              {catalogEntry.description}
            </p>
          </div>

          {/* Shader Lab Notice */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
              <Sparkles className="size-3.5 text-[#fa5c4f]" />
              <span>Shader Recipe in Development</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Our WebGL shader team is currently fine-tuning easing curves, GPU viewport masks, and zero-jank frame synchronization for this transition.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/docs/transitions"
              className="flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile w-full sm:w-auto justify-center"
            >
              <span>Explore 33+ Available Transitions</span>
            </Link>

            <Link
              href="/docs/installation"
              className="flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-3 text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card)] transition btn-tactile w-full sm:w-auto justify-center"
            >
              <span>Read Documentation</span>
            </Link>
          </div>

        </div>

      </div>
    </Page>
  );
}
