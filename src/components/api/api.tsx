import * as React from "react";

import { Program } from "../../bmprog/program";
import { Buttons, ButtonsProps } from "../inputs/buttons";
import { Rows } from "../layout/rows";
import { load } from "./load";
import { Name } from "./name";
import { save } from "./save";

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
        icon: "download",
      },
      {
        borders: "right",
        caption: "Save",
        clicked: () => save(props.name, props.id, props.program, props.setId),
        icon: "content-save",
      },
    ],
  };
  return (
    <Rows>
      <Buttons {...buttons} />
      <Name
        name={props.name}
        set={props.setName}
        id={props.id}
      />
    </Rows>
  );
};
