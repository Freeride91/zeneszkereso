import {
    GET_ADS,
    NEW_AD,
    DELETE_AD,
    AD_ERROR
} from '../actions/types';

const initialState = {
    ads: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ADS:
            return {
                ...state,
                ads: payload,
                loading: false
            }
        case NEW_AD:
            return {
                ...state,
                ads: [payload, ...state.ads],
                loading: false
            }
        case DELETE_AD:
            return {
                ...state,
                ads: state.ads.filter(ad => ad._id !== payload),
                loading: false
            }
        case AD_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}