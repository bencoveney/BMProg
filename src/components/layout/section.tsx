import * as React from "react";
import * as Style from "../../utility/style";

const wrapper: Style.Fixed = { margin: "20px" };

const h2: Style.Fixed = {
  borderBottom: `1px solid ${Style.red}`,
  fontSize: "1.2em",
  marginBottom: "0.6em",
};

export const Section: React.SFC<{
  title: string;
  blurb?: string;
  children: React.ReactChild;
}> = (props) => (
  <div style={wrapper}>
    <h2 style={h2}>{props.title}</h2>
    {props.blurb}
    {props.children}
  </div>
);
