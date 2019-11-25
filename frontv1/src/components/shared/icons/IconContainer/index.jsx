import React from 'react';

const IconContainer = props => {
  return (
    <div style={styles} className={props.className}>
      {props.icon}
    </div>
  );
};

const styles = {
  width: '3rem',
  height: '3rem'
};

export default IconContainer;
