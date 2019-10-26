import React from 'react';
import LoginForm from './components/LoginForm';
import { Router } from 'react-router-dom';
import history from './history';
import './App.css';

const App = () => {
  return (
    <Router history={history}>
      <div className='App'>
        {localStorage.getItem('accessToken') === null ? (
          <LoginForm />
        ) : (
          <div>PROTECTED ROUTE</div>
        )}
      </div>
    </Router>
  );
};
export default App;
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
