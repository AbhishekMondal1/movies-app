import React, { useEffect, useState } from "react";

import Movie from "./components/Movies";

const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=19703903770aeb9c8317e73e02e3db0f&language=en-US&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=19703903770aeb9c8317e73e02e3db0f&query=";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  useEffect(async () => {
   getMovies(FEATURED_API);
  }, []);

const getMovies = (API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results);
    });
}

const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
        getMovies(SEARCH_API+searchTerm);

        setSearchTerm('');
    }

};

const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
}

  return (
    <>
      <header>
          <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="search" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleOnChange}
            />
          </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
