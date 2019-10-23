import { GET_ERRORS, CLEAR_ERRORS } from '../client/src/actions/types';

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg, 
            status,
            id
        }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}