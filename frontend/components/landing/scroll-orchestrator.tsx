'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#fa5c4f] origin-left z-[100] shadow-[0_0_10px_rgba(250,92,79,0.5)]"
        style={{ scaleX: smoothProgress }}
      />
      {children}
    </div>
  );
}
