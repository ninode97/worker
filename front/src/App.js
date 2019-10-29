import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';
import { connect } from 'react-redux';
import RoleChecker from './components/RoleChecker';

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
// export default App;
// const mapStateToProps = state => ({
//   ...state
// });
// const mapDispatchToProps = dispatch => ({
//   simpleAction: () => dispatch(simpleAction())
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
