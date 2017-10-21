/**
 * Creates a array initialized to the specified value.
 * @param length The number of elements in the array.
 * @param value The default value for each cell.
 */
export const arrayOf = <Type>(
  length: number,
  value: Type,
): Type[] => {
  return new Array<Type>(length).fill(value);
};

/**
 * Repeats an action a number of times.
 * @param times The number of times to repeat the action.
 * @param action The action to repeat.
 */
export const repeat = (
  times: number,
  action: (index: number) => void,
): void => {
  arrayOf(times, 0).forEach((unused, index) => action(index));
};

/**
 * Initializes an array using the initializer.
 * @param length The number of elements in the array.
 * @param initializer The function to create values.
 */
export const initialize = <Type>(
  length: number,
  initializer: (index: number) => Type,
): Type[] => {
  return arrayOf(length, 0).map((unused, index) => initializer(index));
};

/**
 * Initializes a two dimensional array using the initializer.
 * @param length1 The length of the root array.
 * @param length2 The length of the nested arrays.
 * @param initializer The function to create values.
 */
export const initialize2d = <Type>(
  length1: number,
  length2: number,
  initializer: (index1: number, index2: number) => Type,
): Type[][] => {
  return initialize(
    length1,
    (index1) => initialize(
      length2,
      (index2) => initializer(index1, index2),
    ),
  );
};

/**
 * Replaces a value in an array.
 * @param original The original array.
 * @param index The index of the value to replace.
 * @param newValue The new value to inset.
 */
export const replace = <Type>(
  original: Type[],
  index: number,
  newValue: Type,
): Type[] => {
  const before = original.slice(0, index);
  const after = original.slice(index + 1);
  return before.concat([newValue], after);
};

/**
 * Replaces a value in a two dimensional array.
 * @param original The original array.
 * @param index1 The index of the value to replace in the root array.
 * @param index2 The index of the value to replace in the nested array.
 * @param newValue The new value to inset.
 */
export const replace2d = <Type>(
  original: Type[][],
  index1: number,
  index2: number,
  newValue: Type,
): Type[][] => {
  return replace(
    original,
    index1,
    replace(
      original[index1],
      index2,
      newValue,
    ),
  );
};
