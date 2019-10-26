import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

import './App.css';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <LoginForm />
      </div>
    );
  }
}

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
