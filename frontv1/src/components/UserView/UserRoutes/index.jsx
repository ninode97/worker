import React from 'react';
import { Route } from 'react-router-dom';

import UserMain from '../UserMain';
import UserWorks from '../UserWorks';
import StartWork from '../UserWorks/StartWork';
import EndWork from '../UserWorks/EndWork';

// import AdminMessenger from '../AdminMessenger/index';
// import AdminMain from '../AdminMain';
// import AdminWorkers from '../AdminWorkers';
// import AdminStatistics from '../AdminStatistics';
// import AdminWorkersAdd from '../AdminWorkersAdd';
// import AdminWorkersUpdate from '../AdminWorkersUpdate';
// import AdminWorkersBlock from '../AdminWorkersBlock';
// import AdminWorkersFind from '../AdminWorkersFind';
// import AdminMainConceptual from '../AdminMainConceptual';

const UserRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={UserMain} />
      <Route exact path="/works" component={UserWorks} />
      <Route exact path="/works/start-work" component={StartWork} />
      <Route exact path="/works/end-work" component={EndWork} />
      {/* <Route exact path="/messenger" component={AdminMainConceptual} />
      <Route exact path="/workers" component={AdminWorkers} />
      <Route exact path="/workers/add" component={AdminWorkersAdd} />
      <Route exact path="/workers/update" component={AdminWorkersUpdate} />
      <Route exact path="/workers/block" component={AdminWorkersBlock} />
      <Route exact path="/workers/find" component={AdminWorkersFind} />
      <Route exact path="/statistics" component={AdminStatistics} /> */}
    </React.Fragment>
  );
};

export default UserRoutes;
