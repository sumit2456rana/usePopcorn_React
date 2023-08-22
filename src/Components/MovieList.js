function MovieList({ movies, setSelectedId }) {
  return (
    <ul className="list">
      {movies?.map((eMovie) => (
        <Movie
          key={eMovie.imdbID}
          eMovie={eMovie}
          setSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
}
function Movie({ eMovie, setSelectedId }) {
  return (
    <li
      className="searched-movies"
      key={eMovie.imdbID}
      onClick={() => setSelectedId(eMovie.imdbID)}
    >
      <img src={eMovie.Poster} alt={eMovie.Title} />
      <h3>{eMovie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{eMovie.Year}</span>
        </p>
      </div>
    </li>
  );
}
export default MovieList;
