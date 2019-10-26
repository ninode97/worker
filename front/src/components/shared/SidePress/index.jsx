import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SidePress = props => {
  const { className } = props;
  return (
    <div className={className} style={styles}>
      {props.children}
    </div>
  );
};
const styles = {
  padding: '0px 55px 0px 55px;'
};
export default SidePress;
