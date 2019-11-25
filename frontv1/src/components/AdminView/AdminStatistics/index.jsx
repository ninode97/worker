import React from "react";
import Title from "../../shared/Title";
import LoadingSpin from "react-loading-spin";
import StatisticsTable from "./StatisticsTable";

const AdminStatistics = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="admin-statistics-view" style={styles.container}>
      <Title title="Work Overview" />
      <div style={styles.statisticsContainer}>
        {isLoading ? (
          <React.Fragment>
            <div style={styles.loader} className="loader">
              <LoadingSpin style={styles.loader} size="100px" />
              <span style={{ paddingTop: "3rem" }}>Loading...</span>
            </div>
          </React.Fragment>
        ) : (
          <StatisticsTable />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  statisticsContainer: {
    height: "450px",
    overflowY: "scroll",
    background: "#FAFAFA"
  },
  loader: {
    paddingTop: "5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center"
  }
};

export default AdminStatistics;
