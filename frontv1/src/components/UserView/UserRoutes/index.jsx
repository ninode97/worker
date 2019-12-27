import React from "react";
import { Route } from "react-router-dom";

import UserMain from "../UserMain";
import UserWorks from "../UserWorks";
import StartWork from "../UserWorks/StartWork";
import AttachPhoto from "../UserWorks/AttachPhoto";
import EndWork from "../UserWorks/EndWork";
import UserStatistics from "../UserStatistics";

const UserRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={UserMain} />
      <Route exact path="/works" component={UserWorks} />
      <Route exact path="/works/start-work" component={StartWork} />
      <Route exact path="/works/attach-photo" component={AttachPhoto} />
      <Route exact path="/works/end-work" component={EndWork} />
      <Route exact path="/statistics" component={UserStatistics} />
    </React.Fragment>
  );
};

export default UserRoutes;
