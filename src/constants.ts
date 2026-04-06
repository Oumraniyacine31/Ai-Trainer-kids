import { TrainingItem } from './types';

export const ANIMALS: TrainingItem[] = [
  {
    id: 'a1',
    category: 'animal',
    label: 'Dog',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Dog',
    sentence: 'The dog is a loyal friend.'
  },
  {
    id: 'a2',
    category: 'animal',
    label: 'Cat',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Cat',
    sentence: 'The cat likes to sleep.'
  },
  {
    id: 'a3',
    category: 'animal',
    label: 'Elephant',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Elephant',
    sentence: 'The elephant is very big.'
  },
  {
    id: 'a4',
    category: 'animal',
    label: 'Lion',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Lion',
    sentence: 'The lion is the king of the jungle.'
  }
];

export const COLORS: TrainingItem[] = [
  {
    id: 'c1',
    category: 'color',
    label: 'Red',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Red',
    sentence: 'The apple is red.'
  },
  {
    id: 'c2',
    category: 'color',
    label: 'Blue',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Blue',
    sentence: 'The sky is blue.'
  },
  {
    id: 'c3',
    category: 'color',
    label: 'Green',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Green',
    sentence: 'The grass is green.'
  }
];

export const OBJECTS: TrainingItem[] = [
  {
    id: 'o1',
    category: 'object',
    label: 'Chair',
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Chair',
    sentence: 'I sit on the chair.'
  },
  {
    id: 'o2',
    category: 'object',
    label: 'Table',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400',
    pronunciation: 'Table',
    sentence: 'The book is on the table.'
  }
];

export const BADGES = [
  { id: 'animal_expert', name: 'Animal Expert', icon: '🐾', description: 'Taught the AI 10 animals!' },
  { id: 'color_master', name: 'Color Master', icon: '🎨', description: 'Perfect score in color training!' },
  { id: 'fast_learner', name: 'Fast Learner', icon: '⚡', description: 'Completed a session in under 2 minutes.' }
];
