import React from 'react';
import './styles.css';

const FlexColumn = props => {
  const { style, className, children } = props;
  return (
    <div style={style} className={`flex-column ${className}`}>
      {children}
    </div>
  );
};

export default FlexColumn;
