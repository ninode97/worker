import React, { useState } from 'react';
import axios from 'axios';

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
        console.log(response.data);
      })
      .catch(err => {
        // Error
        alert('CATCHED!');
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <div className='limiter'>
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
