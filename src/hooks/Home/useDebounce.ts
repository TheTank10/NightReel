import { useEffect, useRef } from 'react';

/**
 * Debounce hook - delays execution until user stops typing
 * 
 * Usage:
 *   const debouncedSearch = useDebounce((query) => searchContent(query), 500);
 *   debouncedSearch('avatar');
 */
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return debounced function
  const debouncedCallback = (...args: Parameters<T>) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Also expose a cancel method
  debouncedCallback.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return debouncedCallback;
};