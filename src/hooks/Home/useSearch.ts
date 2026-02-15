import { useState } from 'react';
import { searchContent } from '../../services/tmdb';
import { SEARCH_DEBOUNCE_DELAY } from '../../constants/config';
import { useDebounce } from './useDebounce';
import { Movie } from '../../types';

/**
 * Hook for managing search state and debounced search
 * 
 * Usage:
 *   const { query, results, isSearching, handleSearch, clearSearch } = useSearch();
 */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = await searchContent(query);
    setSearchResults(results);
  };

  const debouncedSearch = useDebounce(performSearch, SEARCH_DEBOUNCE_DELAY);

  /**
   * Handle search input change
   */
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim()) {
      debouncedSearch(text);
    } else {
      setIsSearching(false);
      setSearchResults([]);
      debouncedSearch.cancel();
    }
  };

  /**
   * Clear search and reset state
   */
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
    debouncedSearch.cancel();
  };

  return {
    query: searchQuery,
    results: searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  };
};