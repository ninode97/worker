import React, { useState, useEffect } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {}, [error]);
  const signInHandler = async e => {
    e.preventDefault();

    props.login({ username, password }).then(
      console.log(username),
      // res => window.location.reload(),
      err => {
        console.log(err);
        setError({ error: 'saddly' });
      }
    );
    // axios
    //   .post('http://workero.site/api/auth/signin', {
    //     username: username,
    //     password: password
    //   })
    //   .then(response => {
    //     props.login({});
    //     // localStorage.setItem('accessToken', response.data.accessToken);
    //     // axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    //     //   'accessToken'
    //     // );
    //     setError(null);
    //     window.location.reload();
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       if (err.response.status === 401) {
    //         setError({ error: 'Invalid Credentials' });
    //       } else {
    //         setError({
    //           error:
    //             'Currently, application is not working, try again later... Or conatact administrator!'
    //         });
    //       }
    //     }
    //   });
  };

  return (
    <React.Fragment>
      {error === null ? null : <p style={{ color: 'red' }}>{error.error}</p>}
      <MainContainer>
        <form onSubmit={signInHandler} className='login100-form validate-form'>
          <span className='login100-form-title p-b-26'>Welcome</span>
          <span className='login100-form-title p-b-48'>
            <i className='zmdi zmdi-font'></i>
          </span>

          <div
            className='wrap-input100 validate-input'
            data-validate='Valid email is: a@b.c'
          >
            <input
              autoComplete='true'
              onChange={e => setUsername(e.target.value)}
              className='input100'
              type='text'
              name='username'
            />
            <span className='focus-input100' data-placeholder='username'></span>
          </div>

          <div
            className='wrap-input100 validate-input'
            data-validate='Enter password'
          >
            <span className='btn-show-pass'>
              <i className='zmdi zmdi-eye'></i>
            </span>
            <input
              autoComplete='true'
              onChange={e => setPassword(e.target.value)}
              className='input100'
              type='password'
              name='pass'
            />
            <span className='focus-input100' data-placeholder='Password'></span>
          </div>

          <div className='container-login100-form-btn'>
            <div className='wrap-login100-form-btn'>
              <div className='login100-form-bgbtn'></div>
              <button className='login100-form-btn'>Login</button>
            </div>
          </div>

          <div className='text-center p-t-115'>
            <span className='txt1'>Don’t have an account?</span>

            <a className='txt2' href='/contact'>
              Sign Up
            </a>
          </div>
        </form>
      </MainContainer>
    </React.Fragment>
  );
};

export default connect(
  null,
  { login }
)(LoginForm);
