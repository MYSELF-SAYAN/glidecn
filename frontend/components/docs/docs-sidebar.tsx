'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  Sparkles,
  Gamepad2,
  Menu,
  X,
} from 'lucide-react';
import {
  TRANSITION_CATALOG,
  getTransitionsByFamily,
  FAMILIES,
} from '@/lib/transition-catalog';

export function DocsSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFamilies, setOpenFamilies] = useState<Record<string, boolean>>({
    'Spatial': false,
    'Portal': false,
    'Retro': false,
    'Kinetic': false,
    'Paper': false,
    'Mask': false,
    'Basic': false,
    'Flow': false,
    'Dynamic': false,
    'Experimental': false,
  });

  const toggleFamily = (family: string) => {
    setOpenFamilies((prev) => ({ ...prev, [family]: !prev[family] }));
  };

  // Filtered transitions list
  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return TRANSITION_CATALOG;
    const q = searchQuery.toLowerCase();
    return TRANSITION_CATALOG.filter(
      (item) =>
        item.displayName.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const families = useMemo(() => {
    return getTransitionsByFamily();
  }, []);

  const isOverviewActive = pathname === '/docs';
  const isInstallActive = pathname === '/docs/installation';
  const isApiActive = pathname === '/docs/api-reference';
  const isTransitionsGalleryActive = pathname === '/docs/transitions';

  const sidebarInnerContent = (
    <div className="space-y-6 w-full pb-16">
      
      {/* Live Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--text-subtle)] pointer-events-none" />
        <input
          type="text"
          placeholder="Search 33+ transitions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 pl-10 pr-3.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:border-[#fa5c4f] focus:outline-none transition shadow-sm font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--text-main)] cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filtered Flat List when Searching */}
      {searchQuery.trim() ? (
        <div className="space-y-2">
          <div className="px-2 text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
            Matching Transitions ({filteredCatalog.length})
          </div>
          {filteredCatalog.length === 0 ? (
            <div className="p-4 text-center text-sm text-[var(--text-muted)]">
              No transitions found matching &quot;{searchQuery}&quot;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCatalog.map((item) => {
                const active = pathname === `/docs/transitions/${item.slug}`;
                const isComingSoon = item.status === 'coming-soon';

                return (
                  <Link
                    key={item.slug}
                    href={`/docs/transitions/${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition min-h-[40px] ${
                      active
                        ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{item.emoji}</span>
                      <span className="truncate font-semibold">{item.displayName}</span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isComingSoon ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold">
                          Soon
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-[var(--text-subtle)] uppercase">
                          {item.family}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Standard Navigation Groups */
        <div className="space-y-6">

          {/* Group 1: Getting Started */}
          <div className="space-y-2">
            <div className="px-2 text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] flex items-center gap-2">
              <BookOpen className="size-3.5 text-[#fa5c4f]" />
              <span>Getting Started</span>
            </div>
            <div className="space-y-1">
              <Link
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition min-h-[40px] ${
                  isOverviewActive
                    ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30 shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>Overview & Architecture</span>
                {isOverviewActive && <ArrowRight className="size-4" />}
              </Link>

              <Link
                href="/docs/installation"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition min-h-[40px] ${
                  isInstallActive
                    ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30 shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>Quickstart / Installation</span>
                {isInstallActive && <ArrowRight className="size-4" />}
              </Link>
              
              <Link
                href="/docs/api-reference"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition min-h-[40px] ${
                  isApiActive
                    ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30 shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>API Reference & Props</span>
                {isApiActive && <ArrowRight className="size-4" />}
              </Link>
            </div>
          </div>

          {/* Group 2: Transitions Catalog */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              <span className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-[#fa5c4f]" />
                <span>Transitions</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-xs font-mono font-bold">
                {TRANSITION_CATALOG.length}
              </span>
            </div>

            {/* Gallery Overview Link */}
            <Link
              href="/docs/transitions"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition min-h-[40px] ${
                isTransitionsGalleryActive
                  ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30 shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>Gallery Overview</span>
              <span className="text-xs font-mono text-[var(--text-subtle)]">All {TRANSITION_CATALOG.length}+</span>
            </Link>

            {/* Families Accordions */}
            <div className="space-y-2 pt-1">
              {FAMILIES.map((family) => {
                const list = families[family] || [];
                if (list.length === 0) return null;
                const isOpen = openFamilies[family] ?? true;

                return (
                  <div key={family} className="space-y-1">
                    <button
                      onClick={() => toggleFamily(family)}
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>
                          {family === 'Spatial' && '🧊'}
                          {family === 'Portal' && '🌀'}
                          {family === 'Paper' && '📜'}
                          {family === 'Mask' && '🖋️'}
                          {family === 'Retro' && '📺'}
                          {family === 'Basic' && '⚡'}
                          {family === 'Flow' && '🌊'}
                          {family === 'Dynamic' && '🚀'}
                          {family === 'Experimental' && '🧪'}
                        </span>
                        <span>{family}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-subtle)]">
                        <span className="font-mono">({list.length})</span>
                        {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="space-y-1 pl-3 border-l-2 border-[var(--border-color)] ml-3.5">
                        {list.map((item) => {
                          const active = pathname === `/docs/transitions/${item.slug}`;
                          const isComingSoon = item.status === 'coming-soon';

                          return (
                            <Link
                              key={item.slug}
                              href={`/docs/transitions/${item.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                                active
                                  ? 'bg-[#fa5c4f]/15 dark:bg-[#fa5c4f]/25 text-[#fa5c4f] font-bold border border-[#fa5c4f]/30'
                                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] font-medium'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span>{item.emoji}</span>
                                <span className="truncate">{item.displayName}</span>
                              </span>
                              {isComingSoon && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold shrink-0 ml-1">
                                  Soon
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 3: Interactive Features */}
          <div className="space-y-2 pt-3 border-t border-[var(--border-color)]">
            <div className="px-2 text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] flex items-center gap-2">
              <Gamepad2 className="size-3.5 text-[#fa5c4f]" />
              <span>Playground</span>
            </div>
            <Link
              href="/playground/page-1"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#fa5c4f]/50 transition btn-tactile shadow-sm"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base">🎮</span>
                <span>2-Page Playground</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#fa5c4f] text-white text-xs font-bold shadow-sm">
                Play
              </span>
            </Link>
          </div>

        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Mobile Drawer Toggle Header */}
      <div className="lg:hidden w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] cursor-pointer"
        >
          {mobileOpen ? <X className="size-5 text-[#fa5c4f]" /> : <Menu className="size-5 text-[#fa5c4f]" />}
          <span>Documentation Menu</span>
        </button>
        <span className="text-xs font-mono text-[var(--text-subtle)]">{TRANSITION_CATALOG.length}+ Transitions</span>
      </div>

      {/* Mobile Accordion Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            data-lenis-prevent="true"
            data-scrollable="true"
            className="lg:hidden w-full bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 py-6 overflow-y-auto max-h-[80vh] custom-scrollbar"
          >
            {sidebarInnerContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Full-Left Sidebar with Dedicated Inner Scroll Container */}
      <aside
        data-lenis-prevent="true"
        data-scrollable="true"
        className="hidden lg:block w-72 xl:w-80 h-[calc(100vh-3.5rem)] sticky top-14 self-start border-r border-[var(--border-color)] bg-[var(--bg-surface)]/80 backdrop-blur-sm shrink-0 overflow-hidden"
      >
        <div
          data-lenis-prevent="true"
          data-scrollable="true"
          className="h-full overflow-y-auto p-5 custom-scrollbar pb-24 overscroll-contain"
        >
          {sidebarInnerContent}
        </div>
      </aside>
    </>
  );
}
