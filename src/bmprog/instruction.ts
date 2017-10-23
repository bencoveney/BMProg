import { Direction } from "./direction";
import { Signal } from "./signal";

type SignalProcessor = (signals: Signal[]) => Signal[];

const createChangeDirection = (
  singleDirection: Direction,
  multipleDirection: Direction,
): SignalProcessor => {
  return (signals: Signal[]) => signals.map(
    ({ column, row }) => ({
      column,
      direction: signals.length > 1 ? multipleDirection : singleDirection,
      isWaiting: false,
      row,
    }),
  );
};

export interface Instruction {
  name: string;
  color: string;
  description: string;
  process: SignalProcessor;
}

export const Up: Instruction = {
  color: "#FF0000",
  description: "Diverts any signals up.",
  name: "Up",
  process: createChangeDirection(Direction.Up, Direction.Down),
};

export const Left: Instruction = {
  color: "#00FF00",
  description: "Diverts any signals left.",
  name: "Left",
  process: createChangeDirection(Direction.Left, Direction.Right),
};

export const Right: Instruction = {
  color: "#0000FF",
  description: "Diverts any signals right.",
  name: "Right",
  process: createChangeDirection(Direction.Right, Direction.Left),
};

export const Down: Instruction = {
  color: "#FF00FF",
  description: "Diverts any signals down.",
  name: "Down",
  process: createChangeDirection(Direction.Down, Direction.Up),
};

export const Split: Instruction = {
  color: "#00FFFF",
  description: "Conditionally splits signals.",
  name: "Split",
  process: (signals) => {
    const doneWaiting = signals.filter((signal) => signal.isWaiting)
      .map(({isWaiting, ...rest}) => ({
        ...rest,
        isWaiting: false,
      }));

    return signals.filter((signal) => !signal.isWaiting)
      .reduce(
        (processed, nextSignal) => {
          const split = (directionA: Direction, directionB: Direction) => {
            return processed.concat(
              {
                column: nextSignal.column,
                direction: directionA,
                isWaiting: true,
                row: nextSignal.row,
              },
              {
                column: nextSignal.column,
                direction: directionB,
                isWaiting: true,
                row: nextSignal.row,
              },
            );
          };
          switch (nextSignal.direction) {
            case Direction.Down:
            case Direction.Up:
              return split(Direction.Left, Direction.Right);
            case Direction.Left:
            case Direction.Right:
              return split(Direction.Up, Direction.Down);
          }
        },
        doneWaiting,
      );
  },
};

export const Void: Instruction = {
  color: "#000000",
  description: "Consumes signals.",
  name: "Void",
  process: () => [],
};

export const Comment: Instruction = {
  color: "#FFFF00",
  description: "No impact on signals.",
  name: "Comment",
  process: (signals) => signals,
};

export const Empty: Instruction = {
  color: "#FFFFFF",
  description: "No impact on signals.",
  name: "Empty",
  process: (signals) => signals,
};

export const Instructions: Instruction[] = [
  Up,
  Left,
  Right,
  Down,
  Split,
  Void,
  Comment,
  Empty,
];
