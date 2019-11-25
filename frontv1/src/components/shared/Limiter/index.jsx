import React from 'react';
import './styles.css';

const Limiter = props => {
  const { style, className, children } = props;
  return (
    <div style={style} className={`limiter limiter__${className}`}>
      {children}
    </div>
  );
};

export default Limiter;
