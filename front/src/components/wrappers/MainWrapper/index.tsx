import React from 'react';
import './styles.css';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = props => {
  return <div className="main-wrapper">{props.children}</div>;
};

export default MainWrapper;
