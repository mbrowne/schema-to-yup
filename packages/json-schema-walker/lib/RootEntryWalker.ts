import { CompositeEntryWalker } from "@schema-validator/schema-walker";
import { ObjectEntryWalker, ObjectEntry } from "./ObjectEntryWalker";
import { buildConfig, IJsonSchemaWalkerConfig } from "./config";

export function createSchemaWalker(
  config: Partial<IJsonSchemaWalkerConfig> = {}
) {
  return new RootEntryWalker(buildConfig(config));
}

export class RootEntryWalker extends ObjectEntryWalker {
  static validationMessages = {
    ...CompositeEntryWalker.validationMessages,
    missing: () => "Missing schema entry",
    "wrong-type": providedType =>
      `Invalid schema. Must be an Object, was: ${typeof providedType}`,
    "missing-properties": () => "Invalid schema: must have a properties object",
  };

  protected validate(entry: ObjectEntry) {
    const { validationMessages } = RootEntryWalker;
    const errMessage = super.validate(entry, validationMessages);
    if (errMessage) {
      return errMessage;
    }
    if (!entry.properties) {
      return validationMessages["missing-properties"]();
    }
  }
}
