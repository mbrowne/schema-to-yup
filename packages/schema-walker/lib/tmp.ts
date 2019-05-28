// add sourcemap support for node
if (typeof global !== "undefined" && process.env.NODE_ENV !== "production") {
  require("source-map-support").install();
}

// import { walkers } from "./base-classes";
import * as walkers from "./walkers";
const { ObjectEntryWalker, ArrayEntryWalker } = walkers;

import { buildConfig } from "./config";

const config = buildConfig();

// const walker = new ObjectEntryWalker(config, {
//   type: "object",
//   children: [{ type: "foo" }, { type: "bar" }],
// });
const walker = new ArrayEntryWalker(config, [1, {type: "array elem"}, 3]);
walker.walk({
  enter: entry => {
    console.log("enter", entry);
  },
  exit: entry => {
    console.log("exit", entry);
  },
});

console.log("done");
