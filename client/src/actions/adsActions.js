import axios from 'axios';
import {
    ADD_AD,
    GET_ADS,
    GET_AD,
    EDIT_AD,
    DELETE_AD,
    AD_ERROR,
    link
} from './types';

import { setAlert } from '../actions/alertActions';

export const editAd = () => async dispatch => {
    dispatch({
        type: EDIT_AD
    })
}

// GET ALL ADS
export const getAds = () => async dispatch => {
    try {
        const res = await axios.get(link + 'api/ads');

        dispatch({
            type: GET_ADS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AD_ERROR,
            payload: err.response.data
        });
    }
}

//GET AD by ad_Id
export const getAdById = (ad_Id) => async dispatch => {
    try {
        const res = await axios.get(link + `api/ads/${ad_Id}`);

        dispatch({
            type: GET_AD,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AD_ERROR,
            payload: err.response.data
        });
    }
}

//GET ADS BY --USER--
export const getAdsByUser = (userId) => async dispatch => {
    try {
        const res = await axios.get(link + `api/ads/user/${userId}`);
        
        dispatch({
            type: GET_ADS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AD_ERROR,
            payload: err.response.data
        })
    }
}


// CREATE NEW AD
export const newAd = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(link + 'api/ads', formData, config);

        dispatch({
            type: ADD_AD,
            payload: res.data
        });

        dispatch(setAlert({ msg: 'Hirdetés feladva!' }, 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
    }
}

// DELETE AD
export const deleteAd = (ad_Id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const token = localStorage.getItem('token');
    if (token) { config.headers['x-auth-token'] = token; }


    try {

        const res = await axios.delete(link + `api/ads/${ad_Id}`, config);

        dispatch({
            type: DELETE_AD,
            payload: ad_Id
        });

        dispatch(setAlert(res.data, 'warning'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
        console.log('hiba');
    }
}
