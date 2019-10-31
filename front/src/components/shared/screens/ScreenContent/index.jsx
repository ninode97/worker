import React from 'react';

const ScreenContent = props => {
  return <div style={styles.container}>{props.children}</div>;
};

const styles = {
  container: {
    minHeight: '50vh'
  }
};

export default ScreenContent;
