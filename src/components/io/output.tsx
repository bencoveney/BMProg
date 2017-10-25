import * as React from "react";

export interface OutputProps {
  output: string[];
}

export const Output: React.StatelessComponent<OutputProps> = (
  props: OutputProps,
) => {
  const messages = props.output.map(
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
    <div>
      {messages}
    </div>
  );
};
