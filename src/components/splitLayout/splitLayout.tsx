import * as React from "react";

interface SplitLayoutProps {
  children: any;
}

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
};

const leftStyle: React.CSSProperties = {
  flexBasis: "auto",
  flexGrow: 1,
  flexShrink: 1,
};

const rightStyle: React.CSSProperties = {
  flexBasis: "auto",
  flexGrow: 0,
  flexShrink: 0,
};

export const SplitLayout: React.StatelessComponent<SplitLayoutProps> = (
  props: SplitLayoutProps,
) => {
  const left = props.children[0];
  const right = props.children[1];
  return (
    <div style={wrapperStyle}>
      <div style={leftStyle}>
        {left}
      </div>
      <div style={rightStyle}>
        {right}
      </div>
    </div>
  );
};
