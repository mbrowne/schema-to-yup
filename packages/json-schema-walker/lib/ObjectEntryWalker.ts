import {
  CompositeEntryWalker,
  ISchemaVisitors,
  resolveSchemaWalkerFactory,
  getSchemaType,
} from "@schema-validator/schema-walker";
import { ObjectEntry } from "./types";

export class ObjectEntryWalker extends CompositeEntryWalker<ObjectEntry> {
  protected hasChildren(entry: ObjectEntry) {
    return entry.hasOwnProperty("properties");
  }

  protected getChildren(entry: ObjectEntry): Iterable<any> {
    return Object.entries(entry.properties!);
  }

  protected walkChildren(
    entry: ObjectEntry,
    visitors: ISchemaVisitors<ObjectEntry>
  ) {
    const children = this.getChildren(entry);
    for (const [propName, childEntry] of children!) {
      const factory = resolveSchemaWalkerFactory(
        this.config,
        getSchemaType(childEntry)
      );
      factory(this.config).walk(childEntry, visitors, propName);
    }
  }
}
