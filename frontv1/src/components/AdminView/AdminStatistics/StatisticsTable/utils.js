import React from "react";
import namor from "namor";
import axios from "axios";
import moment from "moment";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const formatIsFinished = val => {
  return val === false ? "no" : "yes";
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
  // OLD VERSION
  // if (status) {
  //   time1 = time1.format("HH:mm:ss");
  //   time2 = time2.format("HH:mm:ss");

  //   let diff = moment(time2, "HH:mm:ss").diff(moment(time1, "HH:mm:ss"));
  //   let d = moment.duration(diff);
  //   return (
  //     Math.floor(d.asHours()) +
  //     moment.utc(diff).format(":mm") +
  //     moment.utc(diff).format(":ss")
  //   );
  // } else {
  //   return "Not finished yet";
  // }
};

const newPerson = () => {
  const statusChance = Math.random();
  const workHours = Math.floor(Math.random() * 12);
  return {
    username: `@${namor.generate({ words: 1 })}`,
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    workHours: workHours,
    earnings: workHours * 11,
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

function formatUserQueryParam(user) {
  if (user && user !== "") {
    return `&username=${user}`;
  }
  return "";
}

export async function getData(workday, user) {
  const URI = `https://workero.site/api/workday?workday=${
    workday.date
  }${formatUserQueryParam(user)}`;
  const response = await axios.get(URI);
  const records = response.data.map((record, id) => {
    const d1 = moment(new Date(record.startTime));
    const d2 = moment(new Date(record.endTime));

    return {
      id: id + 1,
      username: record.user.username,
      workplace: record.workplace.workplaceCode,
      firstName: record.user.firstName,
      lastName: record.user.lastName,
      startTime: d1.format("YY/MM/DD HH:mm:ss"),
      endTime: !record.endTime ? "n/a" : d2.format("YY/MM/DD HH:mm:ss"),
      totalHours: calculateTime(d1, d2, record.endTime)
    };
  });
  return records;
}
