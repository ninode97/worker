import React from 'react';

const MenuButtons = props => {
  return (
    <div style={styles} className='menu-buttons'>
      {props.children}
    </div>
  );
};
const styles = {
  display: 'flex',
  flexDirection: 'column'
};
export default MenuButtons;
