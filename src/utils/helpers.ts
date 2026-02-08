import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from '../constants/config';

/**
 * Get full URL for poster image
 */
export const getPosterUrl = (path: string): string => {
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

/**
 * Get full URL for backdrop image
 */
export const getBackdropUrl = (path: string): string => {
  return `${TMDB_BACKDROP_BASE_URL}${path}`;
};

/**
 * Get display title for movie or TV show
 */
export const getDisplayTitle = (item: { title?: string; name?: string }): string => {
  return item.title || item.name || 'Untitled';
};

/**
 * Format rating to one decimal place
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};