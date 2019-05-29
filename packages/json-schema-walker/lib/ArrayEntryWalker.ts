import { CompositeEntryWalker } from "@schema-validator/schema-walker";
import { ObjectEntry } from "./ObjectEntryWalker";

export interface ArrayEntry {
  type: string;
  items: ObjectEntry[];
}

export class ArrayEntryWalker extends CompositeEntryWalker {
  protected hasChildren(entry: ArrayEntry) {
    return entry.hasOwnProperty("items");
  }

  protected getChildren(entry: ArrayEntry) {
    return entry.items;
  }
}
