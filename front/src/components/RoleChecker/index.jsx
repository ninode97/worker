import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../MainContainer';

const RoleChecker = props => {
  console.log(props.authReducer.user.role);
  return <h1>Hello WOrld!</h1>;
};

const mapStateToProps = store => ({
  authReducer: store.authReducer
});

export default connect(mapStateToProps)(RoleChecker);
