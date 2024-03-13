import React from 'react';

const MovieCardComponent = ({movie}) => {
  const {
    tconst,
    titleType,
    primaryTitle,
    originalTitle,
    isAdult,
    startYear,
    endYear,
    runtimeMinutes,
    genres
  } = movie;

  return (
    <div className="movie-card">
      <h3 className="movie-title">{primaryTitle}</h3>
      <p className="movie-detail"><strong>ID:</strong> {tconst}</p>
      <p className="movie-detail"><strong>Type:</strong> {titleType}</p>
      <p className="movie-detail"><strong>Original Title:</strong> {originalTitle}</p>
      <p className="movie-detail"><strong>Adult Content:</strong> {isAdult ? 'Yes' : 'No'}</p>
      <p className="movie-detail">
        <strong>Year:</strong> {startYear} {endYear !== '\\N' && ` - ${endYear}`}</p>
      <p className="movie-detail"><strong>Runtime:</strong> {runtimeMinutes} minutes</p>
      <p className="movie-detail"><strong>Genres:</strong> {genres.join(', ')}</p>
    </div>
  );
};

export default MovieCardComponent;
