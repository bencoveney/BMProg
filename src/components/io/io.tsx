import * as React from "react";

import { Input, InputProps } from "./input";
import { Output, OutputProps } from "./output";

export type IoProps = InputProps & OutputProps;

export const Io: React.StatelessComponent<IoProps> = (
  props: IoProps,
) => (
  <div>
    <Input {...props} />
    <Output {...props} />
  </div>
);
