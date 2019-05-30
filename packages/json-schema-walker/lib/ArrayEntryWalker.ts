import { util } from "@schema-validator/core";
import { CompositeEntryWalker } from "@schema-validator/schema-walker";
import { ObjectEntry } from "./ObjectEntryWalker";
// import { ArrayItemsEntry } from "./array/ArrayItemsEntryWalker";
const { isObjectType } = util;

export interface ArrayEntry {
  type: string;
  items?: ArrayItemsEntry[];
}

export interface ArrayItemsEntry {
  type: string;
  properties: ObjectEntry[];
}

export class ArrayEntryWalker extends CompositeEntryWalker {
  protected hasChildren(entry: ArrayEntry) {
    return isObjectType(entry.items);
  }

  protected getChildren(entry: ArrayEntry) {
    return [entry.items!];
  }
}
