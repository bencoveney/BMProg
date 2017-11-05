import * as React from "react";
import * as Style from "../../utility/style";

const row: Style.Fixed = { marginBottom: "0.6em" };

export const Rows: React.SFC<{
  children: React.ReactNode[];
}> = (props) => {
  const rows = props.children.map(
    (child, index) => <div style={row} key={index}>{child}</div>,
  );
  return <div>{rows}</div>;
};
