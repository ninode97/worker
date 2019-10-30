import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { decodeJwtToken } from '../utils/decodeJwtToken';
import { SET_CURRENT_USER } from './types';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  console.log('CALLED');
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  console.log(`nun x`);
  return dispatch => {
    return axios.post('/api/auth/signin', data).then(res => {
      const token = res.data.accessToken;
      console.log(token);
      console.log(token);
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const decodedToken = jwtDecode(token);

      dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    });
  };
}
