import * as React from "react";

export const merge = (
  a: React.CSSProperties,
  b: React.CSSProperties,
): React.CSSProperties => {
  const result: { [key: string]: any } = {};

  Object.keys(a).forEach((style) => {
    result[style] = a[style];
  });

  Object.keys(b).forEach((style) => {
    result[style] = b[style];
  });

  return result;
};
