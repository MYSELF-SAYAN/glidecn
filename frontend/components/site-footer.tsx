import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { Github, Twitter, Heart, ArrowUpRight } from 'lucide-react';

export function SiteFooter({ className = "mt-32" }: { className?: string }) {
  return (
    <footer className={`${className} relative overflow-hidden bg-black text-white pt-24 pb-12 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-white/10 mx-2 sm:mx-4 mb-2 sm:mb-4 shadow-2xl`}>
      
      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#fa5c4f]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center">
        
        {/* Top Bento Grid Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-2xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-lg shadow-[#fa5c4f]/20 group-hover:rotate-12 transition-transform duration-500">
                <Logo className="size-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl font-display text-white">
                MorphyJS
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed font-light">
              An open-source React page transition library with a pluggable architecture, designed for maximum compositor performance and cinematic UX.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/morphy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <Github className="size-4" />
              </a>
              <a href="https://twitter.com/morphy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all">
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/docs" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>Documentation</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>Quickstart</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/docs/props" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>API Reference</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/playground/page-1" className="group flex items-center text-[#fa5c4f] hover:text-[#e54235] transition-colors">
                  <span>Playground Area</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Shaders</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/docs/transitions#spatial" className="text-white/70 hover:text-white transition-colors">Spatial & 3D</Link>
              </li>
              <li>
                <Link href="/docs/transitions#portal" className="text-white/70 hover:text-white transition-colors">Portals</Link>
              </li>
              <li>
                <Link href="/docs/transitions#retro" className="text-white/70 hover:text-white transition-colors">Retro & SVG</Link>
              </li>
              <li>
                <Link href="/docs/transitions#dynamic" className="text-white/70 hover:text-white transition-colors">Kinetic Physics</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Oversized Typography End-Cap */}
        <div className="w-full flex flex-col items-center justify-center pt-16 border-t border-white/10">
          <h2 className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 font-display select-none pointer-events-none">
            MORPHY
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="w-full mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <p>© {new Date().getFullYear()} MorphyJS Engine. MIT License.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="size-3 text-[#fa5c4f]" fill="currentColor" /> for React
          </p>
        </div>

      </div>
    </footer>
  );
}
