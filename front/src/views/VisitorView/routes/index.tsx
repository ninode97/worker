import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import VisitorMain from '../main';

const Test: React.FC = () => <h1>Hello World!</h1>;

const VisitorRoutes: React.FC = () => {
  return (
    <Fragment>
      <Route exact path="/" component={VisitorMain} />
      <Route exact path="/1" component={Test} />
    </Fragment>
  );
};

export default VisitorRoutes;
