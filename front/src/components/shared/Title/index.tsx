import React, { CSSProperties } from 'react';
import './styles.css';

interface TitleProps {
  title: string;
  style?: CSSProperties;
}

const Title: React.FC<TitleProps> = props => {
  return (
    <h1 style={props.style} className="title">
      {props.title}
    </h1>
  );
};

export default Title;
