import React from 'react';

const MenuButton = props => {
  const { text } = props;
  return <button style={styles}>{props.children}</button>;
};
const styles = {
  color: 'dodgerblue',
  border: '1px solid gainsboro',
  padding: '0.7rem',
  borderRadius: '2px 2px'
};
export default MenuButton;
