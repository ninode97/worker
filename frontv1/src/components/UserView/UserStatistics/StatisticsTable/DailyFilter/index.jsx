import React from "react";
import moment from "moment";

const DailyFilter = props => {
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  const { filterData, setFilterData } = props;
  React.useEffect(() => {
    setFilterData({
      date: selectedDate
    });
  }, [selectedDate]);
  return (
    <div style={styles.container}>
      <p>Select date:</p>
      <div style={styles.dateInputContainer}>
        <input
          onChange={e => setSelectedDate(e.target.value)}
          type="date"
          defaultValue={selectedDate}
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

export default DailyFilter;
