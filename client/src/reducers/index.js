import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adsReducer from './adsReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  ads: adsReducer,
  auth: authReducer,
  alert: alertReducer
});
