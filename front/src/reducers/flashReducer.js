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
    case SHOW_MESSAGE:
      return {
        state
      };
    case REMOVE_MESSAEGE:
      return {
        flashMessage: action.error
      };
    default:
      console.log(`SSSSSSSSSSSSSSSSSSADDDDDDDDDDDDDDDDd`);
      console.log(`NUUU NX~`);
      return state;
  }
};
