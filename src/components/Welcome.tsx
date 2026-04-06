import { motion } from 'motion/react';
import { Card } from './Card';
import { Button } from './Button';
import { Robot } from './Robot';
import { Brain, Sparkles, Trophy, Star } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Robot state="happy" className="w-64 h-64" />
      </motion.div>

      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-6xl font-black text-slate-800 leading-tight">
            BECOME AN <span className="text-blue-500">AI TRAINER</span>!
          </h1>
          <p className="text-2xl font-bold text-slate-500 mt-4">
            Teach your very own AI robot to recognize the world. The smarter it gets, the more rewards you earn!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl border-2 border-blue-100 text-blue-600 font-black">
            <Brain size={20} />
            <span>Train AI</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-2xl border-2 border-purple-100 text-purple-600 font-black">
            <Star size={20} fill="currentColor" />
            <span>Earn XP</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl border-2 border-yellow-100 text-yellow-600 font-black">
            <Trophy size={20} fill="currentColor" />
            <span>Unlock Badges</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="pt-8"
        >
          <Button 
            variant="primary" 
            size="xl" 
            onClick={onStart}
            className="group px-12 py-6 rounded-3xl shadow-2xl hover:shadow-blue-200"
          >
            <span className="flex items-center gap-3">
              START TRAINING NOW
              <Sparkles className="group-hover:rotate-12 transition-transform" />
            </span>
          </Button>

          <div className="mt-6">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('go-to-login'))}
              className="text-slate-400 font-bold hover:text-blue-500 transition-colors"
            >
              Sign in to save your progress
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
