import { PrimitiveEntryWalker as BasePrimitiveEntryWalker } from "@schema-validator/schema-walker";

export interface PrimitiveEntry {
  type: string;
}

export class PrimitiveEntryWalker extends BasePrimitiveEntryWalker<
  PrimitiveEntry
> {}
