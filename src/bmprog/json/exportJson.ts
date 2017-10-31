import { Program } from "../program";
import { InstructionPosition, JsonFormat } from "./jsonFormat";

export const exportJson = (program: Program): JsonFormat => ({
  columns: program.instructions[0].length,
  instructions: program.instructions.reduce(
    (instructions, row, rowIndex) => {
      return instructions.concat(row.reduce(
        (rowInstructions, instruction, columnIndex) => {
          switch (instruction.name) {
            case "Up":
            case "Left":
            case "Right":
            case "Down":
            case "Split":
            case "Void":
            case "Comment":
              return rowInstructions.concat({
                column: columnIndex,
                instruction: instruction.name,
                row: rowIndex,
              });
            default:
              return rowInstructions;
          }
        },
        [] as InstructionPosition[],
      ));
    },
    [] as InstructionPosition[],
  ),
  rows: program.instructions.length,
});
