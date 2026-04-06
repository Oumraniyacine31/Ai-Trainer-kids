import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RobotProps {
  state: 'idle' | 'happy' | 'thinking' | 'sad' | 'confused' | 'celebratory';
  className?: string;
}

export function Robot({ state, className }: RobotProps) {
  const variants: any = {
    idle: { 
      y: [0, -10, 0], 
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } 
    },
    happy: { 
      scale: [1, 1.1, 1], 
      rotate: [0, 5, -5, 0], 
      transition: { repeat: Infinity, duration: 0.5 } 
    },
    thinking: { 
      rotate: [0, -5, 5, 0], 
      x: [-2, 2, -2, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } 
    },
    sad: { 
      y: [0, 5, 0], 
      opacity: 0.8,
      transition: { duration: 0.5 }
    },
    confused: {
      rotate: [-10, 10, -10, 10, 0],
      x: [-5, 5, -5, 5, 0],
      transition: { repeat: Infinity, duration: 0.8 }
    },
    celebratory: {
      y: [0, -40, 0],
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: { 
        y: { repeat: Infinity, duration: 0.6, ease: "easeOut" },
        rotate: { repeat: Infinity, duration: 1, ease: "linear" },
        scale: { repeat: Infinity, duration: 0.6 }
      }
    }
  };

  const eyeVariants: any = {
    idle: { scaleY: 1, x: 0 },
    happy: { scaleY: 0.2, transition: { repeat: Infinity, duration: 0.5 } },
    thinking: { 
      x: [-4, 4, -4], 
      y: [-2, 2, -2],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
    },
    sad: { scaleY: 0.5, opacity: 0.5 },
    confused: {
      rotate: [0, 180, 360],
      scale: [1, 1.5, 1],
      transition: { repeat: Infinity, duration: 0.5 }
    },
    celebratory: {
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
      transition: { repeat: Infinity, duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={cn("relative w-48 h-48 flex items-center justify-center", className)}
      animate={state}
      variants={variants}
    >
      {/* Robot Body */}
      <div className="absolute inset-0 bg-blue-500 rounded-3xl border-4 border-blue-700 shadow-xl overflow-hidden">
        {/* Screen/Face Area */}
        <div className="absolute top-4 left-4 right-4 bottom-12 bg-slate-900 rounded-2xl border-2 border-blue-300 flex flex-col items-center justify-center gap-4">
          {/* Eyes */}
          <div className="flex gap-8">
            <motion.div 
              className="w-4 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              variants={eyeVariants}
            />
            <motion.div 
              className="w-4 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              variants={eyeVariants}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className={cn(
              "w-12 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)] transition-all duration-300",
              (state === 'happy' || state === 'celebratory') && "h-4 rounded-t-none rounded-b-full",
              state === 'sad' && "h-1 opacity-50",
              state === 'confused' && "w-4 h-4 rounded-full",
              state === 'thinking' && "w-6 h-1 opacity-80"
            )}
          />
        </div>
        
        {/* Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-blue-600 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-75" />
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-150" />
        </div>
      </div>
      
      {/* Antennas */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-1 h-6 bg-blue-700" />
        <motion.div 
          className={cn(
            "w-4 h-4 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-colors duration-300",
            state === 'thinking' ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" : "bg-red-500"
          )}
          animate={state === 'thinking' ? { 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          } : { 
            opacity: [1, 0.5, 1] 
          }}
          transition={{ repeat: Infinity, duration: state === 'thinking' ? 0.5 : 1 }}
        />
      </div>
      
      {/* Arms */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-16 bg-blue-600 rounded-l-xl border-l-4 border-blue-700" />
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-16 bg-blue-600 rounded-r-xl border-r-4 border-blue-700" />
    </motion.div>
  );
}
