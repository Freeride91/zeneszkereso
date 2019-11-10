import axios from 'axios';
import {
    ADD_POST,
    GET_POSTS,
    GET_POST,
    SET_EDIT_POST,
    EDIT_POST,
    DELETE_POST,
    POST_ERROR,
    link
} from './types';

import { setAlert } from './alertActions';

// CREATE NEW POST   -----------------------------
export const newPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = localStorage.getItem('token');
    if (token) { config.headers['x-auth-token'] = token; }

    try {
        const res = await axios.post(link + 'api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert({ msg: 'Hirdetés feladva!' }, 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
    }
}

// GET ALL POSTS   -----------------------------
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get(link + 'api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data
        });
    }
}

//GET POST by post_Id   -----------------------------
export const getPostById = (post_Id) => async dispatch => {
    try {
        const res = await axios.get(link + `api/posts/${post_Id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data
        });
    }
}

//GET POSTS BY --USER-- -----------------------------
export const getPostsByUser = (userId) => async dispatch => {
    try {
        const res = await axios.get(link + `api/posts/user/${userId}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data
        })
    }
}

// DELETE POST   -----------------------------
export const deletePost = (post_Id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = localStorage.getItem('token');
    if (token) { config.headers['x-auth-token'] = token; }


    try {

        const res = await axios.delete(link + `api/posts/${post_Id}`, config);

        dispatch({
            type: DELETE_POST,
            payload: post_Id
        });

        dispatch(setAlert(res.data, 'warning'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
        console.log('hiba');
    }
}

//SET EDITING (what to render, what to show)   --------------
export const setEditPost = (isEditing) => async dispatch => {
    dispatch({
        type: SET_EDIT_POST,
        payload: isEditing
    })
}

//EDIT ONE POST   -----------------------------
export const editPost = (post_Id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const token = localStorage.getItem('token');
    if (token) { config.headers['x-auth-token'] = token; }

    try {
        const res = await axios.post(link + `api/posts/${post_Id}`, formData, config);

        dispatch({
            type: EDIT_POST,
            payload: res.data
        })

        dispatch(setAlert({ msg: 'Módosítás sikeres!' }, 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
    }
}