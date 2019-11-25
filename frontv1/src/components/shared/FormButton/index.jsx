import React from 'react';
import { validateProp } from '../../../utils/validateProp';
import './styles.css';

const FormButton = props => {
  let { style, className, children } = props;
  className = validateProp(className);
  return <div className={`form-button ${className}`}>{children}</div>;
};

export default FormButton;

`     <div className="container-login100-form-btn">
<div className="wrap-login100-form-btn">
  <div className="login100-form-bgbtn"></div>
  <button className="login100-form-btn">Login</button>
</div>
</div>`;
