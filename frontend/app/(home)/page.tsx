import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { ScrollOrchestrator } from '@/components/landing/scroll-orchestrator';
import { Hero } from '@/components/landing/hero';
import { FeatureStagger } from '@/components/landing/feature-stagger';
import { MetricsSection } from '@/components/landing/metrics-section';
import { TransitionShowcase } from '@/components/landing/transition-showcase';
import { DxSection } from '@/components/landing/dx-section';
import { OpenSource } from '@/components/landing/open-source';
import { Faq } from '@/components/landing/faq';
import { Page } from '@/components/morphy';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <Page transition="fade">
      <ScrollOrchestrator>
        <main className="relative bg-[var(--bg-page)] text-[var(--text-main)] font-sans selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f] min-h-screen">
          <FloatingNavbar />
          <Hero />
          <FeatureStagger />
          <TransitionShowcase />
          <DxSection />
          <MetricsSection />
          <OpenSource />
          <Faq />
          <SiteFooter />
        </main>
      </ScrollOrchestrator>
    </Page>
  );
}
