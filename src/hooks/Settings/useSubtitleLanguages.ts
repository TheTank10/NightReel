import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SubtitleLanguage } from '../../types';

const LANGUAGES_STORAGE_KEY = '@subtitle_languages';

export const useSubtitleLanguages = () => {
  const [languages, setLanguages] = useState<SubtitleLanguage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLanguages = async () => {
    try {
      const stored = await AsyncStorage.getItem(LANGUAGES_STORAGE_KEY);
      if (stored) {
        const savedLanguages: SubtitleLanguage[] = JSON.parse(stored);
        setLanguages(savedLanguages);
      }
    } catch (error) {
      console.error('Error loading languages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLanguages = useCallback(async () => {
    try {
      await AsyncStorage.setItem(LANGUAGES_STORAGE_KEY, JSON.stringify(languages));
    } catch (error) {
      console.error('Error saving languages:', error);
    }
  }, [languages]);

  const addLanguage = (language: SubtitleLanguage) => {
    // Check if language already exists
    if (!languages.find(l => l.code === language.code)) {
      setLanguages([...languages, language]);
    }
  };

  const removeLanguage = (code: string) => {
    setLanguages(languages.filter(l => l.code !== code));
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveLanguages();
    }
  }, [languages, isLoading, saveLanguages]);

  return {
    languages,
    isLoading,
    addLanguage,
    removeLanguage,
  };
};