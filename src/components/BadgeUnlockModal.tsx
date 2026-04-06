import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/useGameStore';
import { BADGES } from '../constants';
import { Button } from './Button';
import { Trophy, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export function BadgeUnlockModal() {
  const { lastUnlockedBadge, clearLastUnlockedBadge } = useGameStore();
  const badge = BADGES.find(b => b.id === lastUnlockedBadge);

  useEffect(() => {
    if (lastUnlockedBadge) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [lastUnlockedBadge]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      {lastUnlockedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            className="bg-white rounded-[40px] p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />

            <button 
              onClick={clearLastUnlockedBadge}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 space-y-6">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto border-4 border-yellow-400 shadow-inner"
              >
                <span className="text-6xl">{badge.icon}</span>
              </motion.div>

              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-yellow-600 font-black uppercase tracking-widest text-sm"
                >
                  <Trophy size={16} />
                  NEW BADGE UNLOCKED!
                  <Trophy size={16} />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-black text-slate-800"
                >
                  {badge.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-slate-500 font-bold text-lg"
                >
                  {badge.description}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <Button 
                  variant="primary" 
                  className="w-full py-4 text-xl bg-yellow-500 hover:bg-yellow-600 border-yellow-700 shadow-[0_4px_0_rgb(161,98,7)]"
                  onClick={clearLastUnlockedBadge}
                >
                  AWESOME!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
