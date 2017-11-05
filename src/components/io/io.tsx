import * as React from "react";

import { Input } from "../inputs/input";
import { Label } from "../layout/label";
import { Rows } from "../layout/rows";
import { Output, OutputProps } from "./output";

interface IoProps extends OutputProps {
  input: number;
  setInput: (value: number) => void;
}

export const Io: React.SFC<IoProps> = (props) => {
  const handleInput = (
    event: React.ChangeEvent<any>,
  ) => {
    const input = parseInt(event.target.value || 0, 10);
    if (!isNaN(input)) {
      props.setInput(input);
    }
  };
  return (
    <Rows>
      <Label value={"Input"}>
        <Input
          change={handleInput}
          value={props.input.toString()}
        />
      </Label>
      <Label value={"Output"}>
        <Output {...props} />
      </Label>
    </Rows>
  );
};
