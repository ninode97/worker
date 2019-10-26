import jwtDecode from 'jwt-decode';
export function decodeJwtToken() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return jwtDecode(token);
  }

  return {};
}
