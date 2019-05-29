// add sourcemap support for node
if (typeof global !== "undefined" && process.env.NODE_ENV !== "production") {
  require("source-map-support").install();
}

import { ObjectEntryWalker, ArrayEntryWalker } from "./index";
// import * as walkers from "./walkers";
// const { ObjectEntryWalker, ArrayEntryWalker } = walkers;

import { buildConfig } from "./config";

const config = buildConfig();

const walker = new ObjectEntryWalker(config);
const schema = {
  type: "object",
  properties: {
    foo: {
      type: "string",
    },
    bar: {
      type: "number",
    },
  },
};
// const schema = {type: "array", items: [1, {type: "array elem"}, 3]}
walker.walk(schema, {
  object: {
    enter: entry => {
      console.log("enter", entry);
    },
    exit: entry => {
      console.log("exit", entry);
    },
  },
  string: {
    enter: entry => {
      console.log("string entry", entry);
    },
  },
});

console.log("done");
