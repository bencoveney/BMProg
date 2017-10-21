import * as React from "react";
import * as ReactDOM from "react-dom";

import { Instruction } from "./bmprog/instruction";
import { Program } from "./components/display/program";

const getPen = () => Instruction.Comment;

const rootEl = document.getElementById("root");
ReactDOM.render(
  (
    <Program
      rows={10}
      columns={15}
      width={300}
      height={200}
      getPen={getPen}
    />
  ),
  rootEl,
);
