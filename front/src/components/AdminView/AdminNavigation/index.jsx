import React from 'react';

const AdminNavigation = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        border: '1px solid gainsboro'
      }}
      className='nav-menu'
    >
      <i
        style={{ fontSize: '3.5rem', color: 'dodgerblue' }}
        class='fa fa-home'
      ></i>
      <i
        style={{ fontSize: '3.5rem', color: 'dodgerblue' }}
        class='fa fa-home'
      ></i>
      <i
        style={{ fontSize: '3.5rem', color: 'dodgerblue' }}
        class='fa fa-home'
      ></i>
      <i
        style={{ fontSize: '3.5rem', color: 'dodgerblue' }}
        class='fa fa-home'
      ></i>
    </div>
  );
};

export default AdminNavigation;
