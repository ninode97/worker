import React from 'react';

const ScreenContent = props => {
  return <div style={styles.container}>{props.children}</div>;
};

const styles = {
  container: {
    padding: '5rem 0 5rem 0',
    minHeight: '50vh'
  }
};

export default ScreenContent;
