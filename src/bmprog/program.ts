import { Instruction } from "./instruction";
import { Signal } from "./signal";

export interface Program {
  instructions: Instruction[][];
  signals: Signal[];
}
