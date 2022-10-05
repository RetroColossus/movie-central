import React, { useEffect } from 'react';
// Components
import { Jumbotron, CardColumns, Container } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
// GraphQL
import { DISLIKE_MOVIE, LIKE_MOVIE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
// Global State
import { useMovieCentralContext } from "../utils/GlobalState";
import { UPDATE_CURRENT_USER, UPDATE_MOVIE_PREFERENCES } from '../utils/actions';
// IDB
import { idbPromise } from "../utils/helpers";
import { findIndexByAttr } from '../utils/helpers'