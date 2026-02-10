import { useEffect, useRef, useCallback } from 'react';
import { setAutoHidden } from '../../modules/home-indicator-controller';

export function useHomeIndicatorAutoHide(delay: number = 3000) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Show indicator
    setAutoHidden(false);

    // Hide after delay
    timerRef.current = setTimeout(() => {
      setAutoHidden(true);
    }, delay);
  }, [delay]);

  useEffect(() => {
    // Initially show it
    setAutoHidden(false);
    
    // Hide after delay
    const timer = setTimeout(() => {
      setAutoHidden(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      // Show indicator when unmounting
      setAutoHidden(false);
    };
  }, [delay]);

  return { resetTimer };
}