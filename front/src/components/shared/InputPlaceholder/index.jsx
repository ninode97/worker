import React from 'react';
import { validateProp } from '../../../utils/validateProp';
import './styles.css';

const InputPlaceholder = props => {
  let { style, className, placeholder } = props;
  className = validateProp(className);
  placeholder = validateProp(placeholder);
  return (
    <span
      style={style}
      className={`input-placeholder ${className}`}
      data-placeholder={placeholder}
    ></span>
  );
};

export default InputPlaceholder;
