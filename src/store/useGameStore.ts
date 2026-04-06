import { create } from 'zustand';
import { UserProfile, LearningState } from '../types';

interface GameStore {
  user: UserProfile | null;
  learningStates: Record<string, LearningState>;
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  
  setUser: (user: UserProfile | null) => void;
  updateXP: (amount: number) => void;
  updateLearningState: (categoryId: string, isCorrect: boolean) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  learningStates: {
    animal: { categoryId: 'animal', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
    color: { categoryId: 'color', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
    object: { categoryId: 'object', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
  },
  isSoundEnabled: true,
  isMusicEnabled: true,

  setUser: (user) => set({ user }),
  
  updateXP: (amount) => set((state) => {
    if (!state.user) return state;
    const newXP = state.user.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    return {
      user: {
        ...state.user,
        xp: newXP,
        level: newLevel,
      }
    };
  }),

  updateLearningState: (categoryId, isCorrect) => set((state) => {
    const current = state.learningStates[categoryId];
    if (!current) return state;

    const newCorrectCount = current.correctCount + (isCorrect ? 1 : 0);
    const newTotalCount = current.totalCount + 1;
    
    // Simple confidence calculation: percentage of correct answers weighted by total
    // We'll use a slightly more complex formula to simulate "learning"
    // Confidence = (Correct / Total) * 100, but capped at 100
    const newConfidence = Math.min(100, Math.round((newCorrectCount / newTotalCount) * 100));
    
    // Level up category if confidence is high and total count is enough
    const newLevel = Math.floor(newTotalCount / 5) + 1;

    return {
      learningStates: {
        ...state.learningStates,
        [categoryId]: {
          ...current,
          correctCount: newCorrectCount,
          totalCount: newTotalCount,
          confidence: newConfidence,
          level: newLevel,
        }
      }
    };
  }),

  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  toggleMusic: () => set((state) => ({ isMusicEnabled: !state.isMusicEnabled })),
}));
