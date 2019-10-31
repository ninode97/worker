import { SHOW_MESSAGE, REMOVE_MESSAEGE, SET_MESSAGE } from '../actions/types';

const initialState = {
  flashMessage: {
    type: '',
    content: ''
  }
};

export default (state = initialState, action = {}) => {
  console.log(action.type);
  console.log(`REDUCER`);
  switch (action.type) {
    case SET_MESSAGE:
      console.log('REDUCER SET MESSAGE');
      console.log(action.payload);
      return {
        flashMessage: action.flashMessage
      };
    case SHOW_MESSAGE:
      return {
        state
      };
    case REMOVE_MESSAEGE:
      return {
        flashMessage: action.error
      };
    default:
      return state;
  }
};
