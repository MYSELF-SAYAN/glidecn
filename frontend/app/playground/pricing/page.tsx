'use client';

import { Page } from '@/components/morphy';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <Page>
      <div className="min-h-[100dvh] w-full bg-[#0a0a0a] text-zinc-100 font-sans relative overflow-hidden flex flex-col justify-center py-32 md:py-48">
        
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          
          <div className="flex-1">
            <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-semibold tracking-tighter leading-[0.9] mb-8">
              No compromises.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-md leading-relaxed mb-12">
              Enterprise-grade performance without the enterprise bloat. 
            </p>
            <Link href="/playground/about" className="group inline-flex px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-medium transition-all duration-500 hover:scale-105 active:scale-95">
              Read the Manifesto
            </Link>
          </div>

          <div className="flex-1 w-full max-w-md">
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-12 flex flex-col backdrop-blur-xl group hover:border-zinc-700 transition-colors duration-500">
              <h3 className="text-2xl font-medium text-zinc-300 mb-8">Studio License</h3>
              
              <div className="flex items-baseline gap-1 mb-12">
                <span className="text-7xl font-light tracking-tighter text-white">$499</span>
                <span className="text-zinc-600 text-lg font-medium">/yr</span>
              </div>
              
              <ul className="space-y-6 flex-1 mb-12">
                {['Unlimited production deployments', 'Full source code access', 'Dedicated Slack support', 'Priority bug resolution'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors duration-300">
                Purchase License
              </button>
            </div>

          </div>

        </div>
      </div>
    </Page>
  );
}
