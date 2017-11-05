import * as React from "react";

import { Rows } from "../layout/rows";
import { Input, InputProps } from "./input";
import { Output, OutputProps } from "./output";

export const Io: React.SFC<InputProps & OutputProps> = (props) => (
  <Rows>
    <Input {...props} />
    <Output {...props} />
  </Rows>
);
