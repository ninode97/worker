import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";

const AdminWorkers = () => {
  return (
    <div style={styles.container}>
      <Title title="Worker Managment" />
      <Link
        className="admin-workers__button"
        style={styles.button}
        to="/workers/add"
      >
        Add Worker
      </Link>
      <Link
        className="admin-workers__button"
        style={styles.button}
        to="/workers/update"
      >
        Update Worker
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    background: "white",
    width: "100%",
    padding: "1rem",
    border: "1px solid gainsboro"
  }
};

export default AdminWorkers;
