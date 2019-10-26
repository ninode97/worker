import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatError(error) {
  if (error) {
    return (
      <div className='login-error'>
        <p className='login-error__message'>{error}</p>
      </div>
    );
  }
  return null;
}
const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInHandler = async e => {
    e.preventDefault();
    axios
      .post('http://workero.site/api/auth/signin', {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem(
          'accessToken'
        );
        setError(null);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            setError({ error: 'Invalid Credentials' });
          } else {
            setError({
              error:
                'Currently, application is not working, try again later... Or conatact administrator!'
            });
          }
        }
      });
  };
  const formatedError = formatError(error);
  return (
    <div className='limiter'>
      {error === null ? null : <p style={{ color: 'red' }}>{error.error}</p>}
      <div className='container-login100'>
        <div className='wrap-login100'>
          <form className='login100-form validate-form'>
            <span className='login100-form-title p-b-26'>Welcome</span>
            <span className='login100-form-title p-b-48'>
              <i className='zmdi zmdi-font'></i>
            </span>

            <div
              className='wrap-input100 validate-input'
              data-validate='Valid email is: a@b.c'
            >
              <input
                onChange={e => setUsername(e.target.value)}
                className='input100'
                type='text'
                name='username'
              />
              <span
                className='focus-input100'
                data-placeholder='username'
              ></span>
            </div>

            <div
              className='wrap-input100 validate-input'
              data-validate='Enter password'
            >
              <span className='btn-show-pass'>
                <i className='zmdi zmdi-eye'></i>
              </span>
              <input
                onChange={e => setPassword(e.target.value)}
                className='input100'
                type='password'
                name='pass'
              />
              <span
                className='focus-input100'
                data-placeholder='Password'
              ></span>
            </div>

            <div className='container-login100-form-btn'>
              <div className='wrap-login100-form-btn'>
                <div className='login100-form-bgbtn'></div>
                <button onClick={signInHandler} className='login100-form-btn'>
                  Login
                </button>
              </div>
            </div>

            <div className='text-center p-t-115'>
              <span className='txt1'>Don’t have an account?</span>

              <a className='txt2' href='#'>
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
