'use client';

import { motion } from 'framer-motion';
import { Github, Users, Star, GitBranch } from 'lucide-react';
import Link from 'next/link';

export function OpenSource() {
  return (
    <section className="relative w-full bg-[#0F172A] py-32 sm:py-40 overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="size-20 rounded-3xl bg-gradient-to-br from-[#fa5c4f] to-amber-500 shadow-2xl shadow-[#fa5c4f]/30 flex flex-col items-center justify-center mb-10"
        >
          <Github className="size-10 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-6">
            Proudly Open Source
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Morphy is built by the community, for the community. We believe fluid web experiences should be accessible to every developer without locking them into proprietary ecosystems.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mb-16">
          {[
            { icon: <Star className="size-6 text-yellow-500" />, label: 'Stars', value: '4.2k+' },
            { icon: <Users className="size-6 text-blue-500" />, label: 'Contributors', value: '120+' },
            { icon: <GitBranch className="size-6 text-emerald-500" />, label: 'Forks', value: '340+' },
            { icon: <Github className="size-6 text-purple-500" />, label: 'Issues Closed', value: '890+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#1E293B]/80 border border-slate-700 backdrop-blur-sm"
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white font-display mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="https://github.com/morphyjs"
            target="_blank"
            className="group flex items-center gap-2 rounded-full bg-white hover:bg-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition-all active:scale-95"
          >
            <Github className="size-5" />
            Star on GitHub
          </Link>
          <Link
            href="/docs/contributing"
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-800 px-8 py-4 text-sm font-bold text-white transition-all active:scale-95"
          >
            <GitBranch className="size-5" />
            Read Contribution Guide
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
