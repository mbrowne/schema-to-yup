import { ISchemaVisitors } from "../base-classes";
import { SchemaWalkerAbstract } from "../SchemaWalkerAbstract";
import { getSchemaType } from "../helpers/getSchemaType";

export class PrimitiveEntryWalker<
  TEntry = AnyObject
> extends SchemaWalkerAbstract<TEntry> {
  protected getVisitorForEntry(
    entry: TEntry,
    visitors: ISchemaVisitors<TEntry>
  ) {
    return visitors[getSchemaType(entry)];
  }
}
