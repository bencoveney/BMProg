import * as React from "react";

import { Buttons, ButtonsProps } from "../inputs/buttons";
import { Label } from "../layout/label";
import { Rows } from "../layout/rows";
import { Interval, IntervalProps } from "./interval";

interface ControlsProps extends IntervalProps {
  isStarted: boolean; // disable play, enable reset
  isPlaying: boolean; // disable play, enable pause
  play: () => void;
  pause: () => void;
  reset: () => void;
}

export const Controls: React.SFC<ControlsProps> = (props) => {
  const buttons: ButtonsProps = {
    buttons: [
      {
        borders: "left",
        caption: props.isStarted ? "Resume" : "Play",
        clicked: props.play,
        disabled: props.isPlaying,
        icon: "play",
      },
      {
        borders: "none",
        caption: "Pause",
        clicked: props.pause,
        disabled: !props.isPlaying,
        icon: "pause",
      },
      {
        borders: "right",
        caption: "Reset",
        clicked: props.reset,
        disabled: !props.isStarted,
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
