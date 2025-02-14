import { putt } from "./APIMethods";


export const editPost = (movie, setMovies, setFilteredMovies, setEditingMovie) => {
  putt(movie)
    .then((response) => {
      setMovies((prevMovies) =>
        prevMovies.map((m) => (m.id === movie.id ? { ...m, ...response.data } : m))
      );
      setFilteredMovies((prevFilteredMovies) =>
        prevFilteredMovies.map((m) => (m.id === movie.id ? { ...m, ...response.data } : m))
      );
      setEditingMovie(null);
    })
    .catch((error) => console.error("Error updating movie:", error));
};


