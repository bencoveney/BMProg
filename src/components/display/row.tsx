import * as React from "react";

import { Instruction } from "../../bmprog/instruction";
import { Cell, CellProps } from "./cell";

interface RowProps {
  outLabel: string;
  inLabel: string;
  cells: CellProps[];
}

const style: React.CSSProperties = {
  display: "flex",
  flexGrow: 1,
};

export const labelWidth = 40;

const getLabelStyle = (align: string): React.CSSProperties => ({
  boxShadow: "inset 0 0 1px 1px rgba(0, 0, 0, 0.1)",
  color: "#444444",
  fontSize: "0.8em",
  lineHeight: "140%",
  padding: "0.1em",
  textAlign: "right",
  width: `${labelWidth}px`,
});

export const Row: React.StatelessComponent<RowProps> = (
  props: RowProps,
) => {

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
      <div style={getLabelStyle("right")}>
        {props.inLabel}
      </div>
      {cells}
      <div style={getLabelStyle("left")}>
        {props.outLabel}
      </div>
    </div>
  );
};
