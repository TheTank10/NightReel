import { useState, useEffect, useCallback } from 'react';

import { fetchSeasonDetails } from '../../services/tmdb';
import { SeasonDetails } from '../../types';

interface UseSeasonDataReturn {
  selectedSeason: number;
  seasonData: SeasonDetails | null;
  loadingSeason: boolean;
  showSeasonPicker: boolean;
  setSelectedSeason: (season: number) => void;
  setShowSeasonPicker: (show: boolean) => void;
}

/**
 * Custom hook for managing TV show season data
 */
export const useSeasonData = (
  showId: number,
  isTVShow: boolean,
  hasDetails: boolean
): UseSeasonDataReturn => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState<SeasonDetails | null>(null);
  const [loadingSeason, setLoadingSeason] = useState(false);
  const [showSeasonPicker, setShowSeasonPicker] = useState(false);

  const loadSeasonData = useCallback(async (seasonNumber: number) => {
    try {
      setLoadingSeason(true);
      const data = await fetchSeasonDetails(showId, seasonNumber);
      setSeasonData(data);
    } catch (err) {
      console.error('Error loading season data:', err);
    } finally {
      setLoadingSeason(false);
    }
  }, [showId]);

  useEffect(() => {
    if (hasDetails && isTVShow) {
      loadSeasonData(selectedSeason);
    }
  }, [selectedSeason, hasDetails, isTVShow, loadSeasonData]);

  return {
    selectedSeason,
    seasonData,
    loadingSeason,
    showSeasonPicker,
    setSelectedSeason,
    setShowSeasonPicker,
  };
};