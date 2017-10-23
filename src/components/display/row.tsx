import * as React from "react";

import { Instruction } from "../../bmprog/instruction";
import { Cell, CellProps } from "./cell";

interface RowProps {
  cells: CellProps[];
}

const style: React.CSSProperties = {
  borderColor: "black",
  borderStyle: "solid",
  display: "flex",
  flexGrow: 1,
};

const Row: React.StatelessComponent<RowProps> = (
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

  return <div style={style}>{cells}</div>;
};

export { Row };
