import React from 'react';
import './styles.css';
import { validateProp } from '../../../../../utils/validateProp';

const FormButtonGradient = props => {
  const { style, className, children } = props;
  return (
    <div
      style={style}
      className={`form-button-gradient ${validateProp(className)}`}
    >
      {children}
    </div>
  );
};

export default FormButtonGradient;
