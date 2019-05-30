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
  static validationMessages = {
    missing: () => "Missing schema entry",
    "wrong-type": providedType =>
      `Invalid schema entry. Must be an Object, was: ${typeof providedType}`,
  };

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

  walk(entry: TEntry, visitors: ISchemaVisitors<TEntry>, key?: string) {
    const errMessage = this.validate(entry);
    if (errMessage) {
      throw errMessage;
    }
    super.walk(entry, visitors, key);
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

  protected validate(
    entry: TEntry,
    validationMessages = CompositeEntryWalker.validationMessages
  ) {
    if (!entry) {
      return validationMessages.missing();
    }
    if (!isObjectType(entry)) {
      return validationMessages["wrong-type"](typeof entry);
    }
  }
}
