import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Style from "../../utility/style";
import { Label } from "../layout/label";

export interface OutputProps { output: string[]; }

const style: Style.Fixed = {
  background: `linear-gradient(165deg, ${Style.grey2} 0%, ${Style.grey1} 100%)`,
  borderColor: Style.grey3,
  borderStyle: "solid",
  borderWidth: "1px",
  color: "white",
  height: "100px",
  overflow: "auto",
  padding: "5px",
  width: "100%",
};

export class Output extends React.Component<OutputProps, {}> {
  private container: Element | null = null;
  public render() {
    const messages = this.props.output.map(
      (message, index) => {
        return (
          <span key={index}>
            {message}
            <br />
          </span>
        );
      },
    );
    return (
        <div style={style} ref={(element) => this.container = element}>
          {messages}
        </div>
    );
  }
  public componentDidMount() {
    this.scrollToEnd();
  }
  public componentDidUpdate() {
    this.scrollToEnd();
  }
  private scrollToEnd() {
    if (!this.container) {
      return;
    }
    const end = ReactDOM.findDOMNode(this.container);
    end.scrollTop = end.scrollHeight;
  }
}
