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
    <>
      <p>Select date:</p>
      <input
        style={styles.input}
        onChange={e => setSelectedDate(e.target.value)}
        type="date"
        defaultValue={selectedDate}
      />
    </>
  );
};

const styles = {
  input: {
    width: "160px"
  }
};

export default DailyFilter;
