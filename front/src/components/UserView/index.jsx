import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';
import MenuButtons from '../shared/MenuButtons';
import MenuLink from '../shared/MenuLink';
import { logout } from '../../actions/authActions';

const UserView = props => {
  return (
    <MainContainer>
      <div className='user-menu'>
        <span className='login100-form-title p-b-15'>User Menu</span>
        <hr />

        <MenuButtons>
          <MenuLink to='/works'>Works</MenuLink>
          <MenuLink onClick={props.logout} to='/logout' label='Logout'>
            Logout
          </MenuLink>
        </MenuButtons>
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

export default connect(
  mapStateToProps,
  { logout }
)(UserView);
