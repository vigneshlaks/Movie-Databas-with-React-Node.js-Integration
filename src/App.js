import './App.css';
import React, {useState} from 'react';
import SearchForm from './components/SearchFormComponent.jsx';
import MovieCardComponent from './components/MovieCardComponent';
import axios from 'axios';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  /* Example Movie */
  const movieExample = {
    tconst: "tt0133093",
    titleType: "movie",
    primaryTitle: "The Matrix",
    originalTitle: "The Matrix",
    isAdult: false,
    startYear: "1999",
    endYear: "\\N",
    runtimeMinutes: "136",
    genres: ["Action", "Sci-Fi"]
  };

  const handleSearch = async (searchParams) => {
    /*
    / TODO: Implement the search logic to fetch data from the backend.
    / 1. Use axios to send a GET request to 'http://localhost:8080/query' with 'searchParams' as query parameters.
    / 2. Await the response and limit the displayed results to the first 10 using `.slice(0, 10)`.
    / 3. Update the state with the fetched search results using 'setSearchResults' and clear any existing error messages with 'setError'.
    / 4. Implement error handling: In case of an error (e.g., request failure), update the state to show the error message using 'setError' and clear any existing search results with 'setSearchResults'.
    / Ensure proper error handling to account for scenarios where the error response might not follow a standard structure.
    */
    try {

      const response = await axios.get('http://localhost:8080/query', { params: searchParams });
  

      const limitedResults = response.data.slice(0, 10);
  

      setSearchResults(limitedResults);
      setError(null);
    } catch (error) {

      setError('An error occurred while fetching search results.');
      setSearchResults([]);
    }
  };

  return (
    <div className="page-container">
  <div className="heading">IMDB Movie Search</div>
  <SearchForm onSearch={handleSearch}/>
  {error && <div className="error">{error}</div>}
  <div className="results">
    {/* TODO: Dynamically render the search results using MovieCardComponent */}
    {/* Implement the logic to check if searchResults exists and is not empty. */}
    {/* For each item in searchResults, render a MovieCardComponent. */}
    {/* Assign a unique 'key' to each MovieCardComponent using a unique property from the result, such as 'result.originalTitle'. */}
    {/* Ensure that you pass the entire result item as a prop named 'movie' to each MovieCardComponent. */}
    
    {searchResults && searchResults.length > 0 && searchResults.map(result => {
      return <MovieCardComponent key={result.tconst} movie={result} />;
    })}
  </div>
</div>
  );
}

export default App;
