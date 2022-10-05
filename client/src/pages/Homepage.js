import React, { useEffect, useState } from 'react';
// Components
import { Container, Jumbotron } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { Swipeable, direction } from 'react-deck-swiper';
// TMDB API
import { getTrendingMovies } from '../utils/API';
// GraphQL
import { ADD_MOVIE, DISLIKE_MOVIE, LIKE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
// Global State
import { useMovieCentralContext } from "../utils/GlobalState";
import { ADD_TO_MOVIES, UPDATE_CURRENT_USER, UPDATE_MOVIE_PREFERENCES, UPDATE_MOVIES } from '../utils/actions';
// IndexedDB
import { idbPromise } from "../utils/helpers";
import { cleanMovieData } from '../utils/movieData';
// Other Utils
import Auth from '../utils/auth';
import { findIndexByAttr } from '../utils/helpers'

const Homepage = () => {
    const [state, dispatch] = useMovieCentralContext();
    const { movies, likedMovies, dislikedMovies } = state
    const [movieIndex, setMovieIndex] = useState('');
    const [moviesToDisplay, setMoviesToDisplay] = useState(true);
    const [lastSwipe, setLastSwipe] = useState('');
    // GraphQL
    const [addMovie, { addMovieError }] = useMutation(ADD_MOVIE);
    const [dislikeMovie] = useMutation(DISLIKE_MOVIE);
    const [likeMovie] = useMutation(LIKE_MOVIE);
    const { loading, data } = useQuery(GET_USER);