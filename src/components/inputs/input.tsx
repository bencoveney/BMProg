import * as React from "react";
import * as Style from "../../utility/style";

const style: Style.Fixed = {
  background: `linear-gradient(165deg, ${Style.grey2} 0%, ${Style.grey1} 100%)`,
  borderColor: `${Style.grey3} ${Style.grey3} ${Style.cream} ${Style.grey3}`,
  borderStyle: "solid",
  borderWidth: "1px",
  color: "white",
  padding: "10px",
  width: "100%",
};

export const Input: React.SFC<{
  value: string;
  change: React.ChangeEventHandler<any>;
}> = (props) => (
  <input
    onChange={props.change}
    value={props.value}
    style={style}
  />
);
