import axios from "axios";
import moment from "moment";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function formatTime(time) {
  if (time.toString().length < 2) {
    return `0${time}`;
  }
  return time;
}

const calculateTime = (time1, time2, status) => {
  if (status) {
    const start_date = moment(time1, "YYYY-MM-DD HH:mm:ss");
    const end_date = moment(time2, "YYYY-MM-DD HH:mm:ss");
    const x = moment.duration(end_date.diff(start_date)).asMilliseconds();
    const seconds = moment.duration(x).seconds();
    const minutes = moment.duration(x).minutes();
    const hours = Math.trunc(moment.duration(x).asHours());

    return `${formatTime(hours)}:${formatTime(minutes)}`;
  } else {
    return "Not finished yet";
  }
};

export async function getData(query) {
  const response = await axios.get(
    `https://workero.site/api/workday?workday=${query.date}`
  );

  if (response.data && response.data.length !== 0) {
    return response.data.map((record, index) => {
      const d1 = moment(new Date(record.startTime));
      const d2 = moment(new Date(record.endTime));

      return {
        id: index + 1,
        workplace: record.workplace.workplaceCode,
        startTime: d1.format("YY/MM/DD HH:mm:ss"),
        endTime: !record.endTime ? "n/a" : d2.format("YY/MM/DD HH:mm:ss"),
        totalHours: calculateTime(d1, d2, record.endTime)
      };
    });
  }
  return [];
}
