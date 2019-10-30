import React from 'react';
import './styles.css';
import { validateProp } from '../../../utils/validateProp';

const InputControl = props => {
  const { style, className, children } = props;
  return (
    <div
      style={style}
      className={`input-control ${validateProp(className)}`}
      data-validate="Valid email is: a@b.c"
    >
      {children}
    </div>
  );
};

export default InputControl;
