'use client';

import { GlideCNNextApp as GlideCN } from '@/components/glidecn/adapters/next-app';
import { GlideCNProvider } from '@/components/glidecn';
import { PlaygroundTransitionStudio } from '@/components/playground/transition-studio';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Menu, ChevronLeft, ChevronDown, PanelLeftClose, X, ArrowRightLeft, Zap, Dices, Keyboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [shortcutFeedback, setShortcutFeedback] = useState<{ text: string; icon: string } | null>(null);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleFeedback = (e: any) => {
      setShortcutFeedback(e.detail);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = setTimeout(() => setShortcutFeedback(null), 1500);
    };
    window.addEventListener('shortcut-feedback', handleFeedback);
    return () => window.removeEventListener('shortcut-feedback', handleFeedback);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      
      if (key === '?') {
        setShowShortcutsModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setShowShortcutsModal(false);
      } else if (key === 'v') {
        e.preventDefault();
        setDeviceView(prev => {
          const next = prev === 'desktop' ? 'tablet' : prev === 'tablet' ? 'mobile' : 'desktop';
          window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: `View: ${next}`, icon: next === 'desktop' ? 'monitor' : next === 'tablet' ? 'tablet' : 'smartphone' } }));
          return next;
        });
      } else if (key === '1') {
        setDeviceView('desktop');
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Desktop View', icon: 'monitor' } }));
      } else if (key === '2') {
        setDeviceView('tablet');
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Tablet View', icon: 'tablet' } }));
      } else if (key === '3') {
        setDeviceView('mobile');
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Mobile View', icon: 'smartphone' } }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const LABS = [
    { name: 'Interactive Stage', path: '/playground/landing' },
    { name: 'Bento Matrix', path: '/playground/features' },
    { name: 'Typography Engine', path: '/playground/pricing' },
    { name: 'Kinetic Components', path: '/playground/about' },
    { name: 'Media Telemetry', path: '/playground/showcase' }
  ];

  const currentIndex = LABS.findIndex(p => pathname.includes(p.path));
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % LABS.length;
  const targetPage = LABS[nextIndex].path;

  const handleFlipPage = () => {
    setTimeout(() => router.push(targetPage), 10);
  };
  return (
    <GlideCNProvider defaultTransition="fade">
      <AnimatePresence>
        {showShortcutsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/20 dark:bg-black/60 backdrop-blur-md"
            onClick={() => setShowShortcutsModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[var(--text-main)]/5 to-transparent blur-3xl rounded-full pointer-events-none" />
              
              <button 
                onClick={() => setShowShortcutsModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2.5 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] shadow-lg">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">Keyboard Shortcuts</h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium">Navigate the playground like a pro</p>
                </div>
              </div>

              <div className="space-y-1 relative z-10">
                {[
                  { label: 'Flip (Next Scene)', icon: <ArrowRightLeft className="w-4 h-4 text-rose-500" />, keys: ['F'] },
                  { label: 'Chaos Mode', icon: <Zap className="w-4 h-4 text-purple-500" />, keys: ['C'] },
                  { label: 'Surprise Me (Dice)', icon: <Dices className="w-4 h-4 text-amber-500" />, keys: ['D'] },
                  { label: 'Cycle Viewport', icon: <Monitor className="w-4 h-4 text-blue-500" />, keys: ['V'] },
                  { label: 'Direct Viewport', icon: <Tablet className="w-4 h-4 text-emerald-500" />, keys: ['1', '2', '3'] },
                  { label: 'Shortcuts Menu', icon: <Keyboard className="w-4 h-4 text-[var(--text-main)]" />, keys: ['?'] },
                ].map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 shadow-inner group-hover:scale-110 transition-transform">
                        {shortcut.icon}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-main)]">{shortcut.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map(k => (
                        <kbd key={k} className="px-2 py-1 rounded-md bg-white dark:bg-black border border-black/10 dark:border-white/20 shadow-sm text-[10px] font-bold font-mono text-[var(--text-main)] uppercase tracking-wider">{k}</kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shortcutFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-2.5 bg-black/80 dark:bg-white/90 text-white dark:text-black rounded-full backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-white/10 dark:border-black/10 pointer-events-none"
          >
            {shortcutFeedback.icon === 'monitor' && <Monitor className="w-4 h-4 text-blue-400" />}
            {shortcutFeedback.icon === 'tablet' && <Tablet className="w-4 h-4 text-emerald-400" />}
            {shortcutFeedback.icon === 'smartphone' && <Smartphone className="w-4 h-4 text-amber-400" />}
            {shortcutFeedback.icon === 'zap' && <Zap className="w-4 h-4 text-purple-400" />}
            {shortcutFeedback.icon === 'dices' && <Dices className="w-4 h-4 text-amber-400" />}
            {shortcutFeedback.icon === 'flip' && <ArrowRightLeft className="w-4 h-4 text-rose-400" />}
            <span className="text-xs font-bold tracking-widest uppercase">{shortcutFeedback.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="playground-root" className="playground-root h-[100dvh] w-full flex flex-col lg:flex-row bg-[var(--bg-page)] text-[var(--text-main)] relative overflow-hidden transition-colors duration-700 font-sans text-sm selection:bg-black/10 dark:selection:bg-white/20">
      
      {/* Collapsed Sidebar Handle (Absolute toggle) */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-4 left-4 z-[60]"
          >
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-105 active:scale-95 text-[var(--text-main)]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 z-[60] flex items-center gap-3">
        {/* Floating Shortcuts Menu Button */}
        <div className="group">
          <button 
            onClick={() => setShowShortcutsModal(true)}
            className="p-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-105 active:scale-95 text-[var(--text-main)] flex items-center justify-center relative"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-5 h-5" />
            <kbd className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">?</kbd>
          </button>
        </div>

        {/* Floating Flip Page Button */}
        <div className="group">
          <button 
            onClick={handleFlipPage}
            className="p-3 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-105 active:scale-95 text-[var(--text-main)] flex items-center justify-center relative"
            title="Flip Page (F)"
          >
            <ArrowRightLeft className="w-5 h-5" />
            <kbd className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">F</kbd>
          </button>
        </div>
      </div>

      {/* 
        Responsive Sidebar / Bottom Dock 
        Desktop: w-[340px] h-full
        Mobile: w-full h-[45vh]
      */}
      <div 
        className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 overflow-hidden relative order-2 lg:order-1 z-50 flex flex-col ${
          isSidebarOpen 
            ? 'w-full lg:w-[340px] h-[45vh] lg:h-full opacity-100 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-none' 
            : 'w-full lg:w-0 h-0 lg:h-full opacity-0 border-transparent shadow-none'
        }`}
      >
        {/* Inner fixed-size wrapper so content doesn't squash during collapse */}
        <div className="w-full lg:w-[340px] h-[45vh] lg:h-[100dvh] flex flex-col bg-white/60 dark:bg-black/40 backdrop-blur-3xl absolute top-0 left-0 right-0">
          {/* Top Navbar in Sidebar */}
          <div className="h-14 lg:h-16 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-4 shrink-0 bg-white/50 dark:bg-black/20 backdrop-blur-md z-10">
            <Link 
              href="/"
              className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5"
            >
              <div className="p-1 rounded-md bg-black/5 dark:bg-white/10">
                <ChevronLeft className="w-3.5 h-3.5" />
              </div>
              Home
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden lg:block"
              title="Close Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors lg:hidden"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <PlaygroundTransitionStudio />
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <main className="flex-1 relative overflow-hidden bg-[var(--bg-page)] flex flex-col order-1 lg:order-2">
        
        {/* Device Viewport Controller (Floating Glass Pill) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
          <div className="flex items-center p-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-full border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-2.5 rounded-full transition-all duration-300 relative group ${deviceView === 'desktop' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Desktop (100%)"
            >
              <Monitor className="w-4 h-4" />
              <kbd className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">1</kbd>
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-2.5 rounded-full transition-all duration-300 relative group ${deviceView === 'tablet' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
              <kbd className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">2</kbd>
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-2.5 rounded-full transition-all duration-300 relative group ${deviceView === 'mobile' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
              <kbd className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">3</kbd>
            </button>
          </div>
        </div>

        {/* Scaled/Framed Viewport */}
        <div className={`flex-1 overflow-hidden flex flex-col items-center p-0 relative transition-colors duration-500 ${deviceView !== 'desktop' ? 'bg-black/10 dark:bg-black/40' : ''}`}>
          
          <div 
            className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative shrink-0 @container/device ${
              deviceView === 'mobile' ? 'w-full md:w-[375px] h-full bg-[var(--bg-page)] shadow-[0_0_50px_rgba(0,0,0,0.2)] ring-1 ring-black/5 dark:ring-white/10' :
              deviceView === 'tablet' ? 'w-full md:w-[768px] h-full bg-[var(--bg-page)] shadow-[0_0_50px_rgba(0,0,0,0.2)] ring-1 ring-black/5 dark:ring-white/10' :
              'w-full h-full bg-transparent'
            }`}
          >
            {/* Inner frame wrapper for masking GlideCN fixed elements properly inside the simulator */}
            <div className="absolute inset-0 overflow-hidden bg-[var(--bg-page)]">
              <GlideCN>
                {children}
              </GlideCN>
            </div>
          </div>

        </div>

      </main>

      </div>
    </GlideCNProvider>
  );
}
