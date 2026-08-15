'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect, useRef } from 'react';
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
  Command,
  Star,
  Code2,
} from 'lucide-react';
import {
  TRANSITION_CATALOG,
  getTransitionsByFamily,
  FAMILIES,
  FEATURED_TRANSITIONS,
} from '@/lib/transition-catalog';

export interface ApiItem {
  href: string;
  label: string;
  badge: string;
  keywords: string;
}

export interface ApiSubgroup {
  id: string;
  label: string;
  items: ApiItem[];
}

export const API_SUBGROUPS: ApiSubgroup[] = [
  {
    id: 'components',
    label: 'Components & Adapters',
    items: [
      { href: '/docs/api/provider', label: '<GlideCNProvider>', badge: 'Provider', keywords: 'provider context root config defaultTransition' },
      { href: '/docs/api/glidecn', label: '<GlideCN>', badge: 'Adapter', keywords: 'adapter router transition manager frozenrouter mode wait scroll' },
      { href: '/docs/api/page', label: '<Page>', badge: 'Route', keywords: 'page route segment transition duration delay direction ease' },
    ],
  },
  {
    id: 'hooks',
    label: 'React Hooks',
    items: [
      { href: '/docs/api/hooks/use-glide', label: 'useGlide()', badge: 'Core', keywords: 'useGlide hook setTransition setConfig currentTransition animationState' },
      { href: '/docs/api/hooks/use-transition-config', label: 'useTransitionConfig()', badge: 'Config', keywords: 'useTransitionConfig hook config setConfig duration' },
      { href: '/docs/api/hooks/use-animation-state', label: 'useAnimationState()', badge: 'Lifecycle', keywords: 'useAnimationState hook state idle entering exiting complete' },
    ],
  },
  {
    id: 'engine',
    label: 'Engine & Registry',
    items: [
      { href: '/docs/api/registry', label: 'TransitionRegistry', badge: 'Registry', keywords: 'registry registerTransition resolveTransition getTransition custom transition getAll getNames getByCategory' },
      { href: '/docs/api/animation-engine', label: 'Animation Engine', badge: 'Engine', keywords: 'animation engine buildVariants buildTransition resolveEasing willChange' },
    ],
  },
  {
    id: 'types-cli',
    label: 'Types & Tooling',
    items: [
      { href: '/docs/api/types', label: 'TypeScript Types', badge: 'Types', keywords: 'types interfaces TransitionConfig TransitionDefinition PageProps' },
      { href: '/docs/cli', label: 'CLI Reference', badge: 'CLI', keywords: 'cli init add list command terminal scaffolding wizard' },
    ],
  },
];

const ALL_API_PAGES = API_SUBGROUPS.flatMap((group) => group.items);

