import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUBTITLE_STYLING_KEY = '@subtitle_styling';

export interface SubtitleStyling {
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  bottomOffset: number;
  fontWeight: '400' | '500' | '600' | '700' | 'bold';
  borderRadius: number;
  paddingHorizontal: number;
  paddingVertical: number;
  textShadow: boolean;
}

const DEFAULT_STYLING: SubtitleStyling = {
  fontSize: 16,
  textColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: 0.75,
  bottomOffset: 30,
  fontWeight: '400',
  borderRadius: 4,
  paddingHorizontal: 12,
  paddingVertical: 6,
  textShadow: false,
};

export const useSubtitleStyling = () => {
  const [styling, setStyling] = useState<SubtitleStyling>(DEFAULT_STYLING);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStyling();
  }, []);

  const loadStyling = async () => {
    try {
      const stored = await AsyncStorage.getItem(SUBTITLE_STYLING_KEY);
      if (stored) {
        setStyling(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading subtitle styling:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStyling = async (newStyling: Partial<SubtitleStyling>) => {
    try {
      const updated = { ...styling, ...newStyling };
      setStyling(updated);
      await AsyncStorage.setItem(SUBTITLE_STYLING_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving subtitle styling:', error);
    }
  };

  const resetToDefault = async () => {
    try {
      setStyling(DEFAULT_STYLING);
      await AsyncStorage.setItem(SUBTITLE_STYLING_KEY, JSON.stringify(DEFAULT_STYLING));
    } catch (error) {
      console.error('Error resetting subtitle styling:', error);
    }
  };

  return {
    styling,
    isLoading,
    updateStyling,
    resetToDefault,
  };
};