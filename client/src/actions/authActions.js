import axios from 'axios';
import { setAlert } from './alertActions';

import {
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

//CHECK USER - CHECK TOKEN (we call this every time the page loads)
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios.get('api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
      //res.data = user(object) :)
    }))
    .catch(err => {
      // dispatch(setAlert(err.response.data, 'danger'));
      dispatch({ type: AUTH_ERROR });
    })
}

//REGISTER USER
export const register = ({ name, email, password }) => dispatch => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  //request body
  const body = JSON.stringify({ name, email, password })

  axios.post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert({ msg: 'Sikeres regisztráció!' }, 'success'));
    }
    )
    .catch(err => {
      dispatch(setAlert(err.response.data, 'danger'));
      dispatch({
        type: REGISTER_FAIL
      })
    })

}

//LOGIN USER
export const login = ({ email, password }) => async dispatch => {

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  //request body
  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert({ msg: 'Sikeres bejelentkezés!' }, 'success'));

  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.response.data, 'danger'));
    dispatch({ type: LOGIN_FAIL })
  }
}



//LOGOUT USER
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}


// HELPER FUNCTION
// set up config -- headers and TOKEN
// RETURNS this config with TOKEN <- gets it from authReducer state
export const tokenConfig = (getState) => {

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  //get token from authReducer-s token field
  const token = getState().auth.token;
  if (token) { config.headers['x-auth-token'] = token; }

  return config;
}