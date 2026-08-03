import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { ScrollOrchestrator } from '@/components/landing/scroll-orchestrator';
import { Hero } from '@/components/landing/hero';
import { FeatureStagger } from '@/components/landing/feature-stagger';
import { TransitionShowcase } from '@/components/landing/transition-showcase';
import { ArchitectureSection } from '@/components/landing/architecture-section';
import { PerformanceSection } from '@/components/landing/performance-section';
import { MetricsSection } from '@/components/landing/metrics-section';
import { DxSection } from '@/components/landing/dx-section';
import { OpenSource } from '@/components/landing/open-source';
import { Page } from '@/components/morphy';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <Page transition="fade">
      <ScrollOrchestrator>
        <main className="relative bg-[var(--bg-page)] text-[var(--text-main)] font-sans selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f] min-h-screen">
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay z-50" />
          <FloatingNavbar />
          <Hero />
          <FeatureStagger />
          <TransitionShowcase />
          <DxSection />
          <ArchitectureSection />
          <PerformanceSection />
          <MetricsSection />
          <OpenSource />
          <SiteFooter />
        </main>
      </ScrollOrchestrator>
    </Page>
  );
}
