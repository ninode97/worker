import React from 'react';
import './styles.css';

const Wrapper = props => {
  const { style, className, children } = props;
  return (
    <div style={style} className={`wrapper wrapper__${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
