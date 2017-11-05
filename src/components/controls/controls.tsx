import * as React from "react";

import { Buttons, ButtonsProps } from "../inputs/buttons";
import { Label } from "../layout/label";
import { Rows } from "../layout/rows";
import { Interval, IntervalProps } from "./interval";

interface ControlsProps extends IntervalProps {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export const Controls: React.SFC<ControlsProps> = (props) => {
  const buttons: ButtonsProps = {
    buttons: [
      {
        borders: "left",
        caption: "Play",
        clicked: props.play,
        icon: "play",
      },
      {
        borders: "none",
        caption: "Pause",
        clicked: props.pause,
        icon: "pause",
      },
      {
        borders: "right",
        caption: "Reset",
        clicked: props.reset,
        icon: "replay",
      },
    ],
  };

  return (
    <Rows>
      <Buttons {...buttons}/>
      <Label value={"Interval"}>
        <Interval current={props.current} setSpeed={props.setSpeed} />
      </Label>
    </Rows>
  );
};
