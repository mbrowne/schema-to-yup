import { util } from "@schema-validator/core";
const { isObjectType } = util;

export function getSchemaType(entry: any) {
  if (isObjectType(entry)) {
    // if (Array.isArray(entry)) {
    //   return "array";
    // }
    if (!entry.type) {
      throw Error(`Missing 'type' field for entry: ${JSON.stringify(entry)}`);
    }
    return entry.type;
  }
  return entry === null ? "null": typeof entry;
}