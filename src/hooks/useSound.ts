import { useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useSound() {
  const { isSoundEnabled, isMusicEnabled } = useGameStore();
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3'); // Placeholder for ambient loop
      // Using a more musical loop for background
      bgMusicRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.2;
    }

    if (isMusicEnabled) {
      bgMusicRef.current.play().catch(() => {
        console.log('Autoplay blocked - waiting for user interaction');
      });
    } else {
      bgMusicRef.current.pause();
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [isMusicEnabled]);

  const playSound = useCallback((type: 'success' | 'error' | 'click' | 'levelup') => {
    if (!isSoundEnabled) return;

    const audio = new Audio();
    switch (type) {
      case 'success':
        // A bright "ring" sound for success
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
        break;
      case 'error':
        // A soft "thud" or error sound
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3';
        break;
      case 'click':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
        break;
      case 'levelup':
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3';
        break;
    }
    audio.play().catch(() => {});
  }, [isSoundEnabled]);

  return { playSound };
}
