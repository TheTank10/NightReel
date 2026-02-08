import axios from 'axios';
import { TMDB_BASE_URL, ITEMS_PER_CATEGORY, TMDB_API_KEY } from '../constants/config';
import { getEndpoints } from '../constants/endpoints';
import { Movie, Category, MediaType } from '../types';
import { ContentDetails, MovieDetails, TVDetails, SeasonDetails } from '../types';

// Create axios instance with Bearer token authentication
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// Helper to filter out invalid items (no poster, no backdrop, people, etc.)
const filterValidItems = (items: any[]): Movie[] => {
  return items
    .filter((item: any) =>
      item.poster_path &&
      item.backdrop_path &&
      (item.media_type === 'movie' || item.media_type === 'tv' || item.title || item.name)
    )
    .slice(0, ITEMS_PER_CATEGORY);
};

// Helper to find best hero item (good backdrop + high rating)
const findBestHeroItem = (items: any[]): Movie | null => {
  // First try: find high-rated item with good images
  const validHero = items.find((item: any) =>
    item.backdrop_path &&
    item.poster_path &&
    item.vote_average > 6 &&
    (item.media_type === 'movie' || item.media_type === 'tv' || item.title || item.name)
  );

  // Fallback: any item with backdrop
  const fallbackHero = items.find((item: any) =>
    item.backdrop_path && item.poster_path
  );

  return validHero || fallbackHero || items[0] || null;
};

/**
 * Fetch all content for a given media type (all, movie, tv)
 * Returns hero item and categories in parallel for best performance
 */
export const fetchContent = async (type: MediaType) => {
  console.log('=== FETCHING PRIORITY CONTENT ===');
  console.log('Media type:', type);

  const config = getEndpoints(type);

  try {
    console.log('>>> Fetching priority items in parallel...');

    const [heroResponse, ...categoryResponses] = await Promise.all([
      tmdbClient.get(config.hero),
      ...config.priority.map(async (endpoint, index) => {
        console.log(`   [${index}] Fetching: ${endpoint.title}...`);
        const response = await tmdbClient.get(endpoint.url);
        console.log(`   ✓ [${index}] ${endpoint.title}: ${response.data.results?.length} items`);
        return response;
      }),
    ]);

    const heroItem = findBestHeroItem(heroResponse.data.results);
    
    const priorityCategories: Category[] = config.priority.map((endpoint, i) => ({
      title: endpoint.title,
      items: filterValidItems(categoryResponses[i].data.results),
      loading: false,
    }));

    // Add lazy category placeholders
    const lazyPlaceholders: Category[] = config.lazy.map((endpoint) => ({
      title: endpoint.title,
      items: [],
      loading: true,  // Mark as loading
    }));

    console.log('✓ Priority content loaded!');
    console.log('Priority categories:', priorityCategories.length);
    console.log('Lazy categories:', lazyPlaceholders.length);

    return {
      heroItem,
      categories: [...priorityCategories, ...lazyPlaceholders],
    };
  } catch (error: unknown) {
    console.error('❌ ERROR LOADING CONTENT:');
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:');
      console.error('  Status:', error.response?.status);
      console.error('  Response data:', JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

/**
 * Fetch lazy-loaded categories
 */
export const fetchLazyCategories = async (type: MediaType): Promise<Category[]> => {
  console.log('=== FETCHING LAZY CATEGORIES ===');
  
  const config = getEndpoints(type);

  try {
    const responses = await Promise.all(
      config.lazy.map(async (endpoint, index) => {
        console.log(`   [lazy-${index}] Fetching: ${endpoint.title}...`);
        const response = await tmdbClient.get(endpoint.url);
        console.log(`   ✓ [lazy-${index}] ${endpoint.title}: ${response.data.results?.length} items`);
        return response;
      })
    );

    const lazyCategories: Category[] = config.lazy.map((endpoint, i) => ({
      title: endpoint.title,
      items: filterValidItems(responses[i].data.results),
      loading: false,
    }));

    console.log('✓ Lazy categories loaded!');
    return lazyCategories;
  } catch (error) {
    console.error('❌ ERROR LOADING LAZY CATEGORIES:', error);
    return [];
  }
};

/**
 * Search for movies and TV shows
 */
export const searchContent = async (query: string): Promise<Movie[]> => {
  console.log('=== SEARCH ===');
  console.log('Query:', query);

  if (!query.trim()) {
    console.log('Empty query, returning empty results');
    return [];
  }

  try {
    console.log('>>> Searching...');
    const response = await tmdbClient.get('/search/multi', {
      params: { query: encodeURIComponent(query) },
    });

    console.log('✓ Search response status:', response.status);
    console.log('✓ Total results:', response.data.results?.length);

    // Filter to only movies and TV shows
    const filtered = response.data.results.filter(
      (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
    );

    console.log('✓ Filtered results (movies/tv only):', filtered.length);

    return filtered;
  } catch (error: unknown) {
    console.error('❌ SEARCH ERROR:');

    if (axios.isAxiosError(error)) {
      console.error('  Status:', error.response?.status);
      console.error('  Response data:', JSON.stringify(error.response?.data, null, 2));
    } else {
      console.error('Error:', error instanceof Error ? error.message : String(error));
    }

    return [];
  }
};

/**
 * Fetch detailed information for a movie or TV show
 * Fetches: details, credits, videos, similar, and recommendations in parallel
 */
export const fetchContentDetails = async (
  id: number,
  mediaType: 'movie' | 'tv'
): Promise<ContentDetails> => {
  console.log('=== FETCHING CONTENT DETAILS ===');
  console.log('ID:', id);
  console.log('Media Type:', mediaType);

  const baseUrl = `/${mediaType}/${id}`;

  try {
    console.log('>>> Fetching all detail data in parallel...');

    const [detailsRes, creditsRes, videosRes, similarRes, recommendationsRes] = await Promise.all([
      tmdbClient.get(baseUrl),
      tmdbClient.get(`${baseUrl}/credits`),
      tmdbClient.get(`${baseUrl}/videos`),
      tmdbClient.get(`${baseUrl}/similar`),
      tmdbClient.get(`${baseUrl}/recommendations`),
    ]);

    console.log('✓ All detail data loaded!');
    console.log('  Cast members:', creditsRes.data.cast?.length);
    console.log('  Videos:', videosRes.data.results?.length);
    console.log('  Similar items:', similarRes.data.results?.length);

    return {
      details: detailsRes.data,
      credits: creditsRes.data,
      videos: videosRes.data,
      similar: similarRes.data,
      recommendations: recommendationsRes.data,
    };
  } catch (error: unknown) {
    console.error('❌ ERROR LOADING DETAILS:');
    if (axios.isAxiosError(error)) {
      console.error('  Status:', error.response?.status);
      console.error('  Response data:', JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

/**
 * Fetch detailed information for a specific season of a TV show
 */
export const fetchSeasonDetails = async (
  tvId: number,
  seasonNumber: number
): Promise<SeasonDetails> => {
  console.log('=== FETCHING SEASON DETAILS ===');
  console.log('TV ID:', tvId);
  console.log('Season:', seasonNumber);

  try {
    const response = await tmdbClient.get(`/tv/${tvId}/season/${seasonNumber}`);
    console.log('✓ Season data loaded!');
    console.log('  Episodes:', response.data.episodes?.length);
    return response.data;
  } catch (error: unknown) {
    console.error('❌ ERROR LOADING SEASON:');
    if (axios.isAxiosError(error)) {
      console.error('  Status:', error.response?.status);
      console.error('  Response data:', JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};