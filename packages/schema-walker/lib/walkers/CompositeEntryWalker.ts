import { SchemaWalkerAbstract } from "../base-classes";
import { IWalkEventHandlers } from "../SchemaWalkerAbstract";
import { resolveSchemaWalkerFactory } from "../helpers/resolveSchemaWalkerFactory";
import { getSchemaType } from "../helpers/getSchemaType";

/**
 * A composite entry can be either an object or array.
 * These objects/arrays can optionally contain nested objects/arrays.
 */
export abstract class CompositeEntryWalker extends SchemaWalkerAbstract {
  protected abstract hasChildren(): boolean;

  protected abstract get children(): Iterable<any>;

  protected walkChildren(handlers: IWalkEventHandlers) {
    for (const entry of this.children) {
      const factory = resolveSchemaWalkerFactory(
        this.config,
        getSchemaType(entry)
      );
      factory(this.config, entry).walk(handlers);
    }
  }
}
