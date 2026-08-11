'use client';
import { TRANSITION_CATALOG } from '@/lib/transition-catalog';

import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Layers, Zap, Code2, Globe, Cpu } from 'lucide-react';
import { useRef } from 'react';

const FEATURES = [
  {
    tag: 'Architecture',
    title: 'Zero Layout Shift.',
    description: 'Hardware accelerated transforms guarantee flawless 60fps execution. No DOM recalculation. No layout thrashing. Just pure mathematical motion.',
    icon: <Zap className="w-6 h-6" />,
    cta: 'Explore Engine'
  },
  {
    tag: 'Design System',
    title: `${TRANSITION_CATALOG.length}+ Premium Transitions.`,
    description: 'We built a comprehensive library of spatial 3D effects, fluid portals, and retro simulations. Powered entirely by CSS and Framer Motion.',
    icon: <Layers className="w-6 h-6" />,
    cta: 'View Gallery'
  },
  {
    tag: 'Developer Experience',
    title: 'Copy. Paste. Ship.',
    description: 'Zero bloated npm dependencies. Audit the code, own the logic, and drop exactly what you need straight into your component folders.',
    icon: <Code2 className="w-6 h-6" />,
    cta: 'Read Documentation'
  },
  {
    tag: 'Compatibility',
    title: 'Universal Router Support.',
    description: 'Engineered specifically for the modern web. Seamless integration across Next.js App Router, Pages Router, and standard React SPAs.',
    icon: <Globe className="w-6 h-6" />,
    cta: 'See Integrations'
  },
  {
    tag: 'State Management',
    title: 'Frozen Context Magic.',
    description: 'We instantly freeze your exiting route context in time, orchestrating beautiful exit animations before Next.js unmounts your page.',
    icon: <Cpu className="w-6 h-6" />,
    cta: 'Learn How'
  },
];

// Instead of loud saturated colors, use a deep premium gradient
const COLORS = [
  "linear-gradient(145deg, #1f1f1f 0%, #121212 100%)",
  "linear-gradient(145deg, #222222 0%, #151515 100%)",
  "linear-gradient(145deg, #252525 0%, #181818 100%)",
  "linear-gradient(145deg, #282828 0%, #1b1b1b 100%)",
  "linear-gradient(145deg, #2b2b2b 0%, #1e1e1e 100%)"
];

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
  const yPoints = index === 0 ? [0, 1] : [(index - 1) / total, index / total, 1];
  const yVals = index === 0 ? ["0vh", "0vh"] : ["100vh", "0vh", "0vh"];
  const y = useTransform(progress, yPoints, yVals);

  const opacityPoints = index === 0 ? [0, 1] : [(index - 1) / total, (index - 0.7) / total, 1];
  const opacityVals = index === 0 ? [1, 1] : [0, 1, 1];
  const opacity = useTransform(progress, opacityPoints, opacityVals);

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
    shadowVals.push(j === index ? "0px 32px 64px -16px rgba(0,0,0,0.8)" : "0px 0px 0px rgba(0,0,0,0)");
  }
  
  const scale = useTransform(progress, stackPoints, scaleVals);
  const background = useTransform(progress, stackPoints, bgVals);
  const boxShadow = useTransform(progress, stackPoints, shadowVals);

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
        top: index * 12, 
        left: 0,
        right: 0,
        height: '100%',
        transformOrigin: "top center",
        y,
        opacity,
        scale,
        background,
        boxShadow,
        zIndex: index,
      }}
      className="rounded-[32px] overflow-hidden flex flex-col p-10 sm:p-14 text-white border-t border-l border-white/10 ring-1 ring-black/50"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      
      <motion.div style={{ opacity: contentOpacity }} className="h-full flex flex-col relative z-10">
        
        <div className="mb-auto">
          <span className="px-3 py-1.5 rounded-md bg-white/5 text-white/70 text-[10px] font-mono uppercase tracking-widest border border-white/10 shadow-inner">
            {feature.tag}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-8">
          <div className="p-3 rounded-xl bg-white/5 w-fit border border-white/10 mb-8 text-[#fa5c4f]">
            {feature.icon}
          </div>
          <h3 className="text-4xl sm:text-6xl font-light font-display mb-6 tracking-tight text-white">
            {feature.title}
          </h3>
          <p className="text-white/60 text-lg leading-relaxed max-w-md font-light">
            {feature.description}
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
}

export function FeatureStagger() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    bounce: 0,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--bg-page)]" style={{ height: `${FEATURES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative w-full h-full">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center h-full">
            
            <div className="lg:col-span-5 relative z-50">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl font-light tracking-tight text-[var(--text-main)] font-display leading-[1.15] mb-8"
              >
                Engineered for <br className="hidden lg:block" />
                <span className="relative inline-block font-cursive text-[#fa5c4f] font-normal tracking-normal text-6xl sm:text-7xl mt-2 scale-110">
                  pure fluidity
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full text-[#fa5c4f]/60" 
                    viewBox="0 0 100 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.path 
                      d="M2 8C20 2 40 8 60 5C75 3 85 7 98 4" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                    />
                  </motion.svg>
                </span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[var(--text-muted)] text-lg leading-relaxed max-w-sm mb-12 font-light"
              >
                Every transition is hand-crafted to avoid layout thrashing. We freeze your router, orchestrate the exit, and inject the entry animation with sub-millisecond precision.
              </motion.p>
            </div>

            <div className="lg:col-span-7 relative w-full h-[75vh] max-h-[800px] perspective-[1000px]">
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
