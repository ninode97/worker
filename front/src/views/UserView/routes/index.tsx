import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import UserMain from '../screens/UserMain';

const Test: React.FC = () => <h1>Hello World!</h1>;

const UserRoutes: React.FC = () => {
  return (
    <Fragment>
      <Route exact path="/" component={UserMain} />
      <Route exact path="/1" component={Test} />
    </Fragment>
  );
};

export default UserRoutes;
