import { create } from 'zustand';
import { UserProfile, LearningState } from '../types';

interface GameStore {
  user: UserProfile | null;
  learningStates: Record<string, LearningState>;
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  lastUnlockedBadge: string | null;
  
  setUser: (user: UserProfile | null) => void;
  updateXP: (amount: number) => void;
  updateLearningState: (categoryId: string, isCorrect: boolean) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  clearLastUnlockedBadge: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  learningStates: {
    ai: { categoryId: 'ai', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
    hardware: { categoryId: 'hardware', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
    software: { categoryId: 'software', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
    internet: { categoryId: 'internet', confidence: 0, correctCount: 0, totalCount: 0, level: 1 },
  },
  isSoundEnabled: true,
  isMusicEnabled: true,
  lastUnlockedBadge: null,

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
    if (!current || !state.user) return state;

    const newCorrectCount = current.correctCount + (isCorrect ? 1 : 0);
    const newTotalCount = current.totalCount + 1;
    
    const newConfidence = Math.min(100, Math.round((newCorrectCount / newTotalCount) * 100));
    const newLevel = Math.min(4, Math.floor(newCorrectCount / 3) + 1);

    // Badge unlocking logic
    let newBadges = [...state.user.badges];
    let unlockedBadgeId = null;

    const badgeMap: Record<string, string> = {
      ai: 'ai_expert',
      hardware: 'hardware_hero',
      software: 'software_wizard',
      internet: 'security_guard'
    };

    const badgeId = badgeMap[categoryId];
    if (newCorrectCount >= 12 && !newBadges.includes(badgeId)) {
      newBadges.push(badgeId);
      unlockedBadgeId = badgeId;
    }

    return {
      user: {
        ...state.user,
        badges: newBadges
      },
      lastUnlockedBadge: unlockedBadgeId,
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
  clearLastUnlockedBadge: () => set({ lastUnlockedBadge: null }),
}));
