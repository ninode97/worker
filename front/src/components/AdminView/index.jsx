import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';
import MenuButtons from '../shared/MenuButtons';
import MenuLink from '../shared/MenuLink';
import { logout } from '../../actions/authActions';

const AdminView = props => {
  console.log(props.authReducer.user.role);
  return (
    <MainContainer>
      <div className='admin-menu'>
        <span className='login100-form-title p-b-15'>Admin Menu</span>
        <hr />

        <MenuButtons>
          <MenuLink to='/workers' label='Workers'>
            Workers
          </MenuLink>
          <MenuLink to='/statistics' label='Statistics'>
            Statistics
          </MenuLink>
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
  {},
  logout
)(AdminView);
