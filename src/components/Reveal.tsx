import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, show = true, className = '', delay = 0 }: { children: ReactNode; show?: boolean; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} aria-hidden={!show} inert={!show}
    initial={{ opacity: 0, transform: reduced ? 'none' : 'translateY(12px)' }}
    animate={{ opacity: show ? 1 : 0, transform: reduced ? 'none' : `translateY(${show ? 0 : 12}px)` }}
    transition={{ duration: reduced ? .12 : .45, delay: show ? delay : 0, ease: [.23, 1, .32, 1] }}>
    {children}
  </motion.div>;
}
