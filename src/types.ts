export interface UserProfile {
  uid: string;
  displayName: string;
  avatar: string;
  xp: number;
  level: number;
  badges: string[];
  lastPlayed: string;
  role: 'admin' | 'client';
}

export interface TrainingItem {
  id: string;
  category: 'ai' | 'hardware' | 'software' | 'internet';
  label: string;
  imageUrl: string;
  pronunciation: string;
  sentence: string;
  difficulty: 1 | 2 | 3 | 4;
  question?: string;
  distractors?: string[];
}

export interface LearningState {
  categoryId: string;
  confidence: number; // 0 to 100
  correctCount: number;
  totalCount: number;
  level: number;
}

export interface GameSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  score: number;
  itemsTrained: string[];
}
