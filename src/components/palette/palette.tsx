import * as React from "react";
import * as ArrayUtility from "../../utility/array";

import { Instruction, Instructions } from "../../bmprog/instruction";
import { Button } from "./button";

interface PaletteProps {
  currentPen: Instruction;
  setPen: (instruction: Instruction) => void;
}

const style: React.CSSProperties = {
  minWidth: "250px",
};

export const Palette: React.StatelessComponent<PaletteProps> = (
  props: PaletteProps,
) => {
  const buttons = Instructions.map((instruction, index) => {
    const set = () => props.setPen(instruction);
    const isCurrent = instruction === props.currentPen;
    return (
      <Button
        key={index}
        instruction={instruction}
        isCurrent={isCurrent}
        set={set}
      />
    );
  });
  return (
    <div style={style}>
      <h2>Palette</h2>
      {buttons}
    </div>
  );
};
