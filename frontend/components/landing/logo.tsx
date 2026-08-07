'use client';

import { motion } from 'framer-motion';

export function Logo({ className }: { className?: string }) {
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    hover: {
      rotate: 90,
      transition: { duration: 0.5, ease: 'easeInOut' },
    }
  };

  const item: any = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    hover: (custom: number) => ({
      scale: [1, 0.8, 1.2, 1],
      rotate: custom % 2 === 0 ? 180 : -180,
      transition: { duration: 0.6, ease: 'easeInOut' }
    })
  };

  return (
    <motion.svg
      viewBox="-6 -6 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      whileHover="hover"
    >
      <rect x="-6" y="-6" width="40" height="40" rx="10" fill="#fa5c4f" />
      <motion.rect custom={1} variants={item} x="1" y="1" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.9" />
      <motion.rect custom={2} variants={item} x="16" y="1" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.6" />
      <motion.rect custom={3} variants={item} x="1" y="16" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.7" />
      <motion.rect custom={4} variants={item} x="16" y="16" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.4" />
    </motion.svg>
  );
}
