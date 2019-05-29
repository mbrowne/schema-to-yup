// We use this file to import the base/root classes internally to avoid issues with circular dependencies.
// (A partial application of the technique described here: https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de)

export * from "./SchemaWalkerAbstract";
export * from "./walkers/CompositeEntryWalker";

