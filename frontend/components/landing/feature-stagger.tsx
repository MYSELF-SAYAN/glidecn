'use client';

import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Layers, Zap, Code2, Globe, Cpu } from 'lucide-react';
import { useRef } from 'react';

const FEATURES = [
  {
    tag: 'Performance',
    title: 'Zero Layout Shift',
    description: 'Hardware accelerated transforms ensure smooth 60fps performance without recalculating the DOM. The smoothest transitions on the web.',
    icon: <Zap className="w-8 h-8" />,
    cta: 'Explore Engine'
  },
  {
    tag: 'Visuals',
    title: '33+ Premium Shaders',
    description: 'From 3D isometric cubes to fluid portals and retro CRT effects, all built with raw CSS & Framer Motion architecture.',
    icon: <Layers className="w-8 h-8" />,
    cta: 'View Gallery'
  },
  {
    tag: 'Developer Experience',
    title: 'shadcn/ui-like DX',
    description: 'No bloated npm packages. Just copy and paste the exact transition files you want directly into your codebase.',
    icon: <Code2 className="w-8 h-8" />,
    cta: 'Read Documentation'
  },
  {
    tag: 'Compatibility',
    title: 'Universal Router',
    description: 'Seamless integration with Next.js App Router, Pages Router, React Router, and standard SPAs out of the box.',
    icon: <Globe className="w-8 h-8" />,
    cta: 'See Integrations'
  },
  {
    tag: 'Architecture',
    title: 'Frozen State Magic',
    description: 'We instantly freeze your exiting route context, allowing beautiful exit animations without Next.js unmounting your page prematurely.',
    icon: <Cpu className="w-8 h-8" />,
    cta: 'Learn How'
  },
];

const COLORS = ["#fa5c4f", "#e04b3f", "#c43c32", "#a62d25", "#871f19"];

function StaggerCard({ 
  feature, 
  index, 
  total, 
  progress 
}: { 
  feature: typeof FEATURES[0], 
  index: number, 
  total: number, 
  progress: MotionValue<number> 
}) {
  // 1. Y Position (Entrance)
  const yPoints = index === 0 ? [0, 1] : [(index - 1) / total, index / total, 1];
  const yVals = index === 0 ? ["0vh", "0vh"] : ["100vh", "0vh", "0vh"];
  const y = useTransform(progress, yPoints, yVals);

  // 2. Opacity (Card visibility on entrance)
  const opacityPoints = index === 0 ? [0, 1] : [(index - 1) / total, (index - 0.7) / total, 1];
  const opacityVals = index === 0 ? [1, 1] : [0, 1, 1];
  const opacity = useTransform(progress, opacityPoints, opacityVals);

  // 3. Scale, Background Color, and Shadow (Stacking depth)
  const stackPoints = [];
  const scaleVals = [];
  const bgVals = [];
  const shadowVals = [];
  
  if (index > 0) {
    stackPoints.push((index - 1) / total);
    scaleVals.push(0.96);
    bgVals.push(COLORS[0]);
    shadowVals.push("0px 0px 0px rgba(0,0,0,0)");
  }
  
  for (let j = index; j <= total; j++) {
    stackPoints.push(j / total);
    scaleVals.push(1 - (j - index) * 0.04);
    bgVals.push(COLORS[Math.min(j - index, COLORS.length - 1)]);
    shadowVals.push(j === index ? "0px 24px 48px -12px rgba(250,92,79,0.4)" : "0px 0px 0px rgba(0,0,0,0)");
  }
  
  const scale = useTransform(progress, stackPoints, scaleVals);
  const backgroundColor = useTransform(progress, stackPoints, bgVals);
  const boxShadow = useTransform(progress, stackPoints, shadowVals);

  // 4. Content Opacity (Fade out when next card enters)
  const contentPoints = index === total - 1 
    ? [0, 1] 
    : [index / total, (index + 0.7) / total, (index + 1) / total, 1];
  const contentVals = index === total - 1 
    ? [1, 1] 
    : [1, 1, 0, 0];
  const contentOpacity = useTransform(progress, contentPoints, contentVals);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: index * 10, // 10px offset per card to show layers
        left: 0,
        right: 0,
        height: '100%',
        transformOrigin: "top center",
        y,
        opacity,
        scale,
        backgroundColor,
        boxShadow,
        zIndex: index,
      }}
      className="rounded-[32px] overflow-hidden flex flex-col p-10 sm:p-12 text-white border border-white/10"
    >
      <motion.div style={{ opacity: contentOpacity }} className="h-full flex flex-col">
        
        {/* Metadata / Tag */}
        <div className="mb-8">
          <span className="px-4 py-2 rounded-full bg-black/20 text-white/90 text-sm font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
            {feature.tag}
          </span>
        </div>

        {/* Icon & Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="p-4 rounded-2xl bg-white/10 w-fit backdrop-blur-sm border border-white/20 mb-6 shadow-inner">
            {feature.icon}
          </div>
          <h3 className="text-4xl sm:text-5xl font-extrabold font-display mb-4 tracking-tight text-white drop-shadow-sm">
            {feature.title}
          </h3>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-lg font-medium drop-shadow-sm">
            {feature.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <button className="flex items-center gap-2 text-white font-bold text-lg hover:text-white/80 transition-colors group">
            {feature.cta}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}

export function FeatureStagger() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scrollYProgress mapped to a spring for cinematic, tactile motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.001
  });

  return (
    // Total height = (Number of features) * 100vh. This gives 1 viewport of scrolling per card.
    <section ref={containerRef} className="relative w-full bg-[var(--bg-page)]" style={{ height: `${FEATURES.length * 100}vh` }}>
      {/* Sticky container that locks in the viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative w-full h-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
            
            {/* Left Column: Never moves */}
            <div className="lg:col-span-5 relative z-50">
              <div className="sticker-pill mb-6">
                <span className="w-2 h-2 rounded-full bg-[#fa5c4f] animate-pulse" />
                The Morphy Engine
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.1] mb-6">
                Engineered for <br className="hidden lg:block" />
                <span className="font-cursive text-[#fa5c4f] font-normal tracking-normal text-5xl sm:text-7xl">
                  pure fluidity
                </span>
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-md mb-8">
                Every transition is hand-crafted to avoid layout thrashing. We freeze your router, orchestrate the exit, and inject the entry animation with sub-millisecond precision.
              </p>
              <button className="px-8 py-4 rounded-full bg-[#fa5c4f] text-white font-bold tracking-wide btn-tactile hover:shadow-[0_12px_32px_-8px_rgba(250,92,79,0.12)] hover:-translate-y-[2px]">
                Explore Documentation
              </button>
            </div>

            {/* Right Column: Absolutely positioned stacked cards */}
            <div className="lg:col-span-7 relative w-full h-[75vh] max-h-[800px]">
              {FEATURES.map((feature, index) => (
                <StaggerCard 
                  key={feature.title} 
                  feature={feature} 
                  index={index} 
                  total={FEATURES.length} 
                  progress={springProgress} 
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
