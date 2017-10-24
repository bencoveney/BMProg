import * as React from "react";

import { Button } from "./button";
import { ControlState } from "./controlState";
import { Interval, IntervalProps } from "./interval";

interface ControlsProps extends IntervalProps {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export const Controls: React.StatelessComponent<ControlsProps> = (
  props: ControlsProps,
) => {
  return (
    <div>
      <Button title="Play" action={props.play} />
      <Button title="Pause" action={props.pause} />
      <Button title="Reset" action={props.reset} />
      <Interval current={props.current} setSpeed={props.setSpeed} />
    </div>
  );
};
