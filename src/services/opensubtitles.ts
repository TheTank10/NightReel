import axios from 'axios';
import pako from 'pako';
import { getImdbId } from './tmdb';

const OPENSUBTITLES_API_URL = 'https://rest.opensubtitles.org';
const USER_AGENT = 'LimeTV-v1.0';

// Create axios instance for OpenSubtitles
const subtitlesClient = axios.create({
  baseURL: OPENSUBTITLES_API_URL,
  headers: {
    'X-User-Agent': USER_AGENT,
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
  },
  timeout: 15000,
});

export type SubtitleSortStrategy = 'smart' | 'popular' | 'recent';

interface SubtitleSearchParams {
  tmdbId: number;
  language: string;
  mediaType: 'movie' | 'tv';
  season?: number;
  episode?: number;
  sortBy?: SubtitleSortStrategy;
}

interface OpenSubtitlesResponse {
  SubDownloadLink: string;
  MovieName: string;
  LanguageName: string;
  SubFormat: string;
  SubDownloadsCnt: string;
  SeriesSeason?: string;
  SeriesEpisode?: string;
}

interface SubtitleResult {
  success: boolean;
  srtContent?: string;
  error?: string;
  totalAvailable?: number;
  currentIndex?: number;
  releaseName?: string;
}

/**
 * Search for subtitles on OpenSubtitles
 */
