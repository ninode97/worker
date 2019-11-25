import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  FIND_USER
} from '../actions/types';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_USER:
      // console.log(`GETTING ERROR`);
      return {
        state
      };
    case DELETE_USER:
      console.log(`SETTING ERROR`);
      return {
        error: action.error
      };
    case UPDATE_USER:
      console.log(`SETTING ERROR`);
      return {
        error: action.error
      };
    case FIND_USER:
      console.log(`SETTING ERROR`);
      return {
        error: action.error
      };
    default:
      return state;
  }
};
