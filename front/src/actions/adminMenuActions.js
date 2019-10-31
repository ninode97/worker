import { ADD_USER, DELETE_USER, UPDATE_USER, FIND_USER } from './types';
import axios from 'axios';

export function addUser(user) {
  axios
    .post('/api/auth/signup', user)
    .then(res => {
      return {
        type: ADD_USER,
        payload: res
      };
    })
    .catch(err => err.response);
}
export function deleteUser(error) {
  return {
    type: DELETE_USER,
    error
  };
}
export function updateUser(error) {
  return {
    type: UPDATE_USER,
    error
  };
}
export function findUser(error) {
  return {
    type: FIND_USER,
    error
  };
}
