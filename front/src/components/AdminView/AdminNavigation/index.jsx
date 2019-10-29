import React, { useState } from 'react';
import AnalyticsIcon from '../../shared/icons/AnalyticsIcon';
import HomeIcon from '../../shared/icons/HomeIcon';
import MessengerIcon from '../../shared/icons/MessengerIcon';
import WorkerIcon from '../../shared/icons/WorkerIcon';
import { Link } from 'react-router-dom';
import './index.css';

function reduceSelectedItem(buttonPath, currentPath) {
  console.log(currentPath);
  return buttonPath === currentPath ? 'current-nav-element' : '';
}

const AdminNavigation = props => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        background: 'gainsboro',
        padding: '1rem',
        border: '1px solid gainsboro'
      }}
      className="nav-menu"
    >
      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to="/messenger">
        <MessengerIcon />
      </Link>
      <Link to="/workers">
        <WorkerIcon />
      </Link>
      <Link to="/statistics">
        <AnalyticsIcon />
      </Link>
    </div>
  );
};

const styles = {
  link: {}
};

export default AdminNavigation;
