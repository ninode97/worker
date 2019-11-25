import React from 'react';
import { Route } from 'react-router-dom';

import AdminMessenger from '../AdminMessenger/index';
import AdminMain from '../AdminMain';
import AdminWorkers from '../AdminWorkers';
import AdminStatistics from '../AdminStatistics';
import AdminWorkersAdd from '../AdminWorkersAdd';
import AdminWorkersUpdate from '../AdminWorkersUpdate';
import AdminWorkersBlock from '../AdminWorkersBlock';
import AdminWorkersFind from '../AdminWorkersFind';
import AdminMainConceptual from '../AdminMainConceptual';

const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={AdminMain} />
      <Route exact path="/messenger" component={AdminMessenger} />
      <Route exact path="/workers" component={AdminWorkers} />
      <Route exact path="/workers/add" component={AdminWorkersAdd} />
      <Route exact path="/workers/update" component={AdminWorkersUpdate} />
      <Route exact path="/workers/block" component={AdminWorkersBlock} />
      <Route exact path="/workers/find" component={AdminWorkersFind} />
      <Route exact path="/statistics" component={AdminStatistics} />
    </React.Fragment>
  );
};

export default AdminRoutes;
