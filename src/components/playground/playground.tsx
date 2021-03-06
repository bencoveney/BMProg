import * as React from "react";
import * as Interpreter from "../../bmprog/interpreter";
import * as ArrayUtility from "../../utility/array";
import * as Style from "../../utility/style";

import { Empty, Instruction } from "../../bmprog/instruction";
import { Program } from "../../bmprog/program";
import { Api } from "../api/api";
import { Controls } from "../controls/controls";
import { Display } from "../display/display";
import { Io } from "../io/io";
import { Section } from "../layout/section";
import { SplitLayout } from "../layout/splitLayout";
import { Palette } from "../palette/palette";

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
  currentInterval: number | undefined;
  pen: Instruction;
  output: string[];
  name: string;
  id?: number;
}

const style: Style.Fixed = {
  height: "100%",
};

export class Playground extends React.Component<
  PlaygroundProps,
  PlaygroundState
> {
  constructor(props: PlaygroundProps) {
    super(props);
    this.state = {
      currentInterval: undefined,
      input: 0,
      interval: 500,
      name: "MyProgram",
      output: [],
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
      <div style={style}>
        <SplitLayout>
          <Display
            width={this.props.width}
            height={this.props.height}
            program={this.state}
            setInstruction={bind(this.setInstruction)}
          />
          <Section title={"Palette"}>
            <Palette
              currentPen={this.state.pen}
              setPen={bind(this.setPen)}
            />
          </Section>
          <Section title={"Playback"}>
            <Controls
              isPlaying={this.isPlaying()}
              isStarted={this.isStarted()}
              play={bind(this.isStarted() ? this.resume : this.start)}
              pause={bind(this.pause)}
              reset={bind(this.stop)}
              setSpeed={bind(this.setSpeed)}
              current={this.state.interval}
            />
          </Section>
          <Section title={"Load/Save"}>
            <Api
              name={this.state.name}
              program={this.state}
              id={this.state.id}
              setName={bind(this.setName)}
              setProgram={bind(this.setProgram)}
              setId={bind(this.setId)}
            />
          </Section>
          <Section title={"Input/Output"}>
            <Io
              input={this.state.input}
              setInput={bind(this.setInput)}
              output={this.state.output}
            />
          </Section>
        </SplitLayout>
      </div>
    );
  }

  public componentWillUnmount() {
    // Ensure the timeout is cleaned up.
    this.pause();
  }

  private isPlaying(): boolean {
    return typeof this.state.currentInterval === "number";
  }

  private isStarted(): boolean {
    return this.state.signals.length > 0;
  }

  private setPen(instruction: Instruction): void {
    this.setState({ pen: instruction });
  }

  private setInput(input: number): void {
    this.setState({ input });
  }

  private addOutput(message: string): void {
    this.setState({ output: this.state.output.concat(message) });
  }

  private setProgram(id: number, program: Program): void {
    this.setState({ id, ...program });
  }

  private setName(name: string): void {
    this.setState({ name });
  }

  private setId(id: number): void {
    this.setState({ id });
  }

  private setSpeed(milliseconds: number) {
    const wasStarted = this.isPlaying();
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
      {
        output: [],
        ...Interpreter.initialize(this.state, this.state.input),
      },
      () => this.resume(),
    );
  }

  private resume(): void {
    this.pause();
    this.setState({
      currentInterval: window.setInterval(
        () => this.updateProgram(),
        this.state.interval,
      ),
    });
  }

  private stop(): void {
    this.pause();
    this.setState({ signals: [] });
  }

  private pause(): void {
    if (this.isPlaying()) {
      clearInterval(this.state.currentInterval as number);
      this.setState({ currentInterval: undefined });
    }
  }

  private updateProgram(): void {
    this.setState(
      Interpreter.getNextStep(
        this.state,
        (output) => this.addOutput(`Output: ${output}`),
        () => {
          this.addOutput("Terminated");
          this.stop();
        },
      ),
    );
  }
}
