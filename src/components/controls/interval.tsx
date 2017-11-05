import * as React from "react";
import * as Style from "../../utility/style";

interface Interval {
  name: string;
  milliseconds: number;
}

const style: Style.Fixed = {
  background: `linear-gradient(165deg, ${Style.grey2} 0%, ${Style.grey1} 100%)`,
  borderColor: Style.grey3,
  borderStyle: "solid",
  borderWidth: "1px",
  color: "white",
  padding: "10px",
  width: "100%",
};

const optionStyle: Style.Fixed = { color: "black" };

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
    name: "1 per 2 seconds",
  },
  {
    milliseconds: 5000,
    name: "1 per 5 seconds",
  },
  {
    milliseconds: 10000,
    name: "1 per 10 seconds",
  },
];

export interface IntervalProps {
  current: number;
  setSpeed: (milliseconds: number) => void;
}

export const Interval: React.SFC<IntervalProps> = (
  props: IntervalProps,
) => {
  const options = intervals.map(
    ({ name, milliseconds }, index) => (
      <option value={milliseconds} key={index} style={optionStyle}>
        {milliseconds}ms - {name}
      </option>
    ),
  );
  const changed: React.ChangeEventHandler<any> = (event) => {
    props.setSpeed(event.target.value);
  };
  return (
    <select
      onChange={changed}
      value={props.current}
      style={style}
    >
      {options}
    </select>
  );
};
