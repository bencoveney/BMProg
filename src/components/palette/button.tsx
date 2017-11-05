import * as React from "react";
import * as ArrayUtility from "../../utility/array";
import * as curry from "../../utility/curry";
import * as Style from "../../utility/style";

import { Instruction } from "../../bmprog/instruction";

const getStyle = Style.factory({
  borderStyle: "solid",
  paddingBottom: "5px",
  paddingRight: "5px",
  paddingTop: "5px",
});

const backgroundColor = curry.replace(/0/gi)("C");
const color = curry.replace(/F/gi)("3");
const borderColor = curry.replace(/FFFFFF/gi)("CCCCCC");

export const Button: React.SFC<{
  instruction: Instruction;
  isCurrent: boolean;
  set: () => void;
}> = (props) => {
  const style = getStyle({
    backgroundColor: backgroundColor(props.instruction.color),
    borderColor: borderColor(props.instruction.color),
    borderLeftWidth: props.isCurrent ? "6px" : "1px",
    color: color(props.instruction.color),
    fontStyle: props.isCurrent ? "italic" : "normal",
    paddingLeft: props.isCurrent ? "5px" : "10px",
  });
  return (
    <div style={style} onClick={props.set}>
      <b>{props.instruction.name}:</b> {props.instruction.description}
    </div>
  );
};
