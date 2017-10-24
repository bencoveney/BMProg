import * as React from "react";
import * as Interpreter from "../../bmprog/interpreter";
import * as ArrayUtility from "../../utility/array";

import { Empty, Instruction } from "../../bmprog/instruction";
import { Program } from "../../bmprog/program";
import { Controls } from "../controls/controls";
import { Display } from "../display/display";
import { Palette } from "../palette/palette";
import { SplitLayout } from "../splitLayout/splitLayout";

interface PlaygroundProps {
  initialPen: Instruction;
  rows: number;
  columns: number;
  width: number;
  height: number;
}

interface PlaygroundState extends Program {
  input: number;
  interval: number;
  pen: Instruction;
}

export class Playground extends React.Component<
  PlaygroundProps,
  PlaygroundState
> {
  private currentInterval: number | undefined;

  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      input: 0,
      interval: 1000,
      pen: props.initialPen,
      ...Interpreter.createProgram(props.rows, props.columns),
    };
  }

  public render() {
    // Helper to preserve "this".
    // tslint:disable-next-line:ban-types
    const bind = <Target extends Function>(
      target: Target,
    ): Target => target.bind(this);

    return (
      <div>
        <SplitLayout>
          <Display
            width={this.props.width}
            height={this.props.height}
            program={this.state}
            setInstruction={bind(this.setInstruction)}
          />
          <Palette
            currentPen={this.state.pen}
            setPen={bind(this.setPen)}
          />
          <Controls
            play={bind(this.isStarted() ? this.resume : this.start)}
            pause={bind(this.pause)}
            reset={bind(this.stop)}
            setSpeed={bind(this.setSpeed)}
            current={this.state.interval}
          />
        </SplitLayout>
      </div>
    );
  }

  public componentWillUnmount() {
    // Ensure the timeout is cleaned up.
    this.pause();
  }

  private isStarted(): boolean {
    return typeof this.currentInterval === "number";
  }

  private setPen(instruction: Instruction): void {
    this.setState({ pen: instruction });
  }

  private setSpeed(milliseconds: number) {
    const wasStarted = this.isStarted();
    if (wasStarted) {
      this.pause();
    }
    this.setState(
      { interval: milliseconds },
      () => {
        if (wasStarted) {
          this.resume();
        }
      },
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
        clear ? Empty : this.state.pen,
      ),
    });
  }

  private start(): void {
    this.setState(
      Interpreter.initialize(this.state, 0),
      () => this.resume(),
    );
  }

  private resume(): void {
    this.pause();
    this.currentInterval = window.setInterval(
      () => this.updateProgram(),
      this.state.interval,
    );
  }

  private stop(): void {
    this.pause();
    this.setState({ signals: [] });
  }

  private pause(): void {
    if (this.isStarted()) {
      clearInterval(this.currentInterval as number);
      this.currentInterval = undefined;
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
          this.stop();
        },
      ),
    );
  }
}
