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
    <>
      <p>Select month:</p>
      <input
        style={styles.input}
        onChange={e => setFilterData({ date: e.target.value })}
        type="month"
        defaultValue={formatMonth(filterData.date)}
      />
    </>
  );
};

const styles = {
  input: {
    width: "160px"
  }
};

export default MonthlyFilter;
