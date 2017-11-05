import * as React from "react";
import * as Style from "../../utility/style";

const labelStyle: Style.Fixed = {
  alignItems: "center",
  display: "flex",
  width: "100%",
};

const captionStyle: Style.Fixed = {
  flex: "0 0 auto",
  marginRight: "10px",
  width: "25%",
};

const controlStyle: Style.Fixed = { flex: "1 1 auto" };

export const Label: React.SFC<{
  value: string;
  children: React.ReactNode;
}> = (props) => (
  <div>
    <label style={labelStyle}>
      <div style={captionStyle}>{props.value}</div>
      <div style={controlStyle}>{props.children}</div>
    </label>
  </div>
);
