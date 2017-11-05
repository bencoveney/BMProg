import * as React from "react";
import * as ArrayUtility from "../../utility/array";
import * as curry from "../../utility/curry";
import * as Style from "../../utility/style";

import { Instruction } from "../../bmprog/instruction";

const getStyle = Style.factory({
  background: `linear-gradient(165deg, ${Style.grey2} 0%, ${Style.grey1} 100%)`,
  borderColor: Style.grey3,
  borderStyle: "solid",
  padding: "5px",
});

const color = curry.replace(/0/gi)("C");

export const Button: React.SFC<{
  instruction: Instruction;
  isCurrent: boolean;
  set: () => void;
}> = (props) => {
  const style = getStyle({
    borderColor: props.instruction.color,
    borderLeftWidth: props.isCurrent ? "6px" : "1px",
    borderRightWidth: props.isCurrent ? "6px" : "1px",
    color: color(props.instruction.color),
    fontStyle: props.isCurrent ? "italic" : "normal",
    paddingLeft: props.isCurrent ? "5px" : "10px",
    paddingRight: props.isCurrent ? "5px" : "10px",
  });
  return (
    <div style={style} onClick={props.set}>
      <b>{props.instruction.name}:</b> {props.instruction.description}
    </div>
  );
};
