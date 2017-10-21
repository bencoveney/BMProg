export enum Instruction {
  Up,
  Left,
  Right,
  Down,
  Split,
  Void,
  Comment,
  Empty,
  Unknown,
}

export const getColor = (instruction: Instruction) => {
  switch (instruction) {
    case Instruction.Up:
      return "#FF0000";
    case Instruction.Left:
      return "#00FF00";
    case Instruction.Right:
      return "#0000FF";
    case Instruction.Down:
      return "#FF00FF";
    case Instruction.Split:
      return "#00FFFF";
    case Instruction.Void:
      return "#000000";
    case Instruction.Comment:
      return "#FFFF00";
    case Instruction.Empty:
    case Instruction.Unknown:
    default:
      return "#FFFFFF";
  }
};
