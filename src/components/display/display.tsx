import * as React from "react";
import * as Interpreter from "../../bmprog/interpreter";
import * as ArrayUtility from "../../utility/array";

import { Empty, Instruction } from "../../bmprog/instruction";
import { Program } from "../../bmprog/program";
import { Row } from "./row";

interface DisplayProps {
  rows: number;
  columns: number;
  width: number;
  height: number;
  getPen: () =>  Instruction;
}

export class Display extends React.Component<DisplayProps, Program> {
  private interval: number | undefined;
  constructor(props: DisplayProps) {
    super(props);
    this.state = Interpreter.createProgram(props.rows, props.columns);
  }

  public componentWillMount() {
    this.startProgram(0);
  }

  public componentWillUnmount() {
    this.stopProgram();
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
            signals: this.state.signals.filter(
              ({ row, column }) => row === rowIndex && column === cellIndex,
            ),
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
        clear ? Empty : this.props.getPen(),
      ),
    });
  }

  private startProgram(input: number): void {
    this.setState(Interpreter.initialize(this.state, input));
    this.interval = window.setInterval(() => this.updateProgram(), 1000);
  }

  private stopProgram(): void {
    if (typeof this.interval === "number") {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  private updateProgram(): void {
    this.setState(
      Interpreter.getNextStep(
        this.state,
        (output) => {
          // tslint:disable-next-line:no-console
          console.log(output);
        },
        () => {
          // tslint:disable-next-line:no-console
          console.log("terminated");
          this.stopProgram();
        },
      ),
    );
  }
}
