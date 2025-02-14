import { post } from './APIMethods';

export const PostApi = async (newMovie, setMovies, setFilteredMovies) => {
    try {
        const response = await post(newMovie);

        if (response.status === 201) {
            const createdMovie = response.data;

            // Add the newly added movie to the state
            setMovies((prevMovies) => [...prevMovies, createdMovie]);
            setFilteredMovies((prevFilteredMovies) => [...prevFilteredMovies, createdMovie]);

            console.log(`Post with ID ${createdMovie.id} added successfully`);
        } else {
            throw new Error('Failed to add the movie');
        }
    } catch (error) {
        console.error('Failed adding movie', error);
    }
};