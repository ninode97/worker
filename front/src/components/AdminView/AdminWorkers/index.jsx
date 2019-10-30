import React from 'react';

const AdminWorkers = () => {
  return (
    <div>
      <button style={styles.button}>Add Worker</button>
      <button style={styles.button}>Update Worker</button>
      <button style={styles.button}>Delete Worker</button>
      <button style={styles.button}>Find Worker</button>
    </div>
  );
};

const styles = {
  button: {
    background: 'gainsboro',
    width: '100%',
    padding: '1rem',
    border: '1px solid white',
    '&:hover': {
      background: 'red'
    }
  }
};

export default AdminWorkers;
