import {
  CompositeEntryWalker,
  ISchemaVisitors,
  resolveSchemaWalkerFactory,
  getSchemaType,
} from "@schema-validator/schema-walker";

export interface ObjectEntry {
  type: string;
  title?: string;
  propertyNames?: string[];
  properties?: {
    [propName: string]: any;
  };
}

export class ObjectEntryWalker extends CompositeEntryWalker<ObjectEntry> {
  protected hasChildren(entry: ObjectEntry) {
    return entry.hasOwnProperty("properties");
  }

  protected getChildren(entry: ObjectEntry): Iterable<any> {
    return Object.entries((entry as ObjectEntry).properties!);
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
