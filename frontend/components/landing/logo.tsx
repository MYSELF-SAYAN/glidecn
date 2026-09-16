'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  const isWhite = className.includes('text-white');

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}

      initial={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.92 }}
    >
      <Image
        src="/favicon.svg"
        alt="GlideCN Logo"
        width={48}
        height={48}
        className={`w-full h-full object-contain select-none pointer-events-none ${isWhite ? 'brightness-0 invert' : ''
          }`}
        priority
      />
    </motion.div>
  );
}

