import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';
import MenuButtons from '../shared/MenuButtons';
import MenuLink from '../shared/MenuLink';
import { logout } from '../../actions/authActions';
import AdminNavigation from './AdminNavigation';
import SidePress from '../shared/SidePress';
import { Router } from 'react-router-dom';
import history from '../../history';
import AdminRoutes from './AdminRoutes';

const AdminView = props => {
  return (
    <Router history={history}>
      <MainContainer className="wrap-view" navigation={<AdminNavigation />}>
        <div className="admin-menu">
          <span className="login100-form-title p-b-15">Admin Menu</span>
          <hr />
          <SidePress>
            <AdminRoutes />
            {/* <MenuButtons>
              <MenuLink to="/workers" label="Workers">
                Workers
              </MenuLink>
              <MenuLink to="/statistics" label="Statistics">
                Statistics
              </MenuLink>
              <MenuLink onClick={props.logout} to="/logout" label="Logout">
                Logout
              </MenuLink>
            </MenuButtons> */}
            <div className="text-center p-t-115">
              <span className="txt1">Found a problem?</span>
              <a
                style={{ color: 'dodgerblue', paddingLeft: '5px' }}
                className="txt2"
                href="/contact"
              >
                Report
              </a>
            </div>
          </SidePress>
        </div>
      </MainContainer>
    </Router>
  );
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(AdminView);
