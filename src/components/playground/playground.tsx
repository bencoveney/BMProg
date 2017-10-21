import * as React from "react";
import * as ArrayUtility from "../../utility/array";

import { Instruction } from "../../bmprog/instruction";
import { Display } from "../display/display";
import { Palette } from "../palette/palette";

interface PlaygroundProps {
  initialPen: Instruction;
  rows: number;
  columns: number;
  width: number;
  height: number;
}

interface PlaygroundState {
  pen: Instruction;
}

export class Playground extends React.Component<
  PlaygroundProps,
  PlaygroundState
> {
  constructor(props: PlaygroundProps) {
    super(props);
    this.state = { pen: props.initialPen };
  }

  public render() {
    const getPen = () => this.state.pen;
    const setPen = (instruction: Instruction) => this.setPen(instruction);
    return (
      <div>
        <Display
          rows={this.props.rows}
          columns={this.props.columns}
          width={this.props.width}
          height={this.props.height}
          getPen={getPen}
        />
        <Palette
          currentPen={this.state.pen}
          setPen={setPen}
        />
      </div>
    );
  }

  private setPen(instruction: Instruction): void {
    this.setState({ pen: instruction });
  }
}
