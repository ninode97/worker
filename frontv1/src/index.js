import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken && localStorage.jwtToken !== undefined) {
  const decodedToken = jwtDecode(localStorage.jwtToken);
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
