import * as React from "react";

export interface InputProps {
  input: number;
  setInput: (value: number) => void;
}

export const Input: React.StatelessComponent<InputProps> = (
  props: InputProps,
) => {
  const handleInput: React.ChangeEventHandler<any> = (
    event: React.ChangeEvent<any>,
  ) => {
    const input = parseInt(event.target.value, 10);
    if (!isNaN(input)) {
      props.setInput(input);
    }
  };

  return (
    <label>
      Input:
      <input value={props.input} onChange={handleInput} />
    </label>
  );
};
