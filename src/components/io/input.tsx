import * as React from "react";

import { Input as InputControl } from "../inputs/input";
import { Label } from "../layout/label";

export interface InputProps {
  input: number;
  setInput: (value: number) => void;
}

export const Input: React.SFC<InputProps> = (props) => {
  const handleInput = (
    event: React.ChangeEvent<any>,
  ) => {
    const input = parseInt(event.target.value || 0, 10);
    if (!isNaN(input)) {
      props.setInput(input);
    }
  };
  return (
    <Label value={"Input"}>
      <InputControl
        change={handleInput}
        value={props.input.toString()}
      />
    </Label>
  );
};
