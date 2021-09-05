import axios from 'axios';

const TMDB_API_KEY = 'd0bb67e3d918e105eef0dad8f881c208';

export const getTopRatedMovies = async (page = 1) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`,
    );
    return { data: results.data.results, totalPages: results.data.total_pages };
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
    );
    return { data: results.data.results, totalPages: results.data.total_pages };
  } catch (error) {
    console.error(error);
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`,
    );
    return { data: results.data.results, totalPages: results.data.total_pages };
  } catch (error) {
    console.error(error);
  }
};

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`,
    );
    return { data: results.data.results, totalPages: results.data.total_pages };
  } catch (error) {
    console.error(error);
  }
};

export const searchMovies = async (page = 1, query) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&page=${page}&query=${query}`,
    );
    return { data: results.data.results, totalPages: results.data.total_pages };
  } catch (error) {
    console.error(error);
  }
};

export const getMovieDetail = async (movieId) => {
  console.log(movieId);
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`,
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getYoutubeTrailerKey = async (movieId) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`,
    );

    return results.data.results?.[0]?.key;
  } catch (error) {
    console.error(error);
  }
};
