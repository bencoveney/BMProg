import * as React from "react";

import { exportJson } from "../../bmprog/json/exportJson";
import { JsonFormat, NamedJsonFormat } from "../../bmprog/json/jsonFormat";
import { Program } from "../../bmprog/program";

export const save = (
  name: string,
  id: number | undefined,
  program: Program,
  setId: (id: number) => void,
) => {
  const request = new XMLHttpRequest();
  if (id !== undefined) {
    request.open("PUT", `http://localhost:3001/programs/${id}`);
  } else {
    request.open("POST", "http://localhost:3001/programs");
  }
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = () => setId(JSON.parse(request.responseText).id);
  request.send(JSON.stringify({ name, ...exportJson(program) }));
};
