import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@febbox_4k_enabled';

export const useFebBox4K = () => {
  const [is4KEnabled, setIs4KEnabled] = useState(true); // Default: ON
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSetting();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveSetting();
    }
  }, [is4KEnabled, isLoading]);

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

  const saveSetting = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(is4KEnabled));
    } catch (error) {
      console.error('Error saving 4K setting:', error);
    }
  };

  const toggle4K = () => {
    setIs4KEnabled(prev => !prev);
  };

  return {
    is4KEnabled,
    isLoading,
    toggle4K,
  };
};