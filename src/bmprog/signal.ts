import { Direction } from "./direction";

export interface Signal {
  column: number;
  direction: Direction;
  isWaiting: boolean;
  row: number;
}
