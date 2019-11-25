import { SHOW_MESSAGE, REMOVE_MESSAEGE, SET_MESSAGE } from '../actions/types';

const initialState = {
  flashMessage: {
    type: '',
    content: ''
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        flashMessage: action.flashMessage
      };
    default:
      return state;
  }
};
