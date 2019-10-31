import { SHOW_MESSAGE, REMOVE_MESSAEGE, SET_MESSAGE } from '../actions/types';

const initialState = {
  flashMessage: {
    type: '',
    content: ''
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        state
      };
    case REMOVE_MESSAEGE:
      console.log(`SETTING ERROR`);
      return {
        flashMessage: action.error
      };
    case SET_MESSAGE:
      console.log(`SETTING ERROR`);
      return {
        flashMessage: action.error
      };
    default:
      return state;
  }
};
