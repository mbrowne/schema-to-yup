import { util } from "@schema-validator/core";
import { SchemaWalkerAbstract, ISchemaVisitors } from "../base-classes";
import { resolveSchemaWalkerFactory } from "../helpers/resolveSchemaWalkerFactory";
import { getSchemaType } from "../helpers/getSchemaType";
import invariant from "ts-invariant";
const { isObjectType } = util;

/**
 * A composite entry can be either an object or array.
 * These objects/arrays can optionally contain nested objects/arrays.
 */
export abstract class CompositeEntryWalker<
  TEntry = AnyObject
> extends SchemaWalkerAbstract<TEntry> {
  protected abstract hasChildren(entry: TEntry): boolean;

  protected abstract getChildren(
    entry: TEntry
  ): Iterable<AnyObject> | undefined;

  protected getVisitorForEntry(
    entry: TEntry,
    visitors: ISchemaVisitors<TEntry>
  ) {
    return visitors[getSchemaType(entry)];
  }

  protected walkChildren(entry: TEntry, visitors: ISchemaVisitors<TEntry>) {
    const children = this.getChildren(entry);
    invariant(
      isObjectType(children),
      "getChildren() did not return an object. You need to check hasChildren() before calling walkChildren()."
    );
    for (const childEntry of children!) {
      const factory = resolveSchemaWalkerFactory(
        this.config,
        getSchemaType(childEntry)
      );
      factory(this.config).walk(childEntry, visitors);
    }
  }
}
