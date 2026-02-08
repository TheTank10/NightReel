import { ContentDetails, Video } from '../types';

/**
 * Extract year from release date or first air date
 */
export const getYear = (details: ContentDetails | null): string => {
  if (!details) return '';
  const date =
    'release_date' in details.details
      ? details.details.release_date
      : details.details.first_air_date;
  return date ? new Date(date).getFullYear().toString() : '';
};

/**
 * Format runtime for movies or TV shows
 */
export const getRuntime = (details: ContentDetails | null): string => {
  if (!details) return '';
  if ('runtime' in details.details) {
    const minutes = details.details.runtime;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  } else if (details.details.episode_run_time?.length > 0) {
    return `${details.details.episode_run_time[0]}m per episode`;
  }
  return '';
};

/**
 * Get comma-separated genre names
 */
export const getGenres = (details: ContentDetails | null): string => {
  if (!details) return '';
  return details.details.genres.map((g) => g.name).join(', ');
};

/**
 * Format vote average rating
 */
export const getRating = (voteAverage: number | undefined): string => {
  return voteAverage ? voteAverage.toFixed(1) : 'N/A';
};

/**
 * Filter and get trailers from videos
 */
export const getTrailers = (details: ContentDetails | null): Video[] => {
  if (!details?.videos?.results) return [];
  return details.videos.results.filter(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
};

/**
 * Combine and filter similar content and recommendations
 */
export const getSimilarContent = (details: ContentDetails | null): any[] => {
  if (!details) return [];
  const combined = [
    ...(details.similar?.results || []),
    ...(details.recommendations?.results || []),
  ];
  return combined.filter((item) => item.poster_path).slice(0, 20);
};