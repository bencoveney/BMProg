import { importJson } from "../../bmprog/json/importJson";
import { NamedJsonFormat } from "../../bmprog/json/jsonFormat";
import { Program } from "../../bmprog/program";

type Response = NamedJsonFormat & { id: number };

export const load = (
  name: string,
  id: number | undefined,
  loaded: (id: number, json: Program) => void,
) => {
  const onload = ({id: loadedId, ...json}: Response) => {
    loaded(loadedId, importJson(json));
  };
  const request = new XMLHttpRequest();
  if (id !== undefined) {
    request.open("GET", `http://localhost:3001/programs/${id}`);
    request.onload = () => onload(JSON.parse(request.responseText));
  } else {
    request.open("GET", `http://localhost:3001/programs?name=${name}`);
    request.onload = () => onload(JSON.parse(request.responseText)[0]);
  }
  request.send();
};
