import { CompositeEntryWalker } from "../base-classes";

export class ObjectEntryWalker extends CompositeEntryWalker {
  protected hasChildren() {
    return this.entry.children && this.entry.children.length > 0;
  }

  protected get children() {
    return this.entry.children;
  }
}
