import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();















// import React, { useState, useEffect } from 'react';
// import { Container, TextField, Card, CardContent, Typography, CircularProgress } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import { get } from '../../APIs/APIMethods';

// function Getapi() {
//     const [movies, setMovies] = useState([]);
//     const [filteredMovies, setFilteredMovies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true); // Loading state to track data fetch status
//     const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing

//     // Fetch movie data from API
//     useEffect(() => {
//         get()
//             .then((response) => {
//                 const movieData = response.data; // Extract movies from the 'data' field
//                 if (Array.isArray(movieData)) {
//                     setMovies(movieData);
//                     setFilteredMovies(movieData); // Initially display all movies
//                 } else {
//                     console.error('Fetched data is not an array:', movieData);
//                 }
//             })
//             .catch((error) => console.error('Error fetching data:', error))
//             .finally(() => setLoading(false)); // Set loading to false
//     }, []);

//     // Debounced search handler
//     const handleSearch = (event) => {
//         const query = event.target.value;
//         setSearchTerm(query);

//         // Clear the previous timeout to avoid making requests on each keystroke
//         if (debounceTimeout) {
//             clearTimeout(debounceTimeout);
//         }

//         // Set a new timeout for the debounce effect
//         const timeoutId = setTimeout(() => {
//             performSearch(query); // Perform the search after the delay
//         }, 500); // 500ms debounce time

//         setDebounceTimeout(timeoutId); // Store the timeout ID for clearing it later
//     };

//     // Perform the actual search/filter operation
//     const performSearch = (query) => {
//         const searchQuery = query.toLowerCase();
        
//         // Define the fields you want to search by
//         const searchFields = ['title', 'subject', 'director', 'hero'];

//         // Filter the movies based on the search query
//         const filteredData = movies.filter((movie) =>
//             searchFields.some((field) =>
//                 movie[field].toLowerCase().includes(searchQuery)
//             )
//         );

//         setFilteredMovies(filteredData);
//     };

//     return (
//         <Container maxWidth="lg" style={{ marginTop: '20px' }}>
//             <h1>Movie List</h1>
//             <TextField
//                 label="Search Movie"
//                 variant="outlined"
//                 fullWidth
//                 value={searchTerm}
//                 onChange={handleSearch} // Trigger search on input change
//                 style={{ marginBottom: '20px' }}
//             />

//             {/* Show loading spinner while fetching data */}
//             {loading ? (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                     <CircularProgress />
//                 </div>
//             ) : (
//                 <Grid container spacing={3}>
//                     {filteredMovies.length > 0 ? (
//                         filteredMovies.map((movie) => (
//                             <Grid key={movie.id} size={{ sx: 12, md: 4, sm: 6 }}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="h6" component="div">
//                                             {movie.moviesName}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             <strong>Title:</strong> {movie.title}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             <strong>Subject:</strong> {movie.subject}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             <strong>Director:</strong> {movie.director}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             <strong>Hero:</strong> {movie.hero}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))
//                     ) : (
//                         <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
//                             No movies found
//                         </Typography>
//                     )}
//                 </Grid>
//             )}
//         </Container>
//     );
// }

// export default Getapi;

