import React from 'react';
import './styles.css';
import { validateProp } from '../../../../../utils/validateProp';

const FormButtonWrapper = props => {
  const { style, className, children } = props;
  return (
    <div
      style={style}
      className={`form-button-wrapper ${validateProp(className)}`}
    >
      {children}
    </div>
  );
};

export default FormButtonWrapper;
