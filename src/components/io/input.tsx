import * as React from "react";

import { Label } from "../layout/label";

export interface InputProps {
  input: number;
  setInput: (value: number) => void;
}

export const Input: React.SFC<InputProps> = (props) => {
  const handleInput: React.ChangeEventHandler<any> = (
    event: React.ChangeEvent<any>,
  ) => {
    const input = parseInt(event.target.value || 0, 10);
    if (!isNaN(input)) {
      props.setInput(input);
    }
  };
  return (
    <Label value={"Input"}>
      <input value={props.input} onChange={handleInput} />
    </Label>
  );
};
