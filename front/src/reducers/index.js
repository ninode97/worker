import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import adminMenuReducer from './adminMenuReducer';

export const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  adminMenuReducer
});
