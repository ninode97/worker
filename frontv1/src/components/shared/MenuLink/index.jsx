import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const MenuLink = props => {
  const { to, onClick } = props;
  return (
    <Link onClick={onClick} className="menu-link" style={styles} to={to}>
      {props.children}
    </Link>
  );
};
const styles = {
  color: 'dodgerblue',
  border: '1px solid gainsboro',
  padding: '0.7rem',
  borderRadius: '2px 2px'
};
export default MenuLink;
