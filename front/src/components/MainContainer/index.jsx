import React from 'react';

const MainContainer = props => {
  const { navigation } = props;
  return (
    <div className='limiter'>
      <div className='container-login100'>
        <div className='navigation'>{navigation}</div>
        <div className='content'>{props.children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
