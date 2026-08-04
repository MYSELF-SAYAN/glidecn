'use client';

import { Page } from '@/components/morphy';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <Page>
      <div className="min-h-[100dvh] w-full bg-zinc-200 text-zinc-900 font-sans relative overflow-hidden flex flex-col justify-center">
        
        {/* Silver/Grey Editorial Theme */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10">
          
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-[clamp(3.5rem,6vw,6rem)] font-semibold tracking-tighter leading-[0.9] mb-12">
                Built by <br/> purists.
              </h1>
              
              <div className="space-y-8 text-zinc-600 text-xl md:text-2xl font-light leading-snug">
                <p>
                  We are a collective of motion engineers who refuse to accept stuttering animations and broken browser histories.
                </p>
                <p>
                  We write graphics code for the document object model. Nothing more, nothing less.
                </p>
              </div>
            </div>

            <div className="mt-20">
              <Link href="/playground/landing" className="group inline-flex items-center gap-4 px-8 py-5 bg-zinc-900 hover:bg-black text-white rounded-full font-medium transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Return Home
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full rounded-[2rem] overflow-hidden bg-zinc-300">
             <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" 
                alt="Studio portrait" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-zinc-200/20 mix-blend-overlay" />
          </div>

        </div>
      </div>
    </Page>
  );
}
