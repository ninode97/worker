import React from 'react';
import { Route } from 'react-router';

import App from './App';

import requireAuth from './utils/requireAuth';

export default (
  <Route path='/' component={App}>
    {/* <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new-event" component={requireAuth(NewEventPage)} /> */}
  </Route>
);
