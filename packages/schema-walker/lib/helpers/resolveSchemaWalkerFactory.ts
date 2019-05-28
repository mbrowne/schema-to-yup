import { ISchemaWalkerConfig } from "../config";

const walkerMap = {
  array: "ArrayEntryWalker",
  object: "ObjectEntryWalker",
};

// Returns a factory function for the ISchemaWalker that corresponds to the given schema type
export function resolveSchemaWalkerFactory(
  config: ISchemaWalkerConfig,
  typeName: string
) {
  const walkerClass = walkerMap[typeName] || "PrimitiveEntryWalker";
  const factoryFunc = config["create" + walkerClass];
  if (!factoryFunc) {
    throw Error(`No factory method found in config for ${walkerClass}`);
  }
  return factoryFunc;
}
