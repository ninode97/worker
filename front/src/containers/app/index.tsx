import React from 'react';
import VisitorView from '../../views/VisitorView';
import MainWrapper from '../../components/wrappers/MainWrapper';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './styles.css';

const App: React.FC = () => {
  return (
    <Router history={createBrowserHistory()}>
      <div className="app">
        <MainWrapper>
          <VisitorView />
        </MainWrapper>
      </div>
    </Router>
  );
};

export default App;
