// Home = The screen that lists movies and TV shows with search tool 
// Detail = The screen that shows detailed information about a specific movie or TV show
// Settings = The screen where users can configure app preferences
// Shared = Components that are used across multiple screens

// Home Screen components
export { SkeletonCard } from './Home/SkeletonCard';
export { PosterCard } from './Home/PosterCard';
export { CategoryRow } from './Home/CategoryRow';
export { HeroSection } from './Home/HeroSection';
export { SearchBar } from './Home/SearchBar';
export { TabBar } from './Home/TabBar';
export { Header } from './Home/Header';
export { ScrollToTopButton } from './Home/ScrollToTopButton';

// Detail Screen components
export { DetailHeader } from './Detail/Header';
export { DetailHeroBackdrop } from './Detail/HeroBackdrop';
export { DetailActionButtons } from './Detail/ActionButtons';
export { DetailOverviewSection } from './Detail/OverviewSection';
export { DetailStatsSection } from './Detail/StatsSection';
export { DetailEpisodesSection } from './Detail/EpisodesSection';
export { DetailSeasonPicker } from './Detail/SeasonPicker';
export { DetailCastSection } from './Detail/CastSection';
export { DetailVideosSection } from './Detail/VideosSection';
export { DetailSimilarSection } from './Detail/SimilarSection';
export { DetailShareLinkSection } from './Detail/ShareLinkSection';

// Settings Screen components
export { TokenInput } from './Settings/TokenInput';
export { LanguagePicker } from './Settings/LanguagePicker';
export { LanguageItem } from './Settings/LanguageItem';
export { SettingsFebboxServerItem } from './Settings/FebboxServerItem';
export { SettingsFebboxServerPicker } from './Settings/FebboxServerPicker';
export { SubtitleCustomizerModal } from './Settings/SubtitleCustomizerModal';