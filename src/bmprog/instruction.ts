export interface Instruction {
  name: string;
  color: string;
  description: string;
}

export const Up: Instruction = {
  color: "#FF0000",
  description: "Diverts any signals up.",
  name: "Up",
};

export const Left: Instruction = {
  color: "#00FF00",
  description: "Diverts any signals left.",
  name: "Left",
};

export const Right: Instruction = {
  color: "#0000FF",
  description: "Diverts any signals right.",
  name: "Right",
};

export const Down: Instruction = {
  color: "#FF00FF",
  description: "Diverts any signals down.",
  name: "Down",
};

export const Split: Instruction = {
  color: "#00FFFF",
  description: "Conditionally splits signals.",
  name: "Split",
};

export const Void: Instruction = {
  color: "#000000",
  description: "Consumes signals.",
  name: "Void",
};

export const Comment: Instruction = {
  color: "#FFFF00",
  description: "No impact on signals.",
  name: "Comment",
};

export const Empty: Instruction = {
  color: "#FFFFFF",
  description: "No impact on signals.",
  name: "Empty",
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
