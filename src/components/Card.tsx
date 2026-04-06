import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true }: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      className={cn(
        "bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
