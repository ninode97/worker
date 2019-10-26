import React from 'react';

const MenuButton = props => {
  const { text } = props;
  return <button style={styles}>{props.children}</button>;
};
const styles = {
  color: 'dodgerblue',
  border: '1px solid gainsboro',
  padding: '2rem'
};
export default MenuButton;
