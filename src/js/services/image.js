const imageBaseURL = 'https://image.tmdb.org/t/p';

export const getPosterImageUrl = (posterImagePath) => {
  return `${imageBaseURL}/w500${posterImagePath}`;
};

export const getBackgroundImageUrl = (backgroundImagePath) => {
  return `${imageBaseURL}/original${backgroundImagePath}`;
};
