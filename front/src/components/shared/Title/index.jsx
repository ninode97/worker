import React from 'react';
import './styles.css';

const Title = props => {
  const { style, className, title } = props;
  return (
    <span style={style} className={`title ${className}`}>
      {title}
    </span>
  );
};

export default Title;
