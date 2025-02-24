    import axios from "axios";


    const api = axios.create({
        baseURL: "https://67a069ed24322f8329c61a32.mockapi.io/api/movie"
    });


    export const post = (movieData) => {
        return api.post('/movies', movieData);
    };


    // export const get = () => {
    //     return api.get("/movies");
    // };

    export const get = (page = 1, limit = 10) => {
        return api.get(`/movies`, { params: { page, limit } });
    };

    export const deleted = (id) => {
        return api.delete(`/movies/${id}`)
    }

    export const putt = (movie) => {
        return api.put(`/movies/${movie.id}`, {
        title: movie.title,
        subject: movie.subject,
        director: movie.director,
        hero: movie.hero,
        moviesName: movie.moviesName,
        releasedate:movie.releasedate,
        });
    };

// https://chatgpt.com/share/67b87262-b5a4-8002-9379-7f44f023a6ce