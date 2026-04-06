import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './Card';
import { Button } from './Button';
import { UserProfile } from '../types';
import { User, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProfileSetupProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  initialName?: string;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
];

export function ProfileSetup({ onComplete, initialName }: ProfileSetupProps) {
  const [name, setName] = useState(initialName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        displayName: name,
        avatar: selectedAvatar,
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12">
      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-slate-800 leading-tight">
            CREATE YOUR <span className="text-blue-500">TRAINER PROFILE</span>!
          </h1>
          <p className="text-xl font-bold text-slate-500 mt-4">
            Choose a name and a cool avatar to represent you in the AI Trainer world.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-10 pt-8">
          <div className="space-y-4">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Trainer Name</label>
            <div className="relative max-w-md mx-auto">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500">
                <User size={24} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full pl-16 pr-6 py-5 bg-white border-4 border-slate-100 rounded-3xl text-xl font-black text-slate-800 focus:border-blue-500 focus:outline-none transition-colors shadow-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Choose Your Avatar</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {AVATARS.map((avatar) => (
                <motion.button
                  key={avatar}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={cn(
                    "relative w-20 h-20 rounded-3xl border-4 transition-all overflow-hidden",
                    selectedAvatar === avatar 
                      ? "border-blue-500 bg-blue-50 shadow-xl" 
                      : "border-slate-100 bg-white hover:border-blue-200"
                  )}
                >
                  <img src={avatar} alt="Avatar Option" className="w-full h-full object-cover" />
                  {selectedAvatar === avatar && (
                    <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5 text-white shadow-lg">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <Button 
              type="submit"
              variant="primary" 
              size="xl" 
              className="group px-12 py-6 rounded-3xl shadow-2xl hover:shadow-blue-200"
              disabled={!name.trim()}
            >
              <span className="flex items-center gap-3">
                LET'S GO!
                <Sparkles className="group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
