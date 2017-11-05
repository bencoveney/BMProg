import * as React from "react";
import * as Interpreter from "../../bmprog/interpreter";
import * as ArrayUtility from "../../utility/array";
import * as Style from "../../utility/style";

import { Empty, Instruction } from "../../bmprog/instruction";
import { Program } from "../../bmprog/program";
import { labelWidth, Row } from "./row";

interface DisplayProps {
  width: number;
  height: number;
  program: Program;
  setInstruction: (
    rowIndex: number,
    cellIndex: number,
    clear: boolean,
  ) => void;
}

const getStyle = Style.factory({
  display: "flex",
  flexDirection: "column",
});

export const Display: React.SFC<DisplayProps> = (props) => {
  const style = getStyle({
    height: `${props.height}px`,
    width: `${props.width + (labelWidth * 2)}px`,
  });

  // Map rows to row components.
  const rows = props.program.instructions.map(
    (rowInstructions, rowIndex) => {
      // Map cells to cell props.
      const cells = rowInstructions.map(
        (instruction, cellIndex) => ({
          instruction,
          set: (clear: boolean) => {
            props.setInstruction(rowIndex, cellIndex, clear);
          },
          signals: props.program.signals.filter(
            ({ row, column }) => row === rowIndex && column === cellIndex,
          ),
        }),
      );

      // Calculate label text.
      const isFirst = rowIndex === 0;
      const binary = Math.pow(2, rowIndex - 1);
      const inLabel = isFirst ? "Start" : binary;
      const outLabel = isFirst ? "End" : binary === 1 ? 0 : binary / 2;

      return (
        <Row
          inLabel={inLabel.toString()}
          outLabel={outLabel.toString()}
          key={rowIndex}
          cells={cells}
        />
      );
    },
  );

  return (
    <div style={style}>
      {rows}
    </div>
  );
};
