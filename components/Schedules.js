import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Day from "./Day";

export default function Schedules() {
  const schedules = useSelector((state) => state.travels.schedules);

  return (
    <>
      {schedules.map((schedule) => (
        <Day
          key={schedule.day}
          day={schedule.day}
          activities={schedule.activities}
        />
      ))}
    </>
  );
}