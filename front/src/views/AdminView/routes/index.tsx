import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AdminMain from '../screens/AdminMain';

const Test: React.FC = () => <h1>Hello World!</h1>;

const AdminRoutes: React.FC = () => {
  return (
    <Fragment>
      <Route exact path="/" component={AdminMain} />
      <Route exact path="/1" component={Test} />
    </Fragment>
  );
};

export default AdminRoutes;
