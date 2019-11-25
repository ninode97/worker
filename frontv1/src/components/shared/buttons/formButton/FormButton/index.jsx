import React from 'react';
import './styles.css';
import { validateProp } from '../../../../../utils/validateProp';

const FormButton = props => {
  const { style, className, children } = props;
  return (
    <div className="form-button-holder">
      <div className={`form-button-gradient`}></div>
      <button
        style={style}
        className={`form-button ${validateProp(className)}`}
      >
        {children}
      </button>
    </div>
  );
};

export default FormButton;
