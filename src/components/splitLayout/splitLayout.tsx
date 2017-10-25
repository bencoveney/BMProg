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
  flexGrow: 0,
  flexShrink: 0,
};

const rightStyle: React.CSSProperties = {
  flexBasis: "auto",
  flexGrow: 1,
  flexShrink: 1,
};

export const SplitLayout: React.StatelessComponent<SplitLayoutProps> = (
  props: SplitLayoutProps,
) => {
  const single = props.children[0];
  const rest = props.children.slice(1);
  return (
    <div style={wrapperStyle}>
      <div style={leftStyle}>
        {rest}
      </div>
      <div style={rightStyle}>
        {single}
      </div>
    </div>
  );
};
