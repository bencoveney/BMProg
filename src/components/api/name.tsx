import * as React from "react";
import * as curry from "../../utility/curry";

import { Input } from "../inputs/input";
import { Label } from "../layout/label";

const clean = curry.replace(/[^a-z0-9]/ig)("");

export const Name: React.SFC<{
  name: string;
  id?: number;
  set: (name: string) => void;
}> = (props) => {
  const changeHandler = (event: React.ChangeEvent<any>) => {
    props.set(clean(event.target.value));
  };
  const identifier = props.id ? `Program #${props.id} ` : "";
  return (
    <Label value={identifier}>
      <Input change={changeHandler} value={props.name} />
    </Label>
  );
};
