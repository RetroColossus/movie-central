import React, { useEffect, useState } from 'react';
// Components
import { Form, Button, CardColumns, Container, Jumbotron } from 'react-bootstrap';
import MovieCard from '../components/MovieCard'
import { cleanMovieData } from '../utils/movieData';
// TMDB API
import { searchTMDB } from '../utils/API';
// GraphQL
import { ADD_MOVIE, DISLIKE_MOVIE, LIKE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
// Global State
import { useMovieCentralContext } from "../utils/GlobalState";
import { ADD_TO_MOVIES, UPDATE_CURRENT_USER, UPDATE_MOVIE_PREFERENCES } from '../utils/actions';
// IndexedDB
import { idbPromise } from "../utils/helpers";
import { findIndexByAttr } from '../utils/helpers'

