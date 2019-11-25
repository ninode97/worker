import React from 'react';
import './styles.css';

const Container = props => {
  const { style, className, children } = props;
  return (
    <div style={style} className={`container container__${className}`}>
      {children}
    </div>
  );
};

export default Container;
