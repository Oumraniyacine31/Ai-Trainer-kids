import { useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useSpeech() {
  const { isSoundEnabled } = useGameStore();

  const speak = useCallback((text: string) => {
    if (!isSoundEnabled) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch for a friendly robot voice
    
    // Try to find a friendly sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Natural')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [isSoundEnabled]);

  return { speak };
}
