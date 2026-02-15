import { useState, useEffect, useCallback } from 'react';

import { fetchContentDetails } from '../../services/tmdb';
import { ContentDetails } from '../../types';

interface UseContentDetailsReturn {
  details: ContentDetails | null;
  loading: boolean;
  error: boolean;
  loadDetails: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing content details
 */
export const useContentDetails = (
  itemId: number,
  mediaType: 'movie' | 'tv'
): UseContentDetailsReturn => {
  const [details, setDetails] = useState<ContentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchContentDetails(itemId, mediaType);
      setDetails(data);
    } catch (err) {
      console.error('Error loading details:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [itemId, mediaType]);

  useEffect(() => {
    loadDetails();
  }, [itemId, mediaType, loadDetails]);

  return { details, loading, error, loadDetails };
};