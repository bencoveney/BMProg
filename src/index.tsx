import * as React from "react";
import * as ReactDOM from "react-dom";

import { Comment, Instruction } from "./bmprog/instruction";
import { Playground } from "./components/playground/playground";

const rootEl = document.getElementById("root");
ReactDOM.render(
  (
    <Playground
      rows={10}
      columns={15}
      width={300}
      height={200}
      initialPen={Comment}
    />
  ),
  rootEl,
);
