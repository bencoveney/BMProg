import * as React from "react";
import * as Style from "../../utility/style";

import { Instruction } from "../../bmprog/instruction";
import { Cell, CellProps } from "./cell";

const style: Style.Fixed = {
  display: "flex",
  flexGrow: 1,
};

export const labelWidth = 40;

const labelStyle: Style.Fixed = {
  boxShadow: "inset 0 0 1px 1px rgba(0, 0, 0, 0.1)",
  color: "#444444",
  fontSize: "0.8em",
  lineHeight: "140%",
  padding: "0.1em",
  textAlign: "right",
  width: `${labelWidth}px`,
};

export const Row: React.SFC<{
  outLabel: string;
  inLabel: string;
  cells: CellProps[];
}> = (props) => {
  const cells = props.cells.map(
    (cell, index) => (
      <Cell
        instruction={cell.instruction}
        set={cell.set}
        key={index}
        signals={cell.signals}
      />
    ),
  );
  return (
    <div style={style}>
      <div style={labelStyle}>
        {props.inLabel}
      </div>
      {cells}
      <div style={labelStyle}>
        {props.outLabel}
      </div>
    </div>
  );
};
