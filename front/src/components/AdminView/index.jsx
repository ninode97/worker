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
import AdminNavigation from './AdminNavigation';
import ScreenContent from '../shared/screens/ScreenContent';

const AdminView = props => {
  return (
    <Router history={history}>
      <Limiter>
        <View>
          <Wrapper style={styles.navigationWrapper}>
            {formatError(props.error)}
            <FlexColumn className="screen-nav-separator">
              <ScreenContent>
                <AdminRoutes />
              </ScreenContent>
              <AdminNavigation />
            </FlexColumn>
          </Wrapper>
        </View>
      </Limiter>
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
