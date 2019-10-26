import React from 'react';
import LoginForm from './components/LoginForm';
import { Router } from 'react-router-dom';
import history from './history';
import './App.css';
import { connect } from 'react-redux';

const App = () => {
  return (
    <Router history={history}>
      <div className='App'>
        {localStorage.getItem('jwtToken') === null ? (
          <LoginForm />
        ) : (
          <div>PROTECTED ROUTE</div>
        )}
      </div>
    </Router>
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
