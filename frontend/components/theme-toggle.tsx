'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] ${className}`} />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      onClick={() => {
        const nextTheme = isDark ? 'light' : 'dark';
        if (!document.startViewTransition) {
          setTheme(nextTheme);
          return;
        }
        document.startViewTransition(() => {
          setTheme(nextTheme);
        });
      }}
      aria-label="Toggle light and dark theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-main)] hover:border-[#fa5c4f]/50 transition-all active:scale-90 cursor-pointer btn-tactile flex items-center justify-center ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