export function DocsSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  
  const isCurrentPathInApi = pathname.startsWith('/docs/api') || pathname === '/docs/cli';
  const [apiOpen, setApiOpen] = useState(isCurrentPathInApi);
  const [openApiSubgroups, setOpenApiSubgroups] = useState<Record<string, boolean>>({
    components: true,
    hooks: true,
    engine: true,
    'types-cli': true,
  });

  const toggleApiSubgroup = (groupId: string) => {
    setOpenApiSubgroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const [openFamilies, setOpenFamilies] = useState<Record<string, boolean>>({
    'Spatial': false,
    'Portal': false,
    'Retro': false,
    'Kinetic': false,
    'Paper': false,
    'Mask': false,
    'Basic': true,
    'Flow': false,
    'Dynamic': false,
    'Experimental': false,
  });

  const toggleFamily = (family: string) => {
    setOpenFamilies((prev) => ({ ...prev, [family]: !prev[family] }));
  };

  // Keep active section and family expanded & smoothly scroll active item into view on page change
  useEffect(() => {
    // 1. Auto-expand API section & subgroup
    if (isCurrentPathInApi) {
      setApiOpen(true);
      const activeGroup = API_SUBGROUPS.find((g) => g.items.some((item) => item.href === pathname));
      if (activeGroup) {
        setOpenApiSubgroups((prev) => ({ ...prev, [activeGroup.id]: true }));
      }
    }

    // 2. Auto-expand Transition Family
    if (pathname.startsWith('/docs/transitions/')) {
      const slug = pathname.replace('/docs/transitions/', '');
      const entry = TRANSITION_CATALOG.find((t) => t.slug === slug);
      if (entry?.family) {
        setOpenFamilies((prev) => ({ ...prev, [entry.family]: true }));
      }
    }

    // 3. Smooth scroll active sidebar item into view
    const scrollTimer = setTimeout(() => {
      const containers = [desktopScrollRef.current, mobileScrollRef.current].filter(Boolean) as HTMLElement[];

      containers.forEach((container) => {
        const activeEl = container.querySelector('[data-sidebar-active="true"]') as HTMLElement | null;
        if (!activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();

        const isComfortablyVisible =
          elRect.top >= containerRect.top + 60 &&
          elRect.bottom <= containerRect.bottom - 60;

        if (!isComfortablyVisible) {
          const relativeTop = elRect.top - containerRect.top + container.scrollTop;
          const targetScroll = relativeTop - (container.clientHeight / 2) + (elRect.height / 2);

          container.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: 'smooth',
          });
        }
      });
    }, 120);

    return () => clearTimeout(scrollTimer);
  }, [pathname, isCurrentPathInApi]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('docs-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered transitions and API pages list
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { transitions: [], apis: [] };
    const q = searchQuery.toLowerCase();

    const transitions = TRANSITION_CATALOG.filter(
      (item) =>
        item.displayName.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );

    const apis = ALL_API_PAGES.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );

    return { transitions, apis };
  }, [searchQuery]);

  const families = useMemo(() => {
    return getTransitionsByFamily();
  }, []);

  const isOverviewActive = pathname === '/docs';
  const isInstallActive = pathname === '/docs/installation';
  const isCliActive = pathname === '/docs/cli' || pathname === '/docs/api/cli';
  const isApiHubActive = pathname === '/docs/api-reference';
  const isTransitionsGalleryActive = pathname === '/docs/transitions';

  const sidebarInnerContent = (
    <div className="space-y-8 w-full pb-16">
      
      {/* Premium Spotlight Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fa5c4f]/20 to-transparent rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-sm overflow-hidden group-focus-within:border-[#fa5c4f]/50 transition-colors">
          <Search className="absolute left-3.5 size-4 text-[var(--text-subtle)] group-focus-within:text-[#fa5c4f] transition-colors" />
          <input
            id="docs-search"
            type="text"
            placeholder="Search API & transitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-3 pl-10 pr-16 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none font-medium"
          />
          <div className="absolute right-2.5 flex items-center gap-1 opacity-50">
            <Command className="size-3" />
            <span className="text-xs font-mono font-bold">K</span>
          </div>
        </div>
      </div>

      {/* Filtered Search Results */}
      <AnimatePresence mode="wait">
        {searchQuery.trim() ? (
          <motion.div 
            key="search-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* API Matches */}
            {searchResults.apis.length > 0 && (
              <div className="space-y-1.5">
                <div className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)] flex items-center gap-1.5">
                  <Code2 className="size-3 text-[#fa5c4f]" />
                  <span>API Matches ({searchResults.apis.length})</span>
                </div>
                <div className="space-y-1">
                  {searchResults.apis.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="group relative flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all overflow-hidden bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)]/60 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 text-xs font-mono font-bold text-[var(--text-main)] group-hover:text-[#fa5c4f]">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-subtle)] border border-[var(--border-color)]">
                        {item.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Transitions Matches */}
            {searchResults.transitions.length > 0 && (
              <div className="space-y-1.5">
                <div className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)] flex items-center gap-1.5">
                  <Sparkles className="size-3 text-[#fa5c4f]" />
                  <span>Transitions ({searchResults.transitions.length})</span>
                </div>
                <div className="space-y-1">
                  {searchResults.transitions.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/docs/transitions/${item.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="group relative flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all overflow-hidden bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-color)]/60 cursor-pointer"
                    >
                      <span className="text-xs font-medium text-[var(--text-main)] group-hover:text-[#fa5c4f] truncate">
                        {item.displayName}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--text-subtle)] capitalize">
                        {item.category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {searchResults.apis.length === 0 && searchResults.transitions.length === 0 && (
              <div className="p-6 text-center rounded-2xl border border-dashed border-[var(--border-color)] text-sm text-[var(--text-muted)]">
                No matching results found.
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="navigation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Group 1: Getting Started & Foundation (with Integrated API Reference) */}
            <div className="space-y-3">
              <div className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)] flex items-center gap-2">
                <BookOpen className="size-3 text-[#fa5c4f]" />
                <span>Foundation</span>
              </div>
              <div className="relative p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm space-y-1">
                {[
                  { href: '/docs', label: 'Overview & Architecture', active: isOverviewActive },
                  { href: '/docs/installation', label: 'Quickstart / Install', active: isInstallActive },
                  { href: '/docs/cli', label: 'CLI Reference', active: isCliActive },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-sidebar-active={link.active ? "true" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="relative flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors z-10 group cursor-pointer"
                  >
                    {link.active && (
                      <motion.div 
                        layoutId="foundation-active"
                        className="absolute inset-0 bg-[#fa5c4f]/10 border border-[#fa5c4f]/20 rounded-xl -z-10"
                      />
                    )}
                    <span className={`${link.active ? 'text-[#fa5c4f] font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                      {link.label}
                    </span>
                    {link.active && <ArrowRight className="size-3.5 text-[#fa5c4f]" />}
                  </Link>
                ))}

                {/* Integrated API Reference inside Foundation */}
                <div className="pt-1 border-t border-[var(--border-color)]/60">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors group">
                    <Link
                      href="/docs/api-reference"
                      data-sidebar-active={isApiHubActive ? "true" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-medium transition-colors cursor-pointer ${
                        isApiHubActive ? 'text-[#fa5c4f] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      API Reference
                    </Link>
                    <button
                      type="button"
                      onClick={() => setApiOpen(!apiOpen)}
                      className="flex items-center gap-1.5 p-1 -mr-1 rounded-lg hover:bg-[var(--bg-surface)] cursor-pointer text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors"
                      aria-label="Toggle API Subgroups"
                    >
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[var(--bg-surface)] text-[var(--text-subtle)] border border-[var(--border-color)]">
                        {ALL_API_PAGES.length}
                      </span>
                      <ChevronDown className={`size-3.5 transition-transform duration-200 ${apiOpen ? 'rotate-180 text-[#fa5c4f]' : 'text-[var(--text-subtle)]'}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {apiOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-0.5 pb-1 px-0.5 space-y-1"
                      >
                        {API_SUBGROUPS.map((group) => {
                          const isSubgroupOpen = openApiSubgroups[group.id] !== false;
                          const hasActiveChild = group.items.some((item) => item.href === pathname);

                          return (
                            <div key={group.id} className="space-y-0.5">
                              {/* Subgroup Header */}
                              <button
                                type="button"
                                onClick={() => toggleApiSubgroup(group.id)}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-main)] hover:bg-[var(--bg-surface)]/60 transition-colors group cursor-pointer"
                              >
                                <span className={`text-[11px] font-bold tracking-tight truncate ${hasActiveChild ? 'text-[#fa5c4f]' : 'text-[var(--text-main)]'}`}>
                                  {group.label}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[var(--bg-surface)] text-[var(--text-subtle)] border border-[var(--border-color)]/70">
                                    {group.items.length}
                                  </span>
                                  <ChevronDown className={`size-3 transition-transform duration-200 ${isSubgroupOpen ? 'rotate-180 text-[#fa5c4f]' : 'text-[var(--text-subtle)] opacity-60'}`} />
                                </div>
                              </button>

                              {/* Subgroup Items List */}
                              <AnimatePresence initial={false}>
                                {isSubgroupOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="border-l border-[var(--border-color)]/60 ml-3.5 pl-2 py-0.5 space-y-0.5 my-0.5">
                                      {group.items.map((link) => {
                                        const isActive = pathname === link.href;

                                        return (
                                          <Link
                                            key={link.href}
                                            href={link.href}
                                            data-sidebar-active={isActive ? "true" : undefined}
                                            onClick={() => setMobileOpen(false)}
                                            className="relative flex items-center justify-between rounded-lg px-2 py-1 text-[12px] font-mono transition-colors z-10 group cursor-pointer"
                                          >
                                            {isActive && (
                                              <motion.div 
                                                layoutId="api-subpage-active"
                                                className="absolute inset-0 bg-[#fa5c4f]/10 border border-[#fa5c4f]/20 rounded-lg -z-10"
                                                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                              />
                                            )}
                                            <span className={`flex items-center gap-2 truncate ${isActive ? 'text-[#fa5c4f] font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                                              <span className="truncate">{link.label}</span>
                                            </span>
                                            <span className={`text-[9px] font-mono shrink-0 ml-1 px-1 py-0.2 rounded border ${
                                              isActive
                                                ? 'bg-[#fa5c4f]/15 text-[#fa5c4f] border-[#fa5c4f]/30 font-semibold'
                                                : 'bg-[var(--bg-surface)] text-[var(--text-subtle)] border-[var(--border-color)] opacity-60 group-hover:opacity-100'
                                            }`}>
                                              {link.badge}
                                            </span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Featured Transitions */}
            <div className="space-y-3">
              <div className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)] flex items-center gap-2">
                <Star className="size-3 text-[#fa5c4f]" />
                <span>Featured</span>
              </div>
              <div className="relative p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex flex-col gap-0.5">
                {FEATURED_TRANSITIONS.map((item) => {
                  const active = pathname === `/docs/transitions/${item.slug}`;
                  const isComingSoon = item.status === 'coming-soon';

                  return (
                    <Link
                      key={item.slug}
                      href={`/docs/transitions/${item.slug}`}
                      data-sidebar-active={active ? "true" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className="group relative flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium transition-colors z-10 cursor-pointer"
                    >
                      {active && (
                        <motion.div 
                          layoutId="featured-active"
                          className="absolute inset-0 bg-[#fa5c4f]/10 border border-[#fa5c4f]/20 rounded-xl -z-10"
                        />
                      )}
                      {!active && (
                        <div className="absolute inset-0 bg-[var(--bg-surface)] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" />
                      )}
                      
                      <span className="flex items-center gap-2.5 truncate">
                        <span className={`truncate ${active ? 'text-[#fa5c4f] font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                          {item.displayName}
                        </span>
                      </span>
                      
                      {isComingSoon && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-widest ml-2 border border-amber-500/20">
                          Soon
                        </span>
                      )}
                      {!isComingSoon && !active && (
                        <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[var(--text-subtle)] group-hover:text-[#fa5c4f]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Transitions Catalog */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                <span className="flex items-center gap-2">
                  <Sparkles className="size-3 text-[#fa5c4f]" />
                  <span>Transitions</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#fa5c4f]/10 text-[#fa5c4f]">
                  {TRANSITION_CATALOG.length}
                </span>
              </div>

              {/* Gallery Overview Link */}
              <Link
                href="/docs/transitions"
                data-sidebar-active={isTransitionsGalleryActive ? "true" : undefined}
                onClick={() => setMobileOpen(false)}
                className="group relative flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#fa5c4f]/50 shadow-sm cursor-pointer"
              >
                {isTransitionsGalleryActive && (
                  <motion.div 
                    layoutId="gallery-active"
                    className="absolute inset-0 bg-[#fa5c4f]/10 -z-10"
                  />
                )}
                <span className={`${isTransitionsGalleryActive ? 'text-[#fa5c4f]' : 'text-[var(--text-main)]'}`}>
                  Gallery Overview
                </span>
                <ArrowRight className="size-3.5 text-[var(--text-subtle)] group-hover:text-[#fa5c4f] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Families Accordions */}
              <div className="space-y-1">
                {FAMILIES.map((family) => {
                  const list = families[family] || [];
                  if (list.length === 0) return null;
                  const isOpen = openFamilies[family];

                  return (
                    <div key={family} className="rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFamily(family)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                          isOpen ? 'bg-[var(--bg-card)] text-[var(--text-main)]' : 'hover:bg-[var(--bg-card)]/50 text-[var(--text-muted)] hover:text-[var(--text-main)]'
                        }`}
                      >
                        <span>{family}</span>
                        <motion.div 
                          animate={{ rotate: isOpen ? 180 : 0 }} 
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="size-3.5 opacity-50" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-[var(--bg-card)]/30 border-l-2 border-[var(--border-color)] ml-4 pl-2 mb-2"
                          >
                            <div className="py-1 space-y-0.5">
                              {list.map((item) => {
                                const active = pathname === `/docs/transitions/${item.slug}`;
                                const isComingSoon = item.status === 'coming-soon';

                                return (
                                  <Link
                                    key={item.slug}
                                    href={`/docs/transitions/${item.slug}`}
                                    data-sidebar-active={active ? "true" : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className="group relative flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors cursor-pointer"
                                  >
                                    {active && (
                                      <motion.div 
                                        layoutId="sidebar-active-item"
                                        className="absolute inset-0 bg-[#fa5c4f]/10 rounded-lg"
                                      />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2.5 truncate">
                                      <span className={`truncate font-medium ${active ? 'text-[#fa5c4f] font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                                        {item.displayName}
                                      </span>
                                    </span>
                                    {isComingSoon && (
                                      <span className="relative z-10 px-1 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-subtle)] text-[9px] font-bold uppercase tracking-widest ml-2 border border-[var(--border-color)]">
                                        Soon
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Group 3: Interactive Playground CTA */}
            <div className="pt-6">
              <Link
                href="/playground/landing"
                onClick={() => setMobileOpen(false)}
                className="group relative flex items-center justify-between rounded-2xl p-4 overflow-hidden bg-[#fa5c4f] text-white shadow-lg shadow-[#fa5c4f]/20 hover:shadow-[#fa5c4f]/40 hover:-translate-y-0.5 transition-all active:scale-95 no-underline cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                
                <div className="relative z-10 flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                    <Gamepad2 className="size-3" /> Try it live
                  </span>
                  <span className="font-display font-bold">Open Playground</span>
                </div>
                
                <ArrowRight className="relative z-10 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );

  return (
    <>
      {/* Mobile Drawer Toggle Header */}
      <div className="lg:hidden w-full sticky top-14 z-30 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)] cursor-pointer"
        >
          {mobileOpen ? <X className="size-5 text-[#fa5c4f]" /> : <Menu className="size-5 text-[#fa5c4f]" />}
          <span>Documentation Menu</span>
        </button>
        <span className="text-xs font-mono font-bold text-[var(--text-subtle)] bg-[var(--bg-card)] px-2 py-1 rounded-md border border-[var(--border-color)]">
          {TRANSITION_CATALOG.length} Trns.
        </span>
      </div>

      {/* Mobile Accordion Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileScrollRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            data-lenis-prevent="true"
            data-scrollable="true"
            className="lg:hidden w-full bg-[var(--bg-page)] border-b border-[var(--border-color)] px-4 py-6 overflow-y-auto max-h-[80vh] hide-scrollbar relative z-20 shadow-xl"
          >
            {sidebarInnerContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Full-Left Sidebar */}
      <aside
        data-lenis-prevent="true"
        data-scrollable="true"
        className="hidden lg:block w-[300px] xl:w-[320px] h-[calc(100vh-3.5rem)] sticky top-14 self-start bg-[var(--bg-surface)]/50 backdrop-blur-md border-r border-[var(--border-color)] shrink-0"
      >
        <div
          ref={desktopScrollRef}
          data-lenis-prevent="true"
          data-scrollable="true"
          className="h-full w-full overflow-y-auto px-5 py-8 hide-scrollbar pb-32 overscroll-contain"
        >
          {sidebarInnerContent}
        </div>
      </aside>
    </>
  );
}
