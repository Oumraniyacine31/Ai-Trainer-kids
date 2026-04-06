import { motion } from 'motion/react';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { useGameStore } from '../store/useGameStore';
import { Brain, TrendingUp, Clock, Award, ChevronLeft } from 'lucide-react';

interface ParentDashboardProps {
  onBack: () => void;
}

export function ParentDashboard({ onBack }: ParentDashboardProps) {
  const { learningStates, user } = useGameStore();

  const stats = [
    { label: 'Total Training Time', value: '2h 15m', icon: <Clock className="text-blue-500" /> },
    { label: 'Words Mastered', value: '24', icon: <Award className="text-yellow-500" /> },
    { label: 'Learning Streak', value: '5 Days', icon: <TrendingUp className="text-green-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ChevronLeft size={24} />
        </Button>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Parent Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <Brain className="text-blue-500" size={24} />
            <h3 className="text-xl font-black text-slate-800">Learning Progress</h3>
          </div>
          
          <div className="space-y-6">
            {Object.values(learningStates).map((state) => (
              <div key={state.categoryId} className="space-y-2">
                <div className="flex justify-between items-end">
                  <h4 className="font-black text-slate-700 uppercase tracking-tight">{state.categoryId}</h4>
                  <span className="text-xs font-bold text-slate-400">Level {state.level}</span>
                </div>
                <ProgressBar 
                  value={state.confidence} 
                  max={100} 
                  color={
                    state.categoryId === 'ai' ? 'bg-blue-500' : 
                    state.categoryId === 'hardware' ? 'bg-orange-500' : 
                    state.categoryId === 'software' ? 'bg-purple-500' : 
                    'bg-green-500'
                  }
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>{state.correctCount} Correct</span>
                  <span>{state.totalCount} Total</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <Award className="text-yellow-500" size={24} />
            <h3 className="text-xl font-black text-slate-800">Recent Achievements</h3>
          </div>
          
          <div className="space-y-4">
            {user?.badges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 font-bold italic">No badges earned yet. Keep training!</p>
              </div>
            ) : (
              user?.badges.map((badgeId) => (
                <div key={badgeId} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 capitalize">{badgeId.replace('_', ' ')}</h4>
                    <p className="text-xs font-bold text-slate-400">Earned on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white border-slate-800">
        <h3 className="text-xl font-black mb-2">Educational Insight</h3>
        <p className="text-slate-400 font-bold leading-relaxed">
          Your child is showing strong progress in <span className="text-blue-400">AI Concepts</span>. 
          They have a high accuracy rate in identifying Neural Networks. 
          Consider encouraging them to try the <span className="text-purple-400">Software</span> module to understand how these systems are built.
        </p>
      </Card>
    </div>
  );
}
