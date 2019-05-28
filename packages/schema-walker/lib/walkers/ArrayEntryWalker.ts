import { CompositeEntryWalker } from "../base-classes";

export class ArrayEntryWalker extends CompositeEntryWalker {
  protected hasChildren() {
    return this.entry.items.length > 0;
  }

  protected get children() {
    return this.entry.items;
  }
}
