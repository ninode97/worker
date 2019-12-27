import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getData, formatTime } from "./utils";
import * as moment from "moment";
import _ from "lodash";
import DailyFilter from "./DailyFilter";
import MonthlyFilter from "./MonthlyFilter";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  } else {
    return 0;
  }
}
function formatSheetName(date) {
  const t = moment(new Date(date)).add(1, "month");
  const sheetName =
    date.split("-").length === 3 ? date : `${date} - ${t.format("YYYY-MM")}`;

  return sheetName;
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

const columns = [
  { title: "Workplace", value: "workplace", width: { wpx: 80 } }, //pixels width
  { title: "Start Time", value: "startTime", width: { wch: 40 } }, //char width
  { title: "End Time", value: "endTime", width: { wpx: 90 } },
  { title: "Total Hours", value: "totalHours", width: { wpx: 90 } }
];

class Download extends React.Component {
  render() {
    return (
      <ExcelFile>
        <ExcelSheet data={this.props.records} name={this.props.name}>
          <ExcelColumn
            label="Workplace"
            value="workplace"
            width={{ wpx: 300 }}
          />
          <ExcelColumn label="Start Time" value="startTime" />
          <ExcelColumn label="End Time" value="endTime" />
          <ExcelColumn label="Total Hours" value="totalHours" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

const StatisticsTable = props => {
  const [filterData, setFilterData] = React.useState({
    date: moment().format("YYYY-MM-DD")
  });
  const [filterType, setFilterType] = React.useState("daily");
  const [records, setRecords] = React.useState([]);
  const [filteredRecords, setFilteredRecords] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  let reactTable = React.useRef(null);

  React.useEffect(() => {
    getData(filterData)
      .then(records => {
        setIsLoading(true);
        setRecords(records);
      })
      .catch(err => {
        console.log(err);
      });
  }, [filterData]);

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

  const columns = records => {
    return [
      {
        Header: "Worker Data",
        columns: [
          {
            Header: "#",
            accessor: "id"
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
    ];
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem",
          justifyContent: "center",
          border: "1px solid gainsboro",
          borderRadius: "2px 2px",
          margin: "1rem"
        }}
      >
        <div className="select-filter">
          {filterComponent}
          <p>Interval</p>
          <select
            defaultValue={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <ReactTable
        ref={reactTable}
        data={records}
        columns={columns(records)}
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
        <Download records={records} name={formatSheetName(filterData.date)} />
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
