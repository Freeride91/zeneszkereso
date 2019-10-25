import axios from 'axios';
import {
    NEW_AD,
    GET_ADS,
    // GET_AD,
    DELETE_AD,
    AD_ERROR,
    link
} from './types';

import { setAlert } from '../actions/alertActions';

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
            type: NEW_AD,
            payload: res.data
        });

        dispatch(setAlert({ msg: 'Hirdetés feladva!' }, 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data, 'danger'));
    }
}

// DELETE AD
export const deleteAd = (ad_Id) => async dispatch => {
    try {

        const res = await axios.delete(link + `api/ads/${ad_Id}`);

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
