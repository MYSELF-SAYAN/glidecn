'use client';

import { SpriteMascot, MascotPose } from './sprite-mascot';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export function MascotShowcase() {
  const actions: { pose: MascotPose; title: string; desc: string; icon: string }[] = [
    { pose: 'idle', title: 'Resting Idle', desc: 'Subtle breathing and blinking resting state.', icon: '😴' },
    { pose: 'waving', title: 'Friendly Wave', desc: 'Enthusiastic greeting gesture for user attention.', icon: '👋' },
    { pose: 'jumping', title: 'Excited Jump', desc: 'Hover jump loop with anticipation and airborne peak.', icon: '🦘' },
    { pose: 'running-right', title: 'Fast Sprint', desc: 'Directional sprint drag across the screen.', icon: '⚡' },
    { pose: 'waiting', title: 'Patient Waiting', desc: 'Expectant asking pose for routing and user input.', icon: '⏳' },
    { pose: 'failed', title: 'Oops / Error', desc: 'Playful slumped reaction for 404s and fallback states.', icon: '🙈' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex justify-center">
            <span className="sticker-pill">
              <Sparkles className="size-3 text-[#fa5c4f]" /> Animated Companion
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
            Meet Morphy 🎈
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Sprite animations built right into the design system for empty states, loaders, and playful Easter eggs.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action, i) => (
            <motion.div
              key={action.pose}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="morphy-card flex flex-col items-center p-6 rounded-3xl group"
            >
              <div className="h-40 w-full flex items-end justify-center bg-[var(--bg-surface)] rounded-2xl mb-4 pb-2 overflow-hidden relative border border-[var(--border-color)]">
                {/* Decorative glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <div className="w-24 h-24 bg-[#fa5c4f] rounded-full blur-2xl" />
                </div>
                
                <div className="relative z-10 -mb-6 group-hover:scale-110 transition-transform duration-200">
                  <SpriteMascot pose={action.pose} size={140} />
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-base">{action.icon}</span>
                  <h3 className="text-sm font-bold text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                    {action.title}
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {action.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
