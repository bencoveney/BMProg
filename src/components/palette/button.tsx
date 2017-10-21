import * as React from "react";
import * as ArrayUtility from "../../utility/array";

import { Instruction } from "../../bmprog/instruction";

interface ButtonProps {
  instruction: Instruction;
  isCurrent: boolean;
  set: () => void;
}

export const Button: React.StatelessComponent<ButtonProps> = (
  props: ButtonProps,
) => {
  const style: React.CSSProperties = {
    backgroundColor: props.instruction.color,
    fontWeight: props.isCurrent ? "bold" : "normal",
  };

  return (
    <div style={style} onClick={props.set}>
      <h2>{props.instruction.name}</h2>
      <p>{props.instruction.description}</p>
    </div>
  );
};
