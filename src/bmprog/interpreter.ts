import * as ArrayUtility from "../utility/array";

import { Direction } from "./direction";
import { Empty, Instruction } from "./instruction";
import { Program } from "./program";
import { Signal } from "./signal";

export const createProgram = (
  rows: number,
  columns: number,
): Program => {
  return {
    instructions: ArrayUtility.initialize2d(
      rows,
      columns,
      () => Empty,
    ),
    signals: [],
  };
};

export const initialize = (
  program: Program,
  input: number,
): Program => {
  const signals = ["1"].concat(Math.round(input).toString(2).split(""))
    .map((bit, index) => {
      return {
        isInputSignal: bit === "1",
        row: index,
      };
    })
    .filter((row) => row.isInputSignal)
    .map((row) => {
      return {
        column: -1,
        direction: Direction.Right,
        isWaiting: false,
        row: row.row,
      };
    });

  return {
    instructions: program.instructions,
    signals,
  };
};

interface SignalsBucket {
  row: number;
  column: number;
  content: Signal[];
}

export const getNextStep = (
  { instructions, signals }: Program,
  onOutput: (output: number) => void,
  onTerminate: () => void,
): Program => {
  // Move signals in their directions.
  const movedSignals = signals.map((signal) => {
    const move = (deltaRow: number, deltaColumn: number): Signal => ({
      column: signal.column + deltaColumn,
      direction: signal.direction,
      isWaiting: signal.isWaiting,
      row: signal.row + deltaRow,
    });
    if (signal.isWaiting) {
      return signal;
    }
    switch (signal.direction) {
      case Direction.Up:
        return move(-1, 0);
      case Direction.Down:
        return move(1, 0);
      case Direction.Left:
        return move(0, -1);
      case Direction.Right:
        return move(0, 1);
    }
  });

  // Filter out signals that have left the program.
  const trimmedSignals = movedSignals.filter(
    (signal) => {
      // Don't filter the right edge, those are output.
      const isOffTop = signal.row < 0;
      const isOffBottom = signal.row >= instructions.length;
      const isOffLeft = signal.column < 0;
      return !(isOffTop || isOffBottom || isOffLeft);
    },
  );

  // Check for output.
  const rightEdge = instructions[0].length;
  const outputSignals = trimmedSignals.filter(
    (signal) => signal.column >= rightEdge,
  );
  const activeSignals = trimmedSignals.filter(
    (signal) => signal.column < rightEdge,
  );

  // Group signals at each position.
  const signalBucket = activeSignals.reduce(
    (
      buckets: SignalsBucket[],
      next: Signal,
    ) => {
      // Ignore output signals.
      if (next.column >= instructions[0].length) {
        return buckets;
      }

      // Try and find an existing bucket at the same location.
      const instructionAtLocation = instructions[next.row][next.column];
      const existingIndex = buckets.findIndex(
        ({ row, column }) => row === next.row && column === next.column,
      );

      if (existingIndex >= 0) {
        // Add the signal to the existing bucket.
        const oldBucket = buckets[existingIndex];
        return ArrayUtility.replace(
          buckets,
          existingIndex,
          {
            column: next.column,
            content: oldBucket.content.concat(next),
            row: next.row,
          },
        );
      } else {
        // Create a new bucket.
        return buckets.concat({
          column: next.column,
          content: [next],
          row: next.row,
        });
      }
    },
    [],
  );

  // Process each position.
  const processedSignals = signalBucket.reduce(
    (previous, { row, column, content }) => {
      return previous.concat(instructions[row][column].process(content));
    },
    [] as Signal[],
  );

  // Compute output.
  const otherSignals = outputSignals.filter((signal) => signal.row > 0);
  if (otherSignals.length > 0) {
    onOutput(
      otherSignals.reduce(
        (outputSum, signal) => outputSum + Math.pow(2, signal.row - 1),
        0,
      ),
    );
  }

  // Check if finished.
  const endSignal = outputSignals.find((signal) => signal.row === 0);
  if (endSignal || processedSignals.length < 0) {
    onTerminate();
  }

  return {
    instructions,
    signals: processedSignals,
  };
};
