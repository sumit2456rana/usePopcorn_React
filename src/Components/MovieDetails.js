import { useEffect, useState } from "react";
import Loader from "./Loader.js";
import Rating from "./Rating.js";
function MovieDetails({ selectedId, setSelectedId, handleSetWatchedMovie }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);
  useEffect(() => {
    async function getDetais() {
      setIsLoading(true);
      const resp = await fetch(
        `https://www.omdbapi.com/?apikey=bf4c2e67&i=${selectedId}`
      );
      const data = await resp.json();
      setDetails(data);
      setIsLoading(false);
    }

    getDetais();
  }, [selectedId]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={details.Poster} alt={details.Title} />

            <div className="details-overview">
              <h2>{details.Title}</h2>
              <p>
                {details.Released} &bull; {details.Runtime}
              </p>
              <p>{details.Genre}</p>
              <p>⭐ {details.imdbRating} IMDb Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              <Rating size={22} maxLength={10} setParentRating={setRating} />
              {rating > 0 ? (
                <button
                  className="btn-add"
                  onClick={() =>
                    handleSetWatchedMovie({ ...details, userRating: rating })
                  }
                >
                  + Add to list
                </button>
              ) : (
                ""
              )}
            </div>

            <p>{details.Plot}</p>
            <p>Staring : {details.Actors}</p>
            <p>Directed by : {details.Director}</p>
          </section>{" "}
        </div>
      )}
    </>
  );
}

export default MovieDetails;
