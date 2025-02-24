import { putt } from "./APIMethods";


export const editPost = async (movie, setMovies, setFilteredMovies, setEditingMovie) => {
  try {
    console.log("Before formatting: ", movie.releasedate, typeof movie.releasedate);

    const formattedMovie = {
      ...movie,
      
    };

    console.log("Formatted movie before API call:", formattedMovie);

    const response = await putt(formattedMovie);

    if (response.status === 200) {
      console.log("API Response:", response.data);

      const updatedMovie = {
        ...response.data,
        
      };

      setMovies((prevMovies) =>
        prevMovies.map((m) => (m.id === movie.id ? updatedMovie : m))
      );

      setFilteredMovies((prevFilteredMovies) =>
        prevFilteredMovies.map((m) => (m.id === movie.id ? updatedMovie : m))
      );

      setEditingMovie(null);
      console.log("Movie updated successfully:", updatedMovie);
    } else {
      throw new Error(`Failed to update movie. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    alert("Failed to update movie. Please try again.");
  }
};



