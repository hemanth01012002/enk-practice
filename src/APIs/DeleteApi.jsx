import { deleted } from './APIMethods';

export const deletePost = async (id, setMovies, setFilteredMovies, setIsDeleted) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie? ');
    

    if (!confirmDelete) {
        console.log('Delete operation canceled');
        return; 
    }
    try {
        // Calling the API to delete the movie by ID
        const response = await deleted(id);

        if (response.status === 200) {
            //  delete is successful add it will update the local state
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
            setFilteredMovies((prevFilteredMovies) =>
                prevFilteredMovies.filter((movie) => movie.id !== id)
            );

            console.log(`Post with ID ${id} deleted successfully`);
            setIsDeleted((prev) => !prev);
        } else {
            throw new Error('Failed to delete the post');
        }
    } catch (error) {
        console.error('Failed deleting post', error);
    }
};
