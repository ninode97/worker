import { SET_CURRENT_USER, SET_ERROR } from './types';

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  };
}
