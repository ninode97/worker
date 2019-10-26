import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
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
      const token = res.data.accessToken;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const decodedUser = jwtDecode(token);
      dispatch(
        setCurrentUser({
          username: decodedUser.username,
          role: decodedUser.role
        })
      );
    });
  };
}
