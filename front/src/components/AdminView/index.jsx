import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';
import { Router } from 'react-router-dom';
import history from '../../history';
import AdminRoutes from './AdminRoutes';
import View from '../View';
import Limiter from '../shared/Limiter';
import Wrapper from '../shared/Wrapper';
import { formatError } from '../../utils/utils';
import FlexColumn from '../shared/FlexColumn';
import Title from '../shared/Title';
import AdminNavigation from './AdminNavigation';
import ScreenContent from '../shared/screens/ScreenContent';

const AdminView = props => {
  return (
    <Router history={history}>
      <Limiter>
        <View>
          <Wrapper style={styles.navigationWrapper}>
            {formatError}
            <FlexColumn>
              <ScreenContent>
                <AdminRoutes />
              </ScreenContent>
            </FlexColumn>
            <AdminNavigation />
          </Wrapper>
        </View>
      </Limiter>
      {/* <MainContainer className="wrap-view" navigation={<AdminNavigation />}>
        <div className="admin-menu">
          <span className="login100-form-title p-b-15">Admin Menu</span>
          <hr />
          <SidePress>
            <AdminRoutes />
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
      </MainContainer> */}
    </Router>
  );
};

const styles = {
  navigationWrapper: {
    padding: '0 0 0 0'
  }
};

const mapStateToProps = store => ({
  authReducer: store.authReducer,
  error: store.errorReducer
});

export default connect(
  mapStateToProps,
  { setError, logout }
)(AdminView);
