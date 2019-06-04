import { util } from "@schema-validator/core";
import { CompositeEntryWalker } from "@schema-validator/schema-walker";
import { ArrayEntry } from "./types";
// import { ArrayItemsEntry } from "./array/ArrayItemsEntryWalker";
const { isObjectType } = util;

export class ArrayEntryWalker extends CompositeEntryWalker {
  protected hasChildren(entry: ArrayEntry) {
    return isObjectType(entry.items);
  }

  protected getChildren(entry: ArrayEntry) {
    return [entry.items!];
  }
}
