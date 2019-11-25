import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import adminMenuReducer from './adminMenuReducer';
import flashReducer from './flashReducer';

export const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  adminMenuReducer,
  flashReducer
});
