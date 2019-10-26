import React from 'react';

const MainContainer = props => {
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='wrap-login100'>{props.children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
