import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-purple-500 text-white hover:bg-purple-600 border-b-4 border-purple-700 active:border-b-0 active:translate-y-1",
    success: "bg-green-500 text-white hover:bg-green-600 border-b-4 border-green-700 active:border-b-0 active:translate-y-1",
    danger: "bg-red-500 text-white hover:bg-red-600 border-b-4 border-red-700 active:border-b-0 active:translate-y-1",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-6 py-3 text-base font-bold rounded-xl",
    lg: "px-8 py-4 text-xl font-black rounded-2xl",
    xl: "px-10 py-5 text-2xl font-black rounded-3xl",
  };

  const { onDrag, onDragStart, onDragEnd, ...buttonProps } = props as any;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...buttonProps}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : children}
    </motion.button>
  );
}
