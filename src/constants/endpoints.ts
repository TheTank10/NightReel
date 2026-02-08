import { MediaType } from '../types';

export const getEndpoints = (type: MediaType) => {
  const endpoints = {
    all: {
      hero: '/trending/all/day',
      priority: [
        { title: 'Trending Now', url: '/trending/all/day' },
        { title: 'Popular Movies', url: '/movie/popular' },
        { title: 'Popular Shows', url: '/tv/popular' },
      ],
      lazy: [
        { title: 'Top Rated Movies', url: '/movie/top_rated' },
        { title: 'Top Rated Shows', url: '/tv/top_rated' },
        { title: 'Now in Theaters', url: '/movie/now_playing' },
        { title: 'Coming Soon', url: '/movie/upcoming' },
        { title: 'Action & Adventure', url: '/discover/movie?with_genres=28' },
        { title: 'Comedy Hits', url: '/discover/movie?with_genres=35' },
        { title: 'Sci-Fi Worlds', url: '/discover/movie?with_genres=878' },
        { title: 'Horror & Thriller', url: '/discover/movie?with_genres=27' },
        { title: 'Romance & Drama', url: '/discover/movie?with_genres=10749' },
        { title: 'Animated Favorites', url: '/discover/movie?with_genres=16' },
        { title: 'Crime & Mystery', url: '/discover/movie?with_genres=80' },
        { title: 'Fantasy Adventures', url: '/discover/movie?with_genres=14' },
        { title: 'Documentaries', url: '/discover/movie?with_genres=99' },
        { title: 'Family Movies', url: '/discover/movie?with_genres=10751' },
      ],
    },
    movie: {
      hero: '/movie/now_playing',
      priority: [
        { title: 'Now Playing', url: '/movie/now_playing' },
        { title: 'Trending This Week', url: '/trending/movie/week' },
        { title: 'Popular Right Now', url: '/movie/popular' },
      ],
      lazy: [
        { title: 'Top Rated All Time', url: '/movie/top_rated' },
        { title: 'Coming Soon', url: '/movie/upcoming' },
        { title: 'Action Packed', url: '/discover/movie?with_genres=28&sort_by=popularity.desc' },
        { title: 'Laugh Out Loud', url: '/discover/movie?with_genres=35&sort_by=popularity.desc' },
        { title: 'Sci-Fi & Space', url: '/discover/movie?with_genres=878&sort_by=popularity.desc' },
        { title: 'Horror & Suspense', url: '/discover/movie?with_genres=27&sort_by=vote_average.desc' },
        { title: 'Epic Adventures', url: '/discover/movie?with_genres=12&sort_by=popularity.desc' },
        { title: 'Love Stories', url: '/discover/movie?with_genres=10749&sort_by=popularity.desc' },
        { title: 'Crime & Thrillers', url: '/discover/movie?with_genres=80&sort_by=vote_average.desc' },
        { title: 'Mind-Bending Mystery', url: '/discover/movie?with_genres=9648&sort_by=vote_average.desc' },
        { title: 'Animated Worlds', url: '/discover/movie?with_genres=16&sort_by=popularity.desc' },
        { title: 'Fantasy Realms', url: '/discover/movie?with_genres=14&sort_by=popularity.desc' },
        { title: 'Drama & Emotion', url: '/discover/movie?with_genres=18&sort_by=vote_average.desc' },
        { title: 'War & History', url: '/discover/movie?with_genres=10752&sort_by=vote_average.desc' },
        { title: 'Family Fun', url: '/discover/movie?with_genres=10751&sort_by=popularity.desc' },
        { title: 'True Stories', url: '/discover/movie?with_genres=99&sort_by=vote_average.desc' },
        { title: 'Western Classics', url: '/discover/movie?with_genres=37&sort_by=vote_average.desc' },
        { title: 'Music & Musicals', url: '/discover/movie?with_genres=10402&sort_by=popularity.desc' },
      ],
    },
    tv: {
      hero: '/tv/popular',
      priority: [
        { title: 'Trending This Week', url: '/trending/tv/week' },
        { title: 'Popular Shows', url: '/tv/popular' },
        { title: 'Top Rated Series', url: '/tv/top_rated' },
      ],
      lazy: [
        { title: 'Airing Today', url: '/tv/airing_today' },
        { title: 'Currently On Air', url: '/tv/on_the_air' },
        { title: 'Action & Adventure', url: '/discover/tv?with_genres=10759&sort_by=popularity.desc' },
        { title: 'Comedy Central', url: '/discover/tv?with_genres=35&sort_by=popularity.desc' },
        { title: 'Sci-Fi & Fantasy', url: '/discover/tv?with_genres=10765&sort_by=popularity.desc' },
        { title: 'Crime Dramas', url: '/discover/tv?with_genres=80&sort_by=vote_average.desc' },
        { title: 'Mystery & Suspense', url: '/discover/tv?with_genres=9648&sort_by=vote_average.desc' },
        { title: 'Drama Series', url: '/discover/tv?with_genres=18&sort_by=vote_average.desc' },
        { title: 'Animated Shows', url: '/discover/tv?with_genres=16&sort_by=popularity.desc' },
        { title: 'Reality TV', url: '/discover/tv?with_genres=10764&sort_by=popularity.desc' },
        { title: 'Documentaries', url: '/discover/tv?with_genres=99&sort_by=vote_average.desc' },
        { title: 'Family Shows', url: '/discover/tv?with_genres=10751&sort_by=popularity.desc' },
        { title: 'Kids Programs', url: '/discover/tv?with_genres=10762&sort_by=popularity.desc' },
        { title: 'Talk Shows', url: '/discover/tv?with_genres=10767&sort_by=popularity.desc' },
        { title: 'War & Politics', url: '/discover/tv?with_genres=10768&sort_by=vote_average.desc' },
        { title: 'News Programs', url: '/discover/tv?with_genres=10763&sort_by=popularity.desc' },
        { title: 'Soap Operas', url: '/discover/tv?with_genres=10766&sort_by=popularity.desc' },
      ],
    },
  };

  return endpoints[type];
};