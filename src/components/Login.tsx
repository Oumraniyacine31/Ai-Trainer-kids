import { motion } from 'motion/react';
import { Card } from './Card';
import { Button } from './Button';
import { Robot } from './Robot';
import { LogIn, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isLoading?: boolean;
}

export function Login({ onLogin, isLoading }: LoginProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Robot state="idle" className="w-64 h-64" />
      </motion.div>

      <div className="space-y-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-black text-slate-800 leading-tight">
            SIGN IN TO <span className="text-blue-500">SAVE PROGRESS</span>!
          </h1>
          <p className="text-lg font-bold text-slate-500 mt-4">
            Sign in with Google to save your AI robot's learning and earn badges.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-8 space-y-4"
        >
          <Button 
            variant="primary" 
            size="xl" 
            onClick={onLogin}
            isLoading={isLoading}
            className="w-full group px-12 py-6 rounded-3xl shadow-2xl hover:shadow-blue-200"
          >
            <span className="flex items-center gap-3">
              SIGN IN WITH GOOGLE
              <LogIn className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => window.dispatchEvent(new CustomEvent('guest-login'))}
            className="w-full rounded-2xl border-2 border-slate-200 text-slate-600 font-black"
          >
            PLAY AS GUEST
          </Button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm">
            <ShieldCheck size={16} />
            <span>Safe and secure for kids</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
