import React, { createContext, useContext } from "react";
import { useMovieReducer } from './reducers';

const MovieCentralContext = createContext();
const { Provider } = MovieCentralContext;

const MovieCentralProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMovieReducer({
      likedMovies: [],  // array of movies that were liked
      dislikedMovies: [],  // array of movies that were disliked
      movies: [],  // array of all movies
      currentUser: ''  // current user's username
    });
    // console.log({state}); // comment this in to test!
    return <Provider value={[state, dispatch]} {...props} />;
  };

const useMovieCentralContext = () => {
    return useContext(MovieCentralContext);
};

export { MovieCentralProvider, useMovieCentralContext };
