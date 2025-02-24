import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  TextField,
  Card,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { get } from "../APIs/APIMethods";
import { deletePost } from "../APIs/DeleteApi";
import { PostApi } from "../APIs/PostApi";
import { editPost } from "../APIs/PutApi";

function Mail() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // Lazy loading state
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [hasMore, setHasMore] = useState(true);

  // State for new movie form
  const [newMovie, setNewMovie] = useState({
    title: "",
    subject: "",
    director: "",
    hero: "",
    moviesName: "",
    releasedate: "",
  });

  // Fetch movies on page change (lazy loading)
  useEffect(() => {
    get(page)
      .then((response) => {
        const movieData = response.data.map((movie) => ({
          ...movie,
          releasedate: movie.releasedate
            ? new Date(movie.releasedate).toISOString().split("T")[0]
            : "",
        }));

        if (Array.isArray(movieData) && movieData.length > 0) {
          setMovies((prevMovies) => {
            const uniqueMovies = [
              ...prevMovies,
              ...movieData.filter((movie) =>
                !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
              ),
            ];
            return uniqueMovies;
          });

          setFilteredMovies((prevFilteredMovies) => {
            const uniqueFiltered = [
              ...prevFilteredMovies,
              ...movieData.filter((movie) =>
                !prevFilteredMovies.some((prevMovie) => prevMovie.id === movie.id)
              ),
            ];
            return uniqueFiltered;
          });

        } else {
          setHasMore(false);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [page]);


  // Intersection Observer for lazy loading
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
          }, 1000); // 3-second delay
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 500);

    setDebounceTimeout(timeoutId);
  };

  const performSearch = (query) => {
    const searchQuery = query.toLowerCase();
    const searchFields = ["title", "subject", "director", "hero", "releasedate"];

    const filteredData = movies.filter((movie) =>
      searchFields.some((field) => movie[field].toLowerCase().includes(searchQuery))
    );

    setFilteredMovies(filteredData);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG and JPG images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than or equal to 5 MB.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleAddOrUpdateMovie = (event) => {
    event.preventDefault();

    const formattedMovie = {
      ...newMovie,
    };

    if (editingMovie) {
      editPost(formattedMovie, setMovies, setFilteredMovies, setEditingMovie);
    } else {
      PostApi(formattedMovie, setMovies, setFilteredMovies);
    }

    setNewMovie({
      title: "",
      subject: "",
      director: "",
      hero: "",
      moviesName: "",
      releasedate: "",
    });
    setEditingMovie(null);
  };

  const handleEditClick = (movie) => {
    setNewMovie({
      ...movie,
    });
    setEditingMovie(movie);
  };

  const handleCancelEdit = () => {
    setNewMovie({
      title: "",
      subject: "",
      director: "",
      hero: "",
      moviesName: "",
      releasedate: "",
    });
    setEditingMovie(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movie List
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Movie"
        variant="outlined"
        fullWidth
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      {/* File Upload Input */}
      <Box sx={{ mb: 3 }}>
        <Button variant="outlined" component="label" fullWidth>
          Upload Background Image
          <input
            hidden
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileUpload}
          />
        </Button>
      </Box>

      {/* Form */}
      <form onSubmit={handleAddOrUpdateMovie}>
        <Grid container spacing={2} mb={1} justifyContent="center" alignItems="center">
          <TextField
            label="Title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Subject"
            name="subject"
            value={newMovie.subject}
            onChange={handleInputChange}
          />
          <TextField
            label="Director"
            name="director"
            value={newMovie.director}
            onChange={handleInputChange}
          />
          <TextField
            label="Hero"
            name="hero"
            value={newMovie.hero}
            onChange={handleInputChange}
          />
          <TextField
            label="Movies Name"
            name="moviesName"
            value={newMovie.moviesName}
            onChange={handleInputChange}
          />
          <TextField
            label="Release Date"
            type="date"
            name="releasedate"
            value={newMovie.releasedate || ""}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <Button type="submit" variant="contained">
            {editingMovie ? "Update" : "Add Movie"}
          </Button>
          {editingMovie && (
            <Button onClick={handleCancelEdit} variant="outlined">
              Cancel
            </Button>
          )}
        </Grid>
      </form>

      {loading && page === 1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => {
              // Attach the ref to the last movie element for lazy loading
              if (filteredMovies.length === index + 1) {
                return (
                  <Grid
                    key={movie.id}
                    size={{ sx: 12, md: 4, sm: 12 }}
                    ref={lastMovieElementRef}
                  >
                    <Box
                      sx={{
                        perspective: "1000px",
                        width: "100%",
                        height: 250,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          transformStyle: "preserve-3d",
                          transition: "transform 0.6s",
                          position: "relative",
                          borderRadius: 2,
                          "&:hover": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        {/* Front Side */}
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: backgroundImage
                              ? `url(${backgroundImage})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: backgroundImage ? "#ffffff" : "#ddd",
                            color: "0d0c0c",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6">
                            {movie.moviesName}
                          </Typography>
                        </Card>

                        {/* Back Side */}
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            transform: "rotateY(180deg)",
                            textAlign: "center",
                            p: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            <strong>Title:</strong> {movie.title}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Subject:</strong> {movie.subject}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Director:</strong> {movie.director}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Hero:</strong> {movie.hero}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Release Date:</strong>{" "}
                            {formatDate(movie.releasedate)}
                          </Typography>

                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Button
                              onClick={() =>
                                deletePost(
                                  movie.id,
                                  setMovies,
                                  setFilteredMovies,
                                  setIsDeleted
                                )
                              }
                            >
                              Delete
                            </Button>
                            <Button onClick={() => handleEditClick(movie)}>
                              Edit
                            </Button>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                );
              } else {
                return (
                  <Grid key={movie.id} size={{ sx: 12, md: 4, sm: 12 }}>
                    <Box
                      sx={{
                        perspective: "1000px",
                        width: "100%",
                        height: 250,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          transformStyle: "preserve-3d",
                          transition: "transform 0.6s",
                          position: "relative",
                          borderRadius: 2,
                          "&:hover": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        {/* Front Side */}
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: backgroundImage
                              ? `url(${backgroundImage})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: backgroundImage ? "#ffffff" : "#ddd",
                            color: "0d0c0c",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="h6">
                            {movie.moviesName}
                          </Typography>
                        </Card>

                        {/* Back Side */}
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            transform: "rotateY(180deg)",
                            textAlign: "center",
                            p: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            <strong>Title:</strong> {movie.title}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Subject:</strong> {movie.subject}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Director:</strong> {movie.director}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Hero:</strong> {movie.hero}
                          </Typography>
                          <Typography variant="subtitle1">
                            <strong>Release Date:</strong>{" "}
                            {formatDate(movie.releasedate)}
                          </Typography>

                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Button
                              onClick={() =>
                                deletePost(
                                  movie.id,
                                  setMovies,
                                  setFilteredMovies,
                                  setIsDeleted
                                )
                              }
                            >
                              Delete
                            </Button>
                            <Button onClick={() => handleEditClick(movie)}>
                              Edit
                            </Button>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                );
              }
            })
          ) : (
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No movies found
            </Typography>
          )}
          {/* Show loading indicator on lazy loading more pages */}
          {loading && page > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
              <Typography>Loading.....</Typography>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Mail;