import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';

const AdminView = props => {
  console.log(props.authReducer.user.role);
  return (
    <MainContainer>
      <div className='admin-menu'>
        <span className='login100-form-title p-b-26'>Admin Menu</span>
        <button className='login100-form-btn'>Login</button>

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
    </MainContainer>
  );
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(mapStateToProps)(AdminView);
