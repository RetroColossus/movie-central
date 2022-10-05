// import our actions
import {
    ADD_TO_MOVIES,
    UPDATE_MOVIES,
    UPDATE_CURRENT_USER,
    UPDATE_MOVIE_PREFERENCES
} from '../utils/actions';

// import reducer
import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
const initialState = {
    currentUser: 111,
    likedMovies: [
        {
            "externalMovieId": 1,
            "overview": "This is Grumpy Cat's movie",
            "title": "Grumpy Cat"
        }
    ],
    dislikedMovies: [
        {
            "externalMovieId": 2,
            "title": "The Trial of the Chicago 7",
            "overview": "What was intended to be a peaceful protest at the 1968"

        }
    ],
    movies: [
        {
            "externalMovieId": 3,
            "title": "Love and Monsters",
            "overview": "Seven years after the Monsterpocalypse"
        }
    ]
};