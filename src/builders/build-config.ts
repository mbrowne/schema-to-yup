import { defaults } from "../defaults";
import { SchemaEntry } from "../entry";

export const buildConfig = (config = {}, schema = {}) => {
  const builtConfig = {
    schema,
    resultObj: {},
    SchemaEntry,
    ...defaults["json-schema"],
    ...config
  };
  return builtConfig;
};
