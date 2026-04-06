import { useGameStore } from '../store/useGameStore';
import { Trophy, Star, Settings, Volume2, VolumeX, Music, Music2, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './Button';

interface HeaderProps {
  onParentClick?: () => void;
}

export function Header({ onParentClick }: HeaderProps) {
  const { user, isSoundEnabled, isMusicEnabled, toggleSound, toggleMusic } = useGameStore();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b-4 border-slate-100 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg"
          >
            <Trophy size={24} />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">AI TRAINER KIDS</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teach the Future</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-2xl border-2 border-slate-100">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                <span className="font-black text-slate-700">LVL {user.level}</span>
              </div>
              <div className="w-px h-4 bg-slate-200" />
              <div className="font-bold text-slate-500">{user.xp} XP</div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleSound} className="p-2">
                {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleMusic} className="p-2">
                {isMusicEnabled ? <Music size={20} /> : <Music2 size={20} />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onParentClick}
                className="p-2 text-slate-400 hover:text-blue-500"
                title="Parent Dashboard"
              >
                <Users size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800">{user.displayName}</p>
                <p className="text-xs font-bold text-blue-500">Super Trainer</p>
              </div>
              <img 
                src={user.avatar} 
                alt={user.displayName}
                className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
