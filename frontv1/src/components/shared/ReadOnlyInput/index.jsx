import React from 'react';
import { validateProp } from '../../../utils/validateProp';
import './styles.css';

const ReadOnlyInput = props => {
  let { style, className, name, id, type, readOnly, value } = props;
  className = validateProp(className);
  name = validateProp(name);
  id = validateProp(id);
  type = validateProp(type);
  return (
    <input
      style={style}
      className={`read-only-input read-only-input__${className}`}
      type={type}
      name={name}
      id={id}
      readOnly
      value={value}
    />
  );
};

export default ReadOnlyInput;
