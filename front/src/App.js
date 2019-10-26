import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      {localStorage.getItem('accessToken') === null ? (
        <LoginForm />
      ) : (
        <div>PROTECTED ROUTE</div>
      )}
    </div>
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
