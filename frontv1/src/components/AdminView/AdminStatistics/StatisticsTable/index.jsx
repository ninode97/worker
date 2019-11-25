import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData, getData } from "./Utils";
import * as moment from "moment";
import axios from "axios";

function renderOptions(users) {
  return users.map((user, index) => (
    <option key={`option-${user}`} value={user}>
      {user}
    </option>
  ));
}

function intervalComponent(type, states) {
  const { targetDate, setTargetDate } = states;
  switch (type.toLowerCase()) {
    case "monthly": {
      console.log(`TRIGGERED1`);
      return (
        <div>
          <label htmlFor="">Select Month</label>
          <input type="number" maxLength="2" min="1" max="12" />
        </div>
      );
    }
    case "weekly": {
      console.log(`TRIGGERED2`);
      return (
        <div>
          <label htmlFor="">Select Week</label>
          <input
            type="number"
            min="2019"
            max={`${new Date().getUTCFullYear()}`}
          />
        </div>
      );
    }
    default: {
      console.log(`TRIGGERED3`);
      return (
        <div>
          <label htmlFor="">Select Day</label>
          <input
            id="filter-workers-by-date"
            onChange={e => setTargetDate(e.target.value)}
            type="date"
            defaultValue={targetDate}
          />
        </div>
      );
    }
  }
}

const StatisticsTable = props => {
  const [targetDate, setTargetDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  const [rangeFilter, setRangeFilter] = React.useState("daily");
  const [records, setRecords] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);

  React.useEffect(() => {
    console.log(`Filter by user: ${selectedUser}`);
    console.log(`Filter by selected date: ${targetDate}`);
    console.log(`Filter by day interval range date: ${rangeFilter}`);
  }, [rangeFilter, selectedUser, targetDate]);

  React.useEffect(() => {
    getData()
      .then(records => {
        console.log(records);
        setRecords(records);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`https://workero.site/api/users`)
      .then(res => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div style={styles.wrapper}>
      <div
        style={styles.filterOptionsContainer}
        className="filer-options-container"
      >
        <select
          onChange={e => setSelectedUser(e.target.value)}
          className="user-select-dropdown"
          defaultValue="0"
        >
          <option value="0" disabled defaultValue>
            Select worker
          </option>
          {renderOptions(users)}
        </select>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center"
          }}
          className="filter-date-selector"
        >
          {intervalComponent(rangeFilter, { targetDate, setTargetDate })}
          {/* <label htmlFor="filter-workers-by-date">Selected Date: &nbsp;</label>
          <input
            id="filter-workers-by-date"
            onChange={e => setTargetDate(e.target.value)}
            type="date"
            defaultValue={targetDate}
          /> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center"
          }}
          className="filter-interval"
        >
          <label htmlFor="filter-workers-by-date">Select Interval &nbsp;</label>
          <select onChange={e => setRangeFilter(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <ReactTable
        data={records}
        columns={[
          {
            Header: "Worker Data",
            columns: [
              {
                Header: "Username",
                accessor: "username",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
              {
                Header: "First Name",
                accessor: "firstName",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
              {
                Header: "Last Name",
                accessor: "lastName",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },

              {
                Header: "Is Finished?",
                accessor: "isFinished",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
              {
                Header: "Start Time",
                accessor: "startTime",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
              {
                Header: "End Time",
                accessor: "endTime",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
              {
                Header: "Total hours",
                accessor: "totalHours",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              }
            ]
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

const styles = {
  filterOptionsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  wrapper: {
    padding: "1rem"
  },
  table: {
    width: "100%",
    border: "1px solid gainsboro",
    borderCollapse: "separate",
    borderSpacing: "1rem",
    borderBottom: "1px solid #eee"
  },
  tr: {
    marginTop: "2rem"
  },
  td: {}
};

export default StatisticsTable;
