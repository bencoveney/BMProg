import * as React from "react";

export type Fixed = Readonly<React.CSSProperties>;

type Factory = (dynamic: Fixed) => Fixed;

export const factory = (fixed: Fixed): Factory => (dynamic) => ({
  ...fixed,
  ...dynamic,
});

export const grey1 = "#1E1E20";
export const grey2 = "#2A2C2B";
export const grey3 = "#374140";
export const cream = "#D9CB9E";
export const red = "#DC3522";
