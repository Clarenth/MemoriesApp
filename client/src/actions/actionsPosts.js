import * as api from '../api/indexApi.js'
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes.js';

//Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);
        dispatch ({ type: FETCH_ALL, payload: data });
        console.log(data)

    } catch(error) {
        console.log(error);
    }

    /*const action = { type: 'FETCH_ALL', payload: [] }
    return dispatch(action);*/
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch ({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
        
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}