import { SET_MESSAGE, REMOVE_MESSAEGE, SHOW_MESSAGE } from './types';

export function setMessage(flashMessage) {
  return {
    type: SET_MESSAGE,
    flashMessage
  };
}
