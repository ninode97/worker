import React from 'react';

const AdminWorkersAdd = () => {
  return (
    <div style={styles.container}>
      <div
        className="wrap-input100 validate-input"
        data-validate="Valid email is: a@b.c"
      >
        <input
          autoComplete="true"
          className="input100"
          type="text"
          name="username"
        />
        <span className="focus-input100" data-placeholder="username"></span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};
export default AdminWorkersAdd;
