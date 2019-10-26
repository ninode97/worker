import React from 'react';
import { connect } from 'react-redux';

const AdminView = props => {
  console.log(props.authReducer.user.role);
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100'>
          <div className='login100-form validate-form'>
            <span className='login100-form-title p-b-26'>App Menu</span>
            <button className='login100-form-btn'>Login</button>
            {/* <div
              className='wrap-input100 validate-input'
              data-validate='Valid email is: a@b.c'
            >
              <input
                autoComplete='true'
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
                autoComplete='true'
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
                <button className='login100-form-btn'>Login</button>
              </div>
            </div> */}

            <div className='text-center p-t-115'>
              <span className='txt1'>Found a problem?</span>

              <a
                style={{ color: 'dodgerblue', paddingLeft: '5px' }}
                className='txt2'
                href='/contact'
              >
                Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(mapStateToProps)(AdminView);
