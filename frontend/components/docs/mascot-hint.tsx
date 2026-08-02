'use client';

import { motion } from 'framer-motion';
import { SpriteMascot, MascotPose } from '@/components/landing/sprite-mascot';

interface MascotHintProps {
  text: string;
  pose?: MascotPose;
  className?: string;
}

export function MascotHint({ text, pose = 'waving', className = '' }: MascotHintProps) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <div className="-mb-2">
        <SpriteMascot pose={pose} size={72} />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -10, y: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.4 }}
        className="relative rounded-2xl rounded-bl-none bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm mb-4 border border-zinc-200/50 dark:border-zinc-700/50"
      >
        {text}
        {/* Speech bubble tail */}
        <div className="absolute -left-2 bottom-0 h-4 w-4 overflow-hidden">
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-transparent shadow-[0_4px_0_0_#f4f4f5] dark:shadow-[0_4px_0_0_#27272a]"></div>
        </div>
      </motion.div>
    </div>
  );
}
