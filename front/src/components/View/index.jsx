import React from 'react';
import './styles.css';

function generateErrorReport(error) {
  if (error) {
    return <div className="view__error">{error.error}</div>;
  }

  return null;
}

const View = props => {
  const { style, className, navigation, children, error } = props;

  return (
    <div style={style} className={`view ${className}`}>
      <div className="view__content">{children}</div>
      <div className="view__navigation">{navigation}</div>
    </div>
  );
};

export default View;
