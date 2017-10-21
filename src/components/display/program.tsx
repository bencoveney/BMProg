import * as React from "react";
import * as ArrayUtility from "../../utility/array";

import { Instruction } from "../../bmprog/instruction";
import { Row } from "./row";

interface ProgramProps {
  rows: number;
  columns: number;
  width: number;
  height: number;
  getPen: () =>  Instruction;
}

interface ProgramState {
  instructions: Instruction[][];
}

export class Program extends React.Component<ProgramProps, ProgramState> {
  constructor(props: ProgramProps) {
    super(props);

    this.state = {
      instructions: ArrayUtility.initialize2d(
        props.rows,
        props.columns,
        () => Instruction.Empty,
      ),
    };
  }

  public render() {
    const style: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      height: `${this.props.height}px`,
      width: `${this.props.width}px`,
    };

    const rows = this.state.instructions.map(
      (rowInstructions, rowIndex) => {
        const cells = rowInstructions.map(
          (instruction, cellIndex) => ({
            instruction,
            set: (clear: boolean) => {
              this.setInstruction(rowIndex, cellIndex, clear);
            },
          }),
        );
        return (
          <Row
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
  }

  private setInstruction(
    rowIndex: number,
    columnIndex: number,
    clear: boolean,
  ): void {
    this.setState({
      instructions: ArrayUtility.replace2d(
        this.state.instructions,
        rowIndex,
        columnIndex,
        clear ? Instruction.Empty : this.props.getPen(),
      ),
    });
  }
}
