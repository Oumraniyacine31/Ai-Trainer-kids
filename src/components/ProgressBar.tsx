import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  className?: string;
}

export function ProgressBar({ value, max, label, color = "bg-blue-500", className }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <div className="flex justify-between text-sm font-medium text-slate-700">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden border-2 border-slate-300">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
