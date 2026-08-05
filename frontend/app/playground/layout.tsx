'use client';

import { MorphyNextApp as Morphy } from '@/components/morphy/adapters/next-app';
import { PlaygroundTransitionStudio } from '@/components/playground/transition-studio';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Menu, ChevronLeft, ChevronDown, PanelLeftClose, X } from 'lucide-react';
import Link from 'next/link';

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  return (
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
              className={`p-2.5 rounded-full transition-all duration-300 ${deviceView === 'desktop' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Desktop (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-2.5 rounded-full transition-all duration-300 ${deviceView === 'tablet' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-2.5 rounded-full transition-all duration-300 ${deviceView === 'mobile' ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm scale-105' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'}`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
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
            {/* Inner frame wrapper for masking Morphy fixed elements properly inside the simulator */}
            <div className="absolute inset-0 overflow-hidden bg-[var(--bg-page)]">
              <Morphy>
                {children}
              </Morphy>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
