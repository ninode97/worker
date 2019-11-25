import React from 'react';
import './styles.css';

const View = props => {
  const { style, className, navigation, children } = props;

  return (
    <div style={style} className={`view ${className}`}>
      <div className="view__content">{children}</div>
      <div className="view__navigation">{navigation}</div>
    </div>
  );
};

export default View;
