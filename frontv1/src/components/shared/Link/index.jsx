import React from 'react';
import { Link as LinkWrapper } from 'react-router-dom';

const Link = props => {
  return (
    <Link style={styles} to={props.to}>
      {props.children}
    </Link>
  );
};

const styles = {
  pointer: 'cursor'
};

export default Link;
