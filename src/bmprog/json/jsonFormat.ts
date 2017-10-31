import { Instruction } from "../instruction";

export interface InstructionPosition {
  row: number;
  column: number;
  instruction: string;
}

export interface JsonFormat {
  rows: number;
  columns: number;
  instructions: InstructionPosition[];
}

export interface NamedJsonFormat extends JsonFormat {
  name: string;
}