async function searchSubtitles(
  imdbId: string,
  language: string,
  season?: number,
  episode?: number
): Promise<OpenSubtitlesResponse[]> {
  const parts: string[] = [];
  
  const cleanImdbId = imdbId.startsWith('tt') ? imdbId.slice(2) : imdbId;
  
  if (episode !== undefined) {
    parts.push(`episode-${episode}`);
  }
  
  parts.push(`imdbid-${cleanImdbId}`);
  
  if (season !== undefined) {
    parts.push(`season-${season}`);
  }
  
  parts.push(`sublanguageid-${language}`);
  
  const endpoint = `/search/${parts.join('/')}`;
  
  try {
    const response = await subtitlesClient.get(endpoint);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Subtitle search failed:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

function convertAssTimeToSrt(assTime: string): string {
  const parts = assTime.split(':');
  if (parts.length !== 3) return '00:00:00,000';
  
  const hours = parts[0].padStart(2, '0');
  const minutes = parts[1].padStart(2, '0');
  const secondsParts = parts[2].split('.');
  const seconds = secondsParts[0].padStart(2, '0');
  
  // ASS uses centiseconds (1/100), convert to milliseconds
  const centiseconds = secondsParts[1] || '00';
  const milliseconds = (parseInt(centiseconds) * 10).toString().padStart(3, '0');
  
  return `${hours}:${minutes}:${seconds},${milliseconds}`;
}

/**
 * Remove ASS formatting tags from text
 */
function cleanAssText(text: string): string {
  return text
    .replace(/\{[^}]+\}/g, '')      // Remove all {tags}
    .replace(/\\N/g, '\n')           // Convert \N to newlines
    .replace(/\\n/g, '\n')           // Convert \n to newlines
    .replace(/\\h/g, ' ')            // Hard space to regular space
    .trim();
}

/**
 * Convert ASS/SSA format to SRT
 */
function assToSrt(content: string): string {
  const lines = content.split('\n');
  const dialogueLines = lines.filter(line => 
    line.trim().startsWith('Dialogue:')
  );
  
  if (dialogueLines.length === 0) {
    // Not an ASS file or no dialogues found
    return content;
  }
  
  let srtOutput = '';
  let counter = 1;
  
  for (const line of dialogueLines) {
    // ASS Format: Dialogue: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
    const dialoguePart = line.substring(line.indexOf(':') + 1).trim();
    const parts = dialoguePart.split(',');
    
    if (parts.length < 10) continue;
    
    const start = parts[1].trim();
    const end = parts[2].trim();
    
    // Text is everything after the 9th comma
    const textStartIndex = parts.slice(0, 9).join(',').length + 9;
    const text = cleanAssText(dialoguePart.substring(textStartIndex));
    
    if (!text) continue;
    
    srtOutput += `${counter}\n`;
    srtOutput += `${convertAssTimeToSrt(start)} --> ${convertAssTimeToSrt(end)}\n`;
    srtOutput += `${text}\n\n`;
    counter++;
  }
  
  return srtOutput || content;
}

/**
 * Convert subtitle to SRT format if needed
 */
function convertToSrt(content: string, format: string): string {
  const normalizedFormat = format.toLowerCase();
  
  if (normalizedFormat === 'srt') {
    return content;
  }
  
  if (normalizedFormat === 'ass' || normalizedFormat === 'ssa') {
    try {
      console.log(`Converting ${format} to SRT...`);
      return assToSrt(content);
    } catch (error) {
      console.warn(`Failed to convert ${format}:`, error);
      return content;
    }
  }
  
  // For other formats (VTT, etc), return as-is
  // Most video players support VTT natively
  return content;
}

/**
 * Download and decompress subtitle file
 */
async function downloadAndDecompressSubtitle(
  downloadUrl: string,
  format: string
): Promise<string> {
  try {
    const response = await axios.get(downloadUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
    });
    
    const compressed = new Uint8Array(response.data);
    const decompressed = pako.ungzip(compressed);
    
    const textDecoder = new TextDecoder('utf-8');
    const content = textDecoder.decode(decompressed);
    
    const srtContent = convertToSrt(content, format);
    
    return srtContent;
  } catch (error) {
    throw new Error(`Failed to download subtitle: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Score subtitle based on streaming source compatibility
 */
function scoreSubtitleForStreaming(subtitle: OpenSubtitlesResponse): number {
  const name = subtitle.MovieName.toLowerCase();
  let score = 0;
  
  if (name.includes('web-dl')) score += 100;
  if (name.includes('webrip')) score += 90;
  if (name.includes('web.')) score += 85;
  if (name.includes('amzn') || name.includes('nf') || name.includes('dsnp')) score += 80;
  
  if (name.includes('bluray') || name.includes('brrip') || name.includes('bdrip')) score += 70;
  if (name.includes('dvdrip')) score += 60;
  
  if (name.includes('hdtv')) score -= 100;
  
  const downloads = parseInt(subtitle.SubDownloadsCnt) || 0;
  score += Math.min(downloads / 10000, 30);
  
  if (name.includes('.hi.') || name.includes('.cc.')) score += 5;
  
  return score;
}

/**
 * Sort subtitles based on strategy
 */
function sortSubtitles(
  results: OpenSubtitlesResponse[], 
  strategy: SubtitleSortStrategy = 'smart'
): OpenSubtitlesResponse[] {
  const sorted = [...results];
  
  switch (strategy) {
    case 'popular':
      return sorted.sort((a, b) => {
        const downloadsA = parseInt(a.SubDownloadsCnt) || 0;
        const downloadsB = parseInt(b.SubDownloadsCnt) || 0;
        return downloadsB - downloadsA;
      });
      
    case 'recent':
      return sorted;
      
    case 'smart':
    default:
      return sorted.sort((a, b) => {
        const scoreA = scoreSubtitleForStreaming(a);
        const scoreB = scoreSubtitleForStreaming(b);
        return scoreB - scoreA;
      });
  }
}

export async function getSubtitles(
  params: SubtitleSearchParams,
  subtitleIndex: number = 0
): Promise<SubtitleResult> {
  try {
    const { tmdbId, language, mediaType, season, episode, sortBy = 'smart' } = params;
    
    const imdbId = await getImdbId(tmdbId, mediaType);
    
    if (!imdbId) {
      return {
        success: false,
        error: 'Could not find IMDB ID for this title',
      };
    }
    
    const results = await searchSubtitles(imdbId, language, season, episode);
    
    if (results.length === 0) {
      return {
        success: false,
        error: 'No subtitles found for this title',
      };
    }
    
    const sortedResults = sortSubtitles(results, sortBy);
    const actualIndex = Math.min(subtitleIndex, sortedResults.length - 1);
    const selectedSubtitle = sortedResults[actualIndex];
    
    if (!selectedSubtitle.SubDownloadLink) {
      return {
        success: false,
        error: 'No download link available',
      };
    }

    const srtContent = await downloadAndDecompressSubtitle(
      selectedSubtitle.SubDownloadLink,
      selectedSubtitle.SubFormat
    );
    
    return {
      success: true,
      srtContent,
      totalAvailable: sortedResults.length,
      currentIndex: actualIndex,
      releaseName: selectedSubtitle.MovieName,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}