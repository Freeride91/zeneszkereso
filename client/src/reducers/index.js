import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  posts: postsReducer,
  auth: authReducer,
  alert: alertReducer
});
