import React from 'react';

const ScreenContent = props => {
  return <div style={styles.container}>{props.children}</div>;
};

const styles = {
  container: {
    height: '100%'
  }
};

export default ScreenContent;
