import { SET_ALERT, REMOVE_ALERT, HIDE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case HIDE_ALERT:
            return state.map(alert => {
                if(alert.id === action.payload) {
                    alert.display = false;
                }
                return alert;
            })
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}

