import { motion } from 'motion/react';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { Robot } from './Robot';
import { useGameStore } from '../store/useGameStore';
import { AI_BASICS, HARDWARE, SOFTWARE, INTERNET, BADGES } from '../constants';
import { Trophy, Star, Brain, Play, Award, Cpu, Code, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface DashboardProps {
  onSelectCategory: (categoryId: string) => void;
}

export function Dashboard({ onSelectCategory }: DashboardProps) {
  const { user, learningStates } = useGameStore();

  const categories = [
    { id: 'ai', name: 'AI Specialist', icon: <Brain size={32} />, color: 'bg-blue-500', items: AI_BASICS },
    { id: 'hardware', name: 'Hardware Hero', icon: <Cpu size={32} />, color: 'bg-orange-500', items: HARDWARE },
    { id: 'software', name: 'Software Wizard', icon: <Code size={32} />, color: 'bg-purple-500', items: SOFTWARE },
    { id: 'internet', name: 'Security Guard', icon: <Globe size={32} />, color: 'bg-green-500', items: INTERNET },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-5xl font-black text-slate-800 leading-tight">
              Welcome back, <span className="text-blue-500">{user?.displayName}</span>!
            </h2>
            <p className="text-xl font-bold text-slate-500">
              Your AI robot is ready to learn something new today. Which category should we train?
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4">
            <Card className="flex items-center gap-4 py-3 px-6 border-blue-100 bg-blue-50">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-black text-blue-400 uppercase">Current Level</p>
                <p className="text-xl font-black text-blue-600">Level {user?.level}</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4 py-3 px-6 border-purple-100 bg-purple-50">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                <Trophy size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-black text-purple-400 uppercase">Total XP</p>
                <p className="text-xl font-black text-purple-600">{user?.xp} XP</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
            <Robot state="idle" className="w-64 h-64" />
          </motion.div>
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-100 rounded-3xl -z-10" />
        </div>
      </section>

      {/* Training Modes */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-800">Training Modes</h3>
          <Button variant="ghost" className="text-blue-500 font-black">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-0 overflow-hidden flex flex-col group">
              <div className={cn("h-32 flex items-center justify-center text-white", cat.color)}>
                {cat.icon}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-black text-slate-800">{cat.name}</h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {cat.items.length} Items Available
                    </p>
                  </div>
                  <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-500">
                    LVL {learningStates[cat.id].level}
                  </div>
                </div>
                
                <div className="mt-auto space-y-4">
                  <ProgressBar 
                    value={learningStates[cat.id].confidence} 
                    max={100} 
                    color={cat.color}
                  />
                  <Button 
                    variant="primary" 
                    className={cn("w-full gap-2", cat.color, "hover:opacity-90 border-none")}
                    onClick={() => onSelectCategory(cat.id)}
                  >
                    <Play size={20} fill="currentColor" />
                    START TRAINING
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-800">Your Badges</h3>
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <Award size={20} />
            <span>{user?.badges.length} Unlocked</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {BADGES.map((badge) => {
            const isUnlocked = user?.badges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-3xl border-2 transition-all",
                  isUnlocked 
                    ? "bg-white border-yellow-200 shadow-lg" 
                    : "bg-slate-50 border-slate-100 opacity-50 grayscale"
                )}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h5 className="text-sm font-black text-slate-800">{badge.name}</h5>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
                  {isUnlocked ? "Unlocked!" : "Locked"}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
