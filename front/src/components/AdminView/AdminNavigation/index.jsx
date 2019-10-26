import React from 'react';

const AdminNavigation = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        background: 'gainsboro',
        padding: '1rem 0',
        marginBottom: '4rem'
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
