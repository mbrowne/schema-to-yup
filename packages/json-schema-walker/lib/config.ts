import {
  ISchemaWalker,
  ISchemaWalkerConfig,
  buildConfig as baseBuildConfig,
} from "@schema-validator/schema-walker";
import { ObjectEntryWalker, ArrayEntryWalker } from ".";

export interface IJsonSchemaWalkerConfig extends ISchemaWalkerConfig {
  createObjectEntryWalker: (...args: any[]) => ISchemaWalker;
  createArrayEntryWalker: (...args: any[]) => ISchemaWalker;
}

const defaults = {
  createObjectEntryWalker: (...args: any[]) =>
    new (ObjectEntryWalker as any)(...args),
  createArrayEntryWalker: (...args: any[]) =>
    new (ArrayEntryWalker as any)(...args),
};

export function buildConfig(config: Partial<IJsonSchemaWalkerConfig> = {}) {
  return {
    ...baseBuildConfig(),
    ...defaults,
    ...config,
  };
}
