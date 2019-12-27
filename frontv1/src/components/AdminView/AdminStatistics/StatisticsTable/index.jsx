import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData, formatTime } from "./utils";
import * as moment from "moment";
import _ from "lodash";
import DailyFilter from "./DailyFilter";
import MonthlyFilter from "./MonthlyFilter";
import axios from "axios";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function formatSheetName(date) {
  const t = moment(new Date(date)).add(1, "month");
  const sheetName =
    date.split("-").length === 3 ? date : `${date} - ${t.format("YYYY-MM")}`;

  return sheetName;
}

class Download extends React.Component {
  render() {
    return (
      <ExcelFile filename={this.props.filename}>
        <ExcelSheet data={this.props.records} name={this.props.name}>
          <ExcelColumn label="#" value="id" />
          <ExcelColumn label="Username" value="username" />
          <ExcelColumn label="First Name" value="firstName" />
          <ExcelColumn label="Last Name" value="lastName" />
          <ExcelColumn label="Workplace" value="workplace" />
          <ExcelColumn label="Start Time" value="startTime" />
          <ExcelColumn label="End Time" value="endTime" />
          <ExcelColumn label="Total Hours" value="totalHours" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

function sumWorkHours(data) {
  if (data.length > 0) {
    let ms = 0;
    data.map(record => {
      if (!(record.endTime === "n/a")) {
        const hours = moment
          .duration(Number(record.totalHours.split(":")[0]), "hours")
          .asMilliseconds();
        const mins = moment
          .duration(Number(record.totalHours.split(":")[1]), "minutes")
          .asMilliseconds();

        ms += hours + mins;
      }
    });

    const minutes = moment.duration(ms).minutes();
    const hours = Math.trunc(moment.duration(ms).asHours());

    return `${formatTime(hours)}:${formatTime(minutes)}`;
    // const durations = [];
    // console.log(data);
    // data.map(r => durations.push(r.totalHours));

    // let totalDurations = durations.slice(1);
    // console.log(`DEBUG 1`);
    // console.log(totalDurations);
    // console.log(`DEBUG 1`);
    // totalDurations = totalDurations.reduce(
    //   (prev, cur) => moment.duration(cur).add(prev),
    //   moment.duration(durations[0])
    // );
    // console.log(`DEBUG 2`);
    // console.log(totalDurations);
    // console.log(`DEBUG 2`);

    // const total = `${moment
    //   .utc(totalDurations.asMilliseconds())
    //   .format("HH:mm:ss")}`;

    // return total;
  } else {
    return 0;
  }
}

function getFilterComponent(filterType, filterData, setFilterData) {
  if (filterType === "monthly") {
    return (
      <MonthlyFilter filterData={filterData} setFilterData={setFilterData} />
    );
  } else {
    return (
      <DailyFilter filterData={filterData} setFilterData={setFilterData} />
    );
  }
}
function renderOptions(users) {
  return users.map((user, index) => (
    <option key={`option-${user}`} value={user}>
      {user}
    </option>
  ));
}

const StatisticsTable = props => {
  const [filterData, setFilterData] = React.useState({
    date: moment().format("YYYY-MM-DD")
  });
  const [filterType, setFilterType] = React.useState("daily");
  const [records, setRecords] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState("");

  React.useEffect(() => {
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

  React.useEffect(() => {
    getData(filterData, selectedUser)
      .then(records => {
        setRecords(records);
      })
      .catch(err => {
        console.log(err);
      });
  }, [filterData, selectedUser]);

  React.useEffect(() => {
    if (filterType === "monthly") {
      setFilterData({ date: moment().format("YYYY-MM") });
    } else {
      setFilterData({ date: moment().format("YYYY-MM-DD") });
    }
  }, [filterType]);

  const filterComponent = getFilterComponent(
    filterType,
    filterData,
    setFilterData
  );

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          justifyContent: "center",
          border: "1px solid gainsboro",
          borderRadius: "2px 2px"
        }}
      >
        <p className="options">Options</p>

        <div style={styles.optionContainer} className="select-filter">
          <div style={styles.subContainer}>
            <p>Select Worker:</p>
            <select
              style={styles.select}
              onChange={e => setSelectedUser(e.target.value)}
              className="user-select-dropdown"
              defaultValue="0"
            >
              <option key={`option-all`} value={""}>
                All Workers
              </option>
              {renderOptions(users)}
            </select>
          </div>
          <div style={styles.subContainer}>
            <p>Interval</p>
            <select
              style={styles.select}
              defaultValue={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div style={styles.subContainer}>{filterComponent}</div>
        </div>
      </div>
      <ReactTable
        data={records}
        columns={[
          {
            Header: "Worker Data",
            columns: [
              {
                Header: "#",
                accessor: "id",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                }
              },
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
                Header: "Workplace",
                accessor: "workplace",
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
                },
                Footer: "Total hours:"
              },
              {
                Header: "Total hours",
                accessor: "totalHours",
                sortMethod: (a, b) => {
                  if (a.length === b.length) {
                    return a > b ? 1 : -1;
                  }
                  return a.length > b.length ? 1 : -1;
                },
                Footer: <span>{sumWorkHours(records)}</span>
              }
            ]
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <div
        style={{
          border: "1px solid gainsboro",
          padding: "1rem",
          background: "#2ECC40"
        }}
      >
        <Download
          filename={`${
            selectedUser === "" ? `all` : selectedUser
          }_${formatSheetName(filterData.date)}`}
          records={records}
          name={formatSheetName(filterData.date)}
        />
      </div>
    </div>
  );
};

const styles = {
  filterOptionsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  optionContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid gainsboro",
    borderRadius: "1rem",
    padding: "1rem"
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  select: {
    width: "160px"
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
