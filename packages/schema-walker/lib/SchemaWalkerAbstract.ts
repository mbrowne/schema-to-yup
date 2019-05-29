import { ISchemaWalkerConfig } from "./config";

export interface ISchemaVisitors<TEntry> {
  [schemaType: string]: IVisitor<TEntry>;
}

export type IVisitor<TEntry> = {
  enter?: (entry: TEntry) => void;
  exit?: (entry: TEntry) => void;
};

export interface ISchemaWalker<TEntry = AnyObject> {
  walk(entry: AnyObject, visitors: ISchemaVisitors<TEntry>): void;
}

export abstract class SchemaWalkerAbstract<TEntry = AnyObject>
  implements ISchemaWalker<TEntry> {
  config: ISchemaWalkerConfig;

  constructor(config: ISchemaWalkerConfig) {
    this.config = config;
  }

  protected hasChildren(entry: TEntry) {
    return false;
  }

  protected abstract getVisitorForEntry(
    entry: TEntry,
    visitors: ISchemaVisitors<TEntry>
  ): IVisitor<TEntry> | undefined;

  /**
   * @param entry     schema entry
   * @param visitors  map of visitor objects with enter() and exit() callbacks, indexed by schema type
   * @param key       optional key for the current schema entry (useful when iterating object properties)
   */
  walk(entry: TEntry, visitors: ISchemaVisitors<TEntry>, key?: string) {
    const { enter, exit } = this.getVisitorForEntry(entry, visitors) || {
      enter: null,
      exit: null,
    };
    if (enter) {
      enter(entry);
    }
    if (this.hasChildren(entry)) {
      this.walkChildren(entry, visitors);
    }
    if (exit) {
      exit(entry);
    }
  }

  protected walkChildren(entry: TEntry, visitors: ISchemaVisitors<TEntry>) {
    console.warn("walkChildren() called but subclass did not implement it");
  }
}
