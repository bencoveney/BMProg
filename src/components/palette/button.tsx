import * as React from "react";
import * as ArrayUtility from "../../utility/array";
import * as StyleUtility from "../../utility/style";

import { Instruction } from "../../bmprog/instruction";

interface ButtonProps {
  instruction: Instruction;
  isCurrent: boolean;
  set: () => void;
}

const staticStyle: React.CSSProperties = {
  borderStyle: "solid",
  paddingBottom: "5px",
  paddingRight: "5px",
  paddingTop: "5px",
};

const offValues = /0/gi;
const lightValue = "C";

const onValues = /F/gi;
const darkValue = "3";

const white = /FFFFFF/gi;
const grey = lightValue.repeat(6);

export const Button: React.StatelessComponent<ButtonProps> = (
  props: ButtonProps,
) => {
  const style: React.CSSProperties = StyleUtility.merge(
    staticStyle,
    {
      backgroundColor: props.instruction.color.replace(offValues, lightValue),
      borderColor: props.instruction.color.replace(white, grey),
      borderLeftWidth: props.isCurrent ? "6px" : "1px",
      color: props.instruction.color.replace(onValues, darkValue),
      fontStyle: props.isCurrent ? "italic" : "normal",
      paddingLeft: props.isCurrent ? "5px" : "10px",
    },
  );
  return (
    <div style={style} onClick={props.set}>
      <b>{props.instruction.name}:</b> {props.instruction.description}
    </div>
  );
};
