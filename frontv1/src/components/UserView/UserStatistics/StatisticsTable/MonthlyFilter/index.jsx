import React from "react";
import moment from "moment";

function formatMonth(date) {
  const split = date.split("-");
  return `${split[0]}-${split[1]}`;
}
const MonthlyFilter = props => {
  const { filterData, setFilterData } = props;
  React.useEffect(() => {}, [filterData]);

  return (
    <div style={styles.container}>
      <p>Select month:</p>
      <div style={styles.dateInputContainer}>
        <input
          onChange={e => setFilterData({ date: e.target.value })}
          type="month"
          defaultValue={formatMonth(filterData.date)}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff"
  },
  dateInputContainer: {
    border: "1px solid gainsboro",
    borderRadius: "1rem",
    padding: "1rem"
  }
};

export default MonthlyFilter;
