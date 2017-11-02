import * as React from "react";

interface Interval {
  name: string;
  milliseconds: number;
}

const intervals: Interval[] = [
  {
    milliseconds: 0,
    name: "Instant",
  },
  {
    milliseconds: 10,
    name: "100 per second",
  },
  {
    milliseconds: 100,
    name: "10 per second",
  },
  {
    milliseconds: 200,
    name: "5 per second",
  },
  {
    milliseconds: 500,
    name: "2 per second",
  },
  {
    milliseconds: 1000,
    name: "1 per second",
  },
  {
    milliseconds: 2000,
    name: "1 every 2 seconds",
  },
  {
    milliseconds: 5000,
    name: "1 every 5 seconds",
  },
  {
    milliseconds: 10000,
    name: "1 every 10 seconds",
  },
];

export interface IntervalProps {
  current: number;
  setSpeed: (milliseconds: number) => void;
}

export const Interval: React.StatelessComponent<IntervalProps> = (
  props: IntervalProps,
) => {
  const options = intervals.map(
    ({ name, milliseconds }, index) => (
      <option value={milliseconds} key={index}>
        {milliseconds}ms - {name}
      </option>
    ),
  );
  const changeHandler: React.ChangeEventHandler<any> = (
    event: React.ChangeEvent<any>,
  ) => {
    props.setSpeed(event.target.value);
  };
  return (
    <select onChange={changeHandler} value={props.current}>
      {options}
    </select>
  );
};
