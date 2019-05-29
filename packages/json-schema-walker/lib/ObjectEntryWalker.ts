import {
  CompositeEntryWalker,
  ISchemaVisitors,
  resolveSchemaWalkerFactory,
  getSchemaType,
} from "@schema-validator/schema-walker";
import invariant from "ts-invariant";

export interface ObjectEntry {
  type: string;
  properties?: {
    [propName: string]: any;
  };
}

export class ObjectEntryWalker extends CompositeEntryWalker<ObjectEntry> {
  protected hasChildren(entry: ObjectEntry) {
    return entry.hasOwnProperty("properties");
  }

  protected getChildren(entry: ObjectEntry) {
    return Object.entries(entry.properties!);
  }

  protected walkChildren(
    entry: ObjectEntry,
    visitors: ISchemaVisitors<ObjectEntry>
  ) {
    const children = this.getChildren(entry);
    invariant(
      children,
      "getChildren() returned undefined. You need to check hasChildren() before calling walkChildren()."
    );
    for (const [propName, childEntry] of children!) {
      const factory = resolveSchemaWalkerFactory(
        this.config,
        getSchemaType(childEntry)
      );
      factory(this.config).walk(childEntry, visitors, propName);
    }
  }
}
