import React from 'react';

const MainContainer = props => {
  const { navigation } = props;
  return (
    <div className='limiter'>
      <div className='container-login100'>
        {navigation}
        <div className='wrap-login100'>{props.children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
