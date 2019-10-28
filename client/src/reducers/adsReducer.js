import {
    GET_ADS,
    GET_AD,
    EDIT_AD,
    ADD_AD,
    DELETE_AD,
    AD_ERROR,
    FILTER_BY_DATA
} from '../actions/types';

const initialState = {
    ads: [],
    ad: null,
    filteredAds: [],
    filtering: false,
    editing: false,
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
                ad: null,
                filtering: false,
                editing: false,
                loading: false
            }
        case GET_AD:
            return {
                ...state,
                ad: payload,
                loading: false
            }
        case EDIT_AD:
            return {
                ...state,
                editing: true
            }
        case ADD_AD:
            return {
                ...state,
                ads: [payload, ...state.ads],
                filtering: false,
                editing: false,
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
                ad: null,
                filtering: false,
                editing: false,
                loading: false,
            }
        case FILTER_BY_DATA:
            return {
                ...state,
                filteredAds: state.ads.filter(ad => {
                    
                    if (
                        (ad.instrument.toLowerCase().includes(payload.instrument.toLowerCase())) &&
                        (ad.place.toLowerCase().includes(payload.place.toLowerCase()))
                    ) {
                        if (payload.person) {
                            if (ad.pers_or_band === 'person') {
                                return ad;
                            }
                        }
                        if (payload.band) {
                            if (ad.pers_or_band === 'band') {
                                return ad;
                            }
                        }
                        
                    }
                }),
                filtering: true,
                loading: false
            }
        default:
            return state;
    }
}