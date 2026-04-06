import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrainingItem } from '../types';
import { useGameStore } from '../store/useGameStore';
import { Robot } from './Robot';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { Card } from './Card';
import { useSpeech } from '../hooks/useSpeech';
import { useSound } from '../hooks/useSound';
import { BADGES } from '../constants';
import confetti from 'canvas-confetti';
import { Brain, Sparkles, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface TrainerProps {
  allCategoryItems: TrainingItem[];
  currentLevel: number;
  categoryId: string;
  onComplete: () => void;
}

export function Trainer({ allCategoryItems, currentLevel, categoryId, onComplete }: TrainerProps) {
  const items = useMemo(() => {
    return allCategoryItems.filter(item => item.difficulty <= currentLevel);
  }, [allCategoryItems, currentLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [robotState, setRobotState] = useState<'idle' | 'happy' | 'thinking' | 'sad' | 'confused' | 'celebratory'>('thinking');
  const [showFeedback, setShowFeedback] = useState(false);
  const [initialLevel] = useState(currentLevel);

  const { updateLearningState, updateXP, learningStates, lastUnlockedBadge } = useGameStore();
  const { speak } = useSpeech();
  const { playSound } = useSound();

  const currentItem = items[currentIndex];
  const learningState = learningStates[categoryId];

  // Detect Badge Unlock
  useEffect(() => {
    if (lastUnlockedBadge) {
      setRobotState('celebratory');
      playSound('badge');
      speak(`YAY! You unlocked the ${BADGES.find(b => b.id === lastUnlockedBadge)?.name} badge! You're an expert!`);
    }
  }, [lastUnlockedBadge, playSound, speak]);

  // Detect AI Level Up
  useEffect(() => {
    if (learningState.level > initialLevel && !selectedOption && !lastUnlockedBadge) {
      setRobotState('celebratory');
      playSound('levelup');
      speak(`WOW! My AI brain just leveled up to level ${learningState.level}! I'm getting so smart!`);
      const timer = setTimeout(() => setRobotState('thinking'), 4000);
      return () => clearTimeout(timer);
    }
  }, [learningState.level, initialLevel, playSound, lastUnlockedBadge]);

  // Reset robot to thinking when new item appears
  useEffect(() => {
    if (!selectedOption) {
      setRobotState('thinking');
    }
  }, [currentIndex, selectedOption]);

  // Generate options (current item + 3 random items from the same category)
  const options = useMemo(() => {
    if (currentItem.distractors && currentItem.distractors.length > 0) {
      const allOptions = [
        { label: currentItem.label },
        ...currentItem.distractors.map(d => ({ label: d }))
      ];
      return allOptions.sort(() => 0.5 - Math.random());
    }
    const others = allCategoryItems.filter(i => i.id !== currentItem.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    return [...selected, currentItem].sort(() => 0.5 - Math.random());
  }, [currentItem, allCategoryItems]);

  const handleOptionSelect = (label: string) => {
    if (selectedOption) return;
    
    setSelectedOption(label);
    const correct = label === currentItem.label;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setRobotState('happy');
      playSound('success');
      updateLearningState(categoryId, true);
      updateXP(10);
      speak(`Great job!`);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899']
      });
    } else {
      setRobotState('confused');
      playSound('error');
      updateLearningState(categoryId, false);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setRobotState('thinking');
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const getLevelName = (lvl: number) => {
    switch (lvl) {
      case 1: return 'Novice';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      default: return 'Novice';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Side: Robot & AI Status */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="flex flex-col items-center py-10">
          <Robot state={robotState} />
          <div className="mt-8 text-center space-y-2">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">AI BRAIN STATUS</h3>
            <div className="flex flex-col items-center justify-center gap-1 text-blue-500 font-black">
              <div className="flex items-center gap-2">
                <Brain size={20} />
                <span>Level {learningState.level}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                {getLevelName(learningState.level)}
              </span>
            </div>
          </div>
          
          <div className="w-full mt-8 space-y-4">
            <ProgressBar 
              value={learningState.confidence} 
              max={100} 
              label="AI Confidence" 
              color="bg-cyan-400"
            />
            <ProgressBar 
              value={learningState.correctCount} 
              max={12} 
              label="Badge Progress (12 items)" 
              color="bg-yellow-400"
            />
          </div>
        </Card>

        <Card className="bg-blue-500 text-white border-blue-600">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={24} />
            <h4 className="font-black text-lg">Trainer Tip!</h4>
          </div>
          <p className="text-sm font-bold opacity-90">
            The more correct answers you give, the smarter the AI becomes! Keep going!
          </p>
        </Card>
      </div>

      {/* Right Side: Training Interface */}
      <div className="lg:col-span-8 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-0 overflow-hidden border-b-8 border-slate-200">
              <div 
                className="aspect-video relative flex items-center justify-center p-8 sm:p-12 text-center overflow-hidden"
              >
                {/* Background Image with Blur/Overlay */}
                {currentItem.imageUrl && (
                  <>
                    <img 
                      src={currentItem.imageUrl} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
                  </>
                )}
                {!currentItem.imageUrl && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600" />
                )}

                <motion.h2 
                  key={currentItem.id + "_q"}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative z-10 text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-lg"
                >
                  {currentItem.question || "What is this?"}
                </motion.h2>
                
                <div className="absolute top-4 right-4 z-20">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => speak(currentItem.question || currentItem.label)}
                    className="rounded-full w-12 h-12 p-0 bg-white/20 hover:bg-white/30 border-white/40 text-white backdrop-blur-md"
                  >
                    <Volume2 size={24} />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 text-center bg-slate-50">
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
                  Training Module: {categoryId.toUpperCase()}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((option) => (
                <Button
                  key={option.label}
                  variant={
                    selectedOption === option.label
                      ? option.label === currentItem.label ? 'success' : 'danger'
                      : 'primary'
                  }
                  size="xl"
                  onClick={() => handleOptionSelect(option.label)}
                  disabled={!!selectedOption}
                  className="h-24"
                >
                  <span className="text-2xl">{option.label}</span>
                  {selectedOption === option.label && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                      {option.label === currentItem.label ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <XCircle className="text-red-500" size={24} />
                      )}
                    </div>
                  )}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <Card className={cn(
                  "w-full text-center py-6",
                  isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                )}>
                  <p className={cn(
                    "text-xl font-black",
                    isCorrect ? "text-green-600" : "text-red-600"
                  )}>
                    {isCorrect ? "FANTASTIC! THE AI LEARNED IT!" : `ALMOST! IT'S A ${currentItem.label.toUpperCase()}`}
                  </p>
                  <p className="text-slate-600 font-bold mt-1 italic">
                    "{currentItem.sentence}"
                  </p>
                </Card>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={handleNext}
                  className="w-full sm:w-64"
                >
                  {currentIndex < items.length - 1 ? "NEXT ITEM" : "FINISH TRAINING"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
