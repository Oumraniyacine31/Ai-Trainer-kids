import { useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useSound() {
  const { isSoundEnabled } = useGameStore();

  const playSound = useCallback((type: 'success' | 'error' | 'click' | 'levelup') => {
    if (!isSoundEnabled) return;

    const audio = new Audio();
    switch (type) {
      case 'success':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
        break;
      case 'error':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3';
        break;
      case 'click':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
        break;
      case 'levelup':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3';
        break;
    }
    audio.play().catch(() => {}); // Ignore errors if audio fails to play
  }, [isSoundEnabled]);

  return { playSound };
}
