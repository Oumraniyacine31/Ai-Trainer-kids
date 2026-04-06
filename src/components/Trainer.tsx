import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrainingItem } from '../types';
import { useGameStore } from '../store/useGameStore';
import { Robot } from './Robot';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { Card } from './Card';
import { useSpeech } from '../hooks/useSpeech';
import confetti from 'canvas-confetti';
import { Brain, Sparkles, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface TrainerProps {
  items: TrainingItem[];
  categoryId: string;
  onComplete: () => void;
}

export function Trainer({ items, categoryId, onComplete }: TrainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [robotState, setRobotState] = useState<'idle' | 'happy' | 'thinking' | 'sad'>('idle');
  const [showFeedback, setShowFeedback] = useState(false);

  const { updateLearningState, updateXP, learningStates } = useGameStore();
  const { speak } = useSpeech();

  const currentItem = items[currentIndex];
  const learningState = learningStates[categoryId];

  // Generate options (current item + 2 random items from the same category)
  const options = useMemo(() => {
    const others = items.filter(i => i.id !== currentItem.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    return [...selected, currentItem].sort(() => 0.5 - Math.random());
  }, [currentItem, items]);

  const handleOptionSelect = (label: string) => {
    if (selectedOption) return;
    
    setSelectedOption(label);
    const correct = label === currentItem.label;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setRobotState('happy');
      updateLearningState(categoryId, true);
      updateXP(10);
      speak(`Great job! That is a ${currentItem.label}. I learned something new!`);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B']
      });
    } else {
      setRobotState('sad');
      updateLearningState(categoryId, false);
      speak(`Oh no! That's not quite right. This is a ${currentItem.label}. Let's try again!`);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setRobotState('idle');
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Side: Robot & AI Status */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="flex flex-col items-center py-10">
          <Robot state={robotState} />
          <div className="mt-8 text-center space-y-2">
            <h3 className="text-xl font-black text-slate-800">AI BRAIN STATUS</h3>
            <div className="flex items-center justify-center gap-2 text-blue-500 font-bold">
              <Brain size={20} />
              <span>Level {learningState.level}</span>
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
              max={learningState.totalCount || 1} 
              label="Learning Accuracy" 
              color="bg-green-400"
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
              <div className="aspect-video relative">
                <img 
                  src={currentItem.imageUrl} 
                  alt="Training Target"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => speak(currentItem.label)}
                    className="rounded-full w-12 h-12 p-0"
                  >
                    <Volume2 size={24} />
                  </Button>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <h2 className="text-3xl font-black text-slate-800 mb-2">What is this?</h2>
                <p className="text-slate-500 font-bold">Help the AI identify this {categoryId}.</p>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
