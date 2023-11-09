//import postStyles from "../components/Posts/Post/postStyles";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes.js';

export default (state = [], action) => { //reducersPosts = [] became state
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numOfPages: action.payload.numOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, postMessage: action.payload };
        case CREATE: 
            return [...state, action.payload];
        case UPDATE: 
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        default: 
            return state;
    }
};