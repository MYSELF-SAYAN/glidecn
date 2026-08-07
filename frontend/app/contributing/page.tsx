import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { SiteFooter } from '@/components/site-footer';
import { Page } from '@/components/glidecn';
import { Github, Code2, Sparkles, Zap, GitPullRequest, Terminal, Blocks } from 'lucide-react';
import Link from 'next/link';
import { ScrollOrchestrator } from '@/components/landing/scroll-orchestrator';

export default function ContributingPage() {
  return (
    <Page transition="fade">
      <ScrollOrchestrator>
        <main className="relative bg-[var(--bg-page)] text-[var(--text-main)] font-sans selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f] min-h-screen pt-32">
          {/* Subtle Grain Overlay */}
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay z-50" />
          
          <FloatingNavbar />

          <div className="max-w-5xl mx-auto px-4 pb-32">
            
            {/* Hero Section */}
            <section className="relative py-24 mb-16 flex flex-col items-center text-center overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-[#fa5c4f]/10 to-transparent opacity-50 dark:opacity-20" />
              <div className="relative z-10 max-w-3xl px-6">
                <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-[var(--text-main)] mb-6 text-balance">
                  Shape the Future of <span className="text-[#fa5c4f]">GlideCN</span>
                </h1>
                <p className="text-lg md:text-xl text-[var(--text-muted)] font-medium max-w-2xl mx-auto leading-relaxed text-balance">
                  GlideCN is an open-source movement built for and by the community. We value minimal friction, beautiful code, and high-quality user experiences.
                </p>
              </div>
            </section>

            {/* Core Philosophy */}
            <section className="mb-32">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-12 flex items-center gap-3">
                <Sparkles className="size-8 text-[#fa5c4f]" />
                Core Philosophy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Code2,
                    title: "Simplicity First",
                    desc: "Code should read like prose. Avoid over-engineering. Keep architectures flat and predictable.",
                  },
                  {
                    icon: Sparkles,
                    title: "Aesthetic Excellence",
                    desc: "If it touches the DOM, it must look and feel premium. Every pixel and animation curve is intentional.",
                  },
                  {
                    icon: Zap,
                    title: "Performant by Default",
                    desc: "GPU-acceleration and zero layout shifts are non-negotiable. 60fps is the baseline standard.",
                  }
                ].map((item, i) => (
                  <div key={i} className="group relative p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-[#fa5c4f]/30 transition-colors duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="size-5 text-[var(--text-main)] group-hover:text-[#fa5c4f] transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-3 text-[var(--text-main)]">{item.title}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Development Setup */}
            <section className="mb-32">
              <h2 className="text-3xl font-bold font-display tracking-tight mb-8 flex items-center gap-3">
                <Terminal className="size-8 text-[#fa5c4f]" />
                Development Setup
              </h2>
              <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0a]/50 p-8 md:p-12 shadow-sm backdrop-blur-md">
                <p className="text-[var(--text-muted)] mb-8 font-medium">We use `npm` for fast, deterministic package management. The playground runs on Next.js 15.</p>
                
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold font-mono">1</span>
                      <h4 className="font-bold text-[var(--text-main)]">Clone the repository</h4>
                    </div>
                    <div className="ml-10 bg-black/[0.03] dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-[var(--text-subtle)] group-hover:text-[var(--text-main)] transition-colors">
                        git clone https://github.com/MYSELF-SAYAN/glidecn.git<br/>
                        cd glidecn
                      </code>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold font-mono">2</span>
                      <h4 className="font-bold text-[var(--text-main)]">Install dependencies</h4>
                    </div>
                    <div className="ml-10 bg-black/[0.03] dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-[var(--text-subtle)] group-hover:text-[var(--text-main)] transition-colors">
                        npm install
                      </code>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold font-mono">3</span>
                      <h4 className="font-bold text-[var(--text-main)]">Start the playground</h4>
                    </div>
                    <div className="ml-10 bg-black/[0.03] dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-2xl p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-[var(--text-subtle)] group-hover:text-[var(--text-main)] transition-colors">
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Submitting a PR */}
            <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-display tracking-tight mb-6 flex items-center gap-3">
                  <GitPullRequest className="size-8 text-[#fa5c4f]" />
                  Pull Requests
                </h2>
                <ul className="space-y-4">
                  {[
                    "Keep PRs scoped and tightly focused.",
                    "Prefix commits (e.g., feat:, fix:, chore:).",
                    "Include screenshots or videos for UI changes.",
                    "Ensure tests and CI/CD pipelines pass locally."
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)] font-medium">
                      <span className="mt-1 flex-shrink-0 size-4 rounded-full border-2 border-[#fa5c4f]/30 flex items-center justify-center">
                        <span className="size-1.5 rounded-full bg-[#fa5c4f]" />
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square md:aspect-auto md:h-full w-full rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,92,79,0.1)_0%,transparent_70%)]" />
                <Blocks className="size-32 text-black/10 dark:text-white/10" strokeWidth={1} />
              </div>
            </section>

            {/* Massive GitHub CTA */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] text-white p-12 md:p-24 text-center border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(250,92,79,0.2)_0%,transparent_50%)] blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mb-8">
                  <Github className="size-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
                  Ready to Build?
                </h2>
                <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl font-medium leading-relaxed">
                  Join the movement. We review pull requests weekly and are always looking for fresh perspectives on web animation.
                </p>
                <a
                  href="https://github.com/MYSELF-SAYAN/glidecn"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-lg shadow-white/10 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-white/25 active:scale-95"
                >
                  <Github className="size-5 transition-transform group-hover:-rotate-12" />
                  <span>View Repository</span>
                </a>
              </div>
            </section>

          </div>
          
          <SiteFooter />
        </main>
      </ScrollOrchestrator>
    </Page>
  );
}
