import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';
import MenuButton from '../shared/MenuButton';

const AdminView = props => {
  console.log(props.authReducer.user.role);
  return (
    <MainContainer>
      <div className='admin-menu'>
        <span className='login100-form-title p-b-26'>Admin Menu</span>
        <form className='login100-form validate-form'>
          <MenuButton>Workers</MenuButton>
          <MenuButton>Workers</MenuButton>
          <MenuButton>Workers</MenuButton>
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
        </form>
      </div>
    </MainContainer>
  );
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(mapStateToProps)(AdminView);
