import { ADD_USER, DELETE_USER, UPDATE_USER, FIND_USER } from './types';
import axios from 'axios';

export async function addUser(user) {
  const response = await axios
    .post('/api/auth/signup', user)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => err.response);
  return {
    type: ADD_USER,
    payload: response
  };
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
