'use client';

import { Page } from '@/components/morphy';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <Page>
      <div className="min-h-[100dvh] w-full bg-white text-zinc-950 font-sans relative overflow-hidden flex flex-col">
        
        {/* Minimal White Context - Stark Contrast from Landing */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-32 md:py-48 flex flex-col justify-center relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-zinc-900 max-w-4xl leading-[0.9]">
              Zero-latency rendering.
            </h1>
            
            <Link href="/playground/showcase" className="group shrink-0 inline-flex items-center justify-center w-20 h-20 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full transition-all duration-500 hover:scale-105 active:scale-95">
              <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>
          </div>

          {/* Gapless Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 auto-rows-[300px] gap-4 grid-flow-dense">
            
            {/* Massive Hero Cell */}
            <div className="md:col-span-2 md:row-span-2 bg-zinc-100 rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 bg-zinc-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div>
                <h3 className="text-3xl font-medium tracking-tight mb-4 text-zinc-900">GPU-Accelerated Compositing</h3>
                <p className="text-zinc-500 leading-relaxed max-w-sm">
                  Offloading layout calculations entirely to the GPU, guaranteeing a locked 120fps regardless of DOM complexity.
                </p>
              </div>
              <div className="mt-12 aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-300">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-multiply opacity-50 grayscale group-hover:scale-105 transition-transform duration-[1000ms]" alt="Architecture" />
              </div>
            </div>

            {/* Standard Cells */}
            <div className="md:col-span-1 md:row-span-1 bg-zinc-100 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden">
              <h3 className="text-xl font-medium tracking-tight text-zinc-900">Scroll Physics</h3>
              <p className="text-zinc-500 text-sm mt-4">Inertia mapped to physical device momentum.</p>
            </div>

            <div className="md:col-span-1 md:row-span-1 bg-zinc-100 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="Texture" />
              <h3 className="text-xl font-medium tracking-tight text-zinc-900 relative z-10">Shader Masking</h3>
            </div>

            <div className="md:col-span-2 md:row-span-1 bg-zinc-950 rounded-3xl p-10 flex flex-col justify-center text-white group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-2xl font-medium tracking-tight mb-2 relative z-10">Absolute Determinism</h3>
              <p className="text-zinc-400 relative z-10">Transitions follow strict mathematical curves. No arbitrary bouncing.</p>
            </div>

          </div>

        </div>
      </div>
    </Page>
  );
}
