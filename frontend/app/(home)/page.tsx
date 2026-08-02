import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { Hero } from '@/components/landing/hero';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { TransitionShowcase } from '@/components/landing/transition-showcase';
import { DxSection } from '@/components/landing/dx-section';
import { MascotShowcase } from '@/components/landing/mascot-showcase';
import { Footer } from '@/components/landing/footer';
import { Page } from '@/components/morphy';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <Page transition="fade">
      <main className="relative bg-[var(--bg-page)] text-[var(--text-main)] font-sans selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f] min-h-screen">
        <FloatingNavbar />
        <Hero />
        <FeatureGrid />
        <TransitionShowcase />
        <DxSection />
        <MascotShowcase />
        <Footer />
        <SiteFooter />
      </main>
    </Page>
  );
}
