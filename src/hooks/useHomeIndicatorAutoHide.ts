import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

let HomeIndicatorController: any;

try {
  HomeIndicatorController = require('home-indicator-controller');
} catch (error) {
  console.log('HomeIndicatorController not available (probably using Expo Go)');
  HomeIndicatorController = {
    setAutoHidden: () => {}, // does nothing
  };
}

export function useHomeIndicatorAutoHide(inactivityDelay: number = 3000) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideIndicator = () => {
    if (Platform.OS === 'ios') {
      HomeIndicatorController.setAutoHidden(true);
    }
  };

  const showIndicator = () => {
    if (Platform.OS === 'ios') {
      HomeIndicatorController.setAutoHidden(false);
    }
  };

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    showIndicator();
    
    timeoutRef.current = setTimeout(() => {
      hideIndicator();
    }, inactivityDelay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      showIndicator();
    };
  }, []);

  return { resetTimer, showIndicator, hideIndicator };
}