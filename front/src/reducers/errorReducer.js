import { SET_ERROR, GET_ERROR } from '../actions/types';

const initialState = {
  error: 'saddsadads'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ERROR:
      // console.log(`GETTING ERROR`);
      return {
        state
      };
    case SET_ERROR:
      console.log(`SETTING ERROR`);
      return {
        error: action.error
      };
    default:
      return state;
  }
};
