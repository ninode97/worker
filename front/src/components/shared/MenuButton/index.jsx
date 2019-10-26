import React from 'react';
import './styles.css';

const MenuButton = props => {
  const { text } = props;
  return (
    <button className='menu-button' style={styles}>
      {props.children}
    </button>
  );
};
const styles = {
  color: 'dodgerblue',
  border: '1px solid gainsboro',
  padding: '0.7rem',
  borderRadius: '2px 2px'
};
export default MenuButton;
