export const replace = (
  remove: RegExp,
) => (
  replacement: string,
) => (
  original: string,
) => original.replace(remove, replacement);
