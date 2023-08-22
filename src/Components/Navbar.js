import { useEffect, useState } from "react";

function NavBar({ movies, handleSetMovies, handleSetError, setLoading }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBox
        handleSetMovies={handleSetMovies}
        handleSetError={handleSetError}
        setLoading={setLoading}
      />
      <Stats movies={movies} />
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBox({ handleSetMovies, handleSetError, setLoading }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        handleSetMovies([]);
        handleSetError("");
        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=bf4c2e67&s=${query}`
        );

        if (!resp.ok) {
          throw new Error("⛔Something went wrong with fetching movies...!");
        }

        const data = await resp.json();

        if (data.Response === "False") {
          throw new Error("😔No movies found for the given search...!");
        }
        // console.log(data.Search);
        handleSetMovies(data.Search);
        handleSetError("");
        setLoading(false);
      } catch (err) {
        handleSetError(err.message);
        setLoading(false);
      }
    }
    // if (query.length > 0) getMovies();
    if (query === "") {
      handleSetError("");
    }
    if (query.length <= 1) {
      handleSetMovies([]);
      handleSetError("");
      return;
    }
    getMovies();
  }, [query]);
  return (
    <input
      type="search"
      placeholder="Search Movies..."
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Stats({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}
export default NavBar;
