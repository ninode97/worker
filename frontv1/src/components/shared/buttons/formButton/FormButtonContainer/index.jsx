import React from 'react';
import './styles.css';
import { validateProp } from '../../../../../utils/validateProp';

const FormButtonContainer = props => {
  const { style, className, children } = props;
  return (
    <div
      style={style}
      className={`form-button-container ${validateProp(className)}`}
    >
      {children}
    </div>
  );
};

export default FormButtonContainer;
