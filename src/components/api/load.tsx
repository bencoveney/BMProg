import * as React from "react";

import { importJson } from "../../bmprog/json/importJson";
import { NamedJsonFormat } from "../../bmprog/json/jsonFormat";
import { Program } from "../../bmprog/program";

type Response = NamedJsonFormat & { id: number };

const loadRequest = (
  name: string,
  id: number | undefined,
  loaded: (json: Response) => void,
) => {
  const request = new XMLHttpRequest();
  if (id !== undefined) {
    request.open("GET", `http://localhost:3001/programs/${id}`);
    request.onload = () => loaded(
      JSON.parse(request.responseText),
    );
  } else {
    request.open("GET", `http://localhost:3001/programs?name=${name}`);
    request.onload = () => loaded(
      JSON.parse(request.responseText)[0],
    );
  }
  request.send();
};

interface LoadProps {
  name: string;
  id: number | undefined;
  loaded: (id: number, program: Program) => void;
}

export const Load: React.StatelessComponent<LoadProps> = (
  props: LoadProps,
) => {
  const clickHandler = () => loadRequest(
    props.name,
    props.id,
    ({id, ...json}: Response) => {
      props.loaded(id, importJson(json));
    },
  );
  return (
    <button onClick={clickHandler}>
      Load
    </button>
  );
};
