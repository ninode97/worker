import React from 'react';
import { connect } from 'react-redux';
import AdminView from '../AdminView';
import UserView from '../UserView';

function reduceView(role) {
  switch (role) {
    case 'admin': {
      return <AdminView />;
    }
    // case 'user': {
    //   return <UserView />;
    // }
    default: {
      console.log('destroy local storage');
      return <h1>Hello World!</h1>;
    }
  }
}

const RoleChecker = props => {
  const { role } = props.authReducer.user;
  let view = reduceView(role);

  return <React.Fragment>{view}</React.Fragment>;
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(mapStateToProps)(RoleChecker);
