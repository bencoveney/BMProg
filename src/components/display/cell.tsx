import * as React from "react";
import * as StyleUtility from "../../utility/style";

import { Instruction } from "../../bmprog/instruction";
import { Signal } from "../../bmprog/signal";

export interface CellProps {
  instruction: Instruction;
  signals: Signal[];
  set: (clear: boolean) => void;
}

const staticStyle: React.CSSProperties = {
  borderStyle: "solid",
  borderWidth: "2px",
  boxShadow: "inset 0 0 1px 1px rgba(0, 0, 0, 0.1)",
  flexGrow: 1,
};

const Cell: React.StatelessComponent<CellProps> = (
  props: CellProps,
) => {
  const hasSignals = props.signals.length > 0;
  const style: React.CSSProperties = StyleUtility.merge(
    staticStyle,
    {
      backgroundColor: props.instruction.color,
      borderColor: hasSignals ? "black" : "lightgrey",
    },
  );

  const handler = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    if (event.buttons === 1) {
      props.set(false);
    } else if (event.buttons === 2) {
      props.set(true);
    }
  };

  const preventContextMenu = (event: React.MouseEvent<any>) => {
    event.preventDefault();
  };

  return (
    <div
      style={style}
      onMouseDown={handler}
      onMouseOver={handler}
      onContextMenu={preventContextMenu}
    />
  );
};

export { Cell };
