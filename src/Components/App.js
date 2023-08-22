import "../Styles/styles.css";
import Navbar from "./Navbar.js";
import Box from "./Box";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import Summary from "./Summay";
import WatchedMovieList from "./WatchedMovieList";
import ErrorComponent from "./ErrorComponent.js";
import MovieDetails from "./MovieDetails.js";
import Loader from "./Loader.js";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
//   }
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9
//   }
// ];
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function handleSetMovies(moviesResp) {
    setMovies(moviesResp);
  }
  function handleSetLoaing(val) {
    setLoading(val);
  }
  function handleSetError(error) {
    setError(error);
  }
  function handleSetId(id) {
    // setSelectedId(id);
    setSelectedId((prev) => (prev === id ? null : id));
  }
  function handleSetWatchedMovie(movie) {
    setWatched([...watched, movie]);
  }
  return (
    <div className="App">
      <Navbar
        movies={movies}
        handleSetMovies={handleSetMovies}
        handleSetError={handleSetError}
        setLoading={handleSetLoaing}
      />
      <main className="main">
        <Box>
          {loading && <Loader />}
          {!loading && !error ? (
            <MovieList movies={movies} setSelectedId={handleSetId} />
          ) : null}
          {error && <ErrorComponent error={error} />}
          {/* {error ? <ErrorComponent error={error}/> : <MovieList movies={movies} />} */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              setSelectedId={handleSetId}
              handleSetWatchedMovie={handleSetWatchedMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </main>
    </div>
  );
}
