import React from 'react';
import './styles.css';

const LogoImage = props => {
  const { style, className } = props;
  return <i style={style} className={className}></i>;
};

export default LogoImage;
