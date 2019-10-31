import React from 'react';
import { validateProp } from '../../../utils/validateProp';
import './styles.css';

const Input = props => {
  let { style, className, name, id, type, onChange, value } = props;
  className = validateProp(className);
  name = validateProp(name);
  id = validateProp(id);
  type = validateProp(type);
  value = validateProp(value);
  return (
    <input
      onChange={onChange}
      style={style}
      className={`input input__${className}`}
      type={type}
      name={name}
      id={id}
      value={value}
      autoComplete="true"
    />
  );
};

export default Input;
