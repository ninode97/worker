import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import RoleChecker from './components/RoleChecker';
import LoginForm from './components/LoginForm';

const App = props => {
  console.log(props.authReducer);

  return (
    <div className="App">
      {localStorage.getItem('jwtToken') === null ? (
        <LoginForm />
      ) : (
        <RoleChecker />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  const { authReducer } = state;
  return { authReducer: authReducer };
}

export default connect(mapStateToProps)(App);
