import { SET_MESSAGE, REMOVE_MESSAEGE, SHOW_MESSAGE } from './types';

export function test(flashMessage) {
  return {
    type: SET_MESSAGE,
    flashMessage
  };
}
export function setMessage(flashMessage) {
  return dispatch => {
    dispatch(test(flashMessage));
  };
}

export function removeMessage(error) {
  return {
    type: REMOVE_MESSAEGE,
    error
  };
}

export function showMessage(error) {
  return {
    type: SHOW_MESSAGE,
    error
  };
}
