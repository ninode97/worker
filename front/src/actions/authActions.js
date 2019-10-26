import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { decodeJwtToken } from '../utils/decodeJwtToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth/signin', data).then(res => {
      localStorage.setItem('jwtToken', res.data.accessToken);
      setAuthorizationToken(res.data.accessToken);
      const decodedUser = decodeJwtToken();
      dispatch(
        setCurrentUser({
          username: decodedUser.username,
          role: decodedUser.role
        })
      );
    });
  };
}
