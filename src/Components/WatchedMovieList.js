function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li>
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⌛</span>
              <span>{movie.Runtime}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default WatchedMovieList;
