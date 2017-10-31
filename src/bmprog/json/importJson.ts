import * as Instruction from "../instruction";

import { initialize2d } from "../../utility/array";
import { Program } from "../program";
import { InstructionPosition, JsonFormat } from "./jsonFormat";

export const importJson = (json: JsonFormat): Program => ({
  instructions: initialize2d(
    json.rows,
    json.columns,
    (rowIndex, columnIndex) => {
      const instruction = json.instructions.find(
        (value: InstructionPosition) => {
          return value.column === columnIndex && value.row === rowIndex;
        },
      );
      switch (instruction && instruction.instruction) {
        case "Up":
          return Instruction.Up;
        case "Down":
          return Instruction.Down;
        case "Left":
          return Instruction.Left;
        case "Right":
          return Instruction.Right;
        case "Split":
          return Instruction.Split;
        case "Void":
          return Instruction.Void;
        case "Comment":
          return Instruction.Comment;
        default:
          return Instruction.Empty;
      }
    },
  ),
  signals: [],
});
