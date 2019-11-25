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

const calculateTime = (time1, time2, status) => {
  if (status) {
    time1 = time1.format("HH:mm:ss");
    time2 = time2.format("HH:mm:ss");

    let diff = moment(time2, "HH:mm:ss").diff(moment(time1, "HH:mm:ss"));
    let d = moment.duration(diff);
    return (
      Math.floor(d.asHours()) +
      moment.utc(diff).format(":mm") +
      moment.utc(diff).format(":ss")
    );
  } else {
    return "Not finished yet";
  }
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

export async function getData() {
  const response = await axios.get(`https://workero.site/api/workday`);
  console.log(response);
  const records = response.data.map(record => {
    const d1 = moment(new Date(record.startTime));
    const d2 = moment(new Date(record.endTime));

    return {
      username: record.user.username,
      firstName: record.user.firstName,
      lastName: record.user.lastName,
      isFinished: formatIsFinished(record.isFinished),
      startTime: d1.format("HH:mm:ss"),
      endTime: !record.endTime ? "n/a" : d2.format("HH:mm:ss"),
      totalHours: calculateTime(d1, d2, record.isFinished)
    };
  });
  console.log(records);
  return records;
}
