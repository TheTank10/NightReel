import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@febbox_4k_enabled';

export const useFebBox4K = () => {
  const [is4KEnabled, setIs4KEnabled] = useState(true); // Default: ON
  const [isLoading, setIsLoading] = useState(true);

  const loadSetting = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setIs4KEnabled(JSON.parse(stored));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading 4K setting:', error);
      setIsLoading(false);
    }
  };

  const saveSetting = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(is4KEnabled));
    } catch (error) {
      console.error('Error saving 4K setting:', error);
    }
  }, [is4KEnabled]);

  const toggle4K = () => {
    setIs4KEnabled(prev => !prev);
  };

  useEffect(() => {
    loadSetting();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveSetting();
    }
  }, [is4KEnabled, isLoading, saveSetting]);

  return {
    is4KEnabled,
    isLoading,
    toggle4K,
  };
};