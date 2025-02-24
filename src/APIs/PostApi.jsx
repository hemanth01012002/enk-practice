import { post } from './APIMethods';

export const PostApi = async (newMovie, setMovies, setFilteredMovies) => {
    try {
        const formattedMovie = {
            ...newMovie,
           
        };

        const response = await post(formattedMovie);

        if (response.status === 201) {
            const createdMovie = {
                ...response.data,
                
            };

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
