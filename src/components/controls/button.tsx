import * as React from "react";

interface ButtonProps {
  title: string;
  action: () => void;
}

export const Button: React.StatelessComponent<ButtonProps> = (
  props: ButtonProps,
) => {
  return (
    <button onClick={props.action}>
      {props.title}
    </button>
  );
};
