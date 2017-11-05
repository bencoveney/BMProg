import * as React from "react";
import * as Style from "../../utility/style";

type Borders = "left" | "right" | "both" | "none";

export interface ButtonProps {
  borders: Borders;
  caption: string;
  clicked: () => void;
  disabled: boolean;
  icon: string;
}

const getBorders = (borders: Borders): Style.Fixed => {
  switch (borders) {
    case "left": return {
      borderRadius: "6px 0 0 6px",
      borderWidth: "1px 0 3px 1px",
    };
    case "right": return {
      borderRadius: "0 6px 6px 0",
      borderWidth: "1px 1px 3px 0",
    };
    case "both": return {
      borderRadius: "3px",
      borderWidth: "1px 1px 3px 1px",
    };
    case "none": return {
      borderRadius: "0",
      borderWidth: "1px 0 3px 0",
    };
  }
};

const getColor = (enabled: boolean): Style.Fixed => ({
  color: enabled ? "white" : Style.grey3,
});

const getStyle = Style.factory({
  background: `linear-gradient(165deg, ${Style.grey2} 0%, ${Style.grey1} 100%)`,
  borderColor: Style.grey3,
  borderRadius: "3px",
  borderStyle: "solid",
  color: "white",
  flexBasis: 1,
  flexGrow: 1,
  flexShrink: 0,
  padding: "5px",
});

const captionStyle: Style.Fixed = {
  marginLeft: "5px",
};

export const Button: React.SFC<ButtonProps> = (props) => {
  const style = getStyle({
    ...getBorders(props.borders),
    ...getColor(!props.disabled),
  });
  return (
    <button
      onClick={props.clicked}
      className={`mdi mdi-${props.icon} mdi-18px`}
      style={style}
      disabled={props.disabled}
    >
      <span style={captionStyle}>{props.caption}</span>
    </button>
  );
};
