import React from 'react';

const MainContainer = props => {
  const { navigation, className } = props;
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className={className}>
          {props.children}
          {navigation}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
