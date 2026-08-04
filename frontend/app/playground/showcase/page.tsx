'use client';

import { Page } from '@/components/morphy';
import Link from 'next/link';

export default function ShowcasePage() {
  return (
    <Page>
      <div className="min-h-[100dvh] w-full bg-[#1D4ED8] text-white font-sans relative overflow-hidden flex flex-col">
        
        {/* Vibrant Cobalt Aesthetic - Extreme Contrast */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 z-10" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

        <div className="flex-1 w-full max-w-screen-2xl mx-auto px-6 py-32 md:py-48 flex flex-col justify-center z-20">
          
          <h1 className="text-[clamp(3rem,6vw,7rem)] font-semibold tracking-tighter leading-[0.9] max-w-5xl mb-24">
            Interfaces that 
            <span className="inline-block w-[12vw] h-[clamp(2.5rem,5vw,6rem)] align-middle bg-cover bg-center mx-4 rounded-full border border-white/20" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop)'}}></span>
            command absolute attention.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-7 group relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-black/20 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop" 
                alt="Vibrant abstraction" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-60" />
            </div>

            <div className="md:col-span-5 flex flex-col justify-end gap-12">
              <p className="text-xl md:text-3xl font-light text-blue-100 leading-tight">
                Every pixel engineered to feel completely physical. We bridge the gap between static DOM trees and fluid geometry.
              </p>

              <Link href="/playground/pricing" className="group self-start inline-flex items-center gap-4 px-8 py-5 bg-white hover:bg-zinc-100 text-blue-700 rounded-full font-medium transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                View Plans
              </Link>
            </div>

          </div>

        </div>
      </div>
    </Page>
  );
}
