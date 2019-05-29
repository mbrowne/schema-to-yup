import { PrimitiveEntryWalker } from "./walkers";
import { ISchemaWalker } from "./SchemaWalkerAbstract";

export interface ISchemaWalkerConfig {
  createPrimitiveEntryWalker: (...args: any[]) => ISchemaWalker;
}

const defaults: ISchemaWalkerConfig = {
  createPrimitiveEntryWalker: (...args: any[]) =>
    new (PrimitiveEntryWalker as any)(...args),
};

// export function buildConfig(config: {} = {}) {
export function buildConfig(config: Partial<ISchemaWalkerConfig> = {}) {
  // NB: We are just doing a shallow merge.
  // This assumes there are no nested objects or arrays that need to be merged
  return {
    ...defaults,
    ...config,
  };
}
