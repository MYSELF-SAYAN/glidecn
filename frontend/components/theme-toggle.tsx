'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-white/5 border border-black/5 dark:border-white/10 ${className}`} />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      onClick={(e) => {
        const nextTheme = isDark ? 'light' : 'dark';
        
        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
          setTheme(nextTheme);
          return;
        }
        
        // Get click coordinates
        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        );

        // Start the transition, wrapping setTheme in flushSync so the DOM updates synchronously
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });

        // Animate from the click coordinates using WAAPI
        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ];

          document.documentElement.animate(
            {
              clipPath: isDark ? [...clipPath].reverse() : clipPath,
            },
            {
              duration: 600,
              easing: 'cubic-bezier(0.64, 0, 0.78, 0)',
              pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',
            }
          );
        });
      }}
      aria-label="Toggle light and dark theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`p-2.5 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-all active:scale-90 cursor-pointer btn-tactile flex items-center justify-center shadow-sm backdrop-blur-md ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-500 ease-out" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform duration-500 ease-out" />
      )}
    </button>
  );
}
