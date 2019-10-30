import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
  authReducer,
  errorReducer
});
