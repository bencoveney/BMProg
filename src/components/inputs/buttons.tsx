import * as React from "react";
import * as Style from "../../utility/style";

import { Button, ButtonProps } from "./button";

export interface ButtonsProps { buttons: ButtonProps[]; }

const style: Style.Fixed = {
  display: "flex",
};

export const Buttons: React.SFC<ButtonsProps> = (props) => {
  const buttons = props.buttons.map(
    (button, key) => <Button key={key} {...button} />,
  );
  return <div style={style}>{buttons}</div>;
};
