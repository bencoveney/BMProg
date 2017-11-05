import * as React from "react";
import * as Style from "../../utility/style";

const wrapperStyle: Style.Fixed = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  height: "100%",
};

const leftStyle: Style.Fixed = {
  background: `url("./stressed_linen.png") ${Style.grey1} repeat`,
  color: "white",
  flexBasis: "auto",
  flexGrow: 0,
  flexShrink: 0,
  height: "100%",
  overflow: "auto",
};

const rightStyle: Style.Fixed = {
  flexBasis: "auto",
  flexGrow: 1,
  flexShrink: 1,
};

export const SplitLayout: React.SFC<{
  children: React.ReactNode[];
}> = ({children: [right, ...left]}) => {
  return (
    <div style={wrapperStyle}>
      <div style={leftStyle}>{left}</div>
      <div style={rightStyle}>{right}</div>
    </div>
  );
};
