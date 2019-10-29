import React from 'react';
import Icon from '../IconContainer';
import Svg from './icon.svg';

const AnalyticsIcon = props => {
  const content = (
    <img
      className={props.className}
      style={styles}
      src={Svg}
      alt="Analytics Icon"
    />
  );
  return <Icon icon={content} />;
};

const styles = {
  width: '100%',
  height: '100%'
};
export default AnalyticsIcon;
