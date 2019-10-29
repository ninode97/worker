import React from 'react';
import { Route } from 'react-router-dom';

import AdminMessenger from '../AdminMessenger/index';
import AdminMain from '../AdminMain';
import AdminWorkers from '../AdminWorkers';
import AdminStatistics from '../AdminStatistics';

const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={AdminMain} />
      <Route exact path="/messenger" component={AdminMessenger} />
      <Route exact path="/workers" component={AdminWorkers} />
      <Route exact path="/statistics" component={AdminStatistics} />
    </React.Fragment>
  );
};

export default AdminRoutes;
