import { ADD_USER, DELETE_USER, UPDATE_USER, FIND_USER } from './types';
import axios from 'axios';

export async function addUser(user) {
  return axios
    .post('/api/auth/signup', {
      username: 'lukas',
      password: 'lukas',
      role: 'user'
    })
    .then(res => {
      return {
        type: ADD_USER
      };
    })
    .catch(err => alert(err));
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
