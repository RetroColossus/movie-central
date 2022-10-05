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

    // hook for updating movie preferences
    useEffect(() => {
        // if we're online, use server to update movie preferences
        if (!likedMovies.length && !dislikedMovies.length) {
            if (data && data.me) {
                dispatch({
                    type: UPDATE_CURRENT_USER,
                    userId: data.me._id
                })
                if (data.me.likedMovies.length || !data.me.dislikedMovies.length) {
                    console.log("Online, using data from server to update movie preferences")
                    dispatch({
                        type: UPDATE_MOVIE_PREFERENCES,
                        likedMovies: data.me.likedMovies,
                        dislikedMovies: data.me.dislikedMovies
                    });
                }
            }
            // if we're offline, use idb to update movie preferences
            else if (!loading) {
                idbPromise('likedMovies', 'get').then(likedMovies => {
                    idbPromise('dislikedMovies', 'get').then(dislikedMovies => {
                        if (dislikedMovies.length || likedMovies.length) {
                            console.log("Offline, using data from idb to update movie preferences")
                            dispatch({
                                type: UPDATE_MOVIE_PREFERENCES,
                                likedMovies,
                                dislikedMovies
                            })
                        }
                    })
                })
            }
        }
    }, [data, loading, likedMovies, dislikedMovies, dispatch])
    
    // hook for displaying a movie
    useEffect(() => {
        if (movies.length && movieIndex === '') { // show the next movie
            console.log('There are movies, but no movieIndex. Setting movieIndex')
            // if they're logged in, set it to the first movie they haven't actioned
            if (Auth.loggedIn()){
                for (let i=0; i < movies.length; i++) {
                    const isLiked = likedMovies.some(likedMovie => likedMovie._id === movies[i]._id);
                    const isDisliked = dislikedMovies.some(dislikedMovie => dislikedMovie._id === movies[i]._id);

                    if (!isLiked && !isDisliked && movies[i].trailer) {
                        setMovieIndex(i);
                        setMoviesToDisplay(true);
                        return;
                    }
                }
                setMoviesToDisplay(false);
            }
            // if they're logged in, set it to the first movie in the deck
            else {
                setMovieIndex(0);
            }
        }
    }, [setMovieIndex, dislikedMovies, likedMovies, movies, movieIndex]);
