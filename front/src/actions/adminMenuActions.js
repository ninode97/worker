import { ADD_USER, DELETE_USER, UPDATE_USER, FIND_USER } from './types';
import axios from 'axios';

export async function addUser(user) {
  axios
    .post('/api/auth/signup', user)
    .then(res => {
      console.log(res);
    })
    .catch(err => alert(err));

  return 1;
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
