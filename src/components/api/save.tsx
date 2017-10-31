import * as React from "react";

import { exportJson } from "../../bmprog/json/exportJson";
import { JsonFormat, NamedJsonFormat } from "../../bmprog/json/jsonFormat";
import { Program } from "../../bmprog/program";

export const saveRequest = (
  json: NamedJsonFormat,
  id: number | undefined,
  saved: (id: number) => void,
) => {
  const request = new XMLHttpRequest();
  if (id !== undefined) {
    request.open("PUT", `http://localhost:3001/programs/${id}`);
  } else {
    request.open("POST", "http://localhost:3001/programs");
  }
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = () => {
    saved(JSON.parse(request.responseText).id);
  };
  request.send(JSON.stringify({ name: json.name, ...json }));
};

interface SaveProps {
  name: string;
  id: number | undefined;
  program: Program;
  setId: (id: number) => void;
}

export const Save: React.StatelessComponent<SaveProps> = (
  props: SaveProps,
) => {
  const clickHandler = () => saveRequest(
    {
      name: props.name,
      ...exportJson(props.program),
    },
    props.id,
    props.setId,
  );
  return (
    <button onClick={clickHandler}>
      Save
    </button>
  );
};
