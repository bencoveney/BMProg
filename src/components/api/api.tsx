import * as React from "react";

import { Program } from "../../bmprog/program";
import { Load } from "./load";
import { Name } from "./name";
import { Save } from "./save";

interface ApiProps {
  name: string;
  program: Program;
  id: number | undefined;
  setName: (name: string) => void;
  setProgram: (id: number, program: Program) => void;
  setId: (id: number) => void;
}

export const Api: React.StatelessComponent<ApiProps> = (
  props: ApiProps,
) => (
  <div>
    <Load
      name={props.name}
      id={props.id}
      loaded={props.setProgram}
    />
    <Save
      name={props.name}
      id={props.id}
      program={props.program}
      setId={props.setId}
    />
    <Name
      name={props.name}
      set={props.setName}
      id={props.id}
    />
  </div>
);
