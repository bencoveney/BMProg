import * as React from "react";
import * as curry from "../../utility/curry";

import { Program } from "../../bmprog/program";
import { Buttons, ButtonsProps } from "../inputs/buttons";
import { Input } from "../inputs/input";
import { Label } from "../layout/label";
import { Rows } from "../layout/rows";
import { load } from "./load";
import { save } from "./save";

const clean = curry.replace(/[^a-z0-9]/ig)("");

export const Api: React.SFC<{
  name: string;
  program: Program;
  id: number | undefined;
  setName: (name: string) => void;
  setProgram: (id: number, program: Program) => void;
  setId: (id: number) => void;
}> = (props) => {
  const buttons: ButtonsProps = {
    buttons: [
      {
        borders: "left",
        caption: "Load",
        clicked: () => load(props.name, props.id, props.setProgram),
        disabled: false,
        icon: "download",
      },
      {
        borders: "right",
        caption: "Save",
        clicked: () => save(props.name, props.id, props.program, props.setId),
        disabled: false,
        icon: "content-save",
      },
    ],
  };
  const nameChange = (event: React.ChangeEvent<any>) => {
    props.setName(clean(event.target.value));
  };
  return (
    <Rows>
      <Buttons {...buttons} />
      <Label value={"Name"}>
        <Input change={nameChange} value={props.name} />
      </Label>
    </Rows>
  );
};
